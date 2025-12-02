# Acelera Concurso Web
Esse projeto é a parte Front-End do sistema Acelera Concurso. Possui integração direta com duas APIs construídas sob
medida para esta proposta: Um sistema que tem por objetivo auxiliar estudantes de Concursos Publico a organizar seus
estudos.

Este sistema não é exatamente uma plataforma de estudos, mas um planejador, focado em organização e resolução de questões
geradas via inteligência artificial, seja via conteúdo de pdf ou link de legislação (para ser feito web scrapping)
e retirado o conteúdo, gerar as questões via configurações de prompts no Backend desta aplicação.

Também é possível configurar parametros para gerar questões sem subir recursos diretos (link ou pdf).

Esse sistema de Frontend utiliza em sua construção, [React Router](https://reactrouter.com/).

## Sumário
1. [Informações Importantes](#informações-importantes)
2. [Como Funcionar?](#como-funcionar)
3. [Rotas do FrontEnd](#rotas-do-frontend)
4. [Construindo Versão para Produção](#construindo-versão-para-produção)
5. [Configurando o Docker](#configurando-o-docker)
6. [Variáveis de Ambiente](#variáveis-de-ambiente)
7. [Extra](#extra)

## Informações Importantes
Nesse projeto é possível:
* Cadastrar usuário e administrador (somente é permitindo um único administrador).
* Cadastrar Concurso Público;
* Cadastrar Disciplina de Concurso Publico;
* Cadastrar Assunto de Disciplina de Concurso Público;
* Cadastrar Nota de Disciplina ou Assunto;
* Cadastrar Dica de Estudo;
* Cadastrar Desempenho de resolução de questões de concursos;

A geração de questões de Concurso Público obedece a critérios como:
* Nome do Concurso;
* Banca Organizadora;
* Número de Questões;
* Número de Alternativas por questão;
* Nível do Concurso (Médio, Técnico e Superior);
* Uso ou não de PDF contendo o assunto;
* Uso ou não de Link de Legislação;
* Se arquivo pdf incluso, não é possível combinar com link de legislação e vice-versa;

Para poder finalizar Disciplina, Assunto e as suas respectivas Notas, é preciso obter o mínimo de **75%** de desempenho
na resolução de questões referente ao tópico. Não é possível finalizar se houverem notas abertas.

É possível o treino de resolução de questões sem registro de log. Para resolver questões sobre Disciplina, Assunto e suas
respectivas notas, é preciso entrar nos detalhes do respectivo tópico.

O sistema oferece também a possibilidade de registrar dicas motivacionais, seja a parti do usuário ou da inteligência
artificial integrada.

Para **cadastrar usuário**, é preciso validar via código enviado no e-mail, isso também é valido para a recuperação de senha, essa
integração é feita via backend deste sistema.

Para excluir usuário, há duas opções:
1. Via sistema: a conta é desativada na base de dados, podendo ser retomada realizando o acesso normalmente;
2. Via e-mail: na aba de configurações há as instruções para a exclusão da conta, que é enviar um e-mail solicitando;

## Rotas do FrontEnd
Abaixo você pode observar a tabela com as rotas do FrontEnd e suas respectivas descrições.

| Rota           | Descrição                          |
|----------------|------------------------------------|
| `/`            | Página inicial.                    |
| `/dashboard`   | Plataforma logada.                 |
| `/login`       | Tela de acesso.                    |
| `/register`    | Tela de Cadastro.                  |
| `/recovery`    | Atualizar senha esquecida.         |
| `/admin`       | Plataforma logada (administrador). |
| `/admin/login` | Tela de acesso (administrador).    |
| `/admin/new`   | Tela de cadastro (administrador).  |

* Se o usuário normal não estiver logado e tentar acessar `/dashboard`, ele será redirecionado para `/login`;
* Se o administrador não estiver logado e tentar acessar `/admin`, ele será redirecionado para `/admin/login`;
* Isso para evitar que usuários não autorizados tenham acesso ao sistema, embora as rotas do backend exijam autenticação.

## Como funcionar?

A primeira coisa a ser feita é configurar as variáveis de ambiente, renomeie o arquivo [.env.example](.env.example) para
[.env](.env), após isso, você deve fornecer os dados solicitados nesse arquivo - [ver Variáveis de Ambiente](#variáveis-de-ambiente).

Após isso, siga esses passos:

1. Instale as Dependências:

Garanta que você possua o NodeJS instalado, recomendo fortemente o uso do [NVM](https://github.com/nvm-sh/nvm) para isso.
* Esse projeto foi construído encima do Node22.21.0.
```bash
npm install
```

2. Inicie o servidor de desenvolvimento com HMR:

```bash
npm run dev
```

ou

```bash
npx react-router dev
```

Sua aplicação estará disponível em `http://localhost:5173`.

## Construindo Versão para Produção

Crie uma aplicação para produção com o seguinte comando:
```bash
npm run build
```

## Configurando o Docker

To build and run using Docker:
Para construir e executar esta aplicação utilizando o Docker, (você precisa ter o docker instalado), execute o seguinte
comando:

```bash
docker build -t my-app .
```

Para funcionar:

```bash
docker run -p 3000:3000 my-app
```

O contêiner dessa aplicação pode ser *deployada* em qualquer plataforma que funcione com Docker, incluindo:

- AWS ECS;
- Google Cloud Run;
- Azure Container Apps;
- Digital Ocean App Platform;
- Fly.io.
- Railway;
- Render.

## Variáveis de Ambiente
Tabela com as variáveis de ambiente utilizada nesse projeto, sua respectiva descrição.

| Nome                   | Descrição                                                                         | Valor Esperado        |
|------------------------|-----------------------------------------------------------------------------------|-----------------------|
| VITE_API_BASE_URL      | Link da API de Dados.                                                             | http://127.0.0.1:8000 |
| VITE_API_AI_BASE_URL   | Link da API de IA, PDF e Web Scrapping.                                           | http://localhost:8002 |
| VITE_AI_API_PUBLIC_KEY | Chave pública da API de IA, deve corresponder à variável encontrada na API de IA. | 20o3d7gJkp8OM=        |

## Extra
* Para mais informações, veja a documentação do router disponível [aqui.](docs/ROUTER_DOC.md).
* Esse projeto possui um script python, [gitter.py](gitter.py), é uma especie de gerente para o Git.

*That's All Folks!*