import {Colors} from "../../enums/colors";
import {HtmlFont} from "../../enums/html-type";

interface DialogParams {
    zIndex?: number;
    name: string;
    title: string;
    message: string;

    rateSuccess: number;
    corrects: number;
    mistakes: number;

    registerFunction: () => void;
    closeFunction: (arg: boolean) => void;
}

export const DialogQuestionInfo = (
    {
        zIndex,
        name,
        title,
        message,

        rateSuccess,
        corrects,
        mistakes,

        registerFunction,
        closeFunction
    }: DialogParams
) => (<>
    <Style zIndex={zIndex} />
    <div className={"popup-overlay-main"} id={name}>
        <div className={"dialog-container-main"}>
            <div id={"DivTitle"}>
                <div id={"TextTitle"}>
                    <h1>{title}</h1>
                </div>
            </div>
            <p>{message}</p>

            <div id={"RateSuccess"}>
                <h1>{rateSuccess}%</h1>
            </div>

            <div id={"DivCorrectError"}>
                <h1>Acertos: {corrects}</h1>
                <div className={"separator"}></div>
                <h1>Erros: {mistakes}</h1>
                <div className={"separator"}></div>
                <h1>Total: {corrects + mistakes}</h1>
            </div>

            <div id={"DivButton"}>
                <button className={"button-general-main"} onClick={registerFunction}>Registrar Progresso</button>
                <div className={"separator"}></div>
                <button className={"button-not-main"} onClick={
                    () => closeFunction(false)}>Tentar Novamente</button>
            </div>
        </div>
    </div>
</>);

const Style = ({ zIndex }: {zIndex?: number}) => {
    return (<style>{`
    #DivTitle {
        display: flex;
        text-align: center;
        justify-content: center;
        font-weight: ${HtmlFont.BOLDER};
    }
    #TextTitle {
        width: 100%;
        font-weight: ${HtmlFont.BOLDER};
        justify-content: center;
    }
    #TextTitle h1 {
        font-size: 2.7rem;
    }
    
    #RateSuccess {
        font-weight: ${HtmlFont.BOLDER};
        display: flex;
        justify-content: center;
    }
    #RateSuccess h1 {
        font-size: 4rem;
    }
    
    #DivCorrectError {
        font-weight: ${HtmlFont.BOLDER};
        display: flex;
        justify-content: center;
    }
    #DivCorrectError h1 {
        font-size: 2.7rem;
    }
    #CloseDiv h2 {
        font-weight: normal;
    }
    .separator { width: 12px; }
    .popup-overlay-main {
        position: fixed;
        top: 0;
        left: 0;
        width: 100vw;
        height: 100vh;
        background-color: rgba(0, 0, 0, 0.55);
    
        display: flex;
        justify-content: center;
        align-items: center;
    
        z-index: ${zIndex};
    }
    
    .dialog-container-main {
        background-color: #ffffff;
        padding: 30px 40px;
        border-radius: 12px;
        box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
    
        max-width: 720px;
        width: 100%;
        
        max-height: 450px;
        height: 100%;
    
        position: relative;
    }
    
    .dialog-container-main p {
        text-align: center;
        font-size: 2rem;
        margin-bottom: 20px;
        font-weight: ${HtmlFont.BOLD};
    }
    
    .dialog-container-main h2 {
        margin-bottom: 15px;
        color: #333;
        font-size: 2em;
    }
    
    #DivButton {
        margin-top: 2rem;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    
    .button-general-main {
        font-weight: bold; 
        background-color: ${Colors.GREEN};
        color: ${Colors.WHITE};
        padding: 8px 20px;
        border-radius: 17px;
        cursor: pointer;
        font-size: 1.5em;
    }
    
    .button-general-main:hover {
        background-color: ${Colors.GREEN_HOVER}
    }
    
    .button-not-main {
        font-weight: ${HtmlFont.BOLDER};
        background-color: ${Colors.RED};
        color: ${Colors.WHITE};
        padding: 8px 20px;
        border-radius: 17px;
        cursor: pointer;
        font-size: 1.5em;
    }
    
    .button-not-main:hover {
        background-color: ${Colors.RED_HOVER}
    }
    `}</style>);
};
