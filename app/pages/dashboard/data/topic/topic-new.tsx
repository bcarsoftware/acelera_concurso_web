import {ContentWide} from "~/pages/dashboard/components/content-wide";
import {ContentCard} from "~/pages/dashboard/components/content-card";
import {InputText} from "~/pages/dashboard/components/input-text";
import {SelectStatus} from "~/pages/dashboard/components/select-status";
import {HtmlType} from "../../../../../enums/html-type";
import {Colors} from "../../../../../enums/colors";
import {Button} from "~/pages/dashboard/components/button";
import {useAuth} from "../../../../../context/auth-context";
import {useEffect, useState} from "react";
import {EnumStatus, type SubjectResponse} from "../../../../../data/data";
import {Dialog} from "~/dialog/dialog";
import {ContentTypes, EnvironConstants} from "../../../../../enums/constants";
import {HTTPTypes} from "../../../../../enums/http-types";

interface ITopicNew {
    subject?: SubjectResponse;
    goingToMainPage: () => void;
}

export const TopicNew = (
    { subject, goingToMainPage }: ITopicNew
) => {
    const authUser = useAuth();

    const [topicName, setTopicName] = useState<string>("");
    const [topicDescription, setTopicDescription] = useState<string | undefined>(undefined);
    const [status, setStatus] = useState<EnumStatus | string>(EnumStatus.INCOMPLETE);

    const [showDialog, setShowDialog] = useState<boolean>(false);
    const [dialogTitle, setDialogTitle] = useState<string>("");
    const [dialogMessage, setDialogMessage] = useState<string>("");

    const [success, setSuccess] = useState<boolean>(false);

    useEffect(() => {
        if (authUser?.isLoading) return;

        if (!subject) goingToMainPage();
    }, []);

    const handleNewTopic = async () => {
        const payload = {
            subject_id: subject?.subject_id,
            name: topicName,
            description: topicDescription,
            fulfillment: null,
            status: status,
            deleted: false,
        };

        try {
            const url = `${EnvironConstants.API_BASE_URL}/topic`;
            const response = await fetch(url, {
                method: HTTPTypes.POST,
                body: JSON.stringify(payload),
                headers: {
                    "Content-Type": ContentTypes.JSON,
                    "Authorization": `Bearer ${authUser?.token}`,
                }
            });

            const topicBody = await response.json();

            if (!response.ok) {
                console.log(topicBody);

                setDialogTitle("Erro no Cadastro");
                setDialogMessage("Não foi possível cadastrar este assunto!");

                return;
            }

            setSuccess(true);
            setDialogTitle("Sucesso");
            setDialogMessage("Assunto cadastrado com sucesso!");
        }
        catch (error) {
            console.error(error);

            setDialogTitle("Erro no Servidor");
            setDialogMessage("Não foi possível cadastrar este assunto!");
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
            <h1>Cadastro Novo Assunto</h1>
            <ContentWide>
                <ContentCard>
                    <InputText
                        labelContent={"Disciplina*"}
                        name={"subject"}
                        placeholder={"123"}
                        required={true}
                        disabled={true}
                        value={subject?.name}
                    />
                    <InputText
                        labelContent={"Nome do Assunto*"}
                        name={"topic-name"}
                        placeholder={"Nome do Assunto"}
                        required={true}
                        disabled={false}
                        value={topicName}
                        updateValue={setTopicName}
                    />
                    <InputText
                        labelContent={"Descrição do Assunto"}
                        name={"topic-description"}
                        placeholder={"Descrição sobre o Assunto"}
                        required={false}
                        disabled={false}
                        value={topicDescription}
                        updateValue={setTopicDescription}
                    />
                    <SelectStatus value={status} updateValue={setStatus} disable={true} />

                    <Button
                        buttonContent={"Cadastrar Novo Assunto"}
                        buttonType={HtmlType.BUTTON}
                        name={"new-topic-button"}
                        styles={{
                            bg_color: Colors.GREEN,
                            bg_hover: Colors.GREEN_HOVER,
                            font_color: Colors.WHITE
                        }}
                        onClickFunction={handleNewTopic}
                    />
                </ContentCard>
            </ContentWide>
        </form>
    );
};
