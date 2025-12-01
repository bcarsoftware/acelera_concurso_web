import {useEffect, useState} from "react";
import type {Route} from "../../../../.react-router/types/app/routes/+types/home";
import {LoginDiv} from "~/pages/access/components/login-div";
import {Body} from "~/pages/access/components/body";
import {LoginForm} from "~/pages/access/components/login-form";
import {DivBackLink} from "~/pages/access/components/div-back-link";
import {DivInputGroup} from "~/pages/access/components/div-input-group";
import {HtmlFont, HtmlType} from "../../../../enums/html-type";
import {ButtonPassword} from "~/pages/access/components/button-password";
import {DivOptions} from "~/pages/access/components/div-options";
import {ButtonElement} from "~/pages/access/components/button-element";
import {Colors} from "../../../../enums/colors";
import {DivRegisterLink} from "~/pages/access/components/div-register-link";
import {InputPassword} from "~/pages/access/components/input-password";
import {Dialog} from "~/dialog/dialog";
import {ContentTypes, EnvironConstants} from "../../../../enums/constants";
import {HTTPTypes} from "../../../../enums/http-types";
import {InputTextAccess} from "~/pages/access/components/input-text";
import { useAuth } from "context/auth-context";
import {useNavigate} from "react-router";

export function meta({}: Route.MetaArgs) {
    return [
        { title: "Login Acelera Concurso" },
        { name: "description", content: "Sua melhor preparação!" },
    ];
}

export default function Index() {
    const [showPassword, setShowPassword] = useState(false);

    const [username, setUsername] = useState<string>("");
    const [password, setPassword] = useState<string>("");

    const [showDialogResult, setShowDialogResult] = useState<boolean>(false);
    const [dialogTitle, setDialogTitle] = useState<string>("");
    const [dialogMessage, setDialogMessage] = useState<string>("");

    const [success, setSuccess] = useState<boolean>(false);

    const authenticated = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (authenticated?.isLoading) return;
    }, []);

    const getDialogResult = () => {
        const closingFunction = success ?
            (value: boolean) => {
                openDashboard(value)
                setSuccess(value);
            } : setShowDialogResult;

        return (<Dialog
            name={"dialog-result"}
            title={dialogTitle}
            message={dialogMessage}
            buttonText={"Fechar"}
            closeFunction={closingFunction}
            zIndex={1001}
        />);
    }

    const openDashboard = (value: boolean) => {
        setShowDialogResult(false);
        navigate("/dashboard");
    };

    const handleLogin = async (): Promise<void> => {
        const payload = {
            username: username || undefined,
            password: password || undefined,
        };

        if (Object.values(payload).includes(undefined)) {
            setDialogTitle("Erro nos Dados");
            setDialogMessage("Nome de Usuário ou Senha Indefinidos!");
            setShowDialogResult(true);
            return;
        }

        try {
            const url = EnvironConstants.API_BASE_URL + (
                "/user/login"
            )
            const response = await fetch(url, {
                method: HTTPTypes.POST,
                body: JSON.stringify(payload),
                headers: {
                    "Content-Type": ContentTypes.JSON
                }
            });

            const body = await response.json();

            if (!response.ok) {
                console.error(body);

                setDialogTitle("Erro no Acesso");
                setDialogMessage("Usuário ou senha inválidos!");

                return;
            }

            setDialogTitle("Sucesso no Acesso");
            setDialogMessage("Bem vindo ao Acelera Concurso!");
            await authenticated?.login(body.data.user, body.data.token);
            setSuccess(true);
        }
        catch (error) {
            console.error(error);

            setDialogTitle("Erro no Servidor");
            setDialogMessage("Não foi possível acessar o sistema!");
        }
        finally {
            setShowDialogResult(true);
        }
    };

    return (
        <Body>
        {showDialogResult && (getDialogResult())}

        <LoginDiv>
            <LoginForm>
                <h2><p>Acelera Concurso</p><p>Login</p></h2>

                <DivBackLink>
                    <nav><a href="/">Voltar ao Inicio.</a></nav>
                </DivBackLink>

                <InputTextAccess
                    labelContent={"E-Mail/Nome de Usuário*"}
                    name={"email-or-username"}
                    placeholder={"username@email.com"}
                    required={true} disabled={false}
                    value={username}
                    updateValue={setUsername}
                />

                <DivInputGroup>
                    <InputPassword
                        labelName={"Digite a Senha*"}
                        showPassword={showPassword}
                        required={true}
                        value={password}
                        updateValue={setPassword}
                    />

                    <ButtonPassword buttonType={HtmlType.BUTTON} showPassword={showPassword} functionShow={setShowPassword} />
                </DivInputGroup>

                <DivOptions>
                    <a href="/recovery">Esqueceu a senha?</a>
                </DivOptions>

                <ButtonElement typeName={HtmlType.BUTTON} styles={{
                    font_color: Colors.WHITE,
                    font_weight: HtmlFont.BOLD,
                    bg_color: Colors.GREEN,
                    bg_hover: Colors.GREEN_HOVER
                }} functionBtn={handleLogin}>Entrar</ButtonElement>

                <DivRegisterLink>
                    <p>Não tem uma conta? <a href="/register">Cadastre-se</a></p>
                </DivRegisterLink>
            </LoginForm>
        </LoginDiv>

        </Body>
    );
}