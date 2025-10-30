import React from "react";

interface IElement {
    children: React.ReactNode;
}

export const Div100Percent = ({children}: IElement) => {
    return (
        <div id={"Div100Percent"}>{children}</div>
    );
};
