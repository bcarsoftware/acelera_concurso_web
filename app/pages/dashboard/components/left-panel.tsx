import {getAccessFunctions} from "~/utilities/dashboard-utilities";
import type {AllScreens} from "../../../../types/all-screens";

export const LeftPanel = (
    props: AllScreens
) => {
    const functions = getAccessFunctions(props);

    return (
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
    );
};
