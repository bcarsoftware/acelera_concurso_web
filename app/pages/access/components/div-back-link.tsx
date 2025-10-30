import type {ChildrenElement} from "~/pages/access/components/children-element";

export const DivBackLink = ({ children }: ChildrenElement) => {
    return (
        <>
            <StyleDivBackLink />
            <div className="back-link">{children}</div>
        </>
    );
};

const StyleDivBackLink = () => {
    const styles = `
    .back-link {
        color: #088ac7;
        text-decoration: none;
        font-weight: bold;
    }
    `;

    return (<style>{styles}</style>);
};
