import {ContentWide} from "~/pages/dashboard/components/content-wide";
import {ContentCard} from "~/pages/dashboard/components/content-card";
import {ContentSquare} from "~/pages/dashboard/components/content-square";
import {useState} from "react";
import type {DataFunctionsScreen} from "../../../../types/data-functions-screen";

export const MainDashboardPage = (
    props: DataFunctionsScreen
) => {
    const [noteSubjectChecked, setNoteSubjectChecked] = useState<boolean>(true);
    const [noteTopicChecked, setNoteTopicChecked] = useState<boolean>(true);

    const checkNoteSubject = () => {
        setNoteSubjectChecked(!noteSubjectChecked);
    };

    const checkNoteTopic = () => {
        setNoteTopicChecked(!noteTopicChecked);
    }

    /* REGISTERS SCREENS */
    const showPublicTenderNew = () => {
        props.setMainPage(false);
        props.setShowSubjectNew(false);
        props.setShowTopicNew(false);
        props.setShowPublicTenderNew(true);
    }
    const showSubjectNew = () => {
        props.setMainPage(false);
        props.setShowPublicTenderNew(false);
        props.setShowTopicNew(false);
        props.setShowSubjectNew(true)
    }
    const showTopicNew = () => {
        props.setMainPage(false);
        props.setShowPublicTenderNew(false);
        props.setShowSubjectNew(false);
        props.setShowTopicNew(true);
    }
    /* REGISTERS SCREENS */

    return (
        <>
            <div id="ContentTwice">
                <div id="PublicTender">
                    <h1>Concursos Cadastrados</h1>
                    <input type="button" className="button-add" value="Adicionar"
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
                    <input type="button" className="button-add" value="Nova" />
                    <input type="button" className="button-add bg-red" value="Excluir" />
                    <input type="button" className="button-add bg-golden color-black" value="Motiva AI" />

                    <ContentWide>
                        <ContentCard>
                            <div className="check-tip">
                                <input className="check-btn-tip" type="checkbox" />
                                <section className="section-tip"><p className="text-section">Dica 1</p></section>
                            </div>
                            <div className="check-tip">
                                <input className="check-btn-tip" type="checkbox" />
                                <section className="section-tip"><p className="text-section">Dica 1</p></section>
                            </div>
                            <div className="check-tip">
                                <input className="check-btn-tip" type="checkbox" />
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
                    <input type="button" className="button-add" value="Adicionar" />

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
