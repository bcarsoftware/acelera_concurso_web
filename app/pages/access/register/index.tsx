import React, {useState} from "react";
import type {Route} from "../../../../.react-router/types/app/routes/+types/home";
import {Form, useNavigate} from "react-router";
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
import {Dialog} from "~/dialog/dialog";
import {ContentTypes, EnvironConstants} from "../../../../enums/constants";
import {HTTPTypes} from "../../../../enums/http-types";
import {type ActiveCodeResponse, EnumGender} from "../../../../data/data";

export function meta({}: Route.MetaArgs) {
    return [
        { title: "Cadastro - Acelera Concurso" },
        { name: "description", content: "Sua melhor preparação!" },
    ];
}

export default function Index() {
    const [showPassword, setShowPassword] = useState(false);
    const [currentStage, setCurrentStage] = useState("BasicInfo");

    const [firstName, setFirstName] = useState<string>("");
    const [lastName, setLastName] = useState<string>("");
    const [dateBorn, setDateBorn] = useState<string>("");
    const [gender, setGender] = useState<string>("");
    const [username, setUsername] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");

    const [confirmCode, setConfirmCode] = useState<string>("");

    const [dialogTitle, setDialogTitle] = useState<string>("");
    const [dialogMessage, setDialogMessage] = useState<string>("");
    const [showDialog, setShowDialog] = useState<boolean>(false);

    const [activation, setActivation] = useState<ActiveCodeResponse | null>(null);

    const navigate = useNavigate();

    const seeBasicInfo = () => {
        setCurrentStage("BasicInfo");
    }

    const seeAccessInfo = () => {
        setCurrentStage("AccessInfo");
    }

    const seeConfirmationCode = () => {
        setCurrentStage("ConfirmationInfo");
    }

    const closeDialog = (value: boolean) => {
        setShowDialog(value);
        navigate("/login");
    };

    const handleSubmitUser = async () => {
        if (!activation) {
            setShowDialog(true);
            return;
        }

        const codeValid = await handleCheckConfirmCode();

        if (!codeValid) {
            setShowDialog(true);
            return;
        }

        const payload = {
            first_name: firstName,
            last_name: lastName,
            date_born: dateBorn,
            gender: gender,
            username: username,
            email: email,
            password: password,
            points: 10,
            deleted: false,
        };

        try {
            const url = EnvironConstants.API_BASE_URL + "/user";
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
                setDialogTitle("Erro no Cadastro");
                setDialogMessage("Não foi possível cadastrar o usuário!");

                return;
            }

            setDialogTitle("Sucesso no Cadastro");
            setDialogMessage("Usuário cadastrado com sucesso!");
        }
        catch (error) {
            console.error(error);

            setDialogTitle("Erro no Servidor");
            setDialogMessage("Não foi possível se conectar!");
        }
        finally {
            setShowDialog(true);
        }
    };

    const handleSendConfirmCode = async () => {
        const payload = {
            email: email || undefined,
        };

        if (!payload.email) {
            setDialogTitle("Erro nos Dados");
            setDialogMessage("Endereço de Email Indefinido!");
            setShowDialog(true);
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

            const body = await response.json();

            if (!response.ok) {
                console.error(body);
                setDialogTitle("Erro no Envio");
                setDialogMessage("Não foi possível enviar o código!");

                return null;
            }

            const activeCode: ActiveCodeResponse = body.data;

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

            const bodyCode = await response.json();

            if (!response.ok) {
                console.error(bodyCode);
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

        setActivation(activeCode);

        seeConfirmationCode();
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

    return (
        <Body>
        {showDialog && (getDialogResult())}
        <DivCardContainer widthDiv={"720px"}>
            <Form>
                <h2><p>Acelera Concurso</p><p>Cadastro</p></h2>

                <Form>
                    <div id="BasicInfo" hidden={currentStage !== "BasicInfo"}>
                        <DivBackLink>
                            Seja bem vindo(a) ao Acelera Concurso!
                        </DivBackLink>
                        <DivInputGroup>
                            <InputText
                                labelContent={"Nome*"}
                                name={"first-name"}
                                placeholder={"Fulano"}
                                required={true}
                                disabled={false}
                                value={firstName}
                                updateValue={setFirstName}
                            />
                        </DivInputGroup>

                        <DivInputGroup>
                            <InputText
                                labelContent={"Sobrenome"}
                                name={"last-name"}
                                placeholder={"Sicrano"}
                                required={true}
                                disabled={false}
                                value={lastName}
                                updateValue={setLastName}
                            />
                        </DivInputGroup>

                        <DivInputGroup>
                            <InputDate
                                labelContent={"Data de Nascimento*"}
                                name={"date-born"}
                                placeholder={"DD/MM/AAAA"}
                                required={true}
                                disabled={false}
                                value={dateBorn}
                                updateValue={setDateBorn}
                            />
                        </DivInputGroup>

                        <DivInputGroup>
                            <Select
                                name={"gender"}
                                required={true}
                                disabled={false}
                                label={"Gênero*"}
                                value={gender}
                                updateValue={setGender}
                            >
                                <option value={""}>Selecione</option>
                                <option value={EnumGender.FEMALE}>Mulher</option>
                                <option value={EnumGender.MALE}>Homem</option>
                                <option value={EnumGender.NOT_BINARY}>Não Binário</option>
                                <option value={EnumGender.NOT_SAY}>Não Dizer</option>
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
                            <InputText
                                labelContent={"Nome de Usuário*"}
                                name={"username"}
                                placeholder={"nomedeusuario"}
                                required={true}
                                disabled={false}
                                value={username}
                                updateValue={setUsername}
                            />
                        </DivInputGroup>

                        <DivInputGroup>
                            <InputText
                                labelContent={"Digite o E-Mail*"}
                                name={"email"}
                                placeholder={"exemplo@provedor.com"}
                                required={true}
                                disabled={false}
                                value={email}
                                updateValue={setEmail}
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

                        <DivOptions>
                            <a href="/recovery">Esqueceu a senha?</a>
                        </DivOptions>

                        <ButtonNext font_color={Colors.WHITE} bg_color={Colors.LIGHT_BLUE} bg_hover={Colors.LIGHT_BLUE_HOVER}
                                    functionOpera={handleConfirmCode}>Verificar</ButtonNext>
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
                            <InputText
                                labelContent={"Código de Confirmação*"}
                                name={"confirmation-code"}
                                placeholder={"LLLNLNN"}
                                required={true}
                                disabled={false}
                                value={confirmCode}
                                updateValue={setConfirmCode}
                            />
                        </DivInputGroup>

                        <ButtonElement typeName={HtmlType.BUTTON} styles={{
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
    );
}
