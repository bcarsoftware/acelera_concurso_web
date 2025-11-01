import React, {useState} from "react";
import type {Route} from "../../../../.react-router/types/app/routes/+types/home";
import {LoginForm} from "~/pages/access/components/login-form";
import {DivBackLink} from "~/pages/access/components/div-back-link";
import {DivInputGroup} from "~/pages/access/components/div-input-group";
import {HtmlFont, HtmlType} from "../../../../enums/html-type";
import {ButtonPassword} from "~/pages/access/components/button-password";
import {ButtonElement} from "~/pages/access/components/button-element";
import {Colors} from "../../../../enums/colors";
import {DivRegisterLink} from "~/pages/access/components/div-register-link";
import {InputPassword} from "~/pages/access/components/input-password";
import {BodyAdmin} from "~/pages/admin/components/body-admin";
import {DivCardContainer} from "~/pages/access/components/div-card-container";
import {InputText} from "~/pages/dashboard/components/input-text";
import {useNavigate} from "react-router";
import {Dialog} from "~/dialog/dialog";

export function meta({}: Route.MetaArgs) {
    return [
        { title: "Login Admin Acelera Concurso" },
        { name: "description", content: "Sua melhor preparação!" },
    ];
}

export default function Index() {
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);

    const [showSuccessDialog, setShowSuccessDialog] = useState<boolean>(false);

    const [username, setUsername] = useState<string>("");
    const [password, setPassword] = useState<string>("");

    const getSuccessDialog = (
    ) => (<Dialog
        name={"request-result"}
        title={"Sucesso no Acesso!"}
        message={"Usuário Administrador Encontrado."}
        buttonText={"Fechar"}
        closeFunction={openDashboard}
    />);

    const openDashboard = () => {
        setShowSuccessDialog(false);
        navigate("/admin");
    };

    const handleLogin = async (): Promise<void> => {
        const payload = { username, password };

        setShowSuccessDialog(true);
    };

    return (
        <>
        <BodyAdmin>

        {showSuccessDialog && (getSuccessDialog())}

        <DivCardContainer widthDiv={"600px"}>
            <LoginForm>
                <h2><p>Acelera Concurso</p><p>Login Administrador</p></h2>

                <DivBackLink>
                    <nav onClick={() => navigate("/")}>Voltar ao Inicio.</nav>
                </DivBackLink>

                <DivInputGroup>
                    <InputText
                        labelContent={"Email/Usuário*"}
                        name={"username"}
                        placeholder={"usuario@exemplo.com"}
                        required={true}
                        disabled={false}
                        value={username}
                        updateValue={setUsername}
                    />
                </DivInputGroup>

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

                <ButtonElement typeName={HtmlType.BUTTON} styles={{
                    font_color: Colors.WHITE,
                    font_weight: HtmlFont.BOLD,
                    bg_color: Colors.LIGHT_BLUE,
                    bg_hover: Colors.LIGHT_BLUE_HOVER
                }} functionBtn={handleLogin}>Entrar</ButtonElement>

                <DivRegisterLink>
                    <p>Não tem uma conta? <a href="/admin/new">Cadastre-se</a></p>
                </DivRegisterLink>
            </LoginForm>
        </DivCardContainer>

        </BodyAdmin>
        </>
    );
}