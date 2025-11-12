import {ContentCard} from "~/pages/dashboard/components/content-card";
import React, {forwardRef, useEffect, useRef, useState} from "react";
import {ContentWide} from "~/pages/dashboard/components/content-wide";
import {Colors} from "../../../../enums/colors";
import {useAuth} from "../../../../context/auth-context";
import {ContentTypes, EnvironConstants} from "../../../../enums/constants";
import {HTTPTypes} from "../../../../enums/http-types";
import type {PublicTenderResponse} from "../../../../data/data";
import {ButtonNew} from "~/pages/dashboard/components/button";
import {HtmlType} from "../../../../enums/html-type";
import {Div100Percent} from "~/pages/dashboard/components/div-hundrend-percent";
import {Dialog} from "~/dialog/dialog";
import {Select} from "~/pages/dashboard/components/select";
import {DialogConfirm} from "~/dialog/dialog-confirm";

interface IParams {
    setPublicTender: (value: boolean) => void;
    setShowPublicTenderNew: (value: boolean) => void;
    setShowPublicTenderDetails: (value: boolean) => void;
    setSelectedPublicTender: (value: PublicTenderResponse) => void;
}

export const PublicTenderDashboardPage = (
    { setPublicTender, setShowPublicTenderNew, setShowPublicTenderDetails, setSelectedPublicTender }: IParams
) => {
    const carouselRef = useRef<HTMLDivElement>(null);
    const authUser = useAuth();

    const [dialogTitle, setDialogTitle] = useState<string>("");
    const [dialogMessage, setDialogMessage] = useState<string>("");
    const [openDialog, setOpenDialog] = useState<boolean>(false);

    const [openConfirmDelete, setOpenConfirmDelete] = useState<boolean>(false);

    const [publicTenders, setPublicTenders] = useState<PublicTenderResponse[]>([]);
    const [selectedIndex, setSelectedIndex] = useState<number | undefined>(undefined);

    const [institute, setInstitute] = useState<string | undefined>(undefined);

    useEffect(() => {
        if (authUser?.isLoading) return;

        const getData = async () => await gettingPublicTenders();
        getData().then();
    }, []);

    const handleScroll = (direction: "left" | "right") => {
        if (carouselRef.current) {
            const scrollAmount = carouselRef.current.clientWidth;

            if (direction === "left") {
                carouselRef.current.scrollLeft -= scrollAmount;
            } else {
                carouselRef.current.scrollLeft += scrollAmount;
            }
        }
    };

    const gettingPublicTenders = async () => {
        try {
            const url = `${EnvironConstants.API_BASE_URL}/public-tender`;
            const response = await fetch(url, {
                method: HTTPTypes.GET,
                headers: {
                    "Content-Type": ContentTypes.JSON,
                    "Authorization": `Bearer ${authUser?.token}`,
                    "UserID": authUser?.user?.user_id.toString() || "0"
                }
            });

            const dataBody = await response.json();

            if (!response.ok) {
                console.log(dataBody);

                setPublicTenders([]);
            }

            setPublicTenders(dataBody.data);
        }
        catch (error) {
            console.error(error);

            setPublicTenders([]);
        }
    };

    const handleDeletePublicTender = async () => {
        if (selectedIndex == undefined) return;
        const tenderID = publicTenders[selectedIndex].public_tender_id;

        try {
            const url = `${EnvironConstants.API_BASE_URL}/public-tender/${tenderID}`;
            const response = await fetch(url, {
                method: HTTPTypes.DELETE,
                headers: {
                    "Content-Type": ContentTypes.JSON,
                    "Authorization": `Bearer ${authUser?.token}`,
                }
            });

            const dataBoard = await response.json();
            if (!response.ok) {
                console.log(dataBoard);

                setDialogTitle("Erro no Servidor");
                setDialogMessage("Esse concurso não pôde ser excluido!");
                return;
            }

            await gettingPublicTenders();
            setDialogTitle("Sucesso");
            setDialogMessage("Concurso encontrado e excluído!");
        }
        catch (error) {
            console.error(error);

            setDialogTitle("Erro no Servidor");
            setDialogMessage("Esse concurso não pôde ser excluido!");
        }
        finally {
            setOpenConfirmDelete(false);
            setOpenDialog(true);
        }
    };

    const handleNewPublicTender = async () => {
        setSelectedIndex(undefined);
        setPublicTender(false);
        setShowPublicTenderNew(true);
    };

    const handleUpdatePublicTender = async () => {
        const unlocked = selectedIndex == undefined;
        if (unlocked) {
            setDialogTitle("Erro na Edição");
            setDialogMessage("Primeiro selecione um concurso para editar!");
            setOpenDialog(true);
            return;
        }

        setSelectedPublicTender(publicTenders[selectedIndex]);

        setSelectedIndex(undefined);
        setPublicTender(false);
        setShowPublicTenderDetails(true);
    };

    const resetClick = () => {
        setSelectedIndex(undefined);
    };

    const handleSearchByInstitution = async (value?: string) => {
        if (!value) return;
        else if (value === "null") {
            setInstitute(undefined);
            await gettingPublicTenders();
            return;
        }

        setInstitute(value);

        try {
            const url = `${EnvironConstants.API_BASE_URL}/public-tender/${value}/institute`;
            const response = await fetch(url, {
                method: HTTPTypes.GET,
                headers: {
                    "Content-Type": ContentTypes.JSON,
                    "Authorization": `Bearer ${authUser?.token}`,
                    "UserID": `${authUser?.user?.user_id.toString() || "-1100000"}`,
                }
            });

            const dataBody = await response.json();

            if (!response.ok) {
                console.log(dataBody);

                setDialogTitle("Erro na Busca");
                setDialogMessage("Concurso não encontrado para este instituto!");
            }

            setPublicTenders(dataBody.data);
            setDialogTitle("Sucesso");
            setDialogMessage(`Foram encontrados ${dataBody.data.length} concursos!`);
        }
        catch (error) {
            console.error(error);

            setDialogTitle("Erro na Busca");
            setDialogMessage("Concurso não encontrado para este instituto!");
        }
        finally {
            setOpenDialog(true);
        }
    };

    const seeDialog = () => {
        return (<Dialog
            name={"public-tender-dashboard-dialog"}
            title={dialogTitle}
            message={dialogMessage}
            buttonText={"Fechar"}
            closeFunction={setOpenDialog}
        />);
    };

    const managerDeletePublicTender = async () => {
        const unlocked = selectedIndex == undefined;
        if (unlocked) {
            setDialogTitle("Erro na Exclusão");
            setDialogMessage("Primeiro selecione um concurso para excluir!");
            setOpenDialog(true);
            return;
        }

        setOpenConfirmDelete(true);
    };

    const seeConfirmDeleteDialog = () => {
        return (<DialogConfirm
            name={"public-tender-confirm-delete"}
            title={"Atenção"}
            message={"Tem certeza que deseja excluir este concurso?"}
            yesFunction={handleDeletePublicTender}
            closeFunction={setOpenConfirmDelete}
        />);
    };

    return (<div>
        {openDialog && (seeDialog())}
        {openConfirmDelete && (seeConfirmDeleteDialog())}
        <StyleTender />
        <form>
            <h1>Mural de Concursos</h1>
            <ContentWide>
                <ContentCard>
                    <CarouselControl>
                    <ButtonPrevious onClick={() => handleScroll("left")} />
                    <Carousel ref={carouselRef}>
                        {publicTenders.map((publicTender, index) => (
                            <Item value={index} onClick={setSelectedIndex}>
                                <h2>Concurso</h2>
                                <h1>{publicTender.tender_name}</h1>
                            </Item>
                        ))}
                    </Carousel>
                    <ButtonNext onClick={() => handleScroll("right")} />
                    </CarouselControl>
                </ContentCard>
            </ContentWide>
            <ContentWide>
                <ContentCard>
                    <div id={"InputDivButtons"} className={"center-items"}>
                    <Div100Percent>
                        <ButtonNew buttonContent={
                            "Novo Concurso"
                        } buttonType={
                            HtmlType.BUTTON
                        } name={
                            "new-public-tender"
                        } styles={{
                            bg_color: Colors.GREEN,
                            bg_hover: Colors.GREEN_HOVER,
                            font_color: Colors.WHITE,
                        }} onClickFunction={handleNewPublicTender} />
                    </Div100Percent>
                    <Div100Percent>
                        <ButtonNew buttonContent={
                            "Editar Concurso"
                        } buttonType={
                            HtmlType.BUTTON
                        } name={
                            "edit-public-tender"
                        } styles={{
                            bg_color: Colors.LIGHT_BLUE,
                            bg_hover: Colors.LIGHT_BLUE_HOVER,
                            font_color: Colors.WHITE,
                        }} onClickFunction={handleUpdatePublicTender} />
                    </Div100Percent>
                    <Div100Percent>
                        <ButtonNew buttonContent={
                            "Excluir Concurso"
                        } buttonType={
                            HtmlType.BUTTON
                        } name={
                            "delete-public-tender"
                        } styles={{
                            bg_color: Colors.RED,
                            bg_hover: Colors.RED_HOVER,
                            font_color: Colors.WHITE,
                        }} onClickFunction={managerDeletePublicTender} />
                    </Div100Percent>
                    <Div100Percent>
                        <ButtonNew buttonContent={
                            "Resetar Concurso Selecionado"
                        } buttonType={
                            HtmlType.BUTTON
                        } name={
                            "reset-public-tender"
                        } styles={{
                            bg_color: Colors.GOLDEN,
                            bg_hover: Colors.GOLDEN_HOVER,
                            font_color: Colors.BLACK,
                        }} onClickFunction={resetClick} />
                    </Div100Percent>
                    </div>
                </ContentCard>
            </ContentWide>
            <ContentWide>
                <ContentCard>
                    <h2>Busca Por Instituto</h2>
                    <Select
                        name={"select-institute"}
                        required={true}
                        disabled={false}
                        label={"Nome do Instituto*"}
                        value={institute}
                        updateValue={handleSearchByInstitution}
                    >
                        <option value={"null"}>Selecione o Instituto</option>
                        {publicTenders.map((publicTender, index) => (
                            <option key={index} value={publicTender.institute}>{publicTender.institute}</option>
                        ))}
                    </Select>
                </ContentCard>
            </ContentWide>
        </form>
    </div>);
};

interface IContent {
    children?: React.ReactNode;
    value?: number
    onClick?: (value: number) => void;
}

interface IContentCarousel {
    children?: React.ReactNode;
    onClick?: () => void;
}

interface IButtonProps {
    onClick: () => void;
}

const ButtonNext = (
    { onClick }: IButtonProps
) => (<i onClick={onClick} id={"BtnNext"}></i>);

const ButtonPrevious = (
    { onClick }: IButtonProps
) => (<i onClick={onClick} id={"BtnPrevious"}></i>);

const Item = ({children, value, onClick}: IContent) => {
    const handleClick = () => {
        if (!!onClick && value != undefined) {
            onClick(value);
        }
    }

    return (
        <div id={"ItemDiv"} onClick={handleClick} className="center-text">{children}</div>
    );
}

const CarouselControl = ({children, onClick}: IContentCarousel) => (
    <div id={"CarouselControl"} onClick={onClick} className="center-items">{children}</div>
);

const Carousel = forwardRef<HTMLDivElement, IContent>(({ children }, ref) => (
    <div id={"Carousel"} className="center-items" ref={ref}>
        {children}
    </div>
));

const StyleTender = () => (<style>{`
    #InputDivButtons {
        display: flex;
        width: 100%;
    }
    #Div100Percent {
        width: 100%;
        padding-left: 5px;
        padding-right: 5px;
    }
    #BtnNext {
        cursor: pointer;
        background: url(/assets/btn-carousel-right.ico);
        background-position: 0 0; width: 32px; height: 32px;
    }
    #BtnPrevious {
        cursor: pointer;
        background: url(/assets/btn-carousel-left.ico);
        background-position: 0 0; width: 32px; height: 32px;
    }
    #ItemDiv {
        padding: 25px;
        background-color: ${Colors.BG_PAGE};
        border-radius: 30px;
        margin: 0 10px 0 10px;
        max-width: 25%;
        width: 25%;
        cursor: pointer;
        box-shadow: 2px 2px 2px rgba(0, 0, 0, 0.3);
        flex: 0 0 auto;
        
        height: 25vh;
    
        overflow: hidden;
    
        text-overflow: ellipsis;
    }
    #ItemDiv:hover {
        background-color: ${Colors.WHITE};
    }
    #Carousel {
        display: flex;
        width: 100%;
        flex: 1;
        scroll-behavior: smooth;
        overflow: hidden;
        
        justify-content: flex-start;
        
        overflow-x: auto;
        scrollbar-width: none;
        -ms-overflow-style: none;
    }
    #Carousel::-webkit-scrollbar {
        display: none;
    }
    #CarouselControl {
        display: flex;
        width: 100%;
        flex: 1;
        position: relative;
    }
    .center-items {
        align-items: center;
        justify-content: center;
    }
    .center-text {
        text-align: center;
    }
`}</style>);


