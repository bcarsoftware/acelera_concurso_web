import React from "react";

interface Elements {
    children: React.ReactNode;
}

export const ContentWide = ({children}: Elements) => {
    return (
        <>
            <StyleContentWide />
            <div className="class-content-wide-square">{children}</div>
        </>
    )
};

const StyleContentWide = () => {
    return (<style>{`
    .class-content-wide-square {
        width: 100%;
    }
    `}</style>);
};
