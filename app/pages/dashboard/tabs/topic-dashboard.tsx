import type {Route} from "../../../../.react-router/types/app/routes/+types/home";
import type {NoteTopicResponse, PublicTenderResponse, SubjectResponse, TopicResponse} from "../../../../data/data";
import {Dialog} from "~/dialog/dialog";
import {useAuth} from "../../../../context/auth-context";
import {type ChangeEvent, useEffect, useState} from "react";
import {Colors} from "../../../../enums/colors";
import {ContentWide} from "~/pages/dashboard/components/content-wide";
import {ContentTypes, EnvironConstants} from "../../../../enums/constants";
import {HTTPTypes} from "../../../../enums/http-types";
import {ContentCard} from "~/pages/dashboard/components/content-card";
import {Select} from "~/pages/dashboard/components/select";
import {ButtonNew} from "~/pages/dashboard/components/button";
import {HtmlType} from "../../../../enums/html-type";

export function meta({}: Route.MetaArgs) {
    return [
        { title: "Assuntos Acelera Concurso" },
        { name: "description", content: "Sua melhor preparação!" },
    ];
}

interface ITopic {
    setShowNewTopic: (value: boolean) => void;
    setShowNewNoteTopic: (value: boolean) => void;

    setShowDetailsTopic: (value: boolean) => void;
    setShowDetailsNoteTopic: (value: boolean) => void;

    dashboardSubject: (subject?: SubjectResponse) => void;
    dashboardTopic: (publicTender?: TopicResponse) => void;
    dashboardNoteTopic: (note?: NoteTopicResponse) => void;
    showThisPage: (value: boolean) => void;
}

export default function TopicDashboardPage (
    {
        setShowNewTopic,
        setShowNewNoteTopic,

        setShowDetailsTopic,
        setShowDetailsNoteTopic,

        dashboardSubject,
        dashboardTopic,
        dashboardNoteTopic,
        showThisPage,
    }: ITopic
) {
    const authUser = useAuth();

    const [publicTenders, setPublicTenders] = useState<PublicTenderResponse[]>([]);
    const [subjects, setSubjects] = useState<SubjectResponse[]>([]);
    const [topics, setTopics] = useState<TopicResponse[]>([]);

    const [noteTopics, setNoteTopics] = useState<NoteTopicResponse[]>([]);

    const [selectedTopic, setSelectedTopic] = useState<TopicResponse | undefined>(undefined);

    const [indexPublicTender, setIndexPublicTender] = useState<string>("-1");
    const [indexSubject, setIndexSubject] = useState<string>("-1");

    const [showDialog, setShowDialog] = useState<boolean>(false);
    const [dialogTitle, setDialogTitle] = useState<string>("");
    const [dialogMessage, setDialogMessage] = useState<string>("");

    useEffect(() => {
        if (authUser?.isLoading) return;

        gettingPublicTenders().then();
    }, []);

    const gettingPublicTenders = async () => {
        try {
            const url = `${EnvironConstants.API_BASE_URL}/public-tender`;
            const response = await fetch(url, {
                method: HTTPTypes.GET,
                headers: {
                    "Content-Type": ContentTypes.JSON,
                    "Authorization": `Bearer ${authUser?.token}`,
                    "UserID": `${authUser?.user?.user_id}`
                }
            });

            const tenders = await response.json();

            if (!response.ok) {
                setPublicTenders([]);
                return;
            }

            setPublicTenders(tenders.data);
        }
        catch (error) {
            setPublicTenders([]);
        }
    };

    const gettingSubjects = async (index: number) => {
        try {
            const publicTenderId = publicTenders[index].public_tender_id;

            const url = `${EnvironConstants.API_BASE_URL}/subject`;
            const response = await fetch(url, {
                method: HTTPTypes.GET,
                headers: {
                    "Content-Type": ContentTypes.JSON,
                    "Authorization": `Bearer ${authUser?.token}`,
                    "TenderID": `${publicTenderId}`,
                }
            });

            const subjectData = await response.json();

            if (!response.ok) {
                setSubjects([]);
                setTopics([]);
                setNoteTopics([]);
                dashboardTopic(undefined);
                return;
            }

            setSubjects(subjectData.data);
        }
        catch (error) {
            setSubjects([]);
            setTopics([]);
            setNoteTopics([]);
            dashboardTopic(undefined);
        }
    };

    const gettingTopics = async (index: number) => {
        try {
            const subjectId = subjects[index].subject_id;

            const url = `${EnvironConstants.API_BASE_URL}/topic`;
            const response = await fetch(url, {
                method: HTTPTypes.GET,
                headers: {
                    "Content-Type": ContentTypes.JSON,
                    "Authorization": `Bearer ${authUser?.token}`,
                    "SubjectID": `${subjectId}`,
                }
            });

            const topicData = await response.json();

            if (!response.ok) {
                setTopics([]);
                setNoteTopics([]);
                dashboardTopic(undefined);
                dashboardNoteTopic(undefined);
                return;
            }

            setTopics(topicData.data);
        }
        catch (error) {
            setTopics([]);
            setNoteTopics([]);
            dashboardTopic(undefined);
            dashboardNoteTopic(undefined);
        }
    };

    const gettingNoteTopics = async (topicId: number) => {
        try {
            const url = `${EnvironConstants.API_BASE_URL}/note-topic/${topicId}/topic`;
            const response = await fetch(url, {
                method: HTTPTypes.GET,
                headers: {
                    "Content-Type": ContentTypes.JSON,
                    "Authorization": `Bearer ${authUser?.token}`,
                }
            });

            const noteTopics = await response.json();

            if (!response.ok) {
                setNoteTopics([]);
                dashboardNoteTopic(undefined);
                return;
            }

            setNoteTopics(noteTopics.data);
        }
        catch (error) {
            setNoteTopics([]);
            dashboardNoteTopic(undefined);
        }
    };

    const handleGoingToCreateNoteTopic = () => {
        showThisPage(false);
        setShowNewNoteTopic(true);
    };

    const handleGoingToTopicRegister = () => {
        if (indexSubject === "-1") {
            setDialogTitle("Erro na Disciplina");
            setDialogMessage("Primeiro selecione uma disciplina!");
            setShowDialog(true);
            return;
        }

        showThisPage(false);
        setShowNewTopic(true);
    };

    const selectingPublicTender = async (value: string) => {
        const index = parseInt(value);

        if (index === -1) {
            setSubjects([]);
            setTopics([]);
            setNoteTopics([]);
            setSelectedTopic(undefined);
            setIndexPublicTender(value);
            setIndexSubject(value);
            dashboardSubject(undefined);
            dashboardTopic(undefined);
            dashboardNoteTopic(undefined);
            return;
        }

        setIndexPublicTender(value);
        setIndexSubject("-1");
        await gettingSubjects(index);
    }

    const selectingSubjects = async (value: string) => {
        const index = parseInt(value);

        if (index === -1) {
            setTopics([]);
            setNoteTopics([]);
            setIndexSubject(value);
            setSelectedTopic(undefined);
            dashboardSubject(undefined);
            dashboardNoteTopic(undefined);
            return;
        }

        setSelectedTopic(undefined);
        setNoteTopics([]);

        setIndexSubject(value);
        dashboardSubject(subjects[index]);
        await gettingTopics(index);
    };

    const handleSelectTopic = async (
        topicData: TopicResponse,
        event: ChangeEvent<HTMLInputElement>,
    ) => {
        if (event.target.checked) {
            setSelectedTopic(topicData);
            await gettingNoteTopics(topicData.topic_id);
            dashboardTopic(topicData);
        }

        else {
            setSelectedTopic(undefined);
            dashboardTopic(undefined);
            setNoteTopics([]);
        }
    }

    const seeDialog = () => (<Dialog
        name={"dialog-result"}
        title={dialogTitle}
        message={dialogMessage}
        buttonText={"Fechar"}
        closeFunction={setShowDialog}
        zIndex={1001}
    />);

    return (<div>
        <form>
            {showDialog && (seeDialog())}
            <StyleTopic />
            <h1>Mural de Assuntos</h1>
            <ContentWide>
                <ContentCard>
                    <Select
                        name={"topic-public-tenders"}
                        required={true}
                        disabled={false}
                        label={"Selecione o Concurso*"}
                        value={indexPublicTender}
                        updateValue={selectingPublicTender}
                    >
                        <option value={"-1"}>Selecione o Concurso</option>
                        {publicTenders.map((publicTender, index) => (
                            <option key={index} value={`${index}`}>{publicTender.tender_name}</option>
                        ))}
                    </Select>
                    <Select
                        name={"topic-subjects"}
                        required={true}
                        disabled={false}
                        label={"Selecione a Disciplina*"}
                        value={indexSubject}
                        updateValue={selectingSubjects}
                    >
                        <option value={"-1"}>Selecione a Disciplina</option>
                        {subjects.map((subject, index) => (
                            <option key={index} value={`${index}`}>{subject.name}</option>
                        ))}
                    </Select>
                    <ButtonNew
                        buttonContent={"Cadastrar Novo Assunto"}
                        buttonType={HtmlType.BUTTON}
                        name={"btn-new-topic"}
                        styles={{
                            bg_color: Colors.GREEN,
                            bg_hover: Colors.GREEN_HOVER,
                            font_color: Colors.WHITE,
                        }}
                        onClickFunction={handleGoingToTopicRegister}
                    />
                </ContentCard>
            </ContentWide>
            <div style={{ height: "12px", width: "100%" }}></div>
            <ContentWide>
                <ContentCard>
                    <h1>Assuntos</h1>
                    <ContentCard>
                        {topics.map((topic) => {
                            return (
                                <div className="check-tip" key={topic.topic_id}>
                                    <input
                                        onChange={(event) =>
                                            handleSelectTopic(topic, event)}
                                        className="checkbutton"
                                        type="checkbox"
                                    />
                                    <section
                                        onClick={() => {
                                            dashboardTopic(topic);
                                            showThisPage(false);
                                            setShowDetailsTopic(true);
                                        }}
                                        className={"section"}>
                                        <p className={"text-section"}>{
                                            `${topic.name}: ${topic.description}`
                                        }</p>
                                    </section>
                                </div>
                            );
                        })}
                    </ContentCard>
                </ContentCard>
            </ContentWide>
            <div style={{ height: "12px", width: "100%" }}></div>
            <ContentWide>
                <ContentCard>
                    <h1>{"Notas dos Assuntos" + (noteTopics.length > 0 ? `: ${noteTopics.length}` : "")}</h1>
                    {selectedTopic && <h2 id={"AddNote"} onClick={handleGoingToCreateNoteTopic}>
                        Adicionar Nota</h2>}
                    <ContentCard>
                        {noteTopics.map((noteTopic) => (
                            <section
                                onClick={() => {
                                    dashboardNoteTopic(noteTopic);
                                    showThisPage(false);
                                    setShowDetailsNoteTopic(true);
                                }}
                            ><p className={"text-section"}>{noteTopic.name + ": " + noteTopic.description}</p>
                            </section>
                        ))}
                    </ContentCard>
                </ContentCard>
            </ContentWide>
        </form>
    </div>);
}

const StyleTopic = () => (<style>{`
    #AddNote {
        color: ${Colors.LIGHT_BLUE};
        cursor: pointer;
    }
    #AddNote:hover {
        color: ${Colors.LIGHT_BLUE_HOVER};
        text-decoration: underline;
    }
    .check-tip {
        display: flex;
    }
    .section {
        width: 100%;
    }
`}</style>);
