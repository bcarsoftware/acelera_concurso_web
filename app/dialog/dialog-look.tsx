import {DialogStyle} from "~/dialog/dialog-style";

interface DialogParams {
    zIndex?: number;
    name: string;
    title: string;
    message: string;
}

export const DialogLook = (
    { zIndex, name, title, message }: DialogParams
) => (
    <>
        <Style zIndex={zIndex} />
        <div className={"popup-overlay-main"} id={name}>
            <div className={"dialog-container-main"}>
                <div id={"DivTitle"}>
                    <div id={"DivText"}>
                        <h2>{title}</h2>
                    </div>
                </div>
                <p>{message}</p>
            </div>
        </div>
    </>
);

const Style = ({ zIndex }: {zIndex?: number}) => {
    const style = DialogStyle(zIndex);

    return (<style>{style}</style>);
};
