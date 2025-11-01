import {useNavigate} from "react-router";
import {ContentWide} from "~/pages/dashboard/components/content-wide";
import {DialogConfirm} from "~/dialog/dialog-confirm";
import {useEffect} from "react";

export const LogoutAdminPage = (
    { logOutScreen, setLogoutScreen }: { logOutScreen: boolean, setLogoutScreen: (value: boolean) => void }
) => {
    const navigate = useNavigate();

    useEffect(() => {
        setLogoutScreen(true);
    }, []);

    const handleLogout = async () => {
        navigate("/admin/login");
    };

    return (
        <>
            {logOutScreen && (
                <ContentWide>
                    <DialogConfirm
                        name={"logout-screen-dialog"}
                        title={"Sair da Acelera Concurso Administrador"}
                        message={<>Tem Certeza que deseja <strong>SAIR</strong> da conta de <strong>
                            ADMINISTRADOR</strong> da Acelera Concurso?</>}
                        yesFunction={handleLogout}
                        closeFunction={() => setLogoutScreen(false)}
                    />
                </ContentWide>
            )}
        </>
    );
};
