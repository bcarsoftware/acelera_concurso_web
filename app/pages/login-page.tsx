import {useState} from "react";

export default function LoginPage() {
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
                    <p>Não tem uma conta? <a href="#">Cadastre-se</a></p>
                </div>
            </form>
        </div>

        </body>
        </>
    );
}

const LoginStyles = () => {
    const data = `
            * {
                margin: 0;
                padding: 0;
                box-sizing: border-box; /* Faz o padding não afetar a largura total */
                font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
            }
        
            /* Em React, o componente 'App' é renderizado dentro do <body>, 
               então podemos estilizar o body e html globalmente assim */
            body, html {
                height: 100%;
                width: 100%;
            }
        
            body {
                /* Cor de fundo solicitada */
                background-color: #088ac7;
        
                /* Usamos Flexbox para centralizar o card de login vertical e horizontalmente */
                display: flex;
                justify-content: center;
                align-items: center;
        
                /* Adiciona um padding para o card não colar nas bordas em telas pequenas */
                padding: 20px;
            }
        
            /* --- O Card de Login --- */
            .login-container {
                background-color: #ffffff;
                padding: 30px 40px;
                border-radius: 12px;
                box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
        
                /* Define uma largura máxima para o container */
                max-width: 400px;
                /* Faz o container ocupar 100% da largura disponível até o max-width */
                width: 100%;
        
                text-align: center;
            }
        
            .login-container h2 {
                margin-bottom: 25px;
                color: #333;
                font-size: 2em; /* 2x o tamanho da fonte base */
            }
        
            /* --- Grupos de Input (Label + Campo) --- */
            .input-group {
                margin-bottom: 20px;
                text-align: left; /* Alinha labels e inputs à esquerda */
                position: relative; 
            }
        
            .input-group label {
                display: block; /* Faz o label ficar em uma linha própria */
                margin-bottom: 8px;
                color: #555;
                font-weight: 600; /* Semi-bold */
            }
        
            .input-group input {
                width: 100%; /* Ocupa toda a largura do container */
                padding: 12px 15px;
                border: 1px solid #ddd;
                border-radius: 6px;
                font-size: 16px;
                transition: border-color 0.3s, box-shadow 0.3s;
            }
        
            /* Efeito de foco para o input */
            .input-group input:focus {
                outline: none;
                border-color: #088ac7; /* Usa a cor principal no foco */
                box-shadow: 0 0 8px rgba(8, 138, 199, 0.3);
            }
        
            /* --- Links (Esqueceu a senha) --- */
            .options {
                text-align: right;
                margin-bottom: 25px;
            }
        
            .options a {
                color: #088ac7;
                text-decoration: none;
                font-size: 14px;
            }
        
            .options a:hover {
                text-decoration: underline;
            }
        
            /* --- Botão de Login --- */
            .login-button {
                width: 100%;
                padding: 12px;
                background-color: #088ac7;
                color: white;
                border: none;
                border-radius: 6px;
                font-size: 18px;
                font-weight: bold;
                cursor: pointer;
                transition: background-color 0.3s ease;
            }
        
            .login-button:hover {
                background-color: #066a9c; /* Um tom mais escuro para o hover */
            }
        
            /* --- Link de Cadastro --- */
            .register-link {
                margin-top: 30px;
                font-size: 14px;
                color: #555;
            }
        
            .register-link a {
                color: #088ac7;
                text-decoration: none;
                font-weight: bold;
            }
        
            .register-link a:hover {
                text-decoration: underline;
            }
        
            /* --- Media Query para Responsividade --- */
            /* Para telas com largura máxima de 480px (smartphones) */
            @media (max-width: 480px) {
                .login-container {
                    padding: 25px 20px; /* Reduz o padding lateral em telas pequenas */
                }
        
                .login-container h2 {
                    font-size: 1.8em; /* Diminui um pouco o título */
                }
            }
            
            /* --- ESTILOS NOVOS --- */

            /* Adicionamos padding à direita no input de senha para o ícone não sobrepor o texto */
            .input-group input[name="password"] {
                padding-right: 45px; 
            }
            /* Estilo do botão de "olho" */
            .password-toggle-btn {
                position: absolute;
                right: 15px; /* Alinha o ícone com o padding original */
                bottom: 11px; /* Ajuste para centralizar verticalmente no input */
                
                background: transparent;
                border: none;
                cursor: pointer;
                padding: 0;
                display: flex;
                align-items: center;
                justify-content: center;
                color: #777; /* Cor do ícone */
            }
            
            .password-toggle-btn:focus {
                outline: none;
                color: #088ac7; /* Destaque no foco */
            }
        
            .password-toggle-btn svg {
                width: 18px;
                height: 18px;
            }
            
            /* --- FIM DOS ESTILOS NOVOS --- */
    `;
    return (<style>{data}</style>);
};