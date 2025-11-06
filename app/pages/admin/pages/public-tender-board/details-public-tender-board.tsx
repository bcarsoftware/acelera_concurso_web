import {AdminStyles} from "~/pages/admin/pages/admin-styles";
import {InputTextAdmin} from "~/pages/admin/components/input-text-admin";
import React, {useEffect, useState} from "react";
import {InputNumberAdmin} from "~/pages/admin/components/input-number-admin";
import {Dialog} from "~/dialog/dialog";
import {useAdminAuth} from "../../../../../context/auth-admin-context";
import {ContentTypes, EnvironConstants} from "../../../../../enums/constants";

interface Details {
    id: number;
    sail: string;
    name: string;
    setOpened: (value: boolean) => void;
    getAllBoards: () => Promise<void>;
}

export const PublicTenderBoardDetails = (
    { id, sail, name, setOpened, getAllBoards }: Details,
) => {
    const userAuth = useAdminAuth();
    const [tenderId, setTenderId] = useState<number>(0);
    const [tenderSail, setTenderSail] = useState<string>("");
    const [tenderBoard, setTenderBoard] = useState<string>("");

    const [showDialog, setShowDialog] = useState<boolean>(false);
    const [dialogTitle, setDialogTitle] = useState<string>("");
    const [dialogMessage, setDialogMessage] = useState<string>("");

    useEffect(() => {
        if (userAuth?.isLoading) return;

        setTenderId(id);
        setTenderSail(sail);
        setTenderBoard(name);
    }, [userAuth]);

    const getDialogResult = () => (<Dialog
        name={"update-public-tender-board"}
        title={dialogTitle}
        message={dialogMessage}
        buttonText={"Fechar"}
        closeFunction={setShowDialog}
        zIndex={1001}
    />);

    const handleUpdateTenderBoard = async () => {
        const payload = {
            user_admin_id: userAuth?.user?.user_admin_id || undefined,
            sail: tenderSail || undefined,
            name: tenderBoard || undefined,
        };

        if (Object.values(payload).includes(undefined)) {
            setDialogTitle("Erro nos Dados");
            setDialogMessage("Existem valores indefinidos!");
            setShowDialog(true);
            return;
        }

        try {
            const url = EnvironConstants.API_BASE_URL + "/public-tender-board/" + tenderId;
            const response = await fetch(url, {
                method: "PATCH",
                body: JSON.stringify(payload),
                headers: {
                    "Content-Type": ContentTypes.JSON,
                    "Authorization": `Bearer ${userAuth?.token}`
                }
            });

            const data = await response.json();

            if (!response.ok) {
                console.error(data);

                setDialogTitle("Erro no Cadastro");
                setDialogMessage("Não foi possível cadastrar essa Banca de Concurso!");
            }
            else {
                setDialogTitle("Sucesso");
                setDialogMessage("Banca de Concurso cadastrada com sucesso!");

                await getAllBoards();
            }
        }
        catch (error) {
            console.error(error);

            setDialogTitle("Erro no Servidor");
            setDialogMessage("Não foi possível se conectar!");
        }
        finally {
            setShowDialog(true);
        }
    }

    return (
        <form>
            {showDialog && (getDialogResult())}

            <Style />
            <div className={"popup-overlay-main-admin"} id={"new-public-tender-board"}>
                <div className={"dialog-container-main-admin"}>
                    <div id={"AdminDivTitle"}>
                        <div id={"DivText"}>
                            <h2>Atualizar Banca de Concurso</h2>
                        </div>
                    </div>

                    <InputNumberAdmin
                        labelContent={"ID da Banca (Não Editável)"}
                        name={"admin-public-tender-board-id"}
                        placeholder={"123"}
                        required={true}
                        disabled={true}
                        value={tenderId}
                    />

                    <InputTextAdmin
                        labelContent={"Digite a Sigla*"}
                        name={"board-sail"}
                        placeholder={"ABCD"}
                        required={true}
                        disabled={false}
                        value={tenderSail}
                        updateValue={setTenderSail}
                    />

                    <InputTextAdmin
                        labelContent={"Banca de Concurso*"}
                        name={"board-name"}
                        placeholder={"Instituto de Concurso"}
                        required={true}
                        disabled={false}
                        value={tenderBoard}
                        updateValue={setTenderBoard}
                    />

                    <div id={"AdminDivButton"}>
                        <button className={"button-general-main-admin"} onClick={handleUpdateTenderBoard}>Atualizar Banca</button>
                        <button formNoValidate={true} className={"button-not-main-admin"} onClick={() => setOpened(false)}>Cancelar</button>
                    </div>
                </div>
            </div>
        </form>
    );
};

const Style = () => (<style>{AdminStyles}</style>);
