import {HtmlFont, HtmlType} from "../../../../enums/html-type";
import React from "react";

interface ButtonNextProps {
    children: React.ReactNode;
    font_color: string;
    bg_color: string;
    bg_hover: string;
    functionOpera: () => void;
}

export const ButtonNext = ({
    children, font_color, bg_color, bg_hover, functionOpera
}: ButtonNextProps) => {
    return (
        <>
            <StyleButtonNext bg_color={bg_color} bg_hover={bg_hover} font_color={font_color} />
            <button type={HtmlType.BUTTON} className={"next-button"} onClick={functionOpera}>{children}</button>
        </>
    );
};

const StyleButtonNext = ({
    bg_color, bg_hover, font_color
}: { bg_color: string, bg_hover: string, font_color: string }) => {
    const styles = `
    .next-button {
        width: 100%;
        padding: 10px 15px;
        font-size: 18px;
        color: ${font_color};
        background-color: ${bg_color};
        border: none;
        border-radius: 5px;
        cursor: pointer;
        margin-top: 10px;
        font-weight: ${HtmlFont.BOLDER};
    }
    .next-button:hover {
        background-color: ${bg_hover};
    }
    `;

    return (<style>{styles}</style>);
};
