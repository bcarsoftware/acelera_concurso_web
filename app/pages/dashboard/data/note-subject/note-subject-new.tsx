import {ContentWide} from "~/pages/dashboard/components/content-wide";
import {ContentCard} from "~/pages/dashboard/components/content-card";
import {InputText} from "~/pages/dashboard/components/input-text";
import {HtmlType} from "../../../../../enums/html-type";
import {Colors} from "../../../../../enums/colors";
import {Button} from "~/pages/dashboard/components/button";
import type {SubjectResponse} from "../../../../../data/data";
import {useEffect, useState} from "react";
import {Dialog} from "~/dialog/dialog";
import {useAuth} from "../../../../../context/auth-context";
import {HTTPTypes} from "../../../../../enums/http-types";
import {ContentTypes, EnvironConstants} from "../../../../../enums/constants";

interface INoteSubject {
    subject?: SubjectResponse;
    goingToMainPage: () => void;
}

export const NoteSubjectNew = (
    { subject, goingToMainPage }: INoteSubject
) => {
    const authUser = useAuth();
    const [noteName, setNoteName] = useState<string>("");
    const [noteDescription, setNoteDescription] = useState<string>("");

    const [showDialog, setShowDialog] = useState<boolean>(false);
    const [dialogTitle, setDialogTitle] = useState<string>("");
    const [dialogMessage, setDialogMessage] = useState<string>("");

    const [success, setSuccess] = useState<boolean>(false);

    useEffect(() => {
        if (authUser?.isLoading) return;
    }, []);

    const handleNewNoteSubject = async () => {
        const payload = {
            subject_id: subject?.subject_id,
            name: noteName,
            description: noteDescription,
            finish: false,
            deleted: false,
        };

        try {
            const url = `${EnvironConstants.API_BASE_URL}/note-subject`;
            const response = await fetch(url, {
                method: HTTPTypes.POST,
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
                setDialogMessage("Não foi possível cadastrar essa nota de disciplina!");

                return;
            }

            setDialogTitle("Sucesso");
            setDialogMessage("Nota de disciplina cadastrada com sucesso!");
            setSuccess(true);
        }
        catch (error) {
            console.error(error);

            setDialogTitle("Erro no Servidor");
            setDialogMessage("Não foi possível cadastrar essa nota de disciplina!");
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
            <h1>Cadastro de Nota Disciplina</h1>
            <ContentWide>
                <ContentCard>
                    <InputText
                        labelContent={"Nome da Disciplina"}
                        name={"subject-id"}
                        placeholder={"123"}
                        required={true}
                        disabled={true}
                        value={subject?.name}
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

                    <Button
                        buttonContent={"Cadastrar Nota de Disciplina"}
                        buttonType={HtmlType.BUTTON}
                        name={"new-note-subject-button"}
                        styles={{
                            bg_color: Colors.GREEN,
                            bg_hover: Colors.GREEN_HOVER,
                            font_color: Colors.WHITE
                        }}
                        onClickFunction={handleNewNoteSubject}
                    />
                </ContentCard>
            </ContentWide>
        </form>
    );
};
