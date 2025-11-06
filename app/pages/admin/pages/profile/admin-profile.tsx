import React, {useEffect, useState} from "react";
import {useAdminAuth} from "../../../../../context/auth-admin-context";
import {AdminStyles} from "~/pages/admin/pages/admin-styles";
import {InputNumberAdmin} from "~/pages/admin/components/input-number-admin";
import {InputTextAdmin} from "~/pages/admin/components/input-text-admin";
import {Dialog} from "~/dialog/dialog";
import {ContentTypes, EnvironConstants} from "../../../../../enums/constants";
import {HTTPTypes} from "../../../../../enums/http-types";
import {useNavigate} from "react-router";
import {HtmlType} from "../../../../../enums/html-type";

export const AdminProfilePage = (
    { setProfile }: { setProfile: (value: boolean) => void; }
) => {
    const authenticator = useAdminAuth();

    const [userAdminId, setUserAdminId] = useState<number>(0);
    const [fullName, setFullName] = useState<string>("");
    const [username, setUsername] = useState<string>("");
    const [password, setPassword] = useState<string>("");

    const [showDialog, setShowDialog] = useState<boolean>(false);
    const [dialogTitle, setDialogTitle] = useState<string>("");
    const [dialogMessage, setDialogMessage] = useState<string>("");

    const [success, setSuccess] = useState<boolean>(false);

    const navigate = useNavigate();

    useEffect(() => {
        if (authenticator?.isLoading) return;

        if (!authenticator?.user) {
            navigate("/admin/login");
            return;
        }

        setUserAdminId(authenticator.user.user_admin_id);
        setFullName(authenticator.user.full_name);
        setUsername(authenticator.user.username);
    }, []);

    const getDialogResult = () => {
        const closeFunction = success ? (value: boolean) => {
            setShowDialog(value);
            setProfile(value);
            setSuccess(false);
        } : setShowDialog;

        return (<Dialog
            name={"update-public-tender-board"}
            title={dialogTitle}
            message={dialogMessage}
            buttonText={"Fechar"}
            closeFunction={closeFunction}
            zIndex={1001}
        />);
    }

    const handleUpdateAdminProfile = async () => {
        const payload = {
            full_name: fullName || undefined,
            username: username || undefined,
            password: "password",
            new_password: password || undefined,
        };

        if (!payload.full_name || !payload.username) {
            setDialogTitle("Erro nos Dados");
            setDialogMessage("Existem valores obrigatórios indefinidos!");
            setShowDialog(true);
            return;
        }

        try {
            const url = EnvironConstants.API_BASE_URL + "/user-admin/" + (
                authenticator?.user?.user_admin_id
            );
            const response = await fetch(url, {
                method: HTTPTypes.PATCH,
                body: JSON.stringify(payload),
                headers: {
                    "Content-Type": ContentTypes.JSON,
                    "Authorization": `Bearer ${authenticator?.token}`
                }
            });

            const data = await response.json();

            if (!response.ok) {
                console.error(data);

                setDialogTitle("Erro no Cadastro");
                setDialogMessage("Não foi possível cadastrar essa Banca de Concurso!");
                return;
            }

            await authenticator?.reflash(data.data);
            setUserAdminId(data.data.user_admin_id);
            setFullName(data.data.full_name);
            setUsername(data.data.username);

            setDialogTitle("Sucesso");
            setDialogMessage("Administrador atualizado com sucesso!");
            setSuccess(true);
        }
        catch (error) {
            console.error(error);

            setDialogTitle("Erro no Servidor");
            setDialogMessage("Não foi possível se conectar!");
        }
        finally {
            setPassword("");
            setShowDialog(true);
        }
    };

    return (<form method={HTTPTypes.PATCH}>
        {showDialog && (getDialogResult())}

        <Style />
        <div className={"popup-overlay-main-admin"} id={"new-public-tender-board"}>
            <div className={"dialog-container-main-admin"}>
                <div id={"AdminDivTitle"}>
                    <div id={"DivText"}>
                        <h2>Perfil de Administrador</h2>
                    </div>
                </div>

                <InputNumberAdmin
                    labelContent={"ID do Administrador"}
                    name={"admin-public-tender-board-id"}
                    placeholder={"123"}
                    required={true}
                    disabled={true}
                    value={userAdminId}
                />

                <InputTextAdmin
                    labelContent={"Nome Completo*"}
                    name={"full-name"}
                    placeholder={"Fulano"}
                    required={true}
                    disabled={false}
                    value={fullName}
                    updateValue={setFullName}
                />

                <InputTextAdmin
                    labelContent={"Nome de Usuário*"}
                    name={"username"}
                    placeholder={"nomedeusuario"}
                    required={true}
                    disabled={false}
                    value={username}
                    updateValue={setUsername}
                />

                <InputTextAdmin
                    labelContent={"Nova Senha"}
                    name={"new-password"}
                    placeholder={"senha123"}
                    required={false}
                    disabled={false}
                    value={password}
                    updateValue={setPassword}
                />

                <div id={"AdminDivButton"}>
                    <button type={HtmlType.BUTTON} className={"button-general-main-admin"}
                            onClick={handleUpdateAdminProfile}
                    >Atualizar Perfil</button>
                    <button type={HtmlType.BUTTON} formNoValidate={true}
                            className={"button-not-main-admin"}
                            onClick={() => setProfile(false)}
                    >Fechar Perfil</button>
                </div>
            </div>
        </div>
    </form>);
};

const Style = () => (<style>{AdminStyles}</style>);
