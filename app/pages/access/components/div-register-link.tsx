import type {ChildrenElement} from "~/pages/access/components/children-element";

export const DivRegisterLink = ({ children }: ChildrenElement) => {
    return (
        <>
            <StyleDivRegisterLink />
            <div className="register-link">{children}</div>
        </>
    )
}

const StyleDivRegisterLink = () => {
    const styles = `
    .register-link {
        margin-top: 30px;
        font-size: 14px;
        color: #555;
    }
    
    .register-link a {
        color: #088ac7;
        text-decoration: none;
        font-weight: bold;
    }
    
    .register-link a:hover {
        text-decoration: underline;
    }
    `;

    return (<style>{styles}</style>);
};
