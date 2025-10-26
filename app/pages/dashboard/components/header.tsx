import type {StartScreen} from "../../../../types/start-screen";
import {getStartHeader} from "~/utililites/dashboard-utilities";

export const HeaderDashboard = (props: StartScreen) => {
    const functions = getStartHeader(props);

    return (
        <header>
            <div className="div-width-50-percent-left">
                <a href="/" className="link-format">
                    <h4>
                        <p>Acelera</p><p>Concurso</p>
                    </h4>
                </a>
            </div>
            <div className="div-width-100-percent">
                <h1 onClick={functions.accessingMainPage} id="DashboardTitle">Dashboard Acelera Concurso</h1>
            </div>
            <div className="div-width-50-percent-right">
                <a href="/" className="link-format">
                    <h4>SAIR  .</h4>
                </a>
            </div>
        </header>
    );
};
