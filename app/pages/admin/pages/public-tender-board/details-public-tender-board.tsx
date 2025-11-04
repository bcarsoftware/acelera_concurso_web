import {AdminStyles} from "~/pages/admin/pages/admin-styles";
import {InputTextAdmin} from "~/pages/admin/components/input-text-admin";
import {useEffect, useState} from "react";
import {InputNumberAdmin} from "~/pages/admin/components/input-number-admin";

interface Details {
    id: number;
    sail: string;
    name: string;
    setOpened: (value: boolean) => void;
    setShowDialog: (value: boolean) => void;
    setDialogTitle: (title: string) => void;
    setDialogMessage: (message: string) => void;
}

export const PublicTenderBoardDetails = (
    { id, sail, name, setOpened, setShowDialog, setDialogTitle, setDialogMessage }: Details,
) => {
    const [tenderId, setTenderId] = useState<number>(0);
    const [tenderSail, setTenderSail] = useState<string>("");
    const [tenderBoard, setTenderBoard] = useState<string>("");

    useEffect(() => {
        setTenderId(id);
        setTenderSail(sail);
        setTenderBoard(name);
    }, []);

    const handleUpdateTenderBoard = async () => {
        const payload = {
            sail: tenderSail,
            name: tenderBoard
        };

        setOpened(false);
        setShowDialog(true);
    }

    return (
        <form>
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
