import {ContentWide} from "~/pages/dashboard/components/content-wide";
import {ContentCard} from "~/pages/dashboard/components/content-card";
import {Colors} from "../../../../enums/colors";
import {ButtonNew} from "~/pages/dashboard/components/button";
import {HtmlType} from "../../../../enums/html-type";
import {useEffect, useState} from "react";
import {InputText} from "~/pages/dashboard/components/input-text";
import {DivInputGroup} from "~/pages/dashboard/components/div-input-group";
import {InputPassword} from "~/pages/dashboard/components/input-password";
import {ButtonPassword} from "~/pages/dashboard/components/button-password";
import {DialogConfirm} from "~/dialog/dialog-confirm";
import {useNavigate} from "react-router";
import {useAuth} from "../../../../context/auth-context";
import {Dialog} from "~/dialog/dialog";
import {ContentTypes, EnvironConstants} from "../../../../enums/constants";
import {HTTPTypes} from "../../../../enums/http-types";
import type {ActiveCodeResponse} from "../../../../data/data";

export const SettingsDashboardPage = () => {
    const navigate = useNavigate();
    const authUser = useAuth();

    const [changePassword, setChangePassword] = useState<boolean>(false);
    const [changePasswordText, setChangePasswordText] = useState<string>("Mudar Senha de Acesso");
    const [showPassword, setShowPassword] = useState<boolean>(false);
    const [seeDeactivateDialog, setSeeDeactivateDialog] = useState<boolean>(false);

    const [showDialogResult, setShowDialogResult] = useState<boolean>(false);
    const [dialogTitle, setDialogTitle] = useState<string>("");
    const [dialogMessage, setDialogMessage] = useState<string>("");

    const [success, setSuccess] = useState<boolean>(false);

    const [activation, setActivation] = useState<ActiveCodeResponse | null>(null);
    const [confirmCode, setConfirmCode] = useState<string>("");

    const [password, setPassword] = useState<string>("");

    const [isCodeWrong, setCodeWrong] = useState<boolean>(true);

    useEffect(() => {
        if (authUser?.isLoading) return;
    }, []);

    const showChangePassword = () => {
        setChangePassword(!changePassword);
        setChangePasswordText(changePassword ? "Mudar Senha de Acesso" : "ALTERANDO A SENHA!");
    }

    const sendConfirmationCode = async () => {
        const payload = {
            email: authUser?.user?.email || undefined,
        };

        if (!payload.email) {
            setDialogTitle("Erro nos Dados");
            setDialogMessage("Endereço de Email Indefinido!");
            setShowDialogResult(true);
            return;
        }

        try {
            const url = EnvironConstants.API_BASE_URL + "/email-code";
            const response = await fetch(url, {
                method: HTTPTypes.POST,
                body: JSON.stringify(payload),
                headers: {
                    "Content-Type": ContentTypes.JSON,
                }
            });

            const bodyData = await response.json();

            if (!response.ok) {
                console.error(bodyData);
                setDialogTitle("Erro no Envio");
                setDialogMessage("Não foi possível enviar o código!");

                return null;
            }

            const activeCode: ActiveCodeResponse = bodyData.data;

            return activeCode;
        }
        catch (error) {
            console.error(error);

            setDialogTitle("Erro no Servidor");
            setDialogMessage("Não foi possível enviar o código!");

            return null;
        }
    };

    const verifyConfirmationCode = async () => {
        const payload = {
            secure_code: activation?.secure_code || null,
            token: activation?.token || null,
            code: confirmCode || null,
        };

        try {
            const url = EnvironConstants.API_BASE_URL + "/email-code/verify";
            const response = await fetch(url, {
                method: HTTPTypes.POST,
                body: JSON.stringify(payload),
                headers: {
                    "Content-Type": ContentTypes.JSON,
                }
            });

            const bodySettings = await response.json();

            if (!response.ok) {
                console.error(bodySettings);

                setDialogTitle("Erro na Verificação");
                setDialogMessage("Não foi possível verificar o código!");
                setShowDialogResult(true);

                return false;
            }

            return true;
        }
        catch (error) {
            console.error(error);

            setDialogTitle("Erro no Servidor");
            setDialogMessage("Não foi possível se verificar o código!");

            return false;
        }
    };

    const handleConfirmCode = async () => {
        const activeCode = await sendConfirmationCode();

        if (!activeCode) {
            setShowDialogResult(true);
            return;
        }

        setCodeWrong(false);
        setActivation(activeCode);
    }

    const handleUpdatePassword = async () => {
        const payload = {
            username: "username",
            password: password,
        };

        try {
            const url = `${EnvironConstants.API_BASE_URL}/user/${authUser?.user?.user_id}/password`;
            const response = await fetch(url, {
                method: HTTPTypes.PATCH,
                body: JSON.stringify(payload),
                headers: {
                    "Content-Type": ContentTypes.JSON,
                    "Authorization": `Bearer ${authUser?.token}`,
                }
            });

            const body = await response.json();

            if (!response.ok) {
                console.log(body);
                setDialogTitle("Erro na Desativação");
                setDialogMessage("Não foi possível atualizar sua senha de acesso!");

                return;
            }

            setDialogTitle("Sucesso");
            setDialogMessage("Senha de acesso atualizada!");
        }
        catch (error) {
            console.error(error);

            setDialogTitle("Erro no Servidor");
            setDialogMessage("Não foi possível atualizar sua senha de acesso!");
        }
        finally {
            setShowDialogResult(true);
        }
    };

    const handleDeactivateAccount = async () => {
        try {
            const url = `${EnvironConstants.API_BASE_URL}/user/${authUser?.user?.user_id}`;
            const response = await fetch(url, {
                method: HTTPTypes.DELETE,
                headers: {
                    "Content-Type": ContentTypes.JSON,
                    "Authorization": `Bearer ${authUser?.token}`,
                }
            });

            const body = await response.json();

            if (!response.ok) {
                console.log(body);
                setDialogTitle("Erro na Desativação");
                setDialogMessage("Não foi possível desativar sua Conta!");

                return;
            }

            setDialogTitle("Desativação");
            setDialogMessage("Conta desativada, mas você poderá retornar!");
            setSuccess(true);
        }
        catch (error) {
            console.error(error);

            setDialogTitle("Erro no Servidor");
            setDialogMessage("Não foi possível desativar sua Conta!");
        }
        finally {
            setSeeDeactivateDialog(false);
            setShowDialogResult(true);
        }
    };

    const getDialogResult = () => {
        const closingDialog = success ? async (value: boolean) => {
            setSuccess(false);
            setShowDialogResult(value);
            await authUser?.logout();
            navigate("/login");
        } : setShowDialogResult;

        return (<Dialog
            name={"dialog-result"}
            title={dialogTitle}
            message={dialogMessage}
            buttonText={"Fechar"}
            closeFunction={closingDialog}
            zIndex={1001}
        />);
    }

    return (
        <>
            {showDialogResult && (getDialogResult())}
            <StyleSettings />
            <form>
                <h1>Configurações</h1>
                <ContentWide>
                    <ContentCard>
                        <DivLineSeparator />
                        <h2 className={"title-2"}>Considerações</h2>
                        <p className={"pg"}>Aqui você encontra as configurações avançadas de sua conta na Acelera Concursos.</p>
                        <p className={"pg"}>
                            <ul className={"info-container"}>
                                <li>Para mudar a senha, é necessŕio validar com código de e-mail.</li>
                                <li>Em caso de exclusão da conta, é possível reestabelescer acesso logando outra vez.</li>
                                <li>Se desejar a exclusão de seus dados, entre em contato pelo e-mail:</li>
                                <ul className={"info-container"}>
                                    <li><a className={"link"} target={"_blank"} href={"mailto:bcarsoftware@gmail.com"}>bcarsoftware@gmail.com</a></li>
                                    <li>Assunto: Exclusão de Conta</li>
                                </ul>
                            </ul>
                        </p>

                        <DivLineSeparator />

                        <h2 className={"title-2"}>Mudar a Senha</h2>
                        <p className={"pg"}>Para Mudar a Senha, clique no botão abaixo:</p>
                        <ButtonNew
                            buttonContent={changePasswordText}
                            buttonType={HtmlType.BUTTON}
                            name={"change-password-req"}
                            styles={{
                                bg_color: Colors.BLACK,
                                bg_hover: Colors.BLACK_HOVER,
                                font_color: Colors.WHITE,
                            }}
                            onClickFunction={showChangePassword}
                        />
                        {changePassword && (
                            <div className={"margin-top-10 margin-bottom-10"}>
                                <h2 className={"title-2"}>Mudando a Senha de Acesso</h2>
                                <p className={"pg"}>Para mudar a senha, clique no botão abaixo e envie no email cadastrado.</p>

                                <ButtonNew
                                    buttonContent={"Enviar Código de Confirmação"}
                                    buttonType={HtmlType.BUTTON}
                                    name={"send-confirmation-code"}
                                    styles={{
                                        bg_color: Colors.RED,
                                        bg_hover: Colors.RED_HOVER,
                                        font_color: Colors.WHITE,
                                    }}
                                    onClickFunction={handleConfirmCode}
                                />

                                <p className={"pg"}></p>

                                <InputText
                                    labelContent={"Digite o Código de Confirmação"}
                                    name={"input-confirmation-code"}
                                    placeholder={"LLNLNN"}
                                    required={true}
                                    disabled={false}
                                    value={confirmCode}
                                    updateValue={setConfirmCode}
                                />

                                <p className={"pg"}></p>

                                <ButtonNew
                                    buttonContent={"Confirmar Código de Confirmação"}
                                    buttonType={HtmlType.BUTTON}
                                    name={"verify-confirmation-code"}
                                    styles={{
                                        bg_color: Colors.LIGHT_BLUE,
                                        bg_hover: Colors.LIGHT_BLUE_HOVER,
                                        font_color: Colors.WHITE,
                                    }}
                                    onClickFunction={verifyConfirmationCode}
                                />

                                <p className={"pg"}></p>
                                <p className={"pg"}>Agora Digite a sua Nova Senha</p>
                                <DivInputGroup>
                                    <InputPassword labelName={"Digite a Nova Senha*"} showPassword={showPassword} required={true}
                                        disabled={isCodeWrong}
                                        value={password} updateValue={setPassword}
                                    />

                                    <ButtonPassword buttonType={HtmlType.BUTTON} showPassword={showPassword} functionShow={setShowPassword} />
                                </DivInputGroup>

                                <p className={"pg"}></p>
                                <ButtonNew
                                    buttonContent={"Confirmar Código de Confirmação"}
                                    buttonType={HtmlType.SUBMIT}
                                    name={"update-password"}
                                    styles={{
                                        bg_color: Colors.GREEN,
                                        bg_hover: Colors.GREEN_HOVER,
                                        font_color: Colors.WHITE,
                                    }}
                                    onClickFunction={handleUpdatePassword}
                                />
                            </div>
                        )}
                        <p className={"pg"}></p>
                        <DivLineSeparator />
                        <h2 className={"title-2"}>Desativar Sua Conta</h2>
                        <p className={"pg"}>
                            Lembrando que sua conta é por padrão <strong>DESATIVADA</strong>. Para uma exclusão completa,
                            você deve entrar em contato por email.
                        </p>
                        <p className={"pg"}>
                            <ul className={"info-container"}>
                                <li>Se desejar a exclusão de seus dados, entre em contato pelo e-mail:</li>
                                <ul className={"info-container"}>
                                    <li><a className={"link"} target={"_blank"} href={"mailto:bcarsoftware@gmail.com"}>bcarsoftware@gmail.com</a></li>
                                    <li>Assunto: Exclusão de Conta</li>
                                </ul>
                                <li>Tomeremos as providências junto à nossa Base de Dados.</li>
                                <li>Será Enviado um e-mail informando a exclusão.</li>
                                <li>Se deseja <strong>PROSSEGUIR</strong>, Clique no Botão Abaixo:</li>
                            </ul>
                        </p>
                        <ButtonNew
                            buttonContent={"Desativar sua Conta"}
                            buttonType={HtmlType.BUTTON}
                            name={"button-deactivate-account"}
                            styles={{
                                bg_color: Colors.RED,
                                bg_hover: Colors.RED_HOVER,
                                font_color: Colors.WHITE,
                            }}
                            onClickFunction={() => setSeeDeactivateDialog(true)}
                        />
                        {seeDeactivateDialog && (
                            <DialogConfirm
                                name={"deactivate-account-confirmation"}
                                title={"Desativação de Conta"}
                                message={<>Você realmente deseja <strong>DESATIVAR</strong> sua Conta?</>}
                                yesFunction={handleDeactivateAccount}
                                closeFunction={setSeeDeactivateDialog}
                            />
                        )}
                        <p className={"pg"}></p>
                        <DivLineSeparator />
                    </ContentCard>
                </ContentWide>
            </form>
        </>
    );
};

const DivLineSeparator = () => (<div id={"LINE"}></div>);

const StyleSettings = () => (<style>{`
#LINE { width: 100%; height: 2px; background-color: ${Colors.BLACK};
    margin-top: 10px; margin-bottom: 10px;
}
.link { color: ${Colors.LIGHT_BLUE}; }
.title-2, .pg { margin-bottom: 10px; }
`}</style>);
