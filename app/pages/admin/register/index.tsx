import React, {useState} from "react";
import type {Route} from "../../../../.react-router/types/app/routes/+types/home";
import {useNavigate} from "react-router";
import {DivCardContainer} from "~/pages/access/components/div-card-container";
import {DivBackLink} from "~/pages/access/components/div-back-link";
import {DivInputGroup} from "~/pages/access/components/div-input-group";
import {InputText} from "~/pages/dashboard/components/input-text";
import {HtmlFont, HtmlType} from "../../../../enums/html-type";
import {Colors} from "../../../../enums/colors";
import {ButtonPassword} from "~/pages/access/components/button-password";
import {InputPassword} from "~/pages/access/components/input-password";
import {DivRegisterLink} from "~/pages/access/components/div-register-link";
import {BodyAdmin} from "~/pages/admin/components/body-admin";
import {Dialog} from "~/dialog/dialog";
import {ButtonElement} from "~/pages/access/components/button-element";

export function meta({}: Route.MetaArgs) {
    return [
        { title: "Cadastro Admin - Acelera Concurso" },
        { name: "description", content: "Sua melhor preparação!" },
    ];
}

export default function Index() {
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);

    const [showDialog, setShowDialog] = useState<boolean>(false);
    const [dialogTitle, setDialogTitle] = useState<string>("");
    const [dialogMessage, setDialogMessage] = useState<string>("");

    const [fullName, setFullName] = useState<string>("");
    const [username, setUsername] = useState<string>("");
    const [password, setPassword] = useState<string>("");

    const getDialog = (
    ) => (<Dialog
        name={"request-result"}
        title={dialogTitle}
        message={dialogMessage}
        buttonText={"Fechar"}
        closeFunction={setShowDialog}
    />);

    const handleSubmitUserAdmin = async () => {
        const payload = {
            full_name: fullName,
            username: username,
            password: password,
        };
        setShowDialog(true);
    };

    const handleHomeScreen = () => {
        navigate("/");
    };

    return (
        <>
        <BodyAdmin>

        {showDialog && (getDialog())}

        <DivCardContainer widthDiv={"720px"}>
            <form>
                <h2><p>Acelera Concurso</p><p>Cadastro Adminstrador</p></h2>

                <form method={"POST"}>
                    <DivBackLink>
                        <nav onClick={handleHomeScreen}><a href="">Voltar à Tela Inicial</a></nav>
                    </DivBackLink>

                    <DivInputGroup>
                        <InputText
                            labelContent={"Nome Completo*"}
                            name={"full-name"}
                            placeholder={"Fulano Sicrano"}
                            required={true}
                            disabled={false}
                            value={fullName}
                            updateValue={setFullName}
                        />
                    </DivInputGroup>

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
                    }} functionBtn={handleSubmitUserAdmin}>Cadastrar Administrador</ButtonElement>
                </form>

                <DivRegisterLink>
                    <p>Já tem uma conta? <a href="/admin/login">Acesse aqui!</a></p>
                </DivRegisterLink>
            </form>
        </DivCardContainer>

        </BodyAdmin>
        </>
    );
}
