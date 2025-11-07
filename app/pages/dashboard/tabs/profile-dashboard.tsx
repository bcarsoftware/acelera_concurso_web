import {ContentWide} from "~/pages/dashboard/components/content-wide";
import {ContentCard} from "~/pages/dashboard/components/content-card";
import {InputText} from "~/pages/dashboard/components/input-text";
import {InputDate} from "~/pages/dashboard/components/input-date";
import {Button} from "~/pages/dashboard/components/button";
import {HtmlType} from "../../../../enums/html-type";
import {Colors} from "../../../../enums/colors";
import {Select} from "~/pages/dashboard/components/select";
import {useEffect, useState} from "react";
import {useAuth} from "../../../../context/auth-context";
import {Dialog} from "~/dialog/dialog";
import {ContentTypes, EnvironConstants} from "../../../../enums/constants";
import {HTTPTypes} from "../../../../enums/http-types";

export const ProfileDashboardPage = () => {
    const auth = useAuth();

    const [firstName, setFirstName] = useState<string | undefined>(undefined);
    const [lastName, setLastName] = useState<string | undefined>(undefined);
    const [dateBorn, setDateBorn] = useState<string | undefined>(undefined);
    const [gender, setGender] = useState<string | undefined>(undefined);
    const [username, setUsername] = useState<string | undefined>(undefined);
    const [email, setEmail] = useState<string | undefined>(undefined);
    const [points, setPoints] = useState<string | undefined>(undefined);

    const [showDialogResult, setShowDialogResult] = useState<boolean>(false);
    const [dialogTitle, setDialogTitle] = useState<string>("");
    const [dialogMessage, setDialogMessage] = useState<string>("");

    const [reload, setReload] = useState<boolean>(false);

    useEffect(() => {
        if (auth?.isLoading) return;

        setFirstName(auth?.user?.first_name);
        setLastName(auth?.user?.last_name);
        setDateBorn(auth?.user?.date_born);
        setGender(auth?.user?.gender);
        setUsername(auth?.user?.username);
        setEmail(auth?.user?.email);
        setPoints(auth?.user?.points?.toString());
    }, [reload]);

    const handleUpdateUserProfile = async () => {
        const payload = {
            first_name: firstName,
            last_name: lastName,
            date_born: dateBorn,
            gender: gender,
            username: username,
            email: email,
            password: "",
            points: parseInt(points?.toString() || "10"),
            deleted: false,
        };

        try {
            const url = EnvironConstants.API_BASE_URL + `/user/${auth?.user?.user_id}`;
            const response = await fetch(url, {
                method: HTTPTypes.PATCH,
                body: JSON.stringify(payload),
                headers: {
                    "Content-Type": ContentTypes.JSON,
                    "Authorization": `Bearer ${auth?.token}`
                }
            });

            const body = await response.json();

            if (!response.ok) {
                console.log(body);

                setDialogTitle("Erro na Atualização");
                setDialogMessage("Não foi possível atualizar o Perfil!");

                return;
            }

            setDialogTitle("Sucesso");
            setDialogMessage("Perfil atualizado com sucesso!");
            await auth?.reflash(body.data);
        }
        catch (error) {
            console.log(error);

            setDialogTitle("Erro no Servidor");
            setDialogMessage("Não foi possível atualizar o Perfil!");
        }
        finally {
            setShowDialogResult(true);
            setReload(!reload);
        }
    };

    const getDialogResult = () => {
        return (<Dialog
            name={"dialog-result"}
            title={dialogTitle}
            message={dialogMessage}
            buttonText={"Fechar"}
            closeFunction={setShowDialogResult}
            zIndex={1001}
        />);
    }

    return (
        <form>
            {showDialogResult && (getDialogResult())}
            <h1>Perfil de Usuário: {"Nome"}</h1>
            <ContentWide>
                <ContentCard>
                    <InputText
                        labelContent={"Nome*"}
                        name={"first-name"}
                        placeholder={"Fulano"}
                        required={true}
                        disabled={false}
                        value={firstName}
                        updateValue={setFirstName}
                    />
                    <InputText
                        labelContent={"Sobrenmoe*"}
                        name={"last-name"}
                        placeholder={"Sicrano"}
                        required={true}
                        disabled={false}
                        value={lastName}
                        updateValue={setLastName}
                    />
                    <InputDate
                        labelContent={"Data de Nascimento*"}
                        name={"date-born"}
                        placeholder={""}
                        required={true}
                        disabled={true}
                        value={dateBorn}
                        updateValue={setDateBorn}
                    />
                    <Select
                        name={"gender"}
                        required={true}
                        disabled={false}
                        label={"Genêro*"}
                        value={gender}
                        updateValue={setGender}
                    >
                        <option value={"FEMALE"}>Mulher</option>
                        <option value={"MALE"}>Homem</option>
                        <option value={"NOT_BINARY"}>Não Binário</option>
                        <option value={"NOT_SAY"}>Não Dizer</option>
                    </Select>
                    <InputText
                        labelContent={"Nome de Usuárip*"}
                        name={"username"}
                        placeholder={"@username"}
                        required={true}
                        disabled={false}
                        value={username}
                        updateValue={setUsername}
                    />
                    <InputText
                        labelContent={"Endereço de E-Mail*"}
                        name={"email"}
                        placeholder={"username@service.com"}
                        required={true}
                        disabled={false}
                        value={email}
                        updateValue={setEmail}
                    />
                    <InputText
                        labelContent={"Pontos"}
                        name={"points"}
                        placeholder={"1,2,3"}
                        required={false}
                        disabled={true}
                        value={points}
                        updateValue={setPoints}
                    />

                    <div className={"info-container"}>
                        <p>
                            Apenas nas Configurações:
                        </p>
                        <p>
                            <ul>
                                <li>Alterações de Senha;</li>
                                <li>Desativação de Conta;</li>
                            </ul>
                        </p>
                    </div>

                    <Button
                        buttonContent={"Atualizar Perfil"}
                        buttonType={HtmlType.BUTTON}
                        name={"update-profile-button"}
                        styles={{
                            bg_color: Colors.GREEN,
                            bg_hover: Colors.GREEN_HOVER,
                            font_color: Colors.WHITE
                        }}
                        onClickFunction={handleUpdateUserProfile}
                    />
                </ContentCard>
            </ContentWide>
        </form>
    );
};
