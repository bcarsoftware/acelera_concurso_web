import {ContentWide} from "~/pages/dashboard/components/content-wide";
import {ContentCard} from "~/pages/dashboard/components/content-card";
import {InputText} from "~/pages/dashboard/components/input-text";
import {HtmlType} from "../../../../../enums/html-type";
import {Colors} from "../../../../../enums/colors";
import {ButtonNew} from "~/pages/dashboard/components/button";
import type {TopicResponse} from "../../../../../data/data";
import {useAuth} from "../../../../../context/auth-context";
import {useEffect, useState} from "react";
import {Dialog} from "~/dialog/dialog";
import {ContentTypes, EnvironConstants} from "../../../../../enums/constants";
import {HTTPTypes} from "../../../../../enums/http-types";

interface INoteTopicNew {
    topic?: TopicResponse;
    goingToMainPage: () => void;
}

export const NoteTopicNew = (
    { topic, goingToMainPage }: INoteTopicNew
) => {
    const userAuth = useAuth();

    const [topicName, setTopicName] = useState<string>("");
    const [topicDescription, setTopicDescription] = useState<string>("");

    const [showDialog, setShowDialog] = useState<boolean>(false);
    const [dialogTitle, setDialogTitle] = useState<string>("");
    const [dialogMessage, setDialogMessage] = useState<string>("");

    const [success, setSuccess] = useState<boolean>(false);

    useEffect(() => {
        if (userAuth?.isLoading) return;
    }, []);

    const handleAddNewNoteTopic = async () => {
        const payload = {
            topic_id: topic?.topic_id,
            name: topicName,
            description: topicDescription,
            finish: false,
            rate_success: null,
            deleted: false,
        };

        try {
            const url = `${EnvironConstants.API_BASE_URL}/note-topic`;
            const response = await fetch(url, {
                method: HTTPTypes.POST,
                body: JSON.stringify(payload),
                headers: {
                    "Content-Type": ContentTypes.JSON,
                    "Authorization": `Bearer ${userAuth?.token}`,
                }
            });

            const noteTopic = await response.json();

            if (!response.ok) {
                console.log(noteTopic);

                setDialogTitle("Erro no Cadastro");
                setDialogMessage("Não foi possível cadastrar essa nota de assunto!");

                return;
            }

            setDialogTitle("Sucesso");
            setDialogMessage("Nota de assunto cadastrada com sucesso!");
            setSuccess(true);
        }
        catch (error) {
            console.error(error);

            setDialogTitle("Erro no Servidor");
            setDialogMessage("Não foi possível cadastrar essa nota de assunto!");
        }
        finally { setShowDialog(true); }
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
            <h1>Catasdro de Nota Assunto</h1>
            <ContentWide>
                <ContentCard>
                    <InputText
                        labelContent={"Nome do Assunto"}
                        name={"topic-name"}
                        placeholder={"Nome do Assunto"}
                        required={true}
                        disabled={true}
                        value={topic?.name}
                    />
                    <InputText
                        labelContent={"Nota de Assunto*"}
                        name={"note-topic-name"}
                        placeholder={"Nome da Nota Assunto"}
                        required={true}
                        disabled={false}
                        value={topicName}
                        updateValue={setTopicName}
                    />
                    <InputText
                        labelContent={"Descrição do Assunto*"}
                        name={"note-topic-description"}
                        placeholder={"Descrição da Nota Assunto"}
                        required={true}
                        disabled={false}
                        value={topicDescription}
                        updateValue={setTopicDescription}
                    />

                    <ButtonNew
                        buttonContent={"Cadastrar Nota de Assunto"}
                        buttonType={HtmlType.BUTTON}
                        name={"new-note-topic-button"}
                        styles={{
                            bg_color: Colors.GREEN,
                            bg_hover: Colors.GREEN_HOVER,
                            font_color: Colors.WHITE
                        }}
                        onClickFunction={handleAddNewNoteTopic}
                    />
                </ContentCard>
            </ContentWide>
        </form>
    );
};
