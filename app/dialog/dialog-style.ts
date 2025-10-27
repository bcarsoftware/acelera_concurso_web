import {Colors} from "../../enums/colors";

export const DialogStyle = () => {
    return `
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
        background-color: rgba(0, 0, 0, 0.55);
    
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
        margin-bottom: 20px;
    }
    
    .dialog-container h2 {
        margin-bottom: 15px;
        color: #333;
        font-size: 2em;
    }
    
    #ButtonDiv {
        display: flex;
        justify-content: end;
    }
    
    .button-general {
        font-weight: bold; 
        background-color: ${Colors.LIGHT_BLUE};
        color: ${Colors.WHITE};
        padding: 8px 20px;
        border-radius: 17px;
        cursor: pointer;
        font-size: 1.5em;
    }
    
    .button-general:hover {
        background-color: ${Colors.LIGHT_BLUE_HOVER}
    }
    
    .button-yes {
        font-weight: bold; 
        margin-left: 8px;
        background-color: ${Colors.LIGHT_BLUE};
        color: ${Colors.WHITE};
        padding: 8px 20px;
        border-radius: 17px;
        cursor: pointer;
        font-size: 1.5em;
    }
    
    .button-yes:hover {
        background-color: ${Colors.LIGHT_BLUE_HOVER}
    }
    
    .button-not {
        font-weight: bold; 
        margin-left: 8px;
        background-color: ${Colors.RED};
        color: ${Colors.WHITE};
        padding: 8px 20px;
        border-radius: 17px;
        cursor: pointer;
        font-size: 1.5em;
    }
    
    .button-not:hover {
        background-color: ${Colors.RED_HOVER}
    }
    `;
};