import type {
    NoteSubjectResponse,
    NoteTopicResponse,
    QuestionResponse,
    SubjectResponse,
    TopicResponse
} from "../../../../data/data";
import {ContentWide} from "~/pages/dashboard/components/content-wide";
import {ContentCard} from "~/pages/dashboard/components/content-card";
import {Colors} from "../../../../enums/colors";
import {HtmlFont, HtmlType} from "../../../../enums/html-type";
import {useEffect, useState} from "react";
import {ContentTypes, EnvironConstants} from "../../../../enums/constants";
import {HTTPTypes} from "../../../../enums/http-types";
import {Dialog} from "~/dialog/dialog";
import type {QuestionScreen} from "../../../../enums/question-screen";
import {ButtonNew} from "~/pages/dashboard/components/button";
import {DialogQuestionInfo} from "~/dialog/dialog-question-info";

type AnswersQuestions = {
    id: number;
    answer: string;
};

const getterLetter = (index: number): string => {
    let letter = 65;
    const letters: { [key: number]: string } = {};
    const questionsIndexes: number[] = Array.from({ length: 4 + 1}, (_, i) => i);
    questionsIndexes.forEach(key => {
        letters[key] = String.fromCharCode(letter);
        letter += 1;
    });
    return letters[index];
};

interface IQuestionsScreen {
    screen: QuestionScreen;
    questionsGenerated?: QuestionResponse;
    subject?: SubjectResponse;
    topic?: TopicResponse;
    noteSubject?: NoteSubjectResponse;
    noteTopic?: NoteTopicResponse;
    goingToMainPage: () => void;
}

export const QuestionsScreenSolver = (
    {
        screen,
        questionsGenerated,
        subject,
        topic,
        noteSubject,
        noteTopic,
        goingToMainPage,
    }: IQuestionsScreen
) => {
    const [answers, setAnswers] = useState<AnswersQuestions[]>([]);

    const [lengthQuestions, setLengthQuestions] = useState<number>(0);

    const [success, setSuccess] = useState<boolean>(false);
    const [showDialogQuestion, setShowDialogQuestion] = useState(false);
    const [showDialog, setShowDialog] = useState<boolean>(false);
    const [dialogTitle, setDialogTitle] = useState<string>("");
    const [dialogMessage, setDialogMessage] = useState<string>("");

    const [rateSuccess, setRateSuccess] = useState<number>(0);
    const [corrects, setCorrects] = useState<number>(0);
    const [mistakes, setMistakes] = useState<number>(0);

    useEffect(() => {
        const lengthQ = questionsGenerated?.questions.length || 0;

        setLengthQuestions(lengthQ);
    }, []);

    const manageAnswers = (question: AnswersQuestions) => {
        setAnswers(prevAnswers => {
            const index = prevAnswers.findIndex(answer => answer.id === question.id);
            if (index !== -1) {
                return prevAnswers.map(answer =>
                    answer.id === question.id ? question : answer
                );
            } else {
                return [...prevAnswers, question];
            }
        });
    };

    const calculateRateSuccess = async () => {
        if (answers.length === 0) {
            setDialogTitle("Atenção");
            setDialogMessage("Primeiro resolva as questões!");
            setShowDialog(true);
            return;
        }

        let correct = 0;

        questionsGenerated?.questions.forEach((question) => {
            console.log("question anwser: ", question.answer);
            for (const answer of answers) {
                if (question.id === answer.id) {
                    if ( question.answer === answer.answer ) {
                        console.log("answer answer: ", answer.answer);
                        correct += 1;
                    }
                }
            }
        })

        const rate = ( correct / lengthQuestions ) * 10 * 10;

        setRateSuccess(rate);
        setCorrects(correct);
        setMistakes(lengthQuestions - correct);
        setShowDialogQuestion(true);
    };

    const handlePDFDownloader = async () => {
        if (!questionsGenerated) {
            setDialogTitle("Erro no Donwload");
            setDialogMessage("Primeiro gere as questões para obter o pdf!");
            setShowDialog(true);
            return;
        }

        const payload = {...questionsGenerated, public_tender: questionsGenerated.public_tender,
            board_name: questionsGenerated.board_name};

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
                setDialogTitle("Erro no Donwload");
                setDialogMessage("Não foi possível obter o pdf das questões!");
                setShowDialog(true);
                return;
            }

            const pdfFile = (
                await response.blob()
            );
            const downloadUrl = (
                URL.createObjectURL(pdfFile)
            );
            const a = (
                document.createElement("a")
            );
            a.href = (
                downloadUrl
            );
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
            setDialogMessage("Não foi possível baixar o pdf das questões!");
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
    };

    const seeDialogQuestionInfo = () => (<DialogQuestionInfo
        name={"dialog-question-info"}
        title={"Atenção"}
        message={"Seu desempenho foi:"}
        rateSuccess={rateSuccess}
        corrects={corrects}
        mistakes={mistakes}
        registerFunction={() => {}}
        closeFunction={setShowDialogQuestion}
    />);

    return (<ContentWide>
        {showDialogQuestion && (seeDialogQuestionInfo())}
        {showDialog && (seeDialog())}
        <StyleQuestions />
        <h1>Resolução de Questões: Acelera Concurso</h1>
        <ContentCard>
            <h2>Concurso:<h2 className={"title-content"}>{questionsGenerated?.public_tender || "Não Definido"}</h2></h2>
            <h2>Banca:<h2 className={"title-content"}>{questionsGenerated?.board_name || "Não Definida"}</h2></h2>
            <h2>Disciplina:<h2 className={"title-content"}>{subject?.name || "Não Definida"}</h2></h2>
            <h2>Assunto:<h2 className={"title-content"}>{topic?.name || "Não Definido"}</h2></h2>
            <h2>Nota de Disciplina:<h2 className={"title-content"}>{noteSubject?.name || "Não Definida"}</h2></h2>
            <h2>Nota de Assunto:<h2 className={"title-content"}>{noteTopic?.name || "Não Definida"}</h2></h2>
            <div className={"content-length"}>
                <h2 id={"DownloadPDF"} onClick={handlePDFDownloader}>Baixar PDF das Questões</h2>
            </div>
        </ContentCard>
        <ContentCard>
            {
                questionsGenerated && questionsGenerated.questions.map((question, index) => {
                    return (<div>
                        <div key={question.id}>
                            <h2>{`${question.id} - ${question.question}`}</h2>
                            <div>
                                {question.alternatives && question.alternatives.map((value, id) => (
                                    <div key={id}>
                                        <input
                                            className={"radio-resp"} id={"alter-" + id}
                                            name={"alters-question-" + question.id} type="radio"
                                            onClick={() => manageAnswers({ id: question.id, answer: value })}
                                        />
                                        <label className={"alternative"} htmlFor={"alter-" + id}>
                                            ({getterLetter(id)}) {value}
                                        </label>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className={"separator"}></div>
                    </div>)
                })
            }
        </ContentCard>
        <ContentCard>
            <ButtonNew
                buttonContent={"Calcular Porcentagem de Acertos"}
                buttonType={HtmlType.SUBMIT}
                name={"calc-success-rate"}
                styles={{
                    bg_color: Colors.GREEN,
                    bg_hover: Colors.GREEN_HOVER,
                    font_color: Colors.WHITE,
                }}
                onClickFunction={calculateRateSuccess}
            />
        </ContentCard>
    </ContentWide>);
};

const StyleQuestions = () => (<style>{`
    #DownloadPDF {
        color: ${Colors.LIGHT_BLUE};
        cursor: pointer;
        text-decoration: underline;
    }
    #DownloadPDF:hover {
        color: ${Colors.RED};
    }
    h2 {display: flex}
    .content-length {
        display: flex;
    }
    .title-content {
        margin-left: 8px;
        font-weight: ${HtmlFont.NORMAL};
    }
    .alternative {
        font-size: 1.2rem;
    }
    .radio-resp {
        margin-right: 12px;
        font-size: 1.2rem;
        width: 2rem;
        height: 1.2rem;
    }
    .separator {
        height: 30px;
    }
`}</style>);
