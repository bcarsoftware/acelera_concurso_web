import React from "react";

interface Elements {
    children: React.ReactNode;
}

export const ContentCard = ({ children }: Elements) => {
    return (
        <div className="class-div-content">{children}</div>
    );
};
