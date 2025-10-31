import {ContentWide} from "~/pages/dashboard/components/content-wide";
import {ContentCard} from "~/pages/dashboard/components/content-card";
import {ContentSquare} from "~/pages/dashboard/components/content-square";
import {useState} from "react";
import type {DataFunctionsScreen} from "../../../../types/data-functions-screen";
import {Dialog} from "~/dialog/dialog";
import {Colors} from "../../../../enums/colors";
import {HtmlFont, HtmlType} from "../../../../enums/html-type";

export const MainDashboardPage = (
    props: DataFunctionsScreen
) => {
    const [noteSubjectChecked, setNoteSubjectChecked] = useState<boolean>(true);
    const [noteTopicChecked, setNoteTopicChecked] = useState<boolean>(true);
    const [noteAllChecked, setNoteAllChecked] = useState<boolean>(true);
    const [openDialog, setOpenDialog] = useState<boolean>(false);

    const [titleDialog, setTitleDialog] = useState<string>("");
    const [messageDialog, setMessageDialog] = useState<string>("");

    const checkNoteSubject = () => {
        setNoteSubjectChecked(!noteSubjectChecked);
        setNoteTopicChecked(noteSubjectChecked);
    };

    const checkNoteTopic = () => {
        setNoteTopicChecked(!noteTopicChecked);
        setNoteSubjectChecked(noteTopicChecked);
    }

    const checkAllNotes = () => {
        setNoteAllChecked(!noteAllChecked);
        setNoteSubjectChecked(!noteAllChecked);
        setNoteTopicChecked(!noteAllChecked);
    };

    /* REGISTERS SCREENS */
    const settingAllFalse = () => {
        props.setShowNoteSubjectNew(false);
        props.setShowNoteTopicNew(false);
        props.setMainPage(false);
        props.setShowSubjectNew(false);
        props.setShowTopicNew(false);
        props.setShowPublicTenderNew(false);
        props.setShowStudyTipsNew(false);
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

        if (noteAllChecked) {
            setOpenDialog(true);
            settingAllFalse();
            props.setMainPage(true);
        }
        else if (noteSubjectChecked) {
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

    return (
        <>
            <StyleMainSection />
            <div id="ContentTwice">
                <div id="PublicTender">
                    <h1>Concursos Cadastrados</h1>
                    <input type={HtmlType.BUTTON} className="button-add" value="Adicionar"
                    onClick={showPublicTenderNew}
                    />

                    <ContentWide>
                        <ContentCard>
                            <section><p className="text-section">Concurso 1</p></section>
                            <section><p className="text-section">Concurso 2</p></section>
                            <section><p className="text-section">Concurso 3</p></section>
                            <section><p className="text-section">Concurso 4</p></section>
                        </ContentCard>
                    </ContentWide>
                </div>
                <div id="TipsHit">
                    <h1>Dicas de Estudo</h1>
                    <input type="button" className="button-add" value="Nova" onClick={showStudyTipsNew} />
                    <input type="button" className="button-add bg-red" value="Excluir" />
                    <input type="button" className="button-add bg-golden color-black" value="Motiva AI" />

                    <ContentWide>
                        <ContentCard>
                            <div className="check-tip">
                                <input className="checkbutton" type="checkbox" />
                                <section className="section-tip"><p className="text-section">Dica 1</p></section>
                            </div>
                            <div className="check-tip">
                                <input className="checkbutton" type="checkbox" />
                                <section className="section-tip"><p className="text-section">Dica 1</p></section>
                            </div>
                            <div className="check-tip">
                                <input className="checkbutton" type="checkbox" />
                                <section className="section-tip"><p className="text-section">Dica 1</p></section>
                            </div>
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
                        <section><p className="text-section">Disciplina 1</p></section>
                        <section><p className="text-section">Disciplina 2</p></section>
                        <section><p className="text-section">Disciplina 3</p></section>
                        <section><p className="text-section">Disciplina 4</p></section>
                    </ContentCard>
                </ContentSquare>
                <ContentSquare>
                    <h2>Assuntos</h2>
                    <input type="button" className="button-add" value="Adicionar"
                    onClick={showTopicNew}/>

                    <ContentCard>
                        <section><p className="text-section">Assunto 1</p></section>
                        <section><p className="text-section">Assunto 2</p></section>
                        <section><p className="text-section">Assunto 3</p></section>
                        <section><p className="text-section">Assunto 4</p></section>
                    </ContentCard>
                </ContentSquare>
                <ContentSquare>
                    <h2>Notas de Atenção</h2>
                    <input type="button" className="button-add" value="Adicionar" onClick={selectNote}/>

                    {openDialog && (
                        <Dialog name={"main-dashboard-dialog"} title={titleDialog} message={messageDialog} buttonText={"Fechar"} closeFunction={setOpenDialog} />
                    )}

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
                            <div>
                                <input type="checkbox" checked={noteAllChecked} onChange={checkAllNotes} name="all-notes" id="all-notes"/>
                                <label htmlFor="all-notes" className="padding-check-button">Todos</label>
                            </div>
                        </div>

                        <section><p className="text-section">Nota 1</p></section>
                        <section><p className="text-section">Nota 2</p></section>
                        <section><p className="text-section">Nota 3</p></section>
                        <section><p className="text-section">Nota 4</p></section>
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
    
    .check-tip {
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
