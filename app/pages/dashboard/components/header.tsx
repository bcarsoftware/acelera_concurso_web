import type {StartScreen} from "../../../../types/start-screen";
import {getStartHeader} from "~/utilities/dashboard-utilities";
import {useAuth} from "../../../../context/auth-context";
import {useEffect, useState} from "react";

export const HeaderDashboard = (props: StartScreen) => {
    const functions = getStartHeader(props);
    const authenticated = useAuth();

    const [points, setPoints] = useState<number>(0);

    useEffect(() => {
        if (authenticated?.isLoading) return;

        setPoints(authenticated?.user?.points || 0);
    }, [authenticated]);

    return (
        <>
            <StyleHeaderDashboard />
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
                    <div className="link-format flex-end">
                        <h4>{points} PONTOS</h4>
                        <h4 onClick={() => props.setLogout(true)}>SAIR</h4>
                    </div>
                </div>
            </header>
        </>
    );
};

const StyleHeaderDashboard = () => {
    return (<style>{`
    #DashboardTitle {
        cursor: pointer;
    }
    .div-width-50-percent-left {
        width: 50%;
        text-align: left;
    }
    .div-width-50-percent-right {
        width: 50%;
        text-align: right;
    }
    .div-width-100-percent {
        width: 100%;
    }
    .link-format {
        color: inherit;
        text-decoration: none;
        cursor: pointer;
    }
    .flex-end {
        display: flex;
        justify-content: end;
    }
    .flex-end h4 {
        margin-left: 15px;
    }
    `}</style>);
}
