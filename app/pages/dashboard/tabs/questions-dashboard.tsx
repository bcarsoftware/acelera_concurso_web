import {QuestionScreen} from "../../../../enums/question-screen";
import {Select} from "~/pages/dashboard/components/select";
import {useEffect, useState} from "react";
import {ContentWide} from "~/pages/dashboard/components/content-wide";
import {InputText} from "~/pages/dashboard/components/input-text";
import {InputFile} from "~/pages/dashboard/components/input-file";
import {useAuth} from "../../../../context/auth-context";
import {ContentTypes, EnvironConstants} from "../../../../enums/constants";
import {HTTPTypes} from "../../../../enums/http-types";
import {StringToTitle} from "../../../../utils/string.utils";
import {HtmlType, InputTypes} from "../../../../enums/html-type";
import {InputNumber} from "~/pages/dashboard/components/input-number";
import {ContentCard} from "~/pages/dashboard/components/content-card";
import {ButtonNew} from "~/pages/dashboard/components/button";
import {Colors} from "../../../../enums/colors";
import {Dialog} from "~/dialog/dialog";
import {
    EnumLevel,
    type NoteSubjectResponse,
    type NoteTopicResponse,
    type PublicTenderResponse,
    type QuestionResponse,
    type SubjectResponse,
    type TopicResponse
} from "../../../../data/data";

interface IQuestion {
    screen: QuestionScreen;
    publicTender?: PublicTenderResponse;
    subject?: SubjectResponse;
    topic?: TopicResponse;
    noteSubject?: NoteSubjectResponse;
    noteTopic?: NoteTopicResponse;
    questionsGenerated?: QuestionResponse;
    settingQuestions: (questions?: QuestionResponse) => void;
    setSolveQuestionScreen: (value: boolean) => void;
    currentScreen: (value: boolean) => void;
}

export const QuestionsDashboardPage = (
    {
        screen,
        publicTender,
        subject,
        topic,
        noteSubject,
        noteTopic,
        questionsGenerated,
        settingQuestions,
        setSolveQuestionScreen,
        currentScreen
    }: IQuestion
) => {
    const authUser = useAuth();

    const [level, setLevel] = useState<string>("");
    const [status, setStatus] = useState<string>("");
    const [prompt, setPrompt] = useState<string>("");
    const [lawLink, setLawLink] = useState<string | undefined>(undefined);
    const [selectedPdf, setSelectedPdf] = useState<File | undefined>(undefined);

    const [questions, setQuestions] = useState<number>(20);

    const [otherBoard, setOtherBoard] = useState<boolean>(false);
    const [sail, setSail] = useState<string>("");

    const [subjectName, setSubjectName] = useState<string | undefined>(undefined);
    const [topicName, setTopicName] = useState<string | undefined>(undefined);
    const [topicDescription, setTopicDescription] = useState<string | undefined>(undefined);

    const [noteSubjectName, setNoteSubjectName] = useState<string | undefined>(undefined);
    const [noteTopicName, setNoteTopicName] = useState<string | undefined>(undefined);
    const [noteSubjectDescription, setNoteSubjectDescription] = useState<string | undefined>(undefined);
    const [noteTopicDescription, setNoteTopicDescription] = useState<string | undefined>(undefined);

    const [boardName, setBoardName] = useState<string>("");
    const [publicTenderName, setPublicTenderName] = useState<string | undefined>(undefined);

    const [boards, setBoards] = useState<string[]>([]);

    const [showDialog, setShowDialog] = useState<boolean>(false);
    const [dialogTitle, setDialogTitle] = useState<string>("");
    const [dialogMessage, setDialogMessage] = useState<string>("");

    useEffect(() => {
        if (authUser?.isLoading) return;

        gettingPublicTenderBoards().then();

        setSelectedPdf(undefined);

        setPublicTenderName(publicTender?.tender_name);
        setBoardName(publicTender?.tender_board || "");
        setLevel(publicTender?.tender_level || "");
        setSubjectName(subject?.name);
        setTopicName(topic?.name);
        setTopicDescription(topic?.description || undefined);
        setNoteTopicName(noteTopic?.name);
        setNoteTopicDescription(noteTopic?.description);
        setNoteSubjectName(noteSubject?.name);
        setNoteSubjectDescription(noteSubject?.description);
    }, []);

    const changeOtherBoard = () => {
        setOtherBoard(!otherBoard);
    };

    const gettingPublicTenderBoards = async () => {
        try {
            const url = `${EnvironConstants.API_BASE_URL}/public-tender-board/user`;
            const response = await fetch(url, {
                method: HTTPTypes.GET,
                headers: {
                    "Content-Type": ContentTypes.JSON,
                    "Authorization": `Bearer ${authUser?.token}`,
                }
            });

            const boardBody = await response.json();

            if (!response.ok) {
                setBoards([]);
                return;
            }

            setBoards(boardBody.data);
        }
        catch (error) {
            setBoards([]);
        }
    };

    const handleGenerateQuestions = async () => {
        const url = `${EnvironConstants.API_AI_BASE_URL}/question` + (
            selectedPdf ? "/from-pdf" : "/"
        );

        const payload = {
            level: level || EnumLevel.UNDEFINED,
            status: status,
            prompt: ("Please generate questions for public tender exam in Brazil. " + prompt).trim(),
            questions: questions,
            public_tender: publicTenderName,
            subject: subjectName,
            board_name: boardName,
            topic: topicName,
            law_link: lawLink,
        };

        const requestParams: { method: string, headers: {}, body: FormData | string | null } = {
            method: HTTPTypes.POST,
            headers: {},
            body: null,
        };

        if (selectedPdf) {
            const formData = new FormData();
            Object.entries(payload).forEach(([key, value]) => {
                const result = value != undefined ? value.toString() : "";
                formData.append(key.toString(), result);
            });
            formData.append("pdf_file", selectedPdf);

            requestParams.body = formData;

            requestParams.headers = {
                "Authorization": `Bearer ${EnvironConstants.AI_API_KEY}`,
            }
        }
        else {
            requestParams.headers = {
                "Content-Type": ContentTypes.JSON,
                "Authorization": `Bearer ${EnvironConstants.AI_API_KEY}`,
            };
            requestParams.body = JSON.stringify(payload);
        }

        try {
            const response = await fetch(url, requestParams);

            if (!response.ok) {
                setDialogTitle("Erro nas Questões");
                setDialogMessage("Não foi possível gerar as questões por inteligência artificial!");
                return;
            }

            const questions = await response.json();

            settingQuestions(questions);

            setDialogTitle("Sucesso");
            setDialogMessage("As questões foram geradas com sucesso!");
        }
        catch (error) {
            console.error(error);

            setDialogTitle("Erro no Servidor");
            setDialogMessage("Não foi possível gerar as questões por inteligência artificial!");
            settingQuestions(undefined);
        }
        finally {
            setShowDialog(true);
        }
    };

    const handlePdfGeneratedQuestions = async () => {
        if (!questionsGenerated) {
            setDialogTitle("Erro nas Questões");
            setDialogMessage("Primeiro gere as questões para obter o pdf!");
            setShowDialog(true);
            return;
        }

        const payload = {...questionsGenerated, public_tender: publicTenderName, board_name: boardName};

        try {
            const url = `${EnvironConstants.API_AI_BASE_URL}/question/convert/to-pdf`;
            const response = await fetch(url, {
                method: HTTPTypes.POST,
                body: JSON.stringify(payload),
                headers: {
                    "Content-Type": ContentTypes.JSON,
                    "Authorization": `Bearer ${EnvironConstants.AI_API_KEY}`,
                }
            });

            if (!response.ok) {
                setDialogTitle("Erro no PDF");
                setDialogMessage("Não foi possível obter o pdf das questões!");
                setShowDialog(true);
                return;
            }

            const pdfFile = await response.blob();

            const downloadUrl = URL.createObjectURL(pdfFile);
            const a = document.createElement("a");
            a.href = downloadUrl;
            a.download = "concurso-publico-e-gabarito.pdf";
            a.style.display = "none";

            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);

            URL.revokeObjectURL(downloadUrl);
        }
        catch (error) {
            console.error(error);

            setDialogTitle("Erro no Servidor");
            setDialogMessage("Não foi possível obter o pdf das questões!");
            setShowDialog(true);
        }
    };

    const handleSolveQuestions = async () => {
        if (!questionsGenerated) {
            setDialogTitle("Erro nas Questões");
            setDialogMessage("Primeiro gere as questões para resolvê-las!");
            setShowDialog(true);
            return;
        }

        currentScreen(false);
        setSolveQuestionScreen(true);
    };

    const Standard = () => (<ContentWide>
        <InputText
            labelContent={"Nome do Concurso"}
            name={"public-tender-name"}
            placeholder={"Nome do Concurso"}
            required={false}
            disabled={false}
            value={publicTenderName}
            updateValue={setPublicTenderName}
        />

        {otherBoard ? (
            <div id={"OtherBoardInfo"}>
                <div className={"div-25"}>
                    <InputText
                        labelContent={"Sigla da Banca*"}
                        name={"public-tender-sail"}
                        placeholder={"ABCD"}
                        required={true}
                        disabled={false}
                        value={sail.toUpperCase()}
                        updateValue={(value: string) => setSail(value.toUpperCase())}
                    />
                </div>
                <div className={"margin-left div-100"}>
                    <InputText
                        labelContent={"Banca do Concurso*"}
                        name={"public-tender-board"}
                        placeholder={"Nome da Banca do Concurso"}
                        required={true}
                        disabled={false}
                        value={StringToTitle(boardName)}
                        updateValue={(value: string) => setBoardName(StringToTitle(value))}
                    />
                </div>
            </div>
        ): (
            <Select
                name={"board-name"}
                required={true}
                disabled={false}
                label={"Selecione a Banca do Concurso*"}
                value={boardName}
                updateValue={setBoardName}
            ><option value={""}>Selecione a Banca</option>
                {boards.map((board) => (
                    <option value={board}>{board}</option>
                ))}
            </Select>
        )}

        <div id={"OtherBoard"}>
            <label htmlFor={"other-board"}>Banca Não Listada?</label>
            <input
                onChange={changeOtherBoard}
                className={"checkbutton"}
                type={InputTypes.CHECKBOX}
                name={"other-board"}
            />
        </div>

        <div className={"div-flex"}>
            <div className={"div-100"}>
                <Select
                    name={"school-requirements"}
                    required={true}
                    disabled={false}
                    label={"Escolaridade*"}
                    value={level}
                    updateValue={setLevel}>
                    <option value={"UNDEFINED"}>Não Definido</option>
                    <option value={"GRADUATED"}>Nível Superior</option>
                    <option value={"HIGH_SCHOOL"}>Nível Médio</option>
                    <option value={"TECHNICAL"}>Nível Técnico</option>
                </Select>
            </div>

            <Separator />

            <div className={"div-100"}>
                <Select
                    name={"questions-number"}
                    required={true}
                    disabled={false}
                    label={"Número de Alternativas*"}
                    value={status}
                    updateValue={setStatus}
                >
                    <option value={""}>Selecione</option>
                    <option value={"right wrong alternatives"}>2 Alternativas (Certo; Errado)</option>
                    <option value={"three alternatives"}>3 Alternativas</option>
                    <option value={"four alternatives"}>4 Alternativas</option>
                    <option value={"five alternatives"}>5 Alternativas</option>
                    <option value={"six alternatives"}>6 Alternativas</option>
                </Select>
            </div>

            <Separator />

            <div className={"div-100"}>
                <InputNumber
                    labelContent={"Número de Questões"}
                    name={"questions-number"}
                    placeholder={"123"}
                    required={true}
                    disabled={false}
                    value={questions}
                    updateValue={setQuestions}
                />
            </div>
        </div>

        <InputFile id={"input-pdf"} selectedPDF={selectedPdf} settingFileFunction={setSelectedPdf} />

        {!selectedPdf && (
            <InputText
                labelContent={"Link da Legislação"}
                name={"law-link"}
                placeholder={"https://law-link-example.gov/law-xx"}
                required={false}
                disabled={false}
                value={lawLink}
                updateValue={setLawLink}
            />
        )}
    </ContentWide>);
    const PanelButtons = () => (
        <ContentWide>
            <div className={"div-flex"}>
                <div className={"div-100"}>
                    <ButtonNew
                        buttonContent={"Gerar Questões por AI"}
                        buttonType={HtmlType.BUTTON}
                        name={"generate-questions-btn"}
                        styles={{
                            bg_color: Colors.GREEN,
                            bg_hover: Colors.GREEN_HOVER,
                            font_color: Colors.WHITE,
                        }}
                        onClickFunction={handleGenerateQuestions}
                    />
                </div>

                <Separator />

                <div className={"div-100"}>
                    <ButtonNew
                        buttonContent={"Baixar PDF + Gabarito"}
                        buttonType={HtmlType.BUTTON}
                        name={"generate-questions-pdf-btn"}
                        styles={{
                            bg_color: Colors.RED,
                            bg_hover: Colors.RED_HOVER,
                            font_color: Colors.WHITE,
                        }}
                        onClickFunction={handlePdfGeneratedQuestions}
                    />
                </div>

                <Separator />

                <div className={"div-100"}>
                    <ButtonNew
                        buttonContent={"Resolver Questões"}
                        buttonType={HtmlType.BUTTON}
                        name={"solve-questions-pdf-btn"}
                        styles={{
                            bg_color: Colors.BLACK,
                            bg_hover: Colors.BLACK_HOVER,
                            font_color: Colors.WHITE,
                        }}
                        onClickFunction={handleSolveQuestions}
                    />
                </div>
            </div>
        </ContentWide>
    );

    const Customized = () => (<ContentWide>
        <ContentCard><Standard />
            <InputText
                labelContent={"Informação adicional"}
                name={"extra-info"}
                placeholder={"Como você deseja que seja o estilo da prova"}
                required={false}
                disabled={false}
                value={prompt}
                updateValue={setPrompt}
            />
        <PanelButtons /></ContentCard></ContentWide>);
    const Subject = () => (<ContentWide>
        <ContentCard><Standard />
            <InputText
                labelContent={"Disciplina*"}
                name={"subject-name"}
                placeholder={"Nome da Disciplina"}
                required={true}
                disabled={false}
                value={subjectName}
                updateValue={setSubjectName}
            />
        <PanelButtons /></ContentCard>
    </ContentWide>);
    const Topic = () => (<ContentWide><ContentCard>
        <Standard />
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
                placeholder={"Descrição do Assunto"}
                required={false}
                disabled={false}
                value={topicDescription}
                updateValue={setTopicDescription}
            />
        <PanelButtons />
    </ContentCard></ContentWide>);
    const NoteSubject = () => (<ContentWide><ContentCard>
        <Standard />
            <InputText
                labelContent={"Nome da Nota de Disciplina*"}
                name={"note-subject-name"}
                placeholder={"Nome do Assunto"}
                required={true}
                disabled={false}
                value={noteSubjectName}
                updateValue={setNoteSubjectName}
            />

            <InputText
                labelContent={"Descrição da Nota de Disciplina*"}
                name={"topic-description"}
                placeholder={"Descrição da Nota de Disciplina"}
                required={true}
                disabled={false}
                value={noteSubjectDescription}
                updateValue={setNoteSubjectDescription}
            />
        <PanelButtons />
    </ContentCard></ContentWide>);
    const NoteTopic = () => (<ContentWide><ContentCard>
        <Standard />
            <InputText
                labelContent={"Nome da Nota de Assunto*"}
                name={"note-topic-name"}
                placeholder={"Nome da Nota de Assunto"}
                required={true}
                disabled={false}
                value={noteTopicName}
                updateValue={setNoteTopicName}
            />

            <InputText
                labelContent={"Descrição da Nota de Assunto*"}
                name={"note-topic-description"}
                placeholder={"Descrição da Nota de Assunto"}
                required={true}
                disabled={false}
                value={noteTopicDescription}
                updateValue={setNoteTopicDescription}
            />
        <PanelButtons />
    </ContentCard></ContentWide>);

    const seeDialog = () => (<Dialog
        name={"dialog-result"}
        title={dialogTitle}
        message={dialogMessage}
        buttonText={"Fechar"}
        closeFunction={setShowDialog}
        zIndex={1001}
    />);

    return (<div>
        {showDialog && (seeDialog())}
        <StyleQuestion />
        <h1>{
            "Gerador de Questões" + {
                SUBJECT: ": Disciplina",
                TOPIC: ": Assunto",
                NOTE_SUBJECT: ": Nota de Disciplina",
                NOTE_TOPIC: ": Nota de Assunto",
                CUSTOMIZED: "",
            }[screen]
        }</h1>
        <h2>Resolva questões e melhore seu nível!</h2>
        {screen === QuestionScreen.CUSTOMIZED && (Customized())}
        {screen === QuestionScreen.SUBJECT && (Subject())}
        {screen === QuestionScreen.TOPIC && (Topic())}
        {screen === QuestionScreen.NOTE_SUBJECT && (NoteSubject())}
        {screen === QuestionScreen.NOTE_TOPIC && (NoteTopic())}
    </div>);
};

const Separator = () => (<div style={{width: "22px"}}></div>);

const StyleQuestion = () => (<style>{`
    .div-flex {
        display: flex;
        width: 100%;
    }
    #OtherBoard {
        margin-bottom: 12px;
        display: flex;
    }
    #OtherBoard label {
        font-size: 1.05rem;
        font-weight: 550;
    }
    #OtherBoard input {
        width: 25px;
        height: 21px;
    }
    #OtherBoardInfo {
        display: flex;
    }
    .margin-left { margin-left: 12px; }
    .div-100 {
        width: 100%;
    }
    .div-25 {
        width: 25%;
    }
`}</style>);
