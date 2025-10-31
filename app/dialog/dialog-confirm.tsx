import {DialogStyle} from "~/dialog/dialog-style";
import React from "react";
import {HtmlType} from "../../enums/html-type";

interface DialogParams {
    name: string;
    title: string;
    message: string | React.ReactNode;
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
                        <button type={HtmlType.BUTTON} className={"button-yes-main"} onClick={yesFunction}>SIM</button>
                        <button type={HtmlType.BUTTON} className={"button-not-main"} onClick={() => closeFunction(false)}>NÃO</button>
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
