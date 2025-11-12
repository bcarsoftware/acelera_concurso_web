import {ContentWide} from "~/pages/dashboard/components/content-wide";
import {ContentCard} from "~/pages/dashboard/components/content-card";
import {InputText} from "~/pages/dashboard/components/input-text";
import {InputDate} from "~/pages/dashboard/components/input-date";
import {Button} from "../../components/button";
import {HtmlType, InputTypes} from "../../../../../enums/html-type";
import {Colors} from "../../../../../enums/colors";
import {useEffect, useState} from "react";
import {Select} from "~/pages/dashboard/components/select";
import {useAuth} from "../../../../../context/auth-context";
import {ContentTypes, EnvironConstants} from "../../../../../enums/constants";
import {HTTPTypes} from "../../../../../enums/http-types";
import {StringToTitle} from "../../../../../utils/string.utils";
import {Dialog} from "~/dialog/dialog";
import {EnumLevel, type PublicTenderResponse} from "../../../../../data/data";
import {SelectLevel} from "~/pages/dashboard/components/select-level";
import {InputNumber} from "~/pages/dashboard/components/input-number";
import {useNavigate} from "react-router";

interface TenderDetails {
    details?: PublicTenderResponse,
    goingToMainPage: () => void,
}

export const PublicTenderDetails = (
    { details, goingToMainPage }: TenderDetails
) => {
    const authUser = useAuth();

    const [tenderID, setTenderID] = useState<string | undefined>(undefined);

    const [tenderName, setTenderName] = useState<string>("");
    const [tenderBoard, setTenderBoard] = useState<string>("");
    const [tenderLevel, setTenderLevel] = useState<EnumLevel>(EnumLevel.UNDEFINED);
    const [institute, setInstitute] = useState<string>("");
    const [workTitle, setWorkTitle] = useState<string>("");
    const [noticeLink, setNoticeLink] = useState<string | undefined>(undefined);
    const [tenderDate, setTenderDate] = useState<string | undefined>(undefined);

    const [otherBoard, setOtherBoard] = useState<boolean>(false);
    const [publicTenderBoards, setPublicTenderBoards] = useState<string[]>([]);

    const [sail, setSail] = useState<string>("");
    const [boardName, setBoardName] = useState<string>("");

    const [showDialogResult, setShowDialogResult] = useState<boolean>(false);
    const [dialogTitle, setDialogTitle] = useState<string>("");
    const [dialogMessage, setDialogMessage] = useState<string>("");

    const [success, setSuccess] = useState<boolean>(false);

    useEffect(() => {
        if (authUser?.isLoading) return;
        const setData = async () => await gettingPublicTenderBoards();
        setData().then();

        setTenderName(details?.tender_name || "");
        setTenderBoard(details?.tender_board || "");
        setTenderLevel(details?.tender_level || EnumLevel.UNDEFINED);
        setInstitute(details?.institute || "");
        setWorkTitle(details?.work_title || "");
        setNoticeLink(details?.notice_link || undefined);
        setTenderDate(details?.tender_date || undefined);
        setTenderID(`${details?.public_tender_id}`);
    }, []);

    const changeOtherBoard = () => {
        setOtherBoard(!otherBoard);
    };

    const gettingPublicTenderBoards = async () => {
        try {
            const url = EnvironConstants.API_BASE_URL + "/public-tender-board/user";
            const response = await fetch(url, {
                method: HTTPTypes.GET,
                headers: {
                    "Content-Type": ContentTypes.JSON,
                    "Authorization": `Bearer ${authUser?.token}`
                }
            });

            const bodyUpdate = await response.json();

            if (!response.ok) {
                console.log(bodyUpdate);

                setPublicTenderBoards([]);
                return;
            }

            setPublicTenderBoards(bodyUpdate.data);
        }
        catch (error) { console.error(error); setPublicTenderBoards([]); }
    };

    const handleUpdatePublicTender = async () => {
        const tenderBoardName = otherBoard ? `${sail}: ${boardName}` : tenderBoard;

        const payload = {
            user_id: authUser?.user?.user_id,
            tender_name: tenderName,
            tender_board: tenderBoardName,
            tender_level: tenderLevel,
            institute: institute,
            work_title: workTitle,
            notice_link: noticeLink || null,
            tender_date: tenderDate || null,
            deleted: false,
        };

        try {
            const url = `${EnvironConstants.API_BASE_URL}/public-tender/${tenderID}`;
            const response = await fetch(url, {
                method: HTTPTypes.PATCH,
                body: JSON.stringify(payload),
                headers: {
                    "Content-Type": ContentTypes.JSON,
                    "Authorization": `Bearer ${authUser?.token}`
                }
            });

            const bodyUpdate = await response.json();

            if (!response.ok) {
                console.log(bodyUpdate);

                setDialogTitle("Erro no Cadastro");
                setDialogMessage("Não foi possível cadastrar o Concurso!");

                return;
            }

            setDialogTitle("Sucesso");
            setDialogMessage("Concurso cadastrado com sucesso!");
            setSuccess(true);
        }
        catch (error) {
            console.error(error);

            setDialogTitle("Erro no Servidor");
            setDialogMessage("Não foi possível cadastrar o Concurso!");
        }
        finally {
            setShowDialogResult(true);
        }
    };

    const getDialogResult = () => {
        const closingFunction = success ? (value: boolean) => {
            setShowDialogResult(value);
            setSuccess(value);
            goingToMainPage();
        } : setShowDialogResult;

        return (<Dialog
            name={"dialog-result"}
            title={dialogTitle}
            message={dialogMessage}
            buttonText={"Fechar"}
            closeFunction={closingFunction}
            zIndex={1001}
        />);
    }

    return (
        <form>
            <Style />
            {showDialogResult && (getDialogResult())}
            <h1>Detalhes do Concurso</h1>
            <ContentWide>
                <ContentCard>
                    <InputNumber
                        labelContent={"ID do Concurso"}
                        name={"public-tender-id"}
                        placeholder={"123"}
                        required={true}
                        disabled={true}
                        value={tenderID}
                    />

                    <InputText
                        labelContent={"Nome do Concurso*"}
                        name={"public-tender-name"}
                        placeholder={"Nome do Concurso"}
                        required={true}
                        disabled={false}
                        value={tenderName}
                        updateValue={setTenderName}
                    />

                    {otherBoard ? (
                        <div id={"OtherBoardInfo"}>
                            <div className={"div-25"}>
                                <InputText
                                    labelContent={"Sigla da Banca*"}
                                    name={"public-tender-sail-detail"}
                                    placeholder={"ABCD"}
                                    required={true}
                                    disabled={false}
                                    value={sail.toUpperCase()}
                                    updateValue={(value: string) => setSail(value.toUpperCase())}
                                />
                            </div>
                            <div className={"margin-left div-100"}>
                                <InputText
                                    labelContent={"Banca do Concurso*"}
                                    name={"public-tender-board-detail"}
                                    placeholder={"Nome da Banca do Concurso"}
                                    required={true}
                                    disabled={false}
                                    value={StringToTitle(boardName)}
                                    updateValue={(value: string) => setBoardName(StringToTitle(value))}
                                />
                            </div>
                        </div>
                    ): (
                        <Select
                            name={"tender-board-select-detail"}
                            required={true}
                            disabled={false}
                            label={"Selecione a Banca*"}
                            value={tenderBoard}
                            updateValue={setTenderBoard}
                        >
                            <option value={""}>Selecione a Banca</option>
                            {publicTenderBoards.map((board) => {
                                return (<option value={board}>{board}</option>)
                            })}
                        </Select>
                    )}

                    <div id={"OtherBoard"}>
                        <label htmlFor={"other-board"}>Banca Não Listada?</label>
                        <input
                            onChange={changeOtherBoard}
                            className={"checkbutton"}
                            type={InputTypes.CHECKBOX}
                            name={"other-board"}
                        />
                    </div>

                    <SelectLevel
                        required={true}
                        labelPhrase={"Nível de Escolaridade"}
                        disabled={false}
                        value={tenderLevel}
                        updateValue={setTenderLevel}
                    />

                    <InputText
                        labelContent={"Instituição Solicitante*"}
                        name={"public-tender-institute"}
                        placeholder={"Instituição que solicitou o centame"}
                        required={true}
                        disabled={false}
                        value={institute}
                        updateValue={setInstitute}
                    />
                    <InputText
                        labelContent={"Cargo Pretendido*"}
                        name={"public-tender-work-title"}
                        placeholder={"Função que deseja exercer"}
                        required={true}
                        disabled={false}
                        value={workTitle}
                        updateValue={setWorkTitle}
                    />
                    <InputText
                        labelContent={"Link do Edital"}
                        name={"public-tender-notice-link"}
                        placeholder={"https://www.institutodeconcurso.com.br/edital/edital-mes-dia-ano.pdf"}
                        required={false}
                        disabled={false}
                        value={noticeLink}
                        updateValue={setNoticeLink}
                    />
                    <InputDate
                        labelContent={"Data do Concurso"}
                        name={"public-tender-date"}
                        placeholder={""}
                        required={false}
                        disabled={false}
                        value={tenderDate}
                        updateValue={setTenderDate}
                    />

                    <Button
                        buttonContent={"Atualizar Concurso"}
                        buttonType={HtmlType.BUTTON}
                        name={"update-public-tender-button"}
                        styles={{
                            bg_color: Colors.GREEN,
                            bg_hover: Colors.GREEN_HOVER,
                            font_color: Colors.WHITE
                        }}
                        onClickFunction={handleUpdatePublicTender}
                    />
                </ContentCard>
            </ContentWide>
        </form>
    );
};

const Style = () => (<style>{`
    #OtherBoard {
        margin-bottom: 12px;
        display: flex;
    }
    #OtherBoard label {
        font-size: 1.05rem;
        font-weight: 550;
    }
    #OtherBoard input {
        width: 25px;
        height: 21px;
    }
    
    #OtherBoardInfo {
        display: flex;
    }
    
    .margin-left { margin-left: 12px; }
    
    .div-100 {
        width: 100%;
    }
    
    .div-25 {
        width: 25%;
    }
`}</style>);
