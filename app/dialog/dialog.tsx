import {DialogStyle} from "~/dialog/dialog-style";

interface DialogParams {
    zIndex?: number;
    name: string;
    title: string;
    message: string;
    buttonText: string;
    closeFunction: (arg: boolean) => void;
}

export const Dialog = ({
    zIndex, name, title, message, buttonText, closeFunction
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

const Style = ({ zIndex }: {zIndex?: number}) => {
    const style = DialogStyle(zIndex);

    return (<style>{style}</style>);
};
