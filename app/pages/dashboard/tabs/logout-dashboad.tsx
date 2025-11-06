import {useNavigate} from "react-router";
import {ContentWide} from "~/pages/dashboard/components/content-wide";
import {DialogConfirm} from "~/dialog/dialog-confirm";
import {useEffect} from "react";
import {useAuth} from "../../../../context/auth-context";

export const LogoutDashBoardPage = (
    { logOutScreen, setLogoutScreen }: { logOutScreen: boolean, setLogoutScreen: (value: boolean) => void }
) => {
    const navigate = useNavigate();
    const authenticated = useAuth();

    useEffect(() => {
        setLogoutScreen(true);

        if (authenticated?.isLoading) return;
    }, []);

    const handleLogout = async () => {
        navigate("/login");
        await authenticated?.logout();
    };

    return (
        <>
            {logOutScreen && (
                <ContentWide>
                    <DialogConfirm
                        name={"logout-screen-dialog"}
                        title={"Sair da Acelera Concurso"}
                        message={<>Tem Certeza que deseja <strong>SAIR</strong> da Acelera Concurso?</>}
                        yesFunction={handleLogout}
                        closeFunction={() => setLogoutScreen(false)}
                    />
                </ContentWide>
            )}
        </>
    );
};
