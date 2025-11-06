import {useNavigate} from "react-router";
import {Colors} from "../../../../enums/colors";

export const HeaderAdmin = (
    { setLogout, setProfile }: {
        setLogout: (value: boolean) => void,
        setProfile: (value: boolean) => void
    }
) => {
    const navigate = useNavigate();

    const showLogout = () => {
        setLogout(true);
    };

    const showProfile = () => {
        setProfile(true);
    }

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
                    <div className="link-format flex-end">
                        <h4 onClick={showProfile}>PERFIL</h4>
                        <h4 onClick={showLogout}>SAIR</h4>
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
    #DashboardTitle:hover {
        color: ${Colors.GOLDEN};
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
    .flex-end h4:hover {
        color: ${Colors.GOLDEN};
    }
    a h4:hover {
        color: ${Colors.GOLDEN};
    }
    `}</style>);
}
