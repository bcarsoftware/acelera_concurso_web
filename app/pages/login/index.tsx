import {useState} from "react";
import type {Route} from "../../../.react-router/types/app/routes/+types/home";
import {link} from "node:fs";

export function meta({}: Route.MetaArgs) {
    return [
        { title: "Index Acelera Concurso" },
        { name: "description", content: "Sua melhor preparação!" },
    ];
}

export default function Index() {
    const [showPassword, setShowPassword] = useState(false);

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword); // Inverte o valor (true -> false, false -> true)
    };

    return (
        <>
        <LoginStyles />
        <body>

        <div className="login-container">
            <form id="login-form">
                <h2><p>Acelera Concurso</p><p>Login</p></h2>

                <div className="back-link">
                    <nav><a href="/">Voltar ao Inicio.</a></nav>
                </div>

                <div className="input-group">
                    <label htmlFor="email">E-mail/Usuário*</label>
                    <input type="email" id="email" name="email" placeholder="seuemail@exemplo.com" required/>
                </div>

                {/* --- CAMPO DE SENHA MODIFICADO --- */}
                <div className="input-group">
                    <label htmlFor="password">Senha</label>
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

                <button type="submit" className="login-button">Entrar</button>

                <div className="register-link">
                    <p>Não tem uma conta? <a href="/register">Cadastre-se</a></p>
                </div>
            </form>
        </div>

        </body>
        </>
    );
}

const LoginStyles = () => {
    return (<link rel="stylesheet" href="app/pages/login/login.css"></link>);
};