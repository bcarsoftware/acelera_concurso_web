import React, {useState} from "react";
import type {Route} from "../../../../.react-router/types/app/routes/+types/home";
import {Form} from "react-router";
import {DivCardContainer} from "~/pages/access/components/div-card-container";
import {DivBackLink} from "~/pages/access/components/div-back-link";
import {DivInputGroup} from "~/pages/access/components/div-input-group";
import {Select} from "~/pages/dashboard/components/select";
import {InputDate} from "~/pages/dashboard/components/input-date";
import {InputText} from "~/pages/dashboard/components/input-text";
import {ButtonElement} from "~/pages/access/components/button-element";
import {HtmlFont, HtmlType} from "../../../../enums/html-type";
import {Colors} from "../../../../enums/colors";
import {ButtonPassword} from "~/pages/access/components/button-password";
import {InputPassword} from "~/pages/access/components/input-password";
import {DivOptions} from "~/pages/access/components/div-options";
import {DivRegisterLink} from "~/pages/access/components/div-register-link";
import {Body} from "~/pages/access/components/body";
import {ButtonNext} from "~/pages/access/components/button-next";

export function meta({}: Route.MetaArgs) {
    return [
        { title: "Cadastro - Acelera Concurso" },
        { name: "description", content: "Sua melhor preparação!" },
    ];
}

export default function Index() {
    const [showPassword, setShowPassword] = useState(false);
    const [currentStage, setCurrentStage] = useState("BasicInfo");

    const seeBasicInfo = () => {
        setCurrentStage("BasicInfo");
    }

    const seeAccessInfo = () => {
        setCurrentStage("AccessInfo");
    }

    const seeConfirmationCode = () => {
        setCurrentStage("ConfirmationInfo");
    }

    const handleSubmitUser = () => {};

    return (
        <>
        <Body>
        <DivCardContainer widthDiv={"720px"}>
            <Form>
                <h2><p>Acelera Concurso</p><p>Cadastro</p></h2>

                <Form>
                    <div id="BasicInfo" hidden={currentStage !== "BasicInfo"}>
                        <DivBackLink>
                            Seja bem vindo(a) ao Acelera Concurso!
                        </DivBackLink>
                        <DivInputGroup>
                            <InputText labelContent={"Nome*"} name={"first-name"} placeholder={"Fulano"} required={true} disabled={false} />
                        </DivInputGroup>

                        <DivInputGroup>
                            <InputText labelContent={"Sobrenome"} name={"last-name"} placeholder={"Sicrano"} required={true} disabled={false} />
                        </DivInputGroup>

                        <DivInputGroup>
                            <InputDate labelContent={"Data de Nascimento*"} name={"date-born"} placeholder={"DD/MM/AAAA"} required={true} disabled={false} />
                        </DivInputGroup>

                        <DivInputGroup>
                            <Select name={"gender"} required={true} disabled={false} label={"Gênero*"}>
                                <option>Selecione</option>
                                <option value="FEMALE">Mulher</option>
                                <option value="MALE">Homem</option>
                                <option value="NOT_BINARY">Não Binário</option>
                                <option value="NOT_SAY">Não Dizer</option>
                            </Select>
                        </DivInputGroup>

                        <ButtonNext font_color={Colors.WHITE} bg_color={Colors.LIGHT_BLUE} bg_hover={Colors.LIGHT_BLUE_HOVER}
                                    functionOpera={seeAccessInfo}>Próximo</ButtonNext>
                    </div>

                    <div id="AccessInfo" hidden={currentStage !== "AccessInfo"}>
                        <DivBackLink>
                            <nav onClick={seeBasicInfo}><a href="">Voltar às Informações Básicas</a></nav>
                        </DivBackLink>

                        <DivInputGroup>
                            <InputText labelContent={"Nome de Usuário*"} name={"username"} placeholder={"nomedeusuario"} required={true} disabled={false} />
                        </DivInputGroup>

                        <DivInputGroup>
                            <InputText labelContent={"Digite o E-Mail*"} name={"email"} placeholder={"exemplo@provedor.com"} required={true} disabled={false} />
                        </DivInputGroup>

                        <DivInputGroup>
                            <InputPassword labelName={"Digite a Senha*"} showPassword={showPassword} required={true} />

                            <ButtonPassword buttonType={HtmlType.BUTTON} showPassword={showPassword} functionShow={setShowPassword} />
                        </DivInputGroup>

                        <DivOptions>
                            <a href="/recovery">Esqueceu a senha?</a>
                        </DivOptions>

                        <ButtonNext font_color={Colors.WHITE} bg_color={Colors.LIGHT_BLUE} bg_hover={Colors.LIGHT_BLUE_HOVER}
                                    functionOpera={seeConfirmationCode}>Verificar</ButtonNext>
                    </div>

                    <div id="ConfirmationInfo" hidden={currentStage !== "ConfirmationInfo"}>
                        <DivBackLink>
                            <nav onClick={seeBasicInfo}><a href="">Voltar às Informações Básicas.</a></nav>
                        </DivBackLink>

                        <DivInputGroup>
                            <label htmlFor="email-check">Atenção!</label>
                            <p>Foi enviado um código de confirmação para o email:</p>
                            <p>username@example.com</p>
                            <p>.</p>
                            <p>Pedimos que você acesse a sua caixa de entrada e confirme o código no campo abaixo.</p>
                        </DivInputGroup>

                        <DivInputGroup>
                            <InputText labelContent={"Código de Confirmação*"} name={"confirmation-code"} placeholder={"LLLNLNN"} required={true} disabled={false} />
                        </DivInputGroup>

                        <ButtonElement typeName={HtmlType.SUBMIT} styles={{
                            font_color: Colors.WHITE,
                            font_weight: HtmlFont.BOLD,
                            bg_color: Colors.GREEN,
                            bg_hover: Colors.GREEN_HOVER
                        }} functionBtn={handleSubmitUser}>Confirmar e Cadastrar</ButtonElement>
                    </div>
                </Form>

                <DivRegisterLink>
                    <p>Já tem uma conta? <a href="/login">Acesse aqui!</a></p>
                </DivRegisterLink>
            </Form>
        </DivCardContainer>

        </Body>
        </>
    );
}
