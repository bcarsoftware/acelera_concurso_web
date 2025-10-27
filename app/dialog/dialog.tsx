import {Colors} from "../../enums/colors";
import {useState} from "react";

interface DialogParams {
    title: string;
    message: string;
    buttonText: string;
    isOpen: boolean;
}

export const Dialog = ({
    title, message, buttonText, isOpen
}: DialogParams) => {
    const [open, setOpen] = useState<boolean>(isOpen);

    const close = () => setOpen(false);

    return (
        <>
            {open && (
                <>
                    <DialogStyle />
                    <div className={"popup-overlay"}>
                        <div className={"dialog-container"}>
                            <div id={"TitleDiv"}>
                                <div id={"TextDiv"}>
                                    <h2>{title}</h2>
                                </div>
                            </div>
                            <p>{message}</p>
                            <div id={"ButtonDiv"}>
                                <button onClick={close}>{buttonText}</button>
                            </div>
                        </div>
                    </div>
                </>
            )}
        </>
    );
};

const DialogStyle = () => {
    const style = `
    #TitleDiv {
        display: flex;
        text-align: left;
    }
    #TitleText {
        width: 100%;
        justify-content: left;
    }
    #DivClose h2 {
        font-weight: normal;
    }
    .popup-overlay {
        position: fixed;
        top: 0;
        left: 0;
        width: 100vw;
        height: 100vh;
        background-color: rgba(0, 0, 0, 0.5);
    
        display: flex;
        justify-content: center;
        align-items: center;
    
        z-index: 1000;
    }
    
    .dialog-container {
        background-color: #ffffff;
        padding: 30px 40px;
        border-radius: 12px;
        box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
    
        max-width: 720px;
        width: 100%;
    
        position: relative;
    }
    
    .dialog-container p {
        text-align: left;
        font-size: 1.2rem;
    }
    
    .dialog-container h2 {
        margin-bottom: 25px;
        color: #333;
        font-size: 2em;
    }
    
    #ButtonDiv {
        display: flex;
        justify-content: end;
    }
    
    button {
        background-color: ${Colors.LIGHT_BLUE};
        color: ${Colors.WHITE};
        padding: 8px 20px;
        border-radius: 12px;
        cursor: pointer;
        font-size: 1.5em;
    }
    
    button:hover {
        background-color: ${Colors.LIGHT_BLUE_HOVER}
    }
    `;

    return (<style>{style}</style>);
};
