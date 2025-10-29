import {DialogStyle} from "~/dialog/dialog-style";

interface DialogParams {
    name: string;
    title: string;
    message: string;
    buttonText: string;
    closeFunction: (arg: boolean) => void;
}

export const Dialog = ({
    name, title, message, buttonText, closeFunction
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
                        <button className={"button-general-main"} onClick={() => closeFunction(false)}>{buttonText}</button>
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
