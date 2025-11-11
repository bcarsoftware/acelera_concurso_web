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
        margin-top: 85px;
        display: flex;
        flex: 1;
        overflow: hidden;
        height: 100vh;
    }
    @media (max-width: 768px) {
        #Dashboard {
            flex-direction: column;
        }
    
        #LeftPanel {
            width: 100%;
            height: auto;
            text-align: center;
        }
    
        #Content {
            padding: 1rem;
        }
    
        #SubjectTopicNote {
            flex-direction: column;
            gap: 1rem;
        }
    
        .class-content-square {
            min-width: 100%;
        }
    }
    `;

    return (<style>{styles}</style>)
};
