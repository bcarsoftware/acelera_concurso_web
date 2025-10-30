import {Colors} from "../../../../enums/colors";
import React from "react";

interface IDivOptions {
    children: React.ReactNode;
    hidden?: boolean;
}

export const DivOptions = ({ children, hidden }: IDivOptions) => {
    return (
        <>
            <StyleDivOptions />
            <div className={"options"} hidden={hidden}>{children}</div>
        </>
    );
};

const StyleDivOptions = () => {
    const styles = `
    .options {
        text-align: right;
        margin-bottom: 25px;
    }
    
    .options a {
        color: ${Colors.LIGHT_BLUE};
        text-decoration: none;
        font-size: 14px;
    }
    
    .options a:hover {
        text-decoration: underline;
    }
    `;

    return (<style>{styles}</style>);
};
