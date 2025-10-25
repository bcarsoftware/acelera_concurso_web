import React from "react";

interface Elements {
    children: React.ReactNode;
}

export const ContentWide = ({children}: Elements) => {
    return (
        <div className="class-content-wide-square">{children}</div>
    )
};
