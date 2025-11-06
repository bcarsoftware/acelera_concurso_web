import {useNavigate} from "react-router";
import {ContentWide} from "~/pages/dashboard/components/content-wide";
import {DialogConfirm} from "~/dialog/dialog-confirm";
import {useEffect} from "react";
import {useAdminAuth} from "../../../../context/auth-admin-context";

export const LogoutAdminPage = (
    { logOutScreen, setLogoutScreen }: { logOutScreen: boolean, setLogoutScreen: (value: boolean) => void }
) => {
    const authenticate = useAdminAuth();
    const navigate = useNavigate();

    useEffect(() => {
        setLogoutScreen(true);

        if (authenticate?.isLoading) return;
    }, []);

    const handleLogout = async () => {
        navigate("/admin/login");
        await authenticate?.logout();
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
