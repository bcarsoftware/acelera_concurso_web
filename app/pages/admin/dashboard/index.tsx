import {HeaderAdmin} from "~/pages/admin/components/header";
import type {Route} from "../../../../.react-router/types/app/routes/+types/home";
import {HtmlFont} from "../../../../enums/html-type";
import {Colors} from "../../../../enums/colors";
import {useEffect, useState} from "react";
import {FooterAdmin} from "~/pages/admin/components/footer";
import {LogoutAdminPage} from "~/pages/admin/components/logout-admin";
import {PublicTenderBoardNewPage} from "~/pages/admin/pages/public-tender-board/new-public-tender-board";
import {PublicTenderBoardDetails} from "~/pages/admin/pages/public-tender-board/details-public-tender-board";
import {DialogConfirm} from "~/dialog/dialog-confirm";
import {Dialog} from "~/dialog/dialog";
import {type AuthContextType, useAdminAuth} from "../../../../context/auth-admin-context";
import {useNavigate} from "react-router";
import type {PublicTenderBoardResponse} from "../../../../data/data";
import {ContentTypes, EnvironConstants} from "../../../../enums/constants";
import {HTTPTypes} from "../../../../enums/http-types";

export function meta({}: Route.MetaArgs) {
    return [
        { title: "Administrador Acelera Concurso" },
        { name: "description", content: "Painel Avançado Sistema Acelera Concurso" },
    ];
}

interface IPublicTenderBoard {
    id: number;
    name: string;
    sail: string;
}

export default function Index() {
    const [pTenderBoard, setPTenderBoard] = useState<boolean>(false);
    const [logout, setLogout] = useState<boolean>(false);
    const [publicTenderDetails, setPublicTenderDetails] = useState<IPublicTenderBoard | null>(null);
    const [publicTenderShowDetails, setPublicTenderShowDetails] = useState<boolean>(false);
    const [publicTenderBoardDelete, setPublicTenderBoardDelete] = useState<boolean>(false);

    const [publicTenderBoardList, setPublicTenderBoardList] = useState<PublicTenderBoardResponse[]>([]);

    const [showDialogResult, setShowDialogResult] = useState<boolean>(false);
    const [dialogTitle, setDialogTitle] = useState<string>("");
    const [dialogMessage, setDialogMessage] = useState<string>("");

    const authenticated: AuthContextType | null = useAdminAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (authenticated?.isLoading) return;

        if (!authenticated?.isLoading && (
            !authenticated?.user || !authenticated.user.user_admin_id || !authenticated.token
        )) {
            navigate("/admin/login");
            return;
        }

        const settingPublicTenderBoards = async () => {
            await setAllPublicTenderBoards();
        };
        settingPublicTenderBoards().then();
    }, [authenticated, navigate]);

    const setAllPublicTenderBoards = async () => {
        try {
            const url = EnvironConstants.API_BASE_URL + "/public-tender-board"
            const response = await fetch(url, {
                method: HTTPTypes.GET,
                headers: {
                    "Content-Type": ContentTypes.JSON,
                    "Authorization": `Bearer ${authenticated?.token}`
                }
            });

            const data = await response.json();

            if (!response.ok) {
                setPublicTenderBoardList([]);
                return;
            }

            setPublicTenderBoardList(data.data);
        }
        catch (error) {
            setPublicTenderBoardList([]);
        }
    };

    const accessLogoutPage = () => (<LogoutAdminPage
        logOutScreen={logout}
        setLogoutScreen={setLogout}
    />);

    const getDialogResult = () => {
        return (<Dialog
            name={"dialog-result"}
            title={dialogTitle}
            message={dialogMessage}
            buttonText={"Fechar"}
            closeFunction={setShowDialogResult}
            zIndex={1001}
        />);
    }

    const handleDeletePublicTenderBoard = async () => {
        setPublicTenderBoardDelete(false);

        try {
            const url = EnvironConstants.API_BASE_URL + (
                "/public-tender-board/" + publicTenderDetails?.id + "/delete"
            )
            const response = await fetch(url, {
                method: HTTPTypes.DELETE,
                headers: {
                    "Content-Type": ContentTypes.JSON,
                    "Authorization": `Bearer ${authenticated?.token}`
                }
            });

            const data = await response.json();

            if (!response.ok) {
                console.error(data);

                setDialogTitle("Erro no Cadastro");
                setDialogMessage("Não foi possível cadastrar essa Banca de Concurso!");

                return;
            }

            setDialogTitle("Sucesso")
            setDialogMessage("Banca de Concurso foi excluída!");

            await setAllPublicTenderBoards();
        }
        catch (error) {
            console.error(error);

            setDialogTitle("Erro no Servidor");
            setDialogMessage("Não foi possível se conectar!")
        }
        finally {
            setShowDialogResult(true);
        }
    };

    const seeDeleteConfirmationPage = () => {
        return (
            <DialogConfirm
                name={"delete-public-tender-board"}
                title={"Excluir Banca de Concurso"}
                message={`Tem certeza que deseja EXCLUIR a banca: ${publicTenderDetails?.name}?`}
                yesFunction={handleDeletePublicTenderBoard}
                closeFunction={setPublicTenderBoardDelete}
            />
        );
    };

    return (
        <>
        {showDialogResult && (getDialogResult())}
        {logout && (accessLogoutPage())}
        {pTenderBoard && (<PublicTenderBoardNewPage
            setOpened={setPTenderBoard}
            getAllBoards={setAllPublicTenderBoards}
        />)}
        {publicTenderShowDetails && (<PublicTenderBoardDetails
            id={publicTenderDetails && publicTenderDetails?.id || 0}
            sail={publicTenderDetails && publicTenderDetails?.sail || ""}
            name={publicTenderDetails && publicTenderDetails?.name || ""}
            setOpened={setPublicTenderShowDetails}
            getAllBoards={setAllPublicTenderBoards}
        />)}
        {publicTenderBoardDelete && (seeDeleteConfirmationPage())}

        <StyleBodyAdmin />
            <HeaderAdmin setLogout={setLogout} />
            <main id={"Dashboard"}>
                <div className={"line"}>
                    <div className={"col-25"}></div>
                    <div className={"col-100"}>
                        <h1 id={"PageTitle"}>Bem Vindo(a) ao Painel de Administração</h1>

                        <table>
                            <thead>
                                <tr id={"TableTitle"}>
                                    <td colSpan={4}>
                                        <h2>Tabela de Bancas de Concurso</h2>
                                    </td>
                                    <td className={"btn-add"} onClick={() => setPTenderBoard(true)}>Criar</td>
                                </tr>
                            </thead>
                            <thead>
                            <tr>
                                <td>ID</td>
                                <td>Sigla</td>
                                <td>Nome</td>
                                <td>Altere</td>
                                <td>Exclua</td>
                            </tr>
                            </thead>
                            <tbody>
                                {
                                    publicTenderBoardList && publicTenderBoardList.map(
                                        (tender: PublicTenderBoardResponse, index: number) => {
                                            return (
                                                <LineTenderBoard
                                                    id={tender.public_tender_board_id}
                                                    sail={tender.sail}
                                                    name={tender.name}
                                                    updateFunction={setPublicTenderDetails}
                                                    handleDetails={setPublicTenderShowDetails}
                                                    handleDeletePublicTender={
                                                        setPublicTenderBoardDelete
                                                    }
                                                    index={index}
                                                />
                                            );
                                        }
                                    )
                                }
                            </tbody>
                        </table>
                    </div>
                    <div className={"col-25"}></div>
                </div>
            </main>
            <FooterAdmin />
        </>
    );
}

interface PublicTenderBoardAndFunctions {
    id: number;
    name: string;
    sail: string;
    updateFunction: (value: IPublicTenderBoard) => void;
    handleDetails: (value: boolean) => void;
    handleDeletePublicTender: (value: boolean) => void;
    index: number;
}

const LineTenderBoard = ({
    id, sail, name, updateFunction, handleDetails, handleDeletePublicTender, index
}: PublicTenderBoardAndFunctions) => {
    const colorBG = index % 2 == 0 ? Colors.LIGHT_BLUE_WHITE : Colors.WHITE;

    const handleUpdate = () => {
        updateFunction({id, sail, name});
        handleDetails(true);
    };

    const handleDelete = () => {
        updateFunction({id, sail, name});
        handleDeletePublicTender(true);
    }

    return (
        <>
            <tr style={{ backgroundColor: colorBG }}>
                <td>{id}</td>
                <td>{sail}</td>
                <td>{name}</td>
                <td><button className={"btn-edit"} onClick={handleUpdate}>Alterar</button></td>
                <td><button className={"btn-delete"} onClick={handleDelete}>Delete</button></td>
            </tr>
        </>
    );
};

const StyleBodyAdmin = () => {
    return (<style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap');
        
        #PageTitle { margin-bottom: 14px; }
        
        #TableTitle {
            background-color: ${Colors.LIGHT_BLUE};
        }
        
        #TableTitle {
            text-align: center;
            color: ${Colors.WHITE};
        }
        
        table {
            border: 1px solid ${Colors.BLACK};
            width: 100%;
            font-size: 1.45rem;
            background-color: ${Colors.WHITE};
        }
        
        thead {
            font-weight: ${HtmlFont.BOLDER};
        }
        
        tbody tr:hover {
            font-weight: ${HtmlFont.BOLDER};
            color: ${Colors.LIGHT_BLUE_HOVER};
        }
        
        td {
            padding: 4px;
        }
        td:hover { padding: 0; }
        
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
            font-family: ${HtmlFont.FONT_INTER};
        }
        
        body, html {
            width: 100%;
            height: 100%;
        }
        
        .line {
            width: 100%;
            display: flex;
            margin-top: 20px;
            margin-bottom: 20px;
        }
        
        .col-100 {
            width: 100%;
        }
        
        .col-25 {
            width: 25%;
        }
        
        .btn-edit {
            width: 70%;
            cursor: pointer;
            color: ${Colors.WHITE};
            background-color: ${Colors.BLACK};
            text-align: center;
            font-size: 1.2rem;
            font-weight: ${HtmlFont.BOLD};
            border-radius: 10px;
        }
        .btn-edit:hover {
            font-weight: ${HtmlFont.BOLD};
            background-color: ${Colors.BLACK_HOVER};
        }
        
        .btn-delete {
            width: 70%;
            cursor: pointer;
            color: ${Colors.WHITE};
            background-color: ${Colors.RED};
            text-align: center;
            font-size: 1.2rem;
            font-weight: ${HtmlFont.BOLD};
            border-radius: 10px;
        }
        .btn-delete:hover {
            font-weight: ${HtmlFont.BOLD};
            background-color: ${Colors.RED_HOVER};
        }
        
        .btn-add {
            background-color: ${Colors.GOLDEN};
            color: ${Colors.BLACK};
            font-weight: ${HtmlFont.BOLDER};
            cursor: pointer;
            text-align: center;
            font-weight: ${HtmlFont.BOLD};
        }
        .btn-add:hover {
            background-color: ${Colors.GOLDEN_HOVER};
            font-weight: ${HtmlFont.BOLDER};
        }
        
        body {
            display: flex;
            flex-direction: column;
            min-height: 100vh;
            font-family: ${HtmlFont.FONT_INTER};
            background-color: ${Colors.BG_PAGE};
            color: ${Colors.BLACK_HOVER};
        }
        
        h1 {
            font-family: ${HtmlFont.FONT_INTER};
            font-size: 2rem;
            font-weight: ${HtmlFont.BOLDER};
        }
        
        h2 {
            font-family: ${HtmlFont.FONT_INTER};
            font-size: 1.5rem;
            font-weight: ${HtmlFont.BOLDER};
        }
        
        h4 {
            font-family: ${HtmlFont.FONT_INTER};
            font-size: 1.1rem;
            font-weight: ${HtmlFont.BOLDER};
        }
        
        header, footer {
            color: ${Colors.WHITE};
            padding: 1rem 1.5rem;
            text-align: center;
            box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
            z-index: 10;
        }
        
        header {
            display: flex;
            align-items: center;
            background-color: ${Colors.BLACK};
        }
        
        footer {
            margin-top: auto;
            background-color: ${Colors.BLACK};
            display: flex;
            font-size: 1.25rem;
        }
        
        section {
            min-height: 48px;
            display: grid;
            justify-items: left;
            background-color: #f9f9f9;
            border: 2px dashed ${Colors.BORDER_LIGHT};
            border-radius: 8px;
            color: #aaa;
            cursor: pointer;
        }
        
        section:hover {
            transform: translateY(-5px);
        }
        
        #Dashboard {
            display: flex;
            flex: 1;
            overflow: hidden;
        }
        
        @media (max-width: 768px) {
            #Dashboard {
                flex-direction: column;
            }
        
            .class-content-square {
                min-width: 100%;
            }
        }
    `}</style>);
};
