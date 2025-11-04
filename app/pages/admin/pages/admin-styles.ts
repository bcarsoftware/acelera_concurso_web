import {Colors} from "../../../../enums/colors";
import {HtmlFont} from "../../../../enums/html-type";

export const AdminStyles = `
    #AdminDivTitle {
        display: flex;
        text-align: left;
        font-weight: ${HtmlFont.BOLDER};
    }
    #AdminTextTitle {
        width: 100%;
        justify-content: left;
    }
    #AdminCloseDiv h2 {
        font-weight: normal;
    }
    .popup-overlay-main-admin {
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
    
    .dialog-container-main-admin {
        background-color: #ffffff;
        padding: 30px 40px;
        border-radius: 12px;
        box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
    
        max-width: 720px;
        width: 100%;
    
        position: relative;
    }
    
    .dialog-container-main-admin p {
        text-align: left;
        font-size: 1.2rem;
        margin-bottom: 20px;
    }
    
    .dialog-container-main-admin h2 {
        margin-bottom: 15px;
        color: #333;
        font-size: 2em;
    }
    
    #AdminDivButton {
        display: block;
        justify-content: center;
    }
    
    .button-general-main-admin {
        font-weight: bold; 
        background-color: ${Colors.LIGHT_BLUE};
        color: ${Colors.WHITE};
        padding: 8px 20px;
        border-radius: 17px;
        cursor: pointer;
        font-size: 1.5em;
        width: 100%;
        margin-bottom: 12px;
    }
    
    .button-general-main-admin:hover {
        background-color: ${Colors.LIGHT_BLUE_HOVER}
    }
    
    .button-not-main-admin {
        font-weight: ${HtmlFont.BOLDER}; 
        background-color: ${Colors.RED};
        color: ${Colors.WHITE};
        padding: 8px 20px;
        border-radius: 17px;
        cursor: pointer;
        font-size: 1.5em;
        width: 100%;
        margin-bottom: 12px;
    }
    
    .button-not-main-admin:hover {
        background-color: ${Colors.RED_HOVER}
    }
`;