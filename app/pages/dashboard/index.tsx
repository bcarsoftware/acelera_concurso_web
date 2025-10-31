import type {Route} from "../../../.react-router/types/app/routes/+types/home";
import {HeaderDashboard} from "~/pages/dashboard/components/header";
import {FooterDashboard} from "~/pages/dashboard/components/footer";
import {LeftPanel} from "~/pages/dashboard/components/left-panel";
import {Content} from "~/pages/dashboard/components/content";
import {MainDashboardPage} from "~/pages/dashboard/tabs/main-dashboard";
import {useState} from "react";
import {PublicTenderNew} from "~/pages/dashboard/data/public-tender/public-tender-new";
import {SubjectNew} from "~/pages/dashboard/data/subject/subject-new";
import {TopicNew} from "~/pages/dashboard/data/topic/topic-new";
import {NoteSubjectNew} from "~/pages/dashboard/data/note-subject/note-subject-new";
import {NoteTopicNew} from "~/pages/dashboard/data/note-topic/note-topic-new";
import {StudyTipsNew} from "~/pages/dashboard/data/study-tips/study-tips-new";
import {PomodoroDashboardPage} from "~/pages/dashboard/tabs/pomodoro-dashboard";
import {ProfileDashboardPage} from "~/pages/dashboard/tabs/profile-dashboard";
import {BodyDashboard} from "~/pages/dashboard/components/body-dashboard";
import {MainDashboardTag} from "~/pages/dashboard/components/main-dashboard";
import {SettingsDashboardPage} from "~/pages/dashboard/tabs/settings-dashboard";
import {Colors} from "../../../enums/colors";
import {LogoutDashBoardPage} from "~/pages/dashboard/tabs/logout-dashboad";

export function meta({}: Route.MetaArgs) {
    return [
        { title: "Dashboard Acelera Concurso" },
        { name: "description", content: "Sua melhor preparação!" },
    ];
}

export default function Index() {
    const [mainPage, setMainPage] = useState<boolean>(true);
    const [profilePage, setProfilePage] = useState<boolean>(false);
    const [publicTender, setPublicTender] = useState<boolean>(false);
    const [subject, setSubject] = useState<boolean>(false);
    const [topic, setTopic] = useState<boolean>(false);
    const [questions, setQuestions] = useState<boolean>(false);
    const [settings, setSettings] = useState<boolean>(false);
    const [pomodoro, setPomodoro] = useState<boolean>(false);
    const [logout, setLogout] = useState<boolean>(false);

    /* REGISTER NEW REGISTER */
    const [showPublicTenderNew, setShowPublicTenderNew] = useState<boolean>(false);
    const [showSubjectNew, setShowSubjectNew] = useState<boolean>(false);
    const [showTopicNew, setShowTopicNew] = useState<boolean>(false);
    const [showNoteTopicNew, setShowNoteTopicNew] = useState<boolean>(false);
    const [showNoteSubjectNew, setShowNoteSubjectNew] = useState<boolean>(false);
    const [showStudyTipsNew, setShowStudyTipsNew] = useState<boolean>(false);
    /* REGISTER NEW REGISTER */
    /* SHOW REGISTERS SCREENS */
    const showNewScreenPublicTender = () => (<PublicTenderNew />);
    const showNewScreenSubject = () => (<SubjectNew />);
    const showNewScreenTopic = () => (<TopicNew />);
    const showNewScreenNoteSubject = () => (<NoteSubjectNew />);
    const showNewScreenNoteTopic = () => (<NoteTopicNew />);
    const showNewScreenStudyTips = () => (<StudyTipsNew />);
    /* SHOW REGISTERS SCREENS */

    /* HIDDEN REGISTERS AND SEE MAIN PAGE */
    const hiddenNewRegisters = () => {
        setShowPublicTenderNew(false);
        setShowSubjectNew(false);
        setShowTopicNew(false);
        setShowNoteSubjectNew(false);
        setShowNoteTopicNew(false);
        setShowStudyTipsNew(false);
    }
    /* HIDDEN REGISTERS AND SEE MAIN PAGE */

    /* TABS PAGES */
    const accessMainPage = () => {
        return (<MainDashboardPage
            setMainPage={setMainPage}
            setShowPublicTenderNew={setShowPublicTenderNew}
            setShowSubjectNew={setShowSubjectNew}
            setShowTopicNew={setShowTopicNew}
            setShowNoteSubjectNew={setShowNoteSubjectNew}
            setShowNoteTopicNew={setShowNoteTopicNew}
            setShowStudyTipsNew={setShowStudyTipsNew}
        />);
    };
    const accessProfilePage = () => (<ProfileDashboardPage />);
    const accessPomodoroPage = () => (<PomodoroDashboardPage />);
    const accessSettingsPage = () => (<SettingsDashboardPage />);
    const accessLogoutPage = () => (<LogoutDashBoardPage
        logOutScreen={logout}
        setLogoutScreen={setLogout}
    />);
    /* TABS PAGES */

    return (
        <>
            <StyleDashboard />
            <BodyDashboard>
            <HeaderDashboard
                setMainPage={setMainPage}
                hiddenNewRegisters={hiddenNewRegisters}
                setLogout={setLogout}
            />

            <MainDashboardTag>
                <LeftPanel
                    setProfilePage={setProfilePage}
                    setMainPage={setMainPage}
                    setPublicTender={setPublicTender}
                    setSubject={setSubject}
                    setTopic={setTopic}
                    setQuestions={setQuestions}
                    setPomodoro={setPomodoro}
                    setSettings={setSettings}
                    setLogout={setLogout}
                    hiddenNewRegisters={hiddenNewRegisters}
                />
                <Content>
                    {profilePage && (accessProfilePage())}
                    {mainPage && (accessMainPage())}
                    {pomodoro && (accessPomodoroPage())}
                    {settings && (accessSettingsPage())}
                    {logout && (accessLogoutPage())}

                    {showPublicTenderNew && (showNewScreenPublicTender())}
                    {showSubjectNew && (showNewScreenSubject())}
                    {showTopicNew && (showNewScreenTopic())}
                    {showNoteTopicNew && (showNewScreenNoteTopic())}
                    {showNoteSubjectNew && (showNewScreenNoteSubject())}
                    {showStudyTipsNew && (showNewScreenStudyTips())}
                </Content >
            </MainDashboardTag>

            <FooterDashboard />
            </BodyDashboard>
        </>
    );
}

const StyleDashboard = () => {
    return (<style>{`
    #Profile {
        border-radius: 12px;
        padding: 18px 0 18px 0;
        cursor: pointer;
        font-weight: bold;
    }
    #Profile:hover {
        background-color: ${Colors.DARK_BLUE};
    }
    .checkbutton {
        width: 18px;
        height: 48px;
        margin-right: 12px;
        margin-left: 12px;
    }
    .padding-check-button {
        padding-left: 0.5rem;
        padding-right: 1rem;
    }
    .info-container {
        margin-bottom: 15px;
    }
    .info-container ul {
        margin-left: 15px;
    }
    .info-container li {
        list-style-type: disc;
        margin-left: 15px;
    }
    .margin-bottom-10 { margin-bottom: 10px }
    .margin-top-10 { margin-top: 10px }
    `}</style>);
}
