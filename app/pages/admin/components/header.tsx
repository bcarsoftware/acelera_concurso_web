import {useNavigate} from "react-router";

export const HeaderAdmin = (
    { setLogout }: { setLogout: (value: boolean) => void }
) => {
    const navigate = useNavigate();

    return (
        <>
            <StyleHeaderDashboard />
            <header>
                <div className="div-width-50-percent-left">
                    <a href="/admin" className="link-format">
                        <h4>
                            <p>Acelera</p><p>Concurso</p>
                        </h4>
                    </a>
                </div>
                <div className="div-width-100-percent">
                    <h1 onClick={() => navigate("/admin")} id="DashboardTitle">
                        Administrador Acelera Concurso</h1>
                </div>
                <div className="div-width-50-percent-right">
                    <div className="link-format">
                        <h4 onClick={() => setLogout(true)}>SAIR  .</h4>
                    </div>
                </div>
            </header>
        </>
    );
}

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
    `}</style>);
}
