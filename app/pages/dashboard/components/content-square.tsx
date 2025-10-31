import React from "react";

interface Elements {
    children: React.ReactNode;
}

export const ContentSquare = ({ children }: Elements) => {
    return (
        <>
            <StyleContentSquare />
            <div className="class-content-square">{children}</div>
        </>
    );
};

const StyleContentSquare = () => {
    return (<style>{`
    .class-content-square {
        flex: 1;
        min-width: 280px;
    }
    `}</style>);
};
