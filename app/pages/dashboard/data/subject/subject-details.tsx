import {ContentWide} from "~/pages/dashboard/components/content-wide";
import {ContentCard} from "~/pages/dashboard/components/content-card";
import {InputText} from "~/pages/dashboard/components/input-text";
import {InputNumber} from "~/pages/dashboard/components/input-number";
import {SelectCategory} from "~/pages/dashboard/components/select-category";
import {SelectStatus} from "~/pages/dashboard/components/select-status";
import {HtmlType} from "../../../../../enums/html-type";
import {Colors} from "../../../../../enums/colors";
import {ButtonNew} from "~/pages/dashboard/components/button";
import {EnumCategory, EnumStatus, type SubjectResponse} from "../../../../../data/data";
import {useEffect, useState} from "react";
import {Dialog} from "~/dialog/dialog";
import {DialogConfirm} from "~/dialog/dialog-confirm";
import {ContentTypes, EnvironConstants} from "../../../../../enums/constants";
import {HTTPTypes} from "../../../../../enums/http-types";
import {useAuth} from "../../../../../context/auth-context";
import {QuestionScreen} from "../../../../../enums/question-screen";

interface ISubjectDetails {
    subject?: SubjectResponse;
    publicTenderName?: string;
    reflashUser: (value: boolean) => void;
    settingQuestion: (value: boolean) => void;
    selectScreen: (value: QuestionScreen) => void;
    currentScreen: (value: boolean) => void;
    goingToMainPage: () => void;
}

export const SubjectDetails = (
    { subject, publicTenderName, reflashUser,
        settingQuestion, selectScreen, currentScreen, goingToMainPage }: ISubjectDetails
) => {
    const authUser = useAuth();

    const [tenderName, setTenderName] = useState<string>("");

    const [subjectId, setSubjectId] = useState<number>(-1111);
    const [name, setName] = useState<string>("");
    const [category, setCategory] = useState<EnumCategory | string>("");
    const [status, setStatus] = useState<EnumStatus | string | undefined>("");

    const [showConfirmDeleteDialog, setShowConfirmDeleteDialog] = useState<boolean>(false);
    const [showDialog, setShowDialog] = useState<boolean>(false);
    const [dialogTitle, setDialogTitle] = useState<string>("");
    const [dialogMessage, setDialogMessage] = useState<string>("");

    const [success, setSuccess] = useState<boolean>(false);

    useEffect(() => {
        if (authUser?.isLoading) return;

        if (!publicTenderName || !subject) {
            goingToMainPage();
            return;
        }

        setTenderName(publicTenderName);

        setSubjectId(subject.subject_id);
        setName(subject.name);
        setCategory(subject.category);
        setStatus(subject.status);
    }, []);

    const handleFinishSubject = async () => {
        try {
            const url = `${EnvironConstants.API_BASE_URL}/subject/${subjectId}/finish`
            const response = await fetch(url, {
                method: HTTPTypes.PATCH,
                headers: {
                    "Content-Type": ContentTypes.JSON,
                    "Authorization": `Bearer ${authUser?.token}`,
                }
            });

            const finishedSubject = await response.json();

            if (!response.ok) {
                console.log(finishedSubject);

                setDialogTitle("Erro ao Finalizar");
                setDialogMessage("Não foi possível finalizar a disciplina!");

                return;
            }

            setDialogTitle("Sucesso");
            setDialogMessage("Disciplina finalizada com sucesso!");
            setSuccess(true);
            reflashUser(true);
        }
        catch (error) {
            console.log(error);

            setDialogTitle("Erro no Servidor");
            setDialogMessage("Não foi possível finalizar a disciplina!");
        }
        finally {
            setShowDialog(true);
        }
    };

    const handleDeleteSubject = async () => {
        try {
            const url = `${EnvironConstants.API_BASE_URL}/subject/${subjectId}`;
            const response = await fetch(url, {
                method: HTTPTypes.DELETE,
                headers: {
                    "Content-Type": ContentTypes.JSON,
                    "Authorization": `Bearer ${authUser?.token}`
                }
            });

            const bodyDetails = await response.json();

            if (!response.ok) {
                console.log(bodyDetails);

                setDialogTitle("Erro na Exclusão");
                setDialogMessage("Não foi possível excluir esta disciplina!");

                return;
            }

            setDialogTitle("Sucesso");
            setDialogMessage("Disciplina excluída com sucesso!");
            setSuccess(true);
            reflashUser(true);
        }
        catch (error) {
            console.error(error);

            setDialogTitle("Erro no Servidor");
            setDialogMessage("Não foi possível excluir esta disciplina!");
        }
        finally {
            setShowConfirmDeleteDialog(false);
            setShowDialog(true);
        }
    };

    const handleUpdateSubject = async () => {
        const payload = {
            public_tender_id: subject?.public_tender_id,
            name: name,
            status: status,
            category: category,
            delete: false,
        };

        try {
            const url = `${EnvironConstants.API_BASE_URL}/subject/${subjectId}`;
            const response = await fetch(url, {
                method: HTTPTypes.PATCH,
                body: JSON.stringify(payload),
                headers: {
                    "Content-Type": ContentTypes.JSON,
                    "Authorization": `Bearer ${authUser?.token}`
                }
            });

            const bodyDetails = await response.json();

            if (!response.ok) {
                console.log(bodyDetails);

                setDialogTitle("Erro na Atualização");
                setDialogMessage("Não foi possível atualizar esta disciplina!");

                return;
            }

            setSuccess(true);
            setDialogTitle("Sucesso");
            setDialogMessage("Disciplina atualizada com sucesso!");
        }
        catch (error) {
            console.error(error);

            setDialogTitle("Erro no Servidor");
            setDialogMessage("Não foi possível atualizar esta disciplina!");
        }
        finally {
            setShowDialog(true);
        }
    };

    const solveQuestions = async () => {
        currentScreen(false);
        selectScreen(QuestionScreen.SUBJECT);
        settingQuestion(true);
    }

    const seeConfirmDeleteDialog = () => (<DialogConfirm
        name={"delete-subject-confirm"}
        title={"Atenção"}
        message={"Tem certeza que deseja excluir essa disciplina?"}
        yesFunction={handleDeleteSubject}
        closeFunction={setShowConfirmDeleteDialog} />);

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
            {showConfirmDeleteDialog && (seeConfirmDeleteDialog())}
            <h1>Detalhes da Disciplina</h1>
            <ContentWide>
                <ContentCard>
                    <InputNumber
                        labelContent={"ID Disciplina"}
                        name={"subject-id"}
                        placeholder={"123"}
                        required={true}
                        disabled={true}
                        value={subjectId}
                    />
                    <InputText
                        labelContent={"Nome do Concurso"}
                        name={"public-tender-name"}
                        placeholder={"Nome do Concurso"}
                        required={false}
                        disabled={true}
                        value={tenderName}
                    />
                    <InputText
                        labelContent={"Nome da Disciplina*"}
                        name={"subject-name"}
                        placeholder={"Nome da Disciplina"}
                        required={true}
                        disabled={false}
                        value={name}
                        updateValue={setName}
                    />
                    <SelectCategory value={category} updateValue={setCategory} disable={false} />
                    <SelectStatus value={status} updateValue={setStatus} disable={true} />

                    <ButtonNew
                        buttonContent={"Atualizar Disciplina"}
                        buttonType={HtmlType.BUTTON}
                        name={"update-subject-button"}
                        styles={{
                            bg_color: Colors.GREEN,
                            bg_hover: Colors.GREEN_HOVER,
                            font_color: Colors.WHITE
                        }}
                        onClickFunction={handleUpdateSubject}
                    />
                    <div style={{ height: "12px", width: "100%" }}></div>
                    <ButtonNew
                        buttonContent={"Resolver Questões"}
                        buttonType={HtmlType.BUTTON}
                        name={"solve-subject-questions"}
                        styles={{
                            bg_color: Colors.LIGHT_BLUE,
                            bg_hover: Colors.LIGHT_BLUE_HOVER,
                            font_color: Colors.WHITE
                        }}
                        onClickFunction={solveQuestions}
                    />
                    <div style={{ height: "12px", width: "100%" }}></div>
                    <ButtonNew
                        buttonContent={"Finalizar Disciplina"}
                        buttonType={HtmlType.BUTTON}
                        name={"finish-subject-button"}
                        styles={{
                            bg_color: Colors.BLACK,
                            bg_hover: Colors.BLACK_HOVER,
                            font_color: Colors.WHITE
                        }}
                        onClickFunction={handleFinishSubject}
                    />
                    <div style={{ height: "12px", width: "100%" }}></div>
                    <ButtonNew
                        buttonContent={"Excluir Disciplina"}
                        buttonType={HtmlType.BUTTON}
                        name={"delete-subject-button"}
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
}
