import {ContentWide} from "~/pages/dashboard/components/content-wide";
import {ContentCard} from "~/pages/dashboard/components/content-card";
import {InputText} from "~/pages/dashboard/components/input-text";
import {HtmlType} from "../../../../../enums/html-type";
import {Colors} from "../../../../../enums/colors";
import {ButtonNew} from "~/pages/dashboard/components/button";
import type {NoteSubjectResponse} from "../../../../../data/data";
import {useEffect, useState} from "react";
import {Dialog} from "~/dialog/dialog";
import {useAuth} from "../../../../../context/auth-context";
import {HTTPTypes} from "../../../../../enums/http-types";
import {ContentTypes, EnvironConstants} from "../../../../../enums/constants";
import {Select} from "~/pages/dashboard/components/select";
import {DialogConfirm} from "~/dialog/dialog-confirm";

interface INoteSubject {
    subjectName?: string;
    noteSubject?: NoteSubjectResponse;
    reflashUser: (value: boolean) => void;
    goingToMainPage: () => void;
}

export const NoteSubjectDetails = (
    { subjectName, noteSubject, reflashUser, goingToMainPage }: INoteSubject
) => {
    const authUser = useAuth();
    const [noteName, setNoteName] = useState<string>("");
    const [noteDescription, setNoteDescription] = useState<string>("");
    const [rateSuccess, setRateSuccess] = useState<number | null>(null);

    const [showConfirmDeleteDialog, setShowConfirmDeleteDialog] = useState<boolean>(false);
    const [showDialog, setShowDialog] = useState<boolean>(false);
    const [dialogTitle, setDialogTitle] = useState<string>("");
    const [dialogMessage, setDialogMessage] = useState<string>("");

    const [success, setSuccess] = useState<boolean>(false);

    useEffect(() => {
        if (authUser?.isLoading) return;

        setNoteName(noteSubject?.name || "");
        setNoteDescription(noteSubject?.description || "");
        setRateSuccess(noteSubject?.rate_success || 0);
    }, []);

    const handleUpdateNoteSubject = async () => {
        const payload = {
            subject_id: noteSubject?.subject_id,
            name: noteName,
            description: noteDescription,
            finish: false,
            deleted: false,
        };

        try {
            const url = `${EnvironConstants.API_BASE_URL}/note-subject/${noteSubject?.note_subject_id}`;
            const response = await fetch(url, {
                method: HTTPTypes.PATCH,
                body: JSON.stringify(payload),
                headers: {
                    "Content-Type": ContentTypes.JSON,
                    "Authorization": `Bearer ${authUser?.token}`,
                }
            });

            const noteSubjectNew = await response.json();

            if (!response.ok) {
                console.log(noteSubjectNew);

                setDialogTitle("Erro no Cadastro");
                setDialogMessage("Não foi possível atualizar essa nota de disciplina!");

                return;
            }

            setDialogTitle("Sucesso");
            setDialogMessage("Nota de disciplina atualizada com sucesso!");
            setSuccess(true);
        }
        catch (error) {
            console.error(error);

            setDialogTitle("Erro no Servidor");
            setDialogMessage("Não foi possível atualizar essa nota de disciplina!");
        }
        finally {
            setShowDialog(true);
        }
    };

    const handleFinishNoteSubject = async () => {
        const payload = {
            subject_id: noteSubject?.subject_id,
            name: noteName,
            description: noteDescription,
            rate_success: rateSuccess,
            finish: true,
            deleted: false,
        };

        try {
            const url = (
                `${EnvironConstants.API_BASE_URL}/note-subject/${noteSubject?.note_subject_id}/finish`
            );
            const response = await fetch(url, {
                method: HTTPTypes.PATCH,
                body: JSON.stringify(payload),
                headers: {
                    "Content-Type": ContentTypes.JSON,
                    "Authorization": `Bearer ${authUser?.token}`,
                }
            });

            const finished = await response.json();

            if (!response.ok) {
                console.log(finished);

                setDialogTitle("Erro ao Finalizar");
                setDialogMessage("Não foi possível finalizar essa nota de disciplina!");
                return;
            }

            setDialogTitle("Sucesso");
            setDialogMessage("Nota de disciplina finalizada com sucesso!");
            setSuccess(true);
            reflashUser(true);
        }
        catch (error) {
            console.error(error);

            setDialogTitle("Erro no Servidor");
            setDialogMessage("Não foi possível finalizar essa nota de disciplina!");
        }
        finally {
            setShowDialog(true);
        }
    }

    const handleDeleteNoteSubject = async () => {
        try {
            const url = `${EnvironConstants.API_BASE_URL}/note-subject/${noteSubject?.note_subject_id}`;
            const response = await fetch(url, {
                method: HTTPTypes.DELETE,
                headers: {
                    "Content-Type": ContentTypes.JSON,
                    "Authorization": `Bearer ${authUser?.token}`,
                }
            });

            const deleted = await response.json();

            if (!response.ok) {
                console.log(deleted);

                setDialogTitle("Erro na Exclusão");
                setDialogMessage("Não foi possível excluir essa nota de disciplina!");
                return;
            }

            setDialogTitle("Sucesso");
            setDialogMessage("Nota de disciplina excluída com sucesso!");
            setSuccess(true);
        }
        catch (error) {
            console.error(error);

            setDialogTitle("Erro no Servidor");
            setDialogMessage("Não foi possível excluir essa nota de disciplina!");
        }
        finally {
            setShowConfirmDeleteDialog(false);
            setShowDialog(true);
        }
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
    }

    const seeConfirmDeleteDialog = () => (<DialogConfirm
        name={"delete-subject-confirm"}
        title={"Atenção"}
        message={"Tem certeza que deseja excluir essa nota de disciplina?"}
        yesFunction={handleDeleteNoteSubject}
        closeFunction={setShowConfirmDeleteDialog} />);

    return (
        <form>
            {showDialog && (seeDialog())}
            {showConfirmDeleteDialog && (seeConfirmDeleteDialog())}
            <h1>Detalhes da Disciplina</h1>
            <ContentWide>
                <ContentCard>
                    <InputText
                        labelContent={"Nome da Disciplina"}
                        name={"subject-id"}
                        placeholder={"123"}
                        required={true}
                        disabled={true}
                        value={subjectName}
                    />
                    <InputText
                        labelContent={"Nota Disciplina*"}
                        name={"note-subject-name"}
                        placeholder={"Nome da Nota Disciplina"}
                        required={true}
                        disabled={false}
                        value={noteName}
                        updateValue={setNoteName}
                    />
                    <InputText
                        labelContent={"Descrição do Disciplina*"}
                        name={"note-subject-description"}
                        placeholder={"Descrição da Nota Disciplina"}
                        required={true}
                        disabled={false}
                        value={noteDescription}
                        updateValue={setNoteDescription}
                    />
                    <InputText
                        labelContent={"Taxa de Sucesso"}
                        name={"rate-success"}
                        placeholder={"0% ... 100%"}
                        required={true} disabled={true}
                        value={`${noteSubject?.rate_success || 0}%`}
                    />
                    <Select
                        name={"finished-note-subject"}
                        required={true}
                        disabled={true}
                        label={"Finalizado?"}
                        value={`${noteSubject?.finish}`}
                    ><option value={"true"}>SIM</option>
                        <option value={"false"}>NÃO</option>
                    </Select>

                    <ButtonNew
                        buttonContent={"Atualizar Nota de Disciplina"}
                        buttonType={HtmlType.BUTTON}
                        name={"update-note-subject-btn"}
                        styles={{
                            bg_color: Colors.GREEN,
                            bg_hover: Colors.GREEN_HOVER,
                            font_color: Colors.WHITE
                        }}
                        onClickFunction={handleUpdateNoteSubject}
                    />
                    <div style={{ height: "12px", width: "100%" }}></div>
                    <ButtonNew
                        buttonContent={"Finalizar Nota de Disciplina"}
                        buttonType={HtmlType.BUTTON}
                        name={"finish-note-subject-btn"}
                        styles={{
                            bg_color: Colors.BLACK,
                            bg_hover: Colors.BLACK_HOVER,
                            font_color: Colors.WHITE
                        }}
                        onClickFunction={handleFinishNoteSubject}
                    />
                    <div style={{ height: "12px", width: "100%" }}></div>
                    <ButtonNew
                        buttonContent={"Excluir Nota de Disciplina"}
                        buttonType={HtmlType.BUTTON}
                        name={"delete-note-subject-btn"}
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
