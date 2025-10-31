import {Colors} from "../../enums/colors";
import {HtmlFont} from "../../enums/html-type";

export const DialogStyle = () => {
    return `
    #DivTitle {
        display: flex;
        text-align: left;
    }
    #TextTitle {
        width: 100%;
        justify-content: left;
    }
    #CloseDiv h2 {
        font-weight: normal;
    }
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
    
        z-index: 1000;
    }
    
    .dialog-container-main {
        background-color: #ffffff;
        padding: 30px 40px;
        border-radius: 12px;
        box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
    
        max-width: 720px;
        width: 100%;
    
        position: relative;
    }
    
    .dialog-container-main p {
        text-align: left;
        font-size: 1.2rem;
        margin-bottom: 20px;
    }
    
    .dialog-container-main h2 {
        margin-bottom: 15px;
        color: #333;
        font-size: 2em;
    }
    
    #DivButton {
        display: flex;
        justify-content: end;
    }
    
    .button-general-main {
        font-weight: bold; 
        background-color: ${Colors.LIGHT_BLUE};
        color: ${Colors.WHITE};
        padding: 8px 20px;
        border-radius: 17px;
        cursor: pointer;
        font-size: 1.5em;
    }
    
    .button-general-main:hover {
        background-color: ${Colors.LIGHT_BLUE_HOVER}
    }
    
    .button-yes-main {
        font-weight: ${HtmlFont.BOLDER};
        margin-left: 8px;
        background-color: ${Colors.LIGHT_BLUE};
        color: ${Colors.WHITE};
        padding: 8px 20px;
        border-radius: 17px;
        cursor: pointer;
        font-size: 1.5em;
    }
    
    .button-yes-main:hover {
        background-color: ${Colors.LIGHT_BLUE_HOVER}
    }
    
    .button-not-main {
        font-weight: ${HtmlFont.BOLDER}; 
        margin-left: 8px;
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
    `;
};
