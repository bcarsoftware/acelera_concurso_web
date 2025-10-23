import {useState} from "react";
import type {Route} from "../../../.react-router/types/app/routes/+types/home";

export function meta({}: Route.MetaArgs) {
    return [
        { title: "Cadastro - Acelera Concurso" },
        { name: "description", content: "Sua melhor preparação!" },
    ];
}

export default function Index() {
    const [showPassword, setShowPassword] = useState(false);
    const [currentStage, setCurrentStage] = useState("BasicInfo");

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword); // Inverte o valor (true -> false, false -> true)
    };

    const seeBasicInfo = () => {
        setCurrentStage("BasicInfo");
    }

    const seeAccessInfo = () => {
        setCurrentStage("AccessInfo");
    }

    const seeConfirmationCode = () => {
        setCurrentStage("ConfirmationInfo");
    }

    return (
        <>
        <LoginStyles />
        <body>

        <div className="login-container">
            <form id="login-form">
                <h2><p>Acelera Concurso - Cadastro</p></h2>

                <form>
                    <div id="BasicInfo" hidden={currentStage !== "BasicInfo"}>
                        <div className="back-link">
                            Seja bem vindo(a) ao Acelera Concurso!
                        </div>
                        <div className="input-group">
                            <label htmlFor="first_name">Nome*</label>
                            <input type="text" id="first_name" name="first_name" placeholder="Fulano" required/>
                        </div>

                        <div className="input-group">
                            <label htmlFor="last_name">Sobrenome*</label>
                            <input type="text" id="last_name" name="last_name" placeholder="Sicrano" required/>
                        </div>

                        <div className="input-group">
                            <label htmlFor="date_born">Data De Nascimento*</label>
                            <input type="date" id="date_born" name="date_born" placeholder="DD/MM/AAAA" required/>
                        </div>

                        <div className="input-group">
                            <label htmlFor="gender">Gênero*</label>

                            <select id="gender" name="gender" required>
                                <option>Selecione</option>
                                <option value="FEMALE">Mulher</option>
                                <option value="MALE">Homem</option>
                                <option value="NOT_BINARY">Não Binário</option>
                                <option value="NOT_SAY">Não Dizer</option>
                            </select>
                        </div>

                        <button type="button" className="next-button" onClick={seeAccessInfo} style={{ position: 'relative', zIndex: 9999 }}>
                            Próximo
                        </button>
                    </div>

                    <div id="AccessInfo" hidden={currentStage !== "AccessInfo"}>
                        <div className="back-link">
                            <nav onClick={seeBasicInfo}><a href="">Voltar às Informações Básicas</a></nav>
                        </div>

                        <div className="input-group">
                            <label htmlFor="username">Nome de Usuário*</label>
                            <input type="text" id="username" name="username" placeholder="usuario" required/>
                        </div>

                        <div className="input-group">
                            <label htmlFor="email">Email*</label>
                            <input type="text" id="email" name="email" placeholder="example@service.com" required/>
                        </div>

                        {/* --- CAMPO DE SENHA MODIFICADO --- */}
                        <div className="input-group">
                            <label htmlFor="password">Senha*</label>
                            <input
                                // 3. O 'type' agora é dinâmico:
                                type={showPassword ? 'text' : 'password'}
                                id="password"
                                name="password"
                                placeholder="Sua senha"
                                required
                            />

                            {/* 4. O botão para mostrar/ocultar a senha */}
                            <button
                                type="button" // 'type="button"' impede que o botão envie o formulário
                                className="password-toggle-btn"
                                onClick={togglePasswordVisibility}
                                aria-label={showPassword ? "Ocultar senha" : "Mostrar senha"} // Para acessibilidade
                            >
                                {/* Usamos SVGs como ícones, que funcionam muito bem em React */}
                                {showPassword ? (
                                    // Ícone "Olho Aberto" (clique para Ocultar)
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                                        <circle cx="12" cy="12" r="3"></circle>
                                    </svg>
                                ) : (
                                    // Ícone "Olho Cortado" (clique para Mostrar)
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path>
                                        <line x1="1" y1="1" x2="23" y2="23"></line>
                                    </svg>
                                )}
                            </button>
                        </div>
                        {/* --- FIM DA MODIFICAÇÃO --- */}

                        <div className="options">
                            <a href="#">Esqueceu a senha?</a>
                        </div>

                        <button type="button" className="next-button" onClick={seeConfirmationCode}>Verificar</button>
                    </div>

                    <div id="ConfirmationInfo" hidden={currentStage !== "ConfirmationInfo"}>
                        <div className="back-link">
                            <nav onClick={seeBasicInfo}><a href="">Voltar às Informações Básicas.</a></nav>
                        </div>

                        <div className="input-group">
                            <label htmlFor="email-check">Atenção!</label>
                            <p>Foi enviado um código de confirmação para o email:</p>
                            <p>username@example.com</p>
                            <p>.</p>
                            <p>Pedimos que você acesse a sua caixa de entrada e confirme o código no campo abaixo.</p>
                        </div>

                        <div className="input-group">
                            <label htmlFor="confirmation_code">Código de Confirmação*</label>
                            <input type="text" id="confirmation_code" name="confirmation_code" placeholder="LLLNLNN" required/>
                        </div>

                        <button type="submit" className="login-button">Confirmar e Cadastrar</button>
                    </div>
                </form>

                <div className="register-link">
                    <p>Já tem uma conta? <a href="/login">Acesse aqui!</a></p>
                </div>
            </form>
        </div>

        </body>
        </>
    );
}

const LoginStyles = () => {
    return (<link rel="stylesheet" href="/app/pages/register/register.css"></link>);
};