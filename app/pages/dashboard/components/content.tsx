import React from "react";

interface DivContent {
    children: React.ReactNode;
}

export const Content = ({ children }: DivContent) => {
    return (
        <>
            <StyleContent />
            <div id="Content">{children}</div>
        </>
    );
};

const StyleContent = () => {
    return (<style>{`
    #Content {
        flex: 1;
        padding: 2rem;
        overflow-y: auto;
        margin-bottom: 2rem;
    }
    `}</style>);
};
