import type {ButtonParams} from "../../../../types/button-params";
import {Colors} from "../../../../enums/colors";

export const Button = (props: ButtonParams) => {
    return (
        <>
            <ButtonStyle
                bg_color={props.styles.bg_color}
                bg_hover={props.styles.bg_hover}
                font_color={props.styles.font_color}
            />
            <button
                className={"the-button"}
                type={props.buttonType}
                name={props.name}
                id={props.name}
                onClick={props.onClickFunction}
            >{props.buttonContent}
            </button>
        </>
    );
};

export const ButtonNew = (props: ButtonParams) => {
    const style = `
        .class-${props.name} {
            width: 100%;
            padding: 12px;
            background-color: ${props.styles.bg_color};
            color: ${props.styles.font_color};
            border: none;
            border-radius: 6px;
            font-size: 18px;
            font-weight: bold;
            cursor: pointer;
            transition: background-color 0.3s ease;
        }
        
        .class-${props.name}:hover {
            background-color: ${props.styles.bg_hover};
        }
    `;

    return (
        <>
            <style>{style}</style>
            <button
                className={`class-${props.name}`}
                type={props.buttonType}
                name={props.name}
                id={props.name}
                onClick={props.onClickFunction}
            >{props.buttonContent}
            </button>
        </>
    );
};

const ButtonStyle = (props: {
    bg_color: Colors;
    bg_hover: Colors;
    font_color: Colors;
}) => {
    const style = `
        .the-button {
            width: 100%;
            padding: 12px;
            background-color: ${props.bg_color};
            color: ${props.font_color};
            border: none;
            border-radius: 6px;
            font-size: 18px;
            font-weight: bold;
            cursor: pointer;
            transition: background-color 0.3s ease;
        }
        
        .the-button:hover {
            background-color: ${props.bg_hover};
        }
    `;

    return (<style>{style}</style>)
};
