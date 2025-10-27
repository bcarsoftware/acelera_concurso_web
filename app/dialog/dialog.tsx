import {DialogStyle} from "~/dialog/dialog-style";

interface DialogParams {
    title: string;
    message: string;
    buttonText: string;
    closeFunction: (arg: boolean) => void;
}

export const Dialog = ({
    title, message, buttonText, closeFunction
}: DialogParams) => {
    return (
        <>
            <Style />
            <div className={"popup-overlay"}>
                <div className={"dialog-container"}>
                    <div id={"TitleDiv"}>
                        <div id={"TextDiv"}>
                            <h2>{title}</h2>
                        </div>
                    </div>
                    <p>{message}</p>
                    <div id={"ButtonDiv"}>
                        <button className={"button-general"} onClick={() => closeFunction(false)}>{buttonText}</button>
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
