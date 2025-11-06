import {AdminStyles} from "~/pages/admin/pages/admin-styles";
import {InputTextAdmin} from "~/pages/admin/components/input-text-admin";
import React, {useState} from "react";
import {useAdminAuth} from "context/auth-admin-context";
import {ContentTypes, EnvironConstants} from "../../../../../enums/constants";
import {Dialog} from "~/dialog/dialog";
import {HtmlType} from "../../../../../enums/html-type";

export const PublicTenderBoardNewPage = (
    { setOpened, getAllBoards }: {
        setOpened: (value: boolean) => void,
        getAllBoards: () => Promise<void>,
    }
) => {
    const userAuth = useAdminAuth();
    const [tenderSail, setTenderSail] = useState<string>("");
    const [tenderBoard, setTenderBoard] = useState<string>("");

    const [showDialog, setShowDialog] = useState<boolean>(false);
    const [dialogTitle, setDialogTitle] = useState<string>("");
    const [dialogMessage, setDialogMessage] = useState<string>("");

    const getDialogResult = () => (<Dialog
        name={"create-public-tender-board"}
        title={dialogTitle}
        message={dialogMessage}
        buttonText={"Fechar"}
        closeFunction={setShowDialog}
        zIndex={1001}
    />);

    const handlerCreateTenderBoard = async () => {
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
            const url = EnvironConstants.API_BASE_URL + "/public-tender-board"
            const response = await fetch(url, {
                method: "POST",
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
    };

    return (
        <form>
            {showDialog && (getDialogResult())}

            <Style />
            <div className={"popup-overlay-main-admin"} id={"new-public-tender-board"}>
                <div className={"dialog-container-main-admin"}>
                    <div id={"AdminDivTitle"}>
                        <div id={"DivText"}>
                            <h2>Cadastrar Banca de Concurso</h2>
                        </div>
                    </div>

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
                        <button type={HtmlType.BUTTON} className={"button-general-main-admin"} onClick={handlerCreateTenderBoard}>Cadastrar Banca</button>
                        <button type={HtmlType.BUTTON} formNoValidate={true} className={"button-not-main-admin"} onClick={() => setOpened(false)}>Cancelar</button>
                    </div>
                </div>
            </div>
        </form>
    );
};

const Style = () => (<style>{AdminStyles}</style>);
