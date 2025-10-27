import {useState} from "react";
import {DialogStyle} from "~/dialog/dialog-style";

interface DialogParams {
    title: string;
    message: string;
    isOpen: boolean;
    yesFunction: () => void;
    closeFunction: (arg: boolean) => void;
}

export const DialogConfirm = ({
   title, message, yesFunction, closeFunction
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
                        <button className={"button-yes"} onClick={yesFunction}>SIM</button>
                        <button className={"button-not"} onClick={() => closeFunction(false)}>NÃO</button>
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
