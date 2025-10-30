// <input type="button" id="ConfirmButton" value="Enviar Código" onClick={sendCodeToEmail} hidden={codeSent} />

import {HtmlFont, type HtmlType} from "../../../../enums/html-type";

interface Styles {
    id_name?: string;
    font_color: string;
    bg_color: string;
    bg_hover: string;
}

interface ButtonElements {
    name: string;
    value: string;
    hidden: boolean;
    html_type: HtmlType;
    styles: Styles;
    functionCall: () => void;
}

export const InputButton = ({
    name, value, hidden, html_type, styles, functionCall
}: ButtonElements) => {
    return (
        <>
            <StyleInputButton id_name={name} font_color={styles.font_color} bg_color={styles.bg_color} bg_hover={styles.bg_hover} />
            <input type={html_type} id={name} value={value} onClick={functionCall} hidden={hidden} />
        </>
    );
};

const StyleInputButton = ({ id_name, font_color, bg_color, bg_hover}: Styles) => {
    const styles = `
    #${id_name} {
        background-color: ${bg_color};
        border-radius: 6px;
        font-size: 18px;
        font-weight: ${HtmlFont.BOLDER};
        color: ${font_color};
        border: none;
        cursor: pointer;
    }
    
    #${id_name}:hover {
        background-color: ${bg_hover};
    }
    `;

    return (<style>{styles}</style>);
};
