import {ContentWide} from "~/pages/dashboard/components/content-wide";
import {ContentCard} from "~/pages/dashboard/components/content-card";
import {ContentSquare} from "~/pages/dashboard/components/content-square";
import {type ChangeEvent, useEffect, useState} from "react";
import type {DataFunctionsScreen} from "../../../../types/data-functions-screen";
import {Dialog} from "~/dialog/dialog";
import {Colors} from "../../../../enums/colors";
import {HtmlFont, HtmlType} from "../../../../enums/html-type";
import type {
    NoteSubjectResponse,
    NoteTopicResponse,
    PublicTenderResponse,
    StudyTipsResponse,
    SubjectResponse,
    TopicResponse
} from "../../../../data/data";
import {useAuth} from "../../../../context/auth-context";
import {ContentTypes, EnvironConstants} from "../../../../enums/constants";
import {HTTPTypes} from "../../../../enums/http-types";
import {DialogConfirm} from "~/dialog/dialog-confirm";

export const MainDashboardPage = (
    props: DataFunctionsScreen
) => {
    const authUser = useAuth();
    const [noteSubjectChecked, setNoteSubjectChecked] = useState<boolean>(false);
    const [noteTopicChecked, setNoteTopicChecked] = useState<boolean>(false);

    const [confirmDeleteStudyTipsDialog, setConfirmDeleteStudyTipsDialog] = useState<boolean>(false);
    const [openDialog, setOpenDialog] = useState<boolean>(false);

    const [titleDialog, setTitleDialog] = useState<string>("");
    const [messageDialog, setMessageDialog] = useState<string>("");

    /* Data Arrays */
    const [publicTenders, setPublicTenders] = useState<PublicTenderResponse[]>([]);
    const [subjects, setSubjects] = useState<SubjectResponse[]>([]);
    const [topics, setTopics] = useState<TopicResponse[]>([]);
    const [studyTips, setStudyTips] = useState<StudyTipsResponse[]>([]);
    const [noteSubjects, setNoteSubjects] = useState<NoteSubjectResponse[]>([]);
    const [noteTopics, setNoteTopics] = useState<NoteTopicResponse[]>([]);
    /* Data Arrays */

    /* Getting Public Tenders */
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

            const bodyJs = await response.json();

            if (!response.ok) {
                setPublicTenders([])
                return;
            }

            setPublicTenders(bodyJs.data);
        }
        catch (error) {
            setPublicTenders([]);
        }
    };
    /* Getting Public Tenders */

    /* Getting Subjects */
    const gettingSubjects = async (pTenderId: number) => {
        try {
            const url = `${EnvironConstants.API_BASE_URL}/subject`;
            const response = await fetch(url, {
                method: HTTPTypes.GET,
                headers: {
                    "Content-Type": ContentTypes.JSON,
                    "Authorization": `Bearer ${authUser?.token}`,
                    "TenderID": `${pTenderId}`
                }
            });

            const bodyJs = await response.json();

            if (!response.ok) {
                setSubjects([])
                return;
            }

            setSubjects(bodyJs.data);
        }
        catch (error) {
            setSubjects([]);
        }
    };
    /* Getting Subjects */

    /* Getting Topics */
    const gettingTopics = async (subjectId: number) => {
        try {
            const url = `${EnvironConstants.API_BASE_URL}/topic`;
            const response = await fetch(url, {
                method: HTTPTypes.GET,
                headers: {
                    "Content-Type": ContentTypes.JSON,
                    "Authorization": `Bearer ${authUser?.token}`,
                    "SubjectID": `${subjectId}`
                }
            });

            const topicsBody = await response.json();

            if (!response.ok) {
                setTopics([]);
                return;
            }

            setTopics(topicsBody.data);
        }
        catch (error) { setTopics([]); }
    };
    /* Getting Topics */

    /* Getting Study Tips */
    const gettingStudyTips = async () => {
        try {
            const url = `${EnvironConstants.API_BASE_URL}/study-tips/${authUser?.user?.user_id}`;
            const response = await fetch(url, {
                method: HTTPTypes.GET,
                headers: {
                    "Content-Type": ContentTypes.JSON,
                    "Authorization": `Bearer ${authUser?.token}`,
                }
            });

            const tipsBody = await response.json();

            if (!response.ok) {
                setStudyTips([]);
                return;
            }

            setStudyTips(tipsBody.data);
        }
        catch (error) {
            setStudyTips([]);
        }
    };
    /* Getting Study Tips */

    /* Getting Note Topics */
    const gettingNoteTopics = async () => {
        if (!selectTopic) return;

        try {
            const url = `${EnvironConstants.API_BASE_URL}/note-topic/${selectTopic?.topic_id}/topic`;
            const response = await fetch(url, {
                method: HTTPTypes.GET,
                headers: {
                    "Content-Type": ContentTypes.JSON,
                    "Authorization": `Bearer ${authUser?.token}`,
                }
            });

            const noteTopicsBody = await response.json();

            if (!response.ok) {
                setNoteTopics([]);
                return;
            }

            setNoteTopics(noteTopicsBody.data);
        }
        catch (error) {
            setNoteTopics([]);
        }
    }
    /* Getting Note Topics */

    /* Getting Note Subjects */
    const gettingNoteSubjects = async () => {
        if (!selectSubject) return;

        try {
            const url = `${EnvironConstants.API_BASE_URL}/note-subject/${selectSubject?.subject_id}/subject`;
            const response = await fetch(url, {
                method: HTTPTypes.GET,
                headers: {
                    "Content-Type": ContentTypes.JSON,
                    "Authorization": `Bearer ${authUser?.token}`,
                }
            });

            const noteSubjectsBody = await response.json();

            if (!response.ok) {
                setNoteSubjects([]);
                return;
            }

            setNoteSubjects(noteSubjectsBody.data);
        }
        catch (error) {
            setNoteSubjects([]);
        }
    }
    /* Getting Note Subjects */

    useEffect(() => {
        if (authUser?.isLoading) return;

        const getPubTender = async () => await gettingPublicTenders();
        getPubTender().then();

        const getStudyTips = async () => await gettingStudyTips();
        getStudyTips().then();

        props.setSelectedPublicTender(undefined);
    }, []);

    const checkNoteSubject = async () => {
        if (!noteSubjectChecked) {
            setNoteSubjectChecked(!noteSubjectChecked);
            setNoteTopicChecked(noteSubjectChecked);
            setNoteTopics([]);
            await gettingNoteSubjects();
        } else {
            setNoteSubjectChecked(false);
            setNoteSubjects([]);
        }
    };

    const checkNoteTopic = async () => {
        if (!noteTopicChecked) {
            setNoteTopicChecked(!noteTopicChecked);
            setNoteSubjectChecked(noteTopicChecked);
            setNoteSubjects([]);
            await gettingNoteTopics();
        } else {
            setNoteTopicChecked(false);
            setNoteTopics([]);
        }
    }

    /* REGISTERS SCREENS */
    const settingAllFalse = () => {
        props.setShowNoteSubjectNew(false);
        props.setShowNoteTopicNew(false);
        props.setMainPage(false);
        props.setShowSubjectNew(false);
        props.setShowTopicNew(false);
        props.setShowPublicTenderNew(false);
        props.setShowStudyTipsNew(false);

        props.setShowPublicTenderDetails(false);
        props.setShowSubjectDetails(false);
        props.setShowTopicDetails(false);
        props.setShowStudyTipsDetails(false);
        props.setShowNoteSubjectDetails(false);
        props.setShowNoteTopicDetails(false);
    }

    const showPublicTenderNew = () => {
        settingAllFalse();
        props.setShowPublicTenderNew(true);
    }
    const showSubjectNew = () => {
        settingAllFalse();
        props.setShowSubjectNew(true);
    }
    const showTopicNew = () => {
        settingAllFalse();
        props.setShowTopicNew(true);
    }
    const showNoteSubjectNew = () => {
        settingAllFalse();
        props.setShowNoteSubjectNew(true);
    };
    const showNoteTopicNew = () => {
        settingAllFalse();
        props.setShowNoteTopicNew(true);
    };
    const showStudyTipsNew = () => {
        settingAllFalse();
        props.setShowStudyTipsNew(true);
    };
    const selectNote = () => {
        setMessageDialog("Selecione apenas um tipo de Nota!");
        setTitleDialog("Erro no Cadastro de Nota");

        if (noteSubjectChecked) {
            return showNoteSubjectNew();
        }
        else if (noteTopicChecked) {
            return showNoteTopicNew();
        }
        else {
            setOpenDialog(true);
            settingAllFalse();
            props.setMainPage(true);
        }
    };
    /* REGISTERS SCREENS */

    /* UPDATER SCREENS */
    const showPublicTenderDetails = () => {
        settingAllFalse();
        props.setShowPublicTenderDetails(true);
    }
    const showSubjectDetails = () => {
        settingAllFalse();
        props.setShowSubjectDetails(true);
    }
    const showTopicDetails = () => {
        settingAllFalse();
        props.setShowTopicDetails(true);
    }
    const showStudyTipsDetails = () => {
        settingAllFalse();
        props.setShowStudyTipsDetails(true);
    };
    const showNoteTopicDetails = () => {
        settingAllFalse();
        props.setShowNoteTopicDetails(true);
    };
    const showNoteSubjectDetails = () => {
        settingAllFalse();
        props.setShowNoteSubjectDetails(true);
    };
    /* UPDATER SCREENS */

    /* DATA SELECTED */
    const [selectPublicTender, setSelectPublicTender] = useState<PublicTenderResponse | undefined>(undefined);
    const [selectSubject, setSelectSubject] = useState<SubjectResponse | undefined>(undefined);
    const [selectTopic, setSelectTopic] = useState<TopicResponse | undefined>(undefined);
    const [selectIDSStudyTips, setSelectIDSStudyTips] = useState<number[]>([]);
    /* DATA SELECTED */

    const handleSelectPublicTender = async (
        publicTenderData: PublicTenderResponse,
        event: ChangeEvent<HTMLInputElement>,
    ) => {
        if (event.target.checked) {
            setSelectPublicTender(publicTenderData);
            props.setSelectedPublicTender(publicTenderData);
            await gettingSubjects(publicTenderData.public_tender_id);
        }

        else {
            setSelectPublicTender(undefined);
            props.setSelectedPublicTender(undefined);
            setSubjects([]);
        }
    }

    const handleSelectSubject = async (
        subjectData: SubjectResponse,
        event: ChangeEvent<HTMLInputElement>,
    )=> {
        if (event.target.checked) {
            setSelectSubject(subjectData);
            props.setSelectedSubject(subjectData);
            await gettingTopics(subjectData.subject_id);
        }

        else {
            setSelectTopic(undefined);
            props.setSelectedTopic(undefined);
            setTopics([]);
            setSelectSubject(undefined);
            props.setSelectedSubject(undefined);
        }
    }

    const handleSelectTopic = async (
        topicData: TopicResponse,
        event: ChangeEvent<HTMLInputElement>,
    ) => {
        if (event.target.checked) {
            setSelectTopic(topicData);
            props.setSelectedTopic(topicData);
        }

        else {
            setSelectTopic(undefined);
            props.setSelectedTopic(undefined);
        }
    };

    const handleSelectStudyTips = async (
        studyTipData: StudyTipsResponse,
        event: ChangeEvent<HTMLInputElement>,
    ) => {
        if (event.target.checked) {
            props.setSelectedStudyTips(studyTipData);
            setSelectIDSStudyTips(ids => [...ids, studyTipData.study_tip_id])
        }

        else {
            props.setSelectedStudyTips(undefined);
            setSelectIDSStudyTips(ids => ids.slice(0, selectIDSStudyTips.length - 1));
        }
    };

    const handleDeleteStudyTips = async () => {
        const payload = { ids: selectIDSStudyTips };

        try {
            const url = `${EnvironConstants.API_BASE_URL}/study-tips/${authUser?.user?.user_id}`;
            const response = await fetch(url, {
                method: HTTPTypes.DELETE,
                body: JSON.stringify(payload),
                headers: {
                    "Content-Type": ContentTypes.JSON,
                    "Authorization": `Bearer ${authUser?.token}`,
                }
            });

            const deletedBody = await response.json();

            if (!response.ok) {
                console.log(deletedBody);

                setTitleDialog("Erro na Exclusão");
                setMessageDialog("Não foi possível excluir essa nota de estudo!");
            }

            setTitleDialog("Sucesso");
            setMessageDialog("Nota de estudo excluída com sucesso!");
            await gettingStudyTips();
        }
        catch (error) {
            console.error(error);

            setTitleDialog("Erro no Servidor");
            setMessageDialog("Não foi possível excluir essa nota de estudo!");
        }
        finally {
            setConfirmDeleteStudyTipsDialog(false);
            setOpenDialog(true);
        }
    };

    const manageDeleteHandle = async () => {
        if (selectIDSStudyTips.length === 0) {
            setTitleDialog("Erro na Exclusão");
            setMessageDialog("Selecione pelo menos uma nota de estudo para excluir!");
            setOpenDialog(true);
            return;
        }

        const thisNote = selectIDSStudyTips.length > 1 ? "estas notas" : "esta nota";

        setTitleDialog("Atenção");
        setMessageDialog(`Tem certeza que deseja excluir ${thisNote} de estudo?`);

        setConfirmDeleteStudyTipsDialog(true);
    };

    const seeDialogMainDashboard = () => (<Dialog
        name={"main-dashboard-dialog"}
        title={titleDialog}
        message={messageDialog}
        buttonText={"Fechar"}
        closeFunction={setOpenDialog}
        zIndex={1005}
    />);

    const seeConfirmDeleteStudyNoneDialog = () => (<DialogConfirm
        name={"confirm-main-dashboard-dialog"}
        title={titleDialog}
        message={messageDialog}
        yesFunction={handleDeleteStudyTips}
        closeFunction={setConfirmDeleteStudyTipsDialog} />);

    return (
        <>
            {confirmDeleteStudyTipsDialog && (seeConfirmDeleteStudyNoneDialog())}
            {openDialog && (seeDialogMainDashboard())}
            <StyleMainSection />
            <div id="ContentTwice">
                <div id="PublicTender">
                    <h1>Concursos Cadastrados</h1>
                    <input type={HtmlType.BUTTON} className="button-add" value="Adicionar"
                    onClick={showPublicTenderNew}
                    />

                    <ContentWide>
                        <ContentCard>
                            {
                                publicTenders.map((publicTender) => {
                                    return (
                                        <div className={"check-general"}>
                                        <input
                                            onChange={(event) =>
                                                handleSelectPublicTender(publicTender, event)}
                                            className="checkbutton"
                                            type="checkbox" />
                                        <section className={
                                            `section-general ${
                                                selectPublicTender?.public_tender_id === publicTender.public_tender_id ?
                                                    "selected" : ""
                                            }`
                                        } onClick={
                                            () => {
                                                props.setSelectedPublicTender(publicTender);
                                                showPublicTenderDetails();
                                            }
                                        }><p>
                                            {publicTender.tender_name}
                                        </p></section>
                                        </div>
                                    );
                                })
                            }
                        </ContentCard>
                    </ContentWide>
                </div>
                <div id="TipsHit">
                    <h1>Dicas de Estudo</h1>
                    <input type="button" className="button-add" value="Nova" onClick={showStudyTipsNew} />
                    <input type="button" className="button-add bg-red" value="Excluir" onClick={manageDeleteHandle} />
                    <input type="button" className="button-add bg-golden color-black" value="Motiva AI" />

                    <ContentWide>
                        <ContentCard>
                            {studyTips.map((studyTip) => (
                                <div className="check-tip">
                                    <input
                                        onChange={(event) =>
                                            handleSelectStudyTips(studyTip, event)}
                                        className="checkbutton"
                                        type="checkbox"
                                    />
                                    <section className={
                                        "section-tip"
                                    } onClick={() => {
                                        props.setSelectedStudyTips(studyTip);
                                        showStudyTipsDetails();
                                    }}><p className="text-section">{studyTip.name}</p>
                                    </section>
                                </div>
                            ))}
                        </ContentCard>
                    </ContentWide>
                </div>
            </div>
            <div id="SubjectTopicNote">
                <ContentSquare>
                    <h2>Disciplinas</h2>
                    <input type="button" className="button-add" value="Adicionar"
                    onClick={showSubjectNew}
                    />

                    <ContentCard>
                        {subjects.map((subject) => (<div className={"check-general"}>
                            <input
                                onChange={(event) =>
                                    handleSelectSubject(subject, event)}
                                className="checkbutton" type="checkbox" />
                            <section
                                className={
                                    `section-general ${
                                        selectSubject?.subject_id === subject.subject_id ?
                                            "selected" : ""
                                    }`
                                }
                                onClick={() => {
                                    props.setSelectedSubject(subject);
                                    showSubjectDetails();
                                }}
                            ><p className="text-section">{subject.name}</p></section>
                        </div>))}
                    </ContentCard>
                </ContentSquare>
                <ContentSquare>
                    <h2>Assuntos</h2>
                    <input type="button" className="button-add" value="Adicionar"
                    onClick={showTopicNew}/>

                    <ContentCard>
                        {topics.map((topic) => (<div className={"check-general"}>
                            <input
                                onChange={(event) =>
                                    handleSelectTopic(topic, event)}
                                className="checkbutton"
                                type="checkbox"
                            />
                            <section className={
                                "section-general"
                            }
                            onClick={() => {
                                props.setSelectedTopic(topic);
                                showTopicDetails();
                            }}><p className="text-section">{topic.name}</p></section>
                        </div>))}
                    </ContentCard>
                </ContentSquare>
                <ContentSquare>
                    <h2>Notas de Atenção</h2>
                    <input type="button" className="button-add" value="Adicionar" onClick={selectNote}/>
                    <ContentCard>
                        <div id="NoteCheck">
                            <div>
                                <input type="checkbox" checked={noteSubjectChecked} onChange={checkNoteSubject} name="subject" id="subject"/>
                                <label htmlFor="subject" className="padding-check-button">Disciplina</label>
                            </div>
                            <div>
                                <input type="checkbox" checked={noteTopicChecked} onChange={checkNoteTopic} name="topic" id="topic"/>
                                <label htmlFor="topic" className="padding-check-button">Assunto</label>
                            </div>
                        </div>

                        {noteSubjectChecked && noteSubjects.map((note) => (
                            <section key={note.note_subject_id}
                            onClick={() => {
                                props.setSelectedNoteSubject(note);
                                showNoteSubjectDetails();
                            }}><p className="text-section">{
                                `${note.name}: ${note.description}`
                            }</p></section>
                        ))}

                        {noteTopicChecked && noteTopics.map((note) => (
                            <section key={note.note_topic_id}
                            onClick={() => {
                                props.setSelectedNoteTopic(note);
                                showNoteTopicDetails();
                            }}><p className="text-section">{
                                `${note.name}: ${note.description}`
                            }</p></section>
                        ))}
                    </ContentCard>
                </ContentSquare>
            </div>
        </>
    );
};

const StyleMainSection = () => {
    return (<style>{`
    #NoteCheck {
        font-size: 1.2em;
        margin-bottom: 12px;
        display: flex;
    }
    
    #NoteCheck input {
        width: 15px;
        height: 15px;
    }
    
    #SubjectTopicNote {
        display: flex;
        flex-wrap: wrap;
        gap: 1.5rem;
    }
    
    #PublicTender {
        width: 100%;
        margin-bottom: 2rem;
        margin-right: 2rem;
    }
    
    #TipsHit {
        width: 100%;
    }
    
    #ContentTwice {
        display: flex;
    }
    
    .text-section {
        color: ${Colors.BLACK};
        text-align: justify;
        font-weight: ${HtmlFont.BOLD};
    }
    
    .text-section:hover {
        color: ${Colors.LIGHT_BLUE};
    }
    
    .button-add {
        background-color: ${Colors.GREEN};
        padding: 5px 12px 5px 12px;
        color: ${Colors.WHITE};
        font-family: ${HtmlFont.FONT_INTER};
        font-weight: ${HtmlFont.BOLDER};
        border-radius: 12px;
        margin-bottom: 12px;
        cursor: pointer;
    }
    
    .button-add:hover {
        background-color: ${Colors.GREEN_HOVER};
        transition: 100ms;
    }
    
    .section-tip {
        width: 100%;
    }
    
    .section-general {
        width: 100%;
        color: ${Colors.BLACK};
        text-align: justify;
        font-weight: ${HtmlFont.BOLD};
    }
    
    .section-general:hover {
        color: ${Colors.LIGHT_BLUE};
    }
        
    .section-general.selected {
        color: ${Colors.LIGHT_BLUE};
    }
    
    .check-tip {
        display: flex;
    }
    
    .check-general {
        display: flex;
    }
    
    .color-black {
        color: ${Colors.BLACK};
    }
    .color-black:hover {
        color: ${Colors.BLACK_HOVER};
    }
    
    .bg-red {
        background-color: ${Colors.RED_HOVER};
    }
    .bg-red:hover {
        background-color: ${Colors.RED};
    }
    
    .bg-golden {
        background-color: ${Colors.GOLDEN};
    }
    .bg-golden:hover {
        background-color: ${Colors.GOLDEN_HOVER};
    }
    `}</style>);
};
