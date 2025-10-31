import React from "react";

interface IMainDashboardProps {
    children: React.ReactNode;
}

export const MainDashboardTag = ({ children }: IMainDashboardProps) => {
    return (
        <>
            <StyleMainDashboard />
            <main id={"Dashboard"}>{children}</main>
        </>
    );
};

const StyleMainDashboard = () => {
    const styles = `
    #Dashboard {
        display: flex;
        flex: 1;
        overflow: hidden;
    }
    `;

    return (<style>{styles}</style>)
};
