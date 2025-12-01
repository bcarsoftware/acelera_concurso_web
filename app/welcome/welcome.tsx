import {BodyDashboard} from "~/pages/dashboard/components/body-dashboard";
import {Colors} from "../../enums/colors";

export const Welcome = () => (
    <div>
        <BodyDashboard>
            <Style />
            <div id={"Container"}>
                <header className="header-section">
                    <h1>Acelera Concurso</h1>
                    <h2>Transforme sua Preparação em Conquista</h2>
                    <p className="intro-text">
                        Bem-vindo à plataforma desenhada para transformar a maneira como você estuda.
                        Aqui, organização e prática andam de mãos dadas com o seu progresso.
                    </p>
                </header>

                <div className="grid-features">
                    {/* Card 1: Organização */}
                    <div className="feature-card">
                        <h3>🎯 O Método</h3>
                        <p>
                            Tudo começa com a organização. Cadastre o concurso dos seus sonhos,
                            adicione as disciplinas e detalhe cada assunto. Crie <strong>notas e lembretes</strong> personalizados
                            e utilize nosso <strong>Pomodoro integrado</strong> para foco total.
                        </p>
                    </div>

                    {/* Card 2: Prática */}
                    <div className="feature-card">
                        <h3>🚀 Treine e Evolua</h3>
                        <p>
                            Você está no comando. Acesse a aba de <strong>Questões</strong> para treinar sem compromisso,
                            ou registre sua evolução vinculando resoluções a Disciplinas e Assuntos específicos.
                        </p>
                    </div>
                </div>

                {/* --- NOVO CARD DE IA (Largura Total) --- */}
                <div className="feature-card ai-card full-width-card">
                    <h3>🤖 Potência da IA Generativa</h3>
                    <p>
                        Gere questões inéditas com o uso de <strong>Inteligência Artificial</strong>, é possível fazer
                        isso via configurações da questão, com o uso de <strong>arquivo pdf</strong> ou via link
                        de <strong>legislação.</strong>
                    </p>
                    <p>
                        Maximize seus estudos com nossa Inteligência Artificial. Faça o <strong>upload de um PDF</strong> (como leis secas ou apostilas) para que a IA extraia os dados e gere questões inéditas automaticamente sobre o tema.
                    </p>
                    <p>
                        Ao final, você pode <strong>baixar um novo PDF</strong> contendo todas as questões geradas e o gabarito completo para estudar onde quiser.
                    </p>
                </div>
                {/* --------------------------------------- */}

                {/* Seção de Gamificação */}
                <div className="gamification-section">
                    <h3>🏆 O Jogo da Aprovação</h3>
                    <p>
                        Seu esforço vale pontos! Para finalizar um tópico, você precisa de excelência:
                        <strong> 75% de aproveitamento</strong> mínimo.
                    </p>

                    <div className="points-container">
                        <div className="point-item">
                            <span className="score">+15 pts</span>
                            <span>Assunto Finalizado</span>
                        </div>
                        <div className="point-item">
                            <span className="score">+45 pts</span>
                            <span>Disciplina Finalizada</span>
                        </div>
                    </div>

                    <p className="warning-text">
                        ⚠️ <strong>Cuidado:</strong> deletar assuntos ou disciplinas fará você perder os pontos conquistados.
                    </p>
                </div>

                <div className="cta-section">
                    <div className="cta-box">
                        <p>Já tem uma conta?</p>
                        <a href="/login" className="btn btn-outline">Entrar</a>
                    </div>
                    <div className="cta-separate"></div>
                    <div className="cta-box">
                        <p>Ainda não começou?</p>
                        <a href="/register" className="btn btn-primary">Cadastrar Agora</a>
                    </div>
                </div>
            </div>
        </BodyDashboard>
    </div>
);

const Style = () => (<style>{`
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;600;700&display=swap');

    #Container {
        font-family: 'Inter', sans-serif;
        max-width: 900px;
        margin: 0 auto;
        padding: 40px 20px;
        color: #333;
    }

    /* HEADER */
    .header-section {
        text-align: center;
        margin-bottom: 50px;
    }
    
    h1 {
        font-size: 2.5rem;
        color: ${Colors.DARK_BLUE};
        margin-bottom: 8px;
        font-weight: 800;
    }
    
    h2 {
        font-size: 1.5rem;
        color: ${Colors.LIGHT_BLUE};
        font-weight: 600;
        margin-bottom: 20px;
    }

    .intro-text {
        font-size: 1.2rem;
        color: ${Colors.WHITE};
        max-width: 700px;
        margin: 0 auto;
        line-height: 1.6;
    }

    /* CARDS DE FEATURES */
    .grid-features {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 20px;
    }

    .feature-card {
        background: #fff;
        padding: 25px;
        border-radius: 12px;
        box-shadow: 0 4px 15px rgba(0,0,0,0.05);
        border-left: 5px solid ${Colors.LIGHT_BLUE};
        transition: transform 0.2s;
    }

    .feature-card:hover {
        transform: translateY(-3px);
    }

    .feature-card h3 {
        color: ${Colors.DARK_BLUE};
        margin-bottom: 12px;
        font-size: 1.3rem;
    }

    .feature-card p {
        font-size: 1rem;
        line-height: 1.5;
        color: #666;
        text-align: left;
    }

    /* GAMIFICAÇÃO */
    .gamification-section {
        background: linear-gradient(135deg, ${Colors.BG_PAGE} 0%, #ffffff 100%);
        padding: 30px;
        border-radius: 16px;
        border: 1px solid #eee;
        text-align: center;
        margin-bottom: 50px;
    }

    .gamification-section h3 {
        margin-bottom: 15px;
        color: ${Colors.DARK_BLUE};
    }

    .points-container {
        display: flex;
        justify-content: center;
        gap: 30px;
        margin: 25px 0;
    }

    .point-item {
        display: flex;
        flex-direction: column;
        align-items: center;
        background: white;
        padding: 15px 25px;
        border-radius: 10px;
        box-shadow: 0 2px 8px rgba(0,0,0,0.1);
    }

    .score {
        font-size: 1.8rem;
        font-weight: 800;
        color: ${Colors.GREEN};
        margin-bottom: 5px;
    }

    .warning-text {
        font-size: 0.9rem;
        color: ${Colors.RED};
        background: rgba(220, 53, 69, 0.1);
        display: inline-block;
        padding: 8px 16px;
        border-radius: 20px;
    }

    /* BOTÕES E CTA */
    .cta-section {
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 40px;
        background: ${Colors.DARK_BLUE};
        padding: 40px;
        border-radius: 16px;
        color: white;
    }

    .cta-box {
        text-align: center;
    }

    .cta-box p {
        margin-bottom: 15px;
        font-size: 1.1rem;
        font-weight: 300;
    }

    .cta-separate {
        width: 1px;
        height: 60px;
        background-color: rgba(255,255,255,0.2);
    }

    .btn {
        display: inline-block;
        padding: 12px 30px;
        border-radius: 30px;
        text-decoration: none;
        font-weight: bold;
        font-size: 1rem;
        transition: all 0.2s;
        cursor: pointer;
    }

    .btn-primary {
        background-color: ${Colors.LIGHT_BLUE};
        color: white;
        box-shadow: 0 4px 15px rgba(0,0,0,0.2);
    }

    .btn-primary:hover {
        background-color: white;
        color: ${Colors.LIGHT_BLUE};
        transform: scale(1.05);
    }

    .btn-outline {
        background-color: transparent;
        border: 2px solid white;
        color: white;
    }

    .btn-outline:hover {
        background-color: white;
        color: ${Colors.DARK_BLUE};
    }
    
    .feature-card p + p {
        margin-top: 15px;
    }
    
    .full-width-card {
        margin: 30px 0 50px 0; /* Espaçamento acima e abaixo */
    }
    
    .ai-card {
        border-left-color: ${Colors.GOLDEN}; 
        background: linear-gradient(to right, #fff, #fffdf0);
    }

    /* RESPONSIVIDADE */
    @media (max-width: 768px) {
        .grid-features {
            grid-template-columns: 1fr;
        }
        .cta-section {
            flex-direction: column;
            gap: 30px;
        }
        .cta-separate {
            width: 100%;
            height: 1px;
        }
    }
`}</style>);
