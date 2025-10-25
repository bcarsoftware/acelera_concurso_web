import type {Route} from "../../../.react-router/types/app/routes/+types/home";
import {HeaderDashboard} from "~/pages/dashboard/components/header";
import {FooterDashboard} from "~/pages/dashboard/components/footer";
import {LeftPanel} from "~/pages/dashboard/components/left-panel";
import {Content} from "~/pages/dashboard/components/content";
import {MainDashboardPage} from "~/pages/dashboard/tabs/main-dashboard";
import {useState} from "react";

export function meta({}: Route.MetaArgs) {
    return [
        { title: "Dashboard Acelera Concurso" },
        { name: "description", content: "Sua melhor preparação!" },
    ];
}

export default function Index() {
    const [mainPage, setMainPage] = useState<boolean>(true);
    const [publicTender, setPublicTender] = useState<boolean>(false);
    const [subject, setSubject] = useState<boolean>(false);
    const [topic, setTopic] = useState<boolean>(false);
    const [questions, setQuestions] = useState<boolean>(false);
    const [settings, setSettings] = useState<boolean>(false);
    const [pomodoro, setPomodoro] = useState<boolean>(false);
    const [logout, setLogout] = useState<boolean>(false);

    const accessMainPage = () => {
        return (<MainDashboardPage />);
    };

    return (
        <>
            <StyleDashboard />
            <body>
            <HeaderDashboard
                setMainPage={setMainPage}
            />

            <main id="Dashboard">
                <LeftPanel
                    setMainPage={setMainPage}
                    setPublicTender={setPublicTender}
                    setSubject={setSubject}
                    setTopic={setTopic}
                    setQuestions={setQuestions}
                    setPomodoro={setPomodoro}
                    setSettings={setSettings}
                    setLogout={setLogout}
                />
                <Content>
                    {mainPage && (accessMainPage())}
                </Content >
            </main>

            <FooterDashboard />
            </body>
        </>
    );
}

const StyleDashboard = () => {
    return (<link rel="stylesheet" href="/app/pages/dashboard/dashboard.css"></link>);
}
