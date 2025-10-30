import {Colors} from "../../../../enums/colors";
import type {HtmlType} from "../../../../enums/html-type";

interface Props {
    buttonType: HtmlType,
    showPassword: boolean,
    functionShow: (value: boolean) => void,
}

export const ButtonPassword = ({
    buttonType, showPassword, functionShow
}: Props) => {
    return (
        <>
            <StyleButtonPassword />
            <button
                type={buttonType}
                className={"password-toggle-btn"}
                onClick={() => functionShow(!showPassword)}
                aria-label={showPassword ? "Ocultar Senha" : "Mostrar Senha"}
            >
                {showPassword ? (
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                         strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                        <circle cx="12" cy="12" r="3"></circle>
                    </svg>
                ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                         strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9
                        4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16
                        3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path>
                        <line x1="1" y1="1" x2="23" y2="23"></line>
                    </svg>
                )}
            </button>
        </>
    );
}

const StyleButtonPassword = () => {
    const styles = `
    .password-toggle-btn {
        position: absolute;
        right: 15px;
        bottom: 11px;
    
        background: transparent;
        border: none;
        cursor: pointer;
        padding: 0;
        display: flex;
        align-items: center;
        justify-content: center;
        color: #777;
    }
    
    .password-toggle-btn:focus {
        outline: none;
        color: ${Colors.LIGHT_BLUE};
    }
    
    .password-toggle-btn svg {
        width: 18px;
        height: 18px;
    }
    `;

    return (<style>{styles}</style>);
};
