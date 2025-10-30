import React, {useState} from "react";
import type {Route} from "../../../../.react-router/types/app/routes/+types/home";
import {DivCardContainer} from "~/pages/access/components/div-card-container";
import {Body} from "~/pages/access/components/body";
import {Form} from "react-router";
import {DivBackLink} from "~/pages/access/components/div-back-link";
import {DivInputGroup} from "~/pages/access/components/div-input-group";
import {InputText} from "~/pages/dashboard/components/input-text";
import {DivOptions} from "~/pages/access/components/div-options";
import {InputPassword} from "~/pages/access/components/input-password";
import {ButtonPassword} from "~/pages/access/components/button-password";
import {HtmlFont, HtmlType} from "../../../../enums/html-type";
import {DivRegisterLink} from "~/pages/access/components/div-register-link";
import {ButtonElement} from "~/pages/access/components/button-element";
import {Colors} from "../../../../enums/colors";
import {InputButton} from "~/pages/access/components/input-button";

export function meta({}: Route.MetaArgs) {
    return [
        { title: "Recuperar Acesso" },
        { name: "description", content: "Sua melhor preparação!" },
    ];
}

export default function Index() {
    const [showPassword, setShowPassword] = useState(false);
    const [codeSent, setCodeSent] = useState(false);

    const sendCodeToEmail = () => {
        setCodeSent(true)
    };

    const handleUpdatePassword = () => {};

    return (
        <>
        <Body>

        <DivCardContainer widthDiv={"720px"}>
            <Form>
                <h2><p>Acelera Concurso</p><p>Recuperar Acesso</p></h2>

                <DivBackLink>
                    <nav><a href="/login">Voltar à tela de acesso..</a></nav>
                </DivBackLink>

                <DivInputGroup>
                    <InputText labelContent={"Digite o E-mail*"} name={"email"} placeholder={"seuemail@exemplo.com"} required={true} disabled={false} />

                    <InputButton name={"ConfirmButton"} value={"Enviar Codigo"} hidden={codeSent} html_type={HtmlType.BUTTON}
                     styles={{
                         font_color: Colors.BLACK,
                         bg_hover: Colors.GOLDEN_HOVER,
                         bg_color: Colors.GOLDEN
                     }} functionCall={sendCodeToEmail} />
                </DivInputGroup>

                <DivOptions hidden={!codeSent}>Código de confirmação enviado! Verifique seu e-mail!</DivOptions>

                <DivInputGroup>
                    <InputText labelContent={"Código de Confirmação*"} name={"confirmation-code"} placeholder={"LLLNLNN"} required={true} disabled={false} />
                </DivInputGroup>

                <DivInputGroup>
                    <InputPassword labelName={"Digite uma Nova Senha*"} showPassword={showPassword} required={true} />

                    <ButtonPassword buttonType={HtmlType.BUTTON} showPassword={showPassword} functionShow={setShowPassword} />
                </DivInputGroup>

                <ButtonElement typeName={HtmlType.SUBMIT} styles={{
                    font_color: Colors.WHITE,
                    font_weight: HtmlFont.BOLD,
                    bg_color: Colors.GREEN,
                    bg_hover: Colors.GREEN_HOVER
                }} functionBtn={handleUpdatePassword}>Atualizar Senha</ButtonElement>

                <DivRegisterLink>
                    <p>Não tem uma conta? <a href="/register">Cadastre-se</a></p>
                </DivRegisterLink>
            </Form>
        </DivCardContainer>

        </Body>
        </>
    );
}
