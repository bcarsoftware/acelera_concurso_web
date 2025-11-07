import React, {useState} from "react";
import type {Route} from "../../../../.react-router/types/app/routes/+types/home";
import {DivCardContainer} from "~/pages/access/components/div-card-container";
import {Body} from "~/pages/access/components/body";
import {Form, useNavigate} from "react-router";
import {DivBackLink} from "~/pages/access/components/div-back-link";
import {DivInputGroup} from "~/pages/access/components/div-input-group";
import {InputTextAccess} from "~/pages/access/components/input-text";
import {DivOptions} from "~/pages/access/components/div-options";
import {InputPassword} from "~/pages/access/components/input-password";
import {ButtonPassword} from "~/pages/access/components/button-password";
import {HtmlFont, HtmlType} from "../../../../enums/html-type";
import {DivRegisterLink} from "~/pages/access/components/div-register-link";
import {ButtonElement} from "~/pages/access/components/button-element";
import {Colors} from "../../../../enums/colors";
import {InputButton} from "~/pages/access/components/input-button";
import {ContentTypes, EnvironConstants} from "../../../../enums/constants";
import {HTTPTypes} from "../../../../enums/http-types";
import type {ActiveCodeResponse} from "../../../../data/data";
import {Dialog} from "~/dialog/dialog";

export function meta({}: Route.MetaArgs) {
    return [
        { title: "Recuperar Acesso" },
        { name: "description", content: "Sua melhor preparação!" },
    ];
}

export default function Index() {
    const [showPassword, setShowPassword] = useState<boolean>(false);
    const [codeSent, setCodeSent] = useState<boolean>(false);

    const [email, setEmail] = useState<string>("");
    const [confirmCode, setConfirmCode] = useState<string>("");
    const [password, setPassword] = useState<string>("");

    const [secureCode, setSecureCode] = useState<ActiveCodeResponse | null>(null);

    const [dialogTitle, setDialogTitle] = useState<string>("");
    const [dialogMessage, setDialogMessage] = useState<string>("");
    const [showDialog, setShowDialog] = useState<boolean>(false);

    const navigate = useNavigate();

    const handleUpdatePassword = async () => {
        if (!secureCode) {
            setShowDialog(true);
            return;
        }

        const codeValid = await handleCheckConfirmCode();

        if (!codeValid) {
            setShowDialog(true);
            return;
        }

        const payload = {
            username: email,
            password: password,
        };

        try {
            const url = EnvironConstants.API_BASE_URL + "/user/recovery";
            const response = await fetch(url, {
                method: HTTPTypes.PATCH,
                body: JSON.stringify(payload),
                headers: {
                    "Content-Type": ContentTypes.JSON,
                }
            });

            const body = await response.json();

            if (!response.ok) {
                console.error(body);
                setDialogTitle("Erro na Recuperação");
                setDialogMessage("Não foi possível atualizar a senha!");

                return;
            }

            setDialogTitle("Sucesso na Recuperação");
            setDialogMessage("Senha atualizada com sucesso!");
        }
        catch (error) {
            console.error(error);

            setDialogTitle("Erro no Servidor");
            setDialogMessage("Não foi possível atualizar a senha!");
        }
        finally {
            setShowDialog(true);
        }
    };

    const handleSendConfirmCode = async () => {
        if (!email) {
            setDialogTitle("Erro nos Dados");
            setDialogMessage("Endereço de Email Indefinido!");
            setShowDialog(true);
            return;
        }

        const payload = {
            email: email || undefined,
        };

        try {
            const url = EnvironConstants.API_BASE_URL + "/email-code";
            const response = await fetch(url, {
                method: HTTPTypes.POST,
                body: JSON.stringify(payload),
                headers: {
                    "Content-Type": ContentTypes.JSON,
                }
            });

            const dataBody = await response.json();

            if (!response.ok) {
                console.error(dataBody);
                setDialogTitle("Erro no Envio");
                setDialogMessage("Não foi possível enviar o código!");

                return null;
            }

            const activeCode: ActiveCodeResponse = dataBody.data;

            return activeCode;
        }
        catch (error) {
            console.error(error);

            setDialogTitle("Erro no Servidor");
            setDialogMessage("Não foi possível enviar o código!");

            return null;
        }
    };

    const handleCheckConfirmCode = async () => {
        const payload = {
            secure_code: secureCode?.secure_code || null,
            token: secureCode?.token || null,
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

            const body = await response.json();

            if (!response.ok) {
                console.error(body);
                setDialogTitle("Erro no Envio");
                setDialogMessage("Não foi possível verificar o código!");

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
        const activeCode = await handleSendConfirmCode();

        if (!activeCode) {
            setShowDialog(true);
            return;
        }

        setSecureCode(activeCode);
        setCodeSent(true);
    }

    const getDialogResult = () => {
        return (<Dialog
            name={"dialog-result"}
            title={dialogTitle}
            message={dialogMessage}
            buttonText={"Fechar"}
            closeFunction={closeDialog}
            zIndex={1001}
        />);
    }

    const closeDialog = (value: boolean) => {
        setShowDialog(value);
        navigate("/login");
    };

    return (
        <Body>
        {showDialog && (getDialogResult())}

        <DivCardContainer widthDiv={"720px"}>
            <Form>
                <h2><p>Acelera Concurso</p><p>Recuperar Acesso</p></h2>

                <DivBackLink>
                    <nav><a href="/login">Voltar à tela de acesso..</a></nav>
                </DivBackLink>

                <DivInputGroup>
                    <InputTextAccess
                        labelContent={"Digite o E-mail*"}
                        name={"email"}
                        placeholder={"seuemail@exemplo.com"}
                        required={true}
                        disabled={false}
                        value={email}
                        updateValue={setEmail}
                    />

                    <InputButton
                        name={"ConfirmButton"}
                        value={"Enviar Codigo"}
                        hidden={codeSent}
                        html_type={HtmlType.BUTTON}
                     styles={{
                         font_color: Colors.BLACK,
                         bg_hover: Colors.GOLDEN_HOVER,
                         bg_color: Colors.GOLDEN
                     }} functionCall={handleConfirmCode} />
                </DivInputGroup>

                <DivOptions hidden={!codeSent}>Código de confirmação enviado! Verifique seu e-mail!</DivOptions>

                <DivInputGroup>
                    <InputTextAccess
                        labelContent={"Código de Confirmação*"}
                        name={"confirmation-code"}
                        placeholder={"LLLNLNN"}
                        required={true}
                        disabled={false}
                        value={confirmCode}
                        updateValue={setConfirmCode}
                    />
                </DivInputGroup>

                <DivInputGroup>
                    <InputPassword
                        labelName={"Digite uma Nova Senha*"}
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
                    bg_color: Colors.GREEN,
                    bg_hover: Colors.GREEN_HOVER
                }} functionBtn={handleUpdatePassword}>Atualizar Senha</ButtonElement>

                <DivRegisterLink>
                    <p>Não tem uma conta? <a href="/register">Cadastre-se</a></p>
                </DivRegisterLink>
            </Form>
        </DivCardContainer>

        </Body>
    );
}
