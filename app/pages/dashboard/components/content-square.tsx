import React from "react";

interface Elements {
    children: React.ReactNode;
}

export const ContentSquare = ({ children }: Elements) => {
    return (
        <div className="class-content-square">{children}</div>
    );
};
