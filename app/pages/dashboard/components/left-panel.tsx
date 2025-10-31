import {getAccessFunctions} from "~/utilities/dashboard-utilities";
import type {AllScreens} from "../../../../types/all-screens";
import {Colors} from "../../../../enums/colors";

export const LeftPanel = (
    props: AllScreens
) => {
    const functions = getAccessFunctions(props);

    return (
        <>
            <StyleLeftPanel />
            <div id="LeftPanel">
                <nav id="Profile" onClick={functions.accessingProfilePage}><p>Primeiro Nome</p><p>@username</p></nav>
                <nav className="nav-item" onClick={functions.accessingMainPage}>Inicio</nav>
                <nav className="nav-item" onClick={functions.accessingPublicTenderPage}>Concurso</nav>
                <nav className="nav-item" onClick={functions.accessingSubjectPage}>Disciplina</nav>
                <nav className="nav-item" onClick={functions.accessingTopicPage}>Assunto</nav>
                <nav className="nav-item" onClick={functions.accessingQuestionPage}>Questões</nav>
                <nav className="nav-item" onClick={functions.accessingPomodoroPage}>Pomodoro</nav>
                <nav className="nav-item" onClick={functions.accessingSettingPage}>Configurações</nav>
                <nav className="nav-item-logout" onClick={functions.accessingLogoutPage}>Sair</nav>
            </div>
        </>
    );
};

const StyleLeftPanel = () => {
    return (<style>{`
        #LeftPanel {
            width: 250px;
            background-color: ${Colors.LIGHT_BLUE};
            color: ${Colors.TEXT_LIGHT};
            padding: 0.8rem;
            transition: width 0.3s ease;
        
            overflow-y: auto;
            scrollbar-width: none;
        }
        
        #LeftPanel nav {
            font-size: 1.1rem;
            padding-left: 0.8rem;
        }
        
        .nav-item {
            border-radius: 12px;
            padding: 18px 0 18px 0;
            cursor: pointer;
        }
        .nav-item:hover {
            background-color: ${Colors.DARK_BLUE};
            font-weight: bold;
            transition: 100ms;
        }
        
        .nav-item-logout {
            border-radius: 12px;
            padding: 18px 0 18px 0;
            cursor: pointer;
        }
        .nav-item-logout:hover {
            background-color: var(--color-red-hash-b51702);
            font-weight: bold;
            transition: 100ms;
        }
    `}</style>);
};
