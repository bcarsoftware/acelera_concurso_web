import {DialogStyle} from "~/dialog/dialog-style";

interface DialogParams {
    name: string;
    title: string;
    message: string;
    yesFunction: () => void;
    closeFunction: (arg: boolean) => void;
}

export const DialogConfirm = ({
   name, title, message, yesFunction, closeFunction
}: DialogParams) => {
    return (
        <>
            <Style />
            <div className={"popup-overlay-main"} id={name}>
                <div className={"dialog-container-main"}>
                    <div id={"DivTitle"}>
                        <div id={"DivText"}>
                            <h2>{title}</h2>
                        </div>
                    </div>
                    <p>{message}</p>
                    <div id={"DivButton"}>
                        <button className={"button-yes-main"} onClick={yesFunction}>SIM</button>
                        <button className={"button-not-main"} onClick={() => closeFunction(false)}>NÃO</button>
                    </div>
                </div>
            </div>
        </>
    );
};

const Style = () => {
    const style = DialogStyle();

    return (<style>{style}</style>);
};
