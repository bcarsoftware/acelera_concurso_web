import {ContentWide} from "~/pages/dashboard/components/content-wide";
import {ContentCard} from "~/pages/dashboard/components/content-card";
import {InputNumber} from "~/pages/dashboard/components/input-number";
import {InputText} from "~/pages/dashboard/components/input-text";
import {Select} from "~/pages/dashboard/components/select";
import {HtmlType} from "../../../../../enums/html-type";
import {Colors} from "../../../../../enums/colors";
import {Button} from "~/pages/dashboard/components/button";
import {useAuth} from "../../../../../context/auth-context";
import {useEffect, useState} from "react";
import {Dialog} from "~/dialog/dialog";
import {ContentTypes, EnvironConstants} from "../../../../../enums/constants";
import {HTTPTypes} from "../../../../../enums/http-types";

interface IStudyTipNew {
    goingToMainPage: () => void;
}

export const StudyTipsNew = (
    { goingToMainPage }: IStudyTipNew
) => {
    const authUser = useAuth();

    const [userId, setUserId] = useState<number | undefined>(undefined);
    const [name, setName] = useState<string>("");
    const [description, setDescription] = useState<string | undefined>(undefined);
    const [genAI, setGenAI] = useState<string>("false");

    const [showDialog, setShowDialog] = useState<boolean>(false);
    const [dialogTitle, setDialogTitle] = useState<string>("");
    const [dialogMessage, setDialogMessage] = useState<string>("");

    const [success, setSuccess] = useState<boolean>(false);

    useEffect(() => {
        if (authUser?.isLoading) return;

        setUserId(authUser?.user?.user_id);
    }, []);

    const handleNewStudyTip = async () => {
        const payload = {
            user_id: userId,
            name: name,
            ai_generate: eval(genAI),
            description: description,
            deleted: false,
        };

        try {
            const url = `${EnvironConstants.API_BASE_URL}/study-tips`;
            const response = await fetch(url, {
                method: HTTPTypes.POST,
                body: JSON.stringify(payload),
                headers: {
                    "Content-Type": ContentTypes.JSON,
                    "Authorization": `Bearer ${authUser?.token}`,
                }
            });

            const studyTipBody = await response.json();

            if (!response.ok) {
                console.log(studyTipBody);

                setDialogTitle("Erro no Cadastro");
                setDialogMessage("Não foi possível cadastrar esta nota de estudo!");

                return;
            }

            setSuccess(true);
            setDialogTitle("Sucesso");
            setDialogMessage("Nota de estudo cadastrada com sucesso!");
        }
        catch (error) {
            console.error(error);

            setDialogTitle("Erro no Servidor");
            setDialogMessage("Não foi possível cadastrar esta nota de estudo!");
        }
        finally {
            setShowDialog(true);
        }
    };

    const seeDialog = () => {
        const closingFunction = success ? (value: boolean) => {
            setShowDialog(value);
            setSuccess(value);
            goingToMainPage();
        } : setShowDialog;

        return (<Dialog
            name={"dialog-result"}
            title={dialogTitle}
            message={dialogMessage}
            buttonText={"Fechar"}
            closeFunction={closingFunction}
            zIndex={1001}
        />);
    }

    return (
        <form>
            {showDialog && (seeDialog())}
            <h1>Cadastro Dica de Estudo</h1>
            <ContentWide>
                <ContentCard>
                    <InputNumber
                        labelContent={"ID Usuário*"}
                        name={"user-id"}
                        placeholder={"123"}
                        required={true}
                        disabled={true}
                        value={`${userId}`}
                    />
                    <InputText
                        labelContent={"Nome da Dica*"}
                        name={"study-tips-name"}
                        placeholder={"Nome da Dica de Estudo"}
                        required={true}
                        disabled={false}
                        value={name}
                        updateValue={setName}
                    />
                    <InputText
                        labelContent={"Descrição da Dica"}
                        name={"study-tips-description"}
                        placeholder={"Descrição da Dica de Estudo"}
                        required={false}
                        disabled={false}
                        value={description}
                        updateValue={setDescription}
                    />
                    <Select
                        name={"generate-ai"}
                        required={true}
                        disabled={false}
                        label={"Gerado com IA*"}
                        value={genAI}
                        updateValue={setGenAI}
                    >
                        <option value={"true"}>SIM</option>
                        <option value={"false"}>NÃO</option>
                    </Select>

                    <Button
                        buttonContent={"Cadastrar Dica de Estudo"}
                        buttonType={HtmlType.BUTTON}
                        name={"new-study-tip-button"}
                        styles={{
                            bg_color: Colors.GREEN,
                            bg_hover: Colors.GREEN_HOVER,
                            font_color: Colors.WHITE
                        }}
                        onClickFunction={handleNewStudyTip}
                    />
                </ContentCard>
            </ContentWide>
        </form>
    );
};
