import React from "react";

interface Elements {
    children: React.ReactNode;
}

export const ContentCard = ({ children }: Elements) => {
    return (
        <>
            <StyleContentCard />
            <div className="class-div-content">{children}</div>
        </>
    );
};

const StyleContentCard = () => {
    return (<style>{`
    .class-div-content {
        background-color: var(--color-white);
        border-radius: 12px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
        padding: 1.5rem;
        height: 100%;
        transition: transform 0.2s ease, box-shadow 0.2s ease;
    }
    
    .class-div-content:hover {
        /*transform: translateY(-5px);*/
        box-shadow: 0 6px 16px rgba(0, 0, 0, 0.12);
    }
    `}</style>);
};
