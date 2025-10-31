import {Colors} from "../../../../enums/colors";
import React from "react";

interface IDivContent {
    children: React.ReactNode;
}

export const DivInputGroup = ({ children }: IDivContent) => {
    return (
        <>
            <StyleDivInputGroup />
            <div className={"input-group"}>{children}</div>
        </>
    );
};

const StyleDivInputGroup = () => {
    return (<style>{`
    .input-group {
        margin-bottom: 20px;
        text-align: left;
        position: relative;
    }
    
    .input-group label {
        display: block;
        margin-bottom: 8px;
        color: #555;
        font-weight: 600;
    }
    
    .input-group input {
        width: 100%;
        padding: 12px 15px;
        border: 1px solid #ddd;
        border-radius: 6px;
        font-size: 16px;
        transition: border-color 0.3s, box-shadow 0.3s;
    }
    
    .input-group input:focus {
        outline: none;
        border-color: ${Colors.LIGHT_BLUE};
        box-shadow: 0 0 8px rgba(8, 138, 199, 0.3);
    }
    
    .input-group select {
        width: 100%;
        padding: 12px 15px;
        border: 1px solid #ddd;
        border-radius: 6px;
        font-size: 16px;
        transition: border-color 0.3s, box-shadow 0.3s;
    }
    
    .input-group select:focus {
        outline: none;
        border-color: ${Colors.LIGHT_BLUE};
        box-shadow: 0 0 8px rgba(8, 138, 199, 0.3);
    }
    `}</style>);
};
