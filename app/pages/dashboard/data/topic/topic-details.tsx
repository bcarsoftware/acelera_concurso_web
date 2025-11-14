import {ContentWide} from "~/pages/dashboard/components/content-wide";
import {ContentCard} from "~/pages/dashboard/components/content-card";
import {InputText} from "~/pages/dashboard/components/input-text";
import {SelectStatus} from "~/pages/dashboard/components/select-status";
import {HtmlType} from "../../../../../enums/html-type";
import {Colors} from "../../../../../enums/colors";
import {ButtonNew} from "~/pages/dashboard/components/button";
import {useAuth} from "../../../../../context/auth-context";
import {useEffect, useState} from "react";
import {EnumStatus, type SubjectResponse, type TopicResponse} from "../../../../../data/data";
import {Dialog} from "~/dialog/dialog";
import {ContentTypes, EnvironConstants} from "../../../../../enums/constants";
import {HTTPTypes} from "../../../../../enums/http-types";
import {DialogConfirm} from "~/dialog/dialog-confirm";

interface ITopicUpdate {
    topic?: TopicResponse,
    subjectName?: string,
    goingToMainPage: () => void,
}

export const TopicDetails = (
    { topic, subjectName, goingToMainPage }: ITopicUpdate
) => {
    const authUser = useAuth();

    const [success, setSuccess] = useState<boolean>(false);

    const [topicName, setTopicName] = useState<string>("");

    const [showConfirmDeleteDialog, setShowConfirmDeleteDialog] = useState<boolean>(false);
    const [topicDescription, setTopicDescription] = useState<string | undefined>(undefined);
    const [status, setStatus] = useState<EnumStatus | string>(EnumStatus.INCOMPLETE);
    const [showDialog, setShowDialog] = useState<boolean>(false);

    const [dialogTitle, setDialogTitle] = useState<string>("");

    const [dialogMessage, setDialogMessage] = useState<string>("");

    useEffect(() => {
        if (authUser?.isLoading) return;

        if (!topic) goingToMainPage();

        setTopicName(topic?.name as string);
        setTopicDescription(topic?.description || undefined);
        setStatus(topic?.status as EnumStatus);
    }, []);

    const handleFinishTopic = async () => {
        try {
            const url = `${EnvironConstants.API_BASE_URL}/topic/${topic?.topic_id}/finish`
            const response = await fetch(url, {
                method: HTTPTypes.PATCH,
                headers: {
                    "Content-Type": ContentTypes.JSON,
                    "Authorization": `Bearer ${authUser?.token}`,
                }
            });

            const finished = await response.json();

            if (!response.ok) {
                console.log(finished);

                setDialogTitle("Erro ao Finalizar");
                setDialogMessage("Não foi possível finalizar essa tarefa!");

                return;
            }

            setDialogTitle("Sucesso");
            setDialogMessage("Tarefa finalizada com sucesso!");
        }
        catch (error) {
            console.error(error);

            setDialogTitle("Erro no Servidor");
            setDialogMessage("Não foi possível finalizar essa tarefa!");
        }
        finally {
            setShowDialog(true);
        }
    };

    const handleDeleteTopic = async () => {
        try {
            const url = `${EnvironConstants.API_BASE_URL}/topic/${topic?.topic_id}`;
            const response = await fetch(url, {
                method: HTTPTypes.DELETE,
                headers: {
                    "Content-Type": ContentTypes.JSON,
                    "Authorization": `Bearer ${authUser?.token}`,
                }
            });

            const deletedBody = await response.json();

            if (!response) {
                console.error(deletedBody);

                setDialogTitle("Erro na Esclusão");
                setDialogMessage("Não foi possível atualizar este assunto!");

                return;
            }

            setSuccess(true);
            setDialogTitle("Sucesso");
            setDialogMessage("Assunto excluído com sucesso!");
        }
        catch (error) {
            console.error(error);

            setDialogTitle("Erro no Servidor");
            setDialogMessage("Não foi possível atualizar este assunto!");
        }
        finally {
            setShowConfirmDeleteDialog(false);
            setShowDialog(true);
        }
    };

    const handleUpdateTopic = async () => {
        const payload = {
            subject_id: topic?.subject_id,
            name: topicName,
            description: topicDescription,
            fulfillment: null,
            status: status,
            deleted: false,
        };

        try {
            const url = `${EnvironConstants.API_BASE_URL}/topic/${topic?.topic_id}`;
            const response = await fetch(url, {
                method: HTTPTypes.PATCH,
                body: JSON.stringify(payload),
                headers: {
                    "Content-Type": ContentTypes.JSON,
                    "Authorization": `Bearer ${authUser?.token}`,
                }
            });

            const topicBody = await response.json();

            if (!response.ok) {
                console.log(topicBody);

                setDialogTitle("Erro na Atualização");
                setDialogMessage("Não foi possível atualizar este assunto!");

                return;
            }

            setSuccess(true);
            setDialogTitle("Sucesso");
            setDialogMessage("Assunto atualizado com sucesso!");
        }
        catch (error) {
            console.error(error);

            setDialogTitle("Erro no Servidor");
            setDialogMessage("Não foi possível atualizar este assunto!");
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

    const seeConfirmDeleteDialog = () => (<DialogConfirm
        name={"delete-subject-confirm"}
        title={"Atenção"}
        message={"Tem certeza que deseja excluir esse assunto?"}
        yesFunction={handleDeleteTopic}
        closeFunction={setShowConfirmDeleteDialog} />);

    return (
        <form>
            {showDialog && (seeDialog())}
            {showConfirmDeleteDialog && (seeConfirmDeleteDialog())}
            <h1>Detalhes do Assunto</h1>
            <ContentWide>
                <ContentCard>
                    <InputText
                        labelContent={"Disciplina*"}
                        name={"subject"}
                        placeholder={"123"}
                        required={true}
                        disabled={true}
                        value={subjectName}
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

                    <ButtonNew
                        buttonContent={"Atualizar Assunto"}
                        buttonType={HtmlType.BUTTON}
                        name={"update-topic-button"}
                        styles={{
                            bg_color: Colors.GREEN,
                            bg_hover: Colors.GREEN_HOVER,
                            font_color: Colors.WHITE
                        }}
                        onClickFunction={handleUpdateTopic}
                    />
                    <div style={{ height: "12px", width: "100%" }}></div>
                    <ButtonNew
                        buttonContent={"Finalizar Assunto"}
                        buttonType={HtmlType.BUTTON}
                        name={"finish-topic-button"}
                        styles={{
                            bg_color: Colors.BLACK,
                            bg_hover: Colors.BLACK_HOVER,
                            font_color: Colors.WHITE
                        }}
                        onClickFunction={handleFinishTopic}
                    />
                    <div style={{ height: "12px", width: "100%" }}></div>
                    <ButtonNew
                        buttonContent={"Excluir Assunto"}
                        buttonType={HtmlType.BUTTON}
                        name={"delete-topic-button"}
                        styles={{
                            bg_color: Colors.RED,
                            bg_hover: Colors.RED_HOVER,
                            font_color: Colors.WHITE
                        }}
                        onClickFunction={() => setShowConfirmDeleteDialog(true)}
                    />
                </ContentCard>
            </ContentWide>
        </form>
    );
};
