import type {Route} from "../../../.react-router/types/app/routes/+types/home";
import {useState} from "react";

export function meta({}: Route.MetaArgs) {
    return [
        { title: "Dashboard Acelera Concurso" },
        { name: "description", content: "Sua melhor preparação!" },
    ];
}

export default function Index() {
    const [noteSubjectChecked, setNoteSubjectChecked] = useState<boolean>(true);
    const [noteTopicChecked, setNoteTopicChecked] = useState<boolean>(true);

    const checkNoteSubject = () => {
        setNoteSubjectChecked(!noteSubjectChecked);
    };

    const checkNoteTopic = () => {
        setNoteTopicChecked(!noteTopicChecked);
    }

    return (
        <>
            <StyleDashboard />
            <body>
            <header>
                <div className="div-width-50-percent-left">
                    <a href="" className="link-format">
                        <h4>
                            <p>Acelera</p><p>Concurso</p>
                        </h4>
                    </a>
                </div>
                <div className="div-width-100-percent">
                    <h1>Dashboard Acelera Concurso</h1>
                </div>
                <div className="div-width-50-percent-right">
                    <a href="" className="link-format">
                        <h4>SAIR  .</h4>
                    </a>
                </div>
            </header>

            <main id="Dashboard">
                <div id="LeftPanel">
                    <nav id="Profile"><p>Primeiro Nome</p><p>@username</p></nav>
                    <nav className="nav-item">Concurso</nav>
                    <nav className="nav-item">Disciplina</nav>
                    <nav className="nav-item">Assunto</nav>
                    <nav className="nav-item">Mais Questões</nav>
                    <nav className="nav-item">Configurações</nav>
                    <nav className="nav-item">Promodoro</nav>
                    <nav className="nav-item-logout">Sair</nav>
                </div>
                <div id="Content">
                    <div id="ContentTwice">
                        <div id="PublicTender">
                            <h1>Concursos Cadastrados</h1>
                            <input type="button" className="button-add" value="Adicionar" />

                            <div className="class-content-wide-square">
                                <div className="class-div-content">
                                    <section><p className="text-section">Concurso 1</p></section>
                                    <section><p className="text-section">Concurso 2</p></section>
                                    <section><p className="text-section">Concurso 3</p></section>
                                    <section><p className="text-section">Concurso 4</p></section>
                                </div>
                            </div>
                        </div>
                        <div id="TipsHit">
                            <h1>Dicas de Estudo</h1>
                            <input type="button" className="button-add" value="Nova" />
                            <input type="button" className="button-add bg-red" value="Excluir" />
                            <input type="button" className="button-add bg-golden color-black" value="Motiva AI" />

                            <div className="class-content-wide-square">
                                <div className="class-div-content">
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
                                </div>
                            </div>
                        </div>
                    </div>
                    <div id="SubjectTopicNote">
                        <div className="class-content-square">
                            <h2>Disciplinas</h2>
                            <input type="button" className="button-add" value="Adicionar" />

                            <div className="class-div-content">
                                <section><p className="text-section">Disciplina 1</p></section>
                                <section><p className="text-section">Disciplina 2</p></section>
                                <section><p className="text-section">Disciplina 3</p></section>
                                <section><p className="text-section">Disciplina 4</p></section>
                            </div>
                        </div>
                        <div className="class-content-square">
                            <h2>Assuntos</h2>
                            <input type="button" className="button-add" value="Adicionar" />

                            <div className="class-div-content">
                                <section><p className="text-section">Assunto 1</p></section>
                                <section><p className="text-section">Assunto 2</p></section>
                                <section><p className="text-section">Assunto 3</p></section>
                                <section><p className="text-section">Assunto 4</p></section>
                            </div>
                        </div>
                        <div className="class-content-square">
                            <h2>Notas de Atenção</h2>
                            <input type="button" className="button-add" value="Adicionar" />

                            <div className="class-div-content">
                                <div id="NoteCheck">
                                    <div onClick={checkNoteSubject}>
                                        <input type="checkbox" name="subject" id="subject"/>
                                        <label htmlFor="subject" className="padding-check-button">Disciplina</label>
                                    </div>
                                    <div onClick={checkNoteTopic}>
                                        <input type="checkbox" name="topic" id="topic"/>
                                        <label htmlFor="topic" className="padding-check-button">Assunto</label>
                                    </div>
                                </div>

                                <section><p className="text-section">Nota 1</p></section>
                                <section><p className="text-section">Nota 2</p></section>
                                <section><p className="text-section">Nota 3</p></section>
                                <section><p className="text-section">Nota 4</p></section>
                            </div>
                        </div>
                    </div>
                </div>
            </main>

            <footer>
                <div className="div-width-50-percent-left"></div>

                <div className="div-width-100-percent">
                    Todos os direitos reservados © — BCarSoftware —
                </div>

                <div className="div-width-50-percent-right"></div>
            </footer>
            </body>
        </>
    );
}

const StyleDashboard = () => {
    return (<link rel="stylesheet" href="/app/pages/dashboard/dashboard.css"></link>);
}
