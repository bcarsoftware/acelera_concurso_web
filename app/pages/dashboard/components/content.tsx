import React from "react";

interface DivContent {
    children: React.ReactNode;
}

export const Content = ({ children }: DivContent) => {
    return (
        <div id="Content">{children}</div>
    );
};
