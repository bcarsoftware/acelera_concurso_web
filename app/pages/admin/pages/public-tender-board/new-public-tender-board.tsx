import {AdminStyles} from "~/pages/admin/pages/admin-styles";
import {InputTextAdmin} from "~/pages/admin/components/input-text-admin";
import {useState} from "react";

export const PublicTenderBoardNewPage = (
    { setOpened }: { setOpened: (value: boolean) => void }
) => {
    const [tenderSail, setTenderSail] = useState<string>("");
    const [tenderBoard, setTenderBoard] = useState<string>("");

    return (
        <form>
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
                        <button className={"button-general-main-admin"} onClick={() => {}}>Cadastrar Banca</button>
                        <button formNoValidate={true} className={"button-not-main-admin"} onClick={() => setOpened(false)}>Cancelar</button>
                    </div>
                </div>
            </div>
        </form>
    );
};

const Style = () => (<style>{AdminStyles}</style>);
