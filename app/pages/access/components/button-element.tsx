import React from "react";
import {HtmlFont, HtmlType} from "../../../../enums/html-type";

interface Styles {
    font_weight: HtmlFont;
    font_color: string;
    bg_color: string;
    bg_hover: string;
}

interface ButtonParams {
    children: React.ReactNode;
    typeName: HtmlType;
    styles: Styles;
    functionBtn: () => void;
}

export const ButtonElement = ({
    children,
    typeName,
    styles,
    functionBtn,
}: ButtonParams) => {
    return (
        <>
            <StyleButtonElement font_weight={styles.font_weight} font_color={styles.font_color} bg_color={styles.bg_color} bg_hover={styles.bg_hover} />
            <button type={typeName} onClick={functionBtn} className="button-container">{children}</button>
        </>
    );
};

const StyleButtonElement = ({ font_weight, font_color, bg_color, bg_hover }: Styles) => {
    const styles = `
    .button-container {
        width: 100%;
        padding: 12px;
        background-color: ${bg_color};
        color: ${font_color};
        border: none;
        border-radius: 6px;
        font-size: 18px;
        font-weight: ${font_weight};
        cursor: pointer;
        transition: background-color 0.3s ease;
    }
    
    .button-container:hover {
        background-color: ${bg_hover};
    }
    `;

    return (<style>{styles}</style>);
};
