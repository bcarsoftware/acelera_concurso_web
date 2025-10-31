import React from "react";
import {Colors} from "../../../../enums/colors";
import {HtmlFont} from "../../../../enums/html-type";

interface IBodyDashboard {
    children: React.ReactNode;
}

export const BodyDashboard = ({ children }: IBodyDashboard) => {
    return (
        <>
            <StyleBody />
            <body>{children}</body>
        </>
    );
};

const StyleBody = () => {
    const styles = `
        @import url('https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap');
        
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
            font-family: ${HtmlFont.FONT_INTER};
        }
        
        body, html {
            width: 100%;
            height: 100%;
        }
        
        body {
            display: flex;
            flex-direction: column;
            min-height: 100vh;
            font-family: ${HtmlFont.FONT_INTER};
            background-color: ${Colors.BG_PAGE};
            color: ${Colors.BLACK_HOVER};
        }
        
        h1 {
            font-family: ${HtmlFont.FONT_INTER};
            font-size: 2rem;
            font-weight: ${HtmlFont.BOLDER};
        }
        
        h2 {
            font-family: ${HtmlFont.FONT_INTER};
            font-size: 1.5rem;
            font-weight: ${HtmlFont.BOLDER};
        }
        
        h4 {
            font-family: ${HtmlFont.FONT_INTER};
            font-size: 1.1rem;
            font-weight: ${HtmlFont.BOLDER};
        }
        
        header, footer {
            background-color: ${Colors.DARK_BLUE};
            color: ${Colors.WHITE};
            padding: 1rem 1.5rem;
            text-align: center;
            box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
            z-index: 10;
        }
        
        header {
            display: flex;
            align-items: center;
        }
        
        footer {
            margin-top: auto;
            background-color: ${Colors.DARK_BLUE};
            display: flex;
            font-size: 1.25rem;
        }
        
        section {
            min-height: 48px;
            display: grid;
            justify-items: left;
            background-color: #f9f9f9;
            border: 2px dashed ${Colors.BORDER_LIGHT};
            border-radius: 8px;
            color: #aaa;
            cursor: pointer;
        }
        
        section:hover {
            transform: translateY(-5px);
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

    return (<style>{styles}</style>);
};
