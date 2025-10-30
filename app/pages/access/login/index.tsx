import {useState} from "react";
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

export function meta({}: Route.MetaArgs) {
    return [
        { title: "Index Acelera Concurso" },
        { name: "description", content: "Sua melhor preparação!" },
    ];
}

export default function Index() {
    const [showPassword, setShowPassword] = useState(false);

    const handleLogin = async (): Promise<void> => {};

    return (
        <>
        <Body>

        <LoginDiv>
            <LoginForm>
                <h2><p>Acelera Concurso</p><p>Login</p></h2>

                <DivBackLink>
                    <nav><a href="/public">Voltar ao Inicio.</a></nav>
                </DivBackLink>

                <DivInputGroup>
                    <label htmlFor="email">E-mail/Usuário*</label>
                    <input type="email" id="email" name="email" placeholder="seuemail@exemplo.com" required/>
                </DivInputGroup>

                <DivInputGroup>
                    <InputPassword labelName={"Digite a Senha*"} showPassword={showPassword} required={true} />

                    <ButtonPassword buttonType={HtmlType.BUTTON} showPassword={showPassword} functionShow={setShowPassword} />
                </DivInputGroup>

                <DivOptions>
                    <a href="/recovery">Esqueceu a senha?</a>
                </DivOptions>

                <ButtonElement typeName={HtmlType.SUBMIT} styles={{
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
        </>
    );
}