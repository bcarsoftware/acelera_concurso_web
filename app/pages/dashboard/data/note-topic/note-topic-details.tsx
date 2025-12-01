import {ContentWide} from "~/pages/dashboard/components/content-wide";
import {ContentCard} from "~/pages/dashboard/components/content-card";
import {InputText} from "~/pages/dashboard/components/input-text";
import {HtmlType} from "../../../../../enums/html-type";
import {Colors} from "../../../../../enums/colors";
import {ButtonNew} from "~/pages/dashboard/components/button";
import type {NoteTopicResponse} from "../../../../../data/data";
import {useAuth} from "../../../../../context/auth-context";
import {useEffect, useState} from "react";
import {Dialog} from "~/dialog/dialog";
import {ContentTypes, EnvironConstants} from "../../../../../enums/constants";
import {HTTPTypes} from "../../../../../enums/http-types";
import {DialogConfirm} from "~/dialog/dialog-confirm";
import {Select} from "~/pages/dashboard/components/select";
import {QuestionScreen} from "../../../../../enums/question-screen";

interface INoteTopicDetails {
    topicName?: string;
    noteTopic?: NoteTopicResponse;
    reflashUser: (value: boolean) => void;
    settingQuestion: (value: boolean) => void;
    selectScreen: (value: QuestionScreen) => void;
    currentScreen: (value: boolean) => void;
    goingToMainPage: () => void;
}

export const NoteTopicDetails = (
    { topicName, noteTopic, reflashUser,
        settingQuestion, selectScreen, currentScreen, goingToMainPage }: INoteTopicDetails
) => {
    const [noteTopicName, setNoteTopicName] = useState<string>("");
    const [noteTopicDescription, setNoteTopicDescription] = useState<string>("");
    const [rateSuccess, setRateSuccess] = useState<number | null>(null);
    const [showConfirmDeleteDialog, setShowConfirmDeleteDialog] = useState<boolean>(false);

    const [showDialog, setShowDialog] = useState<boolean>(false);
    const [dialogTitle, setDialogTitle] = useState<string>("");
    const [dialogMessage, setDialogMessage] = useState<string>("");

    const userAuth = useAuth();

    const [success, setSuccess] = useState<boolean>(false);

    useEffect(() => {
        if (userAuth?.isLoading) return;

        setNoteTopicName(noteTopic?.name || "");
        setNoteTopicDescription(noteTopic?.description || "");
        setRateSuccess(noteTopic?.rate_success || 0);
    }, []);

    const handleUpdateNoteTopic = async () => {
        const payload = {
            topic_id: noteTopic?.topic_id,
            name: noteTopicName,
            description: noteTopicDescription,
            finish: false,
            rate_success: null,
            deleted: false,
        };

        try {
            const url = `${EnvironConstants.API_BASE_URL}/note-topic/${noteTopic?.note_topic_id}`;

            const response = await fetch(url, {
                method: HTTPTypes.PATCH,
                body: JSON.stringify(payload),
                headers: {
                    "Content-Type": ContentTypes.JSON,
                    "Authorization": `Bearer ${userAuth?.token}`,
                }
            });

            const updated = await response.json();

            if (!response.ok) {
                console.log(updated);

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

    const handleFinishNoteTopic = async () => {
        try {
            const url = `${EnvironConstants.API_BASE_URL}/note-topic/${noteTopic?.note_topic_id}/finish`;

            const response = await fetch(url, {
                method: HTTPTypes.PATCH,
                headers: {
                    "Content-Type": ContentTypes.JSON,
                    "Authorization": `Bearer ${userAuth?.token}`,
                }
            });

            const finished = await response.json();

            if (!response.ok) {
                console.log(finished);

                setDialogTitle("Erro ao Finalizar");
                setDialogMessage("Não foi possível finalizar essa nota de assunto!");

                return;
            }

            setDialogTitle("Sucesso");
            setDialogMessage("Nota de assunto finalizada com sucesso!");
            setSuccess(true);
            reflashUser(true);
        }
        catch (error) {
            console.error(error);

            setDialogTitle("Erro no Servidor");
            setDialogMessage("Não foi possível finalizar essa nota de assunto!");
        }
        finally { setShowDialog(true); }
    };

    const handleDeleteNoteTopic = async () => {
        try {
            const url = `${EnvironConstants.API_BASE_URL}/note-topic/${noteTopic?.note_topic_id}`;

            const response = await fetch(url, {
                method: HTTPTypes.DELETE,
                headers: {
                    "Content-Type": ContentTypes.JSON,
                    "Authorization": `Bearer ${userAuth?.token}`,
                }
            });

            const deleted = await response.json();

            if (!response.ok) {
                console.log(deleted);

                setDialogTitle("Erro ao Excluir");
                setDialogMessage("Não foi possível excluir essa nota de assunto!");

                return;
            }

            setDialogTitle("Sucesso");
            setDialogMessage("Nota de assunto excluída com sucesso!");
            setSuccess(true);
        }
        catch (error) {
            console.error(error);

            setDialogTitle("Erro no Servidor");
            setDialogMessage("Não foi possível excluir essa nota de assunto!");
        }
        finally {
            setShowConfirmDeleteDialog(false);
            setShowDialog(true);
        }
    };

    const solveQuestions = async () => {
        currentScreen(false);
        selectScreen(QuestionScreen.NOTE_TOPIC);
        settingQuestion(true);
    }

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
    };

    const seeConfirmDeleteDialog = () => (<DialogConfirm
        name={"delete-subject-confirm"}
        title={"Atenção"}
        message={"Tem certeza que deseja excluir essa nota de assunto?"}
        yesFunction={handleDeleteNoteTopic}
        closeFunction={setShowConfirmDeleteDialog} />);

    return (
        <form>
            {showDialog && (seeDialog())}
            {showConfirmDeleteDialog && (seeConfirmDeleteDialog())}
            <h1>Detalhes da Nota de Assunto</h1>
            <ContentWide>
                <ContentCard>
                    <InputText
                        labelContent={"Nome do Assunto"}
                        name={"topic-name"}
                        placeholder={"Nome do Assunto"}
                        required={true}
                        disabled={true}
                        value={topicName}
                    />
                    <InputText
                        labelContent={"Nota de Assunto*"}
                        name={"note-topic-name"}
                        placeholder={"Nome da Nota Assunto"}
                        required={true}
                        disabled={false}
                        value={noteTopicName}
                        updateValue={setNoteTopicName}
                    />
                    <InputText
                        labelContent={"Descrição do Assunto*"}
                        name={"note-topic-description"}
                        placeholder={"Descrição da Nota Assunto"}
                        required={true}
                        disabled={false}
                        value={noteTopicDescription}
                        updateValue={setNoteTopicDescription}
                    />
                    <InputText
                        labelContent={"Taxa de Sucesso"}
                        name={"rate-success"}
                        placeholder={"0% ... 100%"}
                        required={true} disabled={true}
                        value={`${rateSuccess || 0}%`}
                    />
                    <Select
                        name={"finished-note-subject"}
                        required={true}
                        disabled={true}
                        label={"Finalizado?"}
                        value={`${noteTopic?.finish}`}
                    ><option value={"true"}>SIM</option>
                        <option value={"false"}>NÃO</option>
                    </Select>

                    <ButtonNew
                        buttonContent={"Atualizar Nota de Assunto"}
                        buttonType={HtmlType.BUTTON}
                        name={"new-note-topic-button"}
                        styles={{
                            bg_color: Colors.GREEN,
                            bg_hover: Colors.GREEN_HOVER,
                            font_color: Colors.WHITE
                        }}
                        onClickFunction={handleUpdateNoteTopic}
                    />
                    <div style={{ height: "12px", width: "100%" }}></div>
                    <ButtonNew
                        buttonContent={"Resolver Questões"}
                        buttonType={HtmlType.BUTTON}
                        name={"solve-note-topic-questions"}
                        styles={{
                            bg_color: Colors.LIGHT_BLUE,
                            bg_hover: Colors.LIGHT_BLUE_HOVER,
                            font_color: Colors.WHITE
                        }}
                        onClickFunction={solveQuestions}
                    />
                    <div style={{ height: "12px", width: "100%" }}></div>
                    <ButtonNew
                        buttonContent={"Finalizar Nota de Assunto"}
                        buttonType={HtmlType.BUTTON}
                        name={"finish-note-topic-button"}
                        styles={{
                            bg_color: Colors.BLACK,
                            bg_hover: Colors.BLACK_HOVER,
                            font_color: Colors.WHITE,
                        }}
                        onClickFunction={handleFinishNoteTopic}
                    />
                    <div style={{ height: "12px", width: "100%" }}></div>
                    <ButtonNew
                        buttonContent={"Excluir Nota de Assunto"}
                        buttonType={HtmlType.BUTTON}
                        name={"delete-note-topic-button"}
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
