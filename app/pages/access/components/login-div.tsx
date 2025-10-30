import type {ChildrenElement} from "~/pages/access/components/children-element";
import {Colors} from "../../../../enums/colors";

export const LoginDiv = ({ children }: ChildrenElement) => {
    return (
        <>
            <StyleLoginDiv />
            <div className="login-container">{children}</div>
        </>
    );
}

const StyleLoginDiv = () => {
    const style = `
    .login-container {
        background-color: ${Colors.WHITE};
        padding: 30px 40px;
        border-radius: 12px;
        box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);

        max-width: 512px;
        width: 100%;
    
        text-align: center;
    }
    
    .login-container h2 {
        margin-bottom: 25px;
        color: #333;
        font-size: 2em;
    }
    
    @media (max-width: 480px) {
        .login-container {
            padding: 25px 20px;
        }
    
        .login-container h2 {
            font-size: 1.8em;
        }
    }
    `;

    return (<style>{style}</style>);
};
