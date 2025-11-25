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
import {InputTypes} from "../../../../enums/html-type";
import {InputNumber} from "~/pages/dashboard/components/input-number";

interface IQuestion {
    screen: QuestionScreen;
}

export const QuestionsDashboardPage = (
    { screen }: IQuestion
) => {
    const authUser = useAuth();

    const [level, setLevel] = useState<string>("");
    const [status, setStatus] = useState<string>("");
    const [prompt, setPrompt] = useState<string>("");
    const [lawLink, setLawLink] = useState<string | undefined>(undefined);
    const [selectedPdf, setSelectedPdf] = useState<File | undefined>(undefined);

    const [questions, setQuestions] = useState<number>(1);

    const [otherBoard, setOtherBoard] = useState<boolean>(false);
    const [sail, setSail] = useState<string>("");
    const [boardName, setBoardName] = useState<string>("");

    const [boards, setBoards] = useState<string[]>([]);

    useEffect(() => {
        if (authUser?.isLoading) return;

        gettingPublicTenderBoards().then();
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

    const Customized = () => (<ContentWide>
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

        <InputNumber
            labelContent={"Número de Questões"}
            name={"questions-number"}
            placeholder={"123"}
            required={true}
            disabled={false}
            value={questions}
            updateValue={setQuestions}
        />

        <InputText
            labelContent={"Informação adicional"}
            name={"extra-info"}
            placeholder={"Como você deseja que seja o estilo da prova"}
            required={false}
            disabled={false}
            value={prompt}
            updateValue={setPrompt}
        />

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

        <InputFile settingFileFunction={setSelectedPdf} />
    </ContentWide>);
    const Subject = () => (<div></div>);
    const Topic = () => (<div></div>);
    const NoteSubject = () => (<div></div>);
    const NoteTopic = () => (<div></div>);

    return (<div>
        <StyleQuestion />
        <h1>Mural de Questões</h1>
        <h2>Resolva questões e melhore seu nível!</h2>
        {screen === QuestionScreen.CUSTOMIZED && (Customized())}
        {screen === QuestionScreen.SUBJECT && (Subject())}
        {screen === QuestionScreen.TOPIC && (Topic())}
        {screen === QuestionScreen.NOTE_SUBJECT && (NoteSubject())}
        {screen === QuestionScreen.NOTE_TOPIC && (NoteTopic())}
    </div>);
};

const StyleQuestion = () => (<style>{`
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
