import {Colors} from "../../../../enums/colors";
import React from "react";

interface Props {
    children: React.ReactNode;
    widthDiv: string;
}

export const DivCardContainer = ({ children, widthDiv }: Props) => {
    return (
        <>
            <StyleDivCardContainer widthDiv={widthDiv} />
            <div className={"card-container"}>{children}</div>
        </>
    );
};

const StyleDivCardContainer = ({ widthDiv }: { widthDiv: string }) => {
    const styles = `
    .card-container {
        background-color: ${Colors.WHITE};
        padding: 30px 40px;
        border-radius: 12px;
        box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
    
        max-width: ${widthDiv};
        width: 100%;
    
        text-align: center;
    
        position: relative;
    }
    
    .card-container h2 {
        margin-bottom: 25px;
        color: #333;
        font-size: 2em;
    }
    `;

    return (<style>{styles}</style>);
};
