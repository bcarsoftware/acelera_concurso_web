import type {ChildrenElement} from "~/pages/access/components/children-element";
import {HtmlFont} from "../../../../enums/html-type";

export const Body = ({ children }: ChildrenElement) => {
    return (
        <>
            <StyleBody />
            <body>{children}</body>
        </>
    );
};

const StyleBody = () => {
    const styles = `
    @import url('https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap');
    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
        font-family: "Inter", sans-serif;
    }
    h2 p {
        font-size: 3rem;
        font-weight: ${HtmlFont.BOLDER};
    }
    body, html {
        height: 100%;
        width: 100%;
    }
    body {
        background-color: #088ac7;

        display: flex;
        justify-content: center;
        align-items: center;

        padding: 20px;
    }
    
    label { font-size: 1.1rem; }
    
    p { font-size: 1.1rem; }
    
    a { font-size: 1.1rem; }
    `;

    return (<style>{styles}</style>);
};
