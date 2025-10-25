import {ContentWide} from "~/pages/dashboard/components/content-wide";
import {ContentCard} from "~/pages/dashboard/components/content-card";
import {InputText} from "~/pages/dashboard/components/input-text";
import {InputDate} from "~/pages/dashboard/components/input-date";
import {Button} from "../../components/button";
import {HtmlType} from "../../../../../enums/html-type";
import {Colors} from "../../../../../enums/colors";

export const PublicTenderNew = () => {
    return (
        <form>
            <h1>Cadastro Novo Concurso</h1>
            <ContentWide>
                <ContentCard>
                    <InputText
                        labelContent={"Nome do Concurso*"}
                        name={"public-tender-name"}
                        placeholder={"Nome do Concurso"}
                        required={true}
                    />
                    <InputText
                        labelContent={"Banca do Concurso*"}
                        name={"public-tender-board"}
                        placeholder={"Nome da Banca do Concurso"}
                        required={true}
                    />
                    <InputText
                        labelContent={"Carggo Pretendido*"}
                        name={"public-tender-work-title"}
                        placeholder={"Função que deseja exercer"}
                        required={true}
                    />
                    <InputText
                        labelContent={"Instituição Solicitante*"}
                        name={"public-tender-institute"}
                        placeholder={"Instituição que solicitou o centame"}
                        required={true}
                    />
                    <InputText
                        labelContent={"Link do Edital"}
                        name={"public-tender-notice-link"}
                        placeholder={"https://www.institutodeconcurso.com.br/edital/edital-mes-dia-ano.pdf"}
                        required={false}
                    />
                    <InputDate
                        labelContent={"Data do Concurso"}
                        name={"public-tender-date"}
                        placeholder={""}
                        required={false}
                    />

                    <Button
                        buttonContent={"Cadastrar Novo Concurso"}
                        buttonType={HtmlType.SUBMIT}
                        name={"new-public-tender"}
                        styles={{
                            bg_color: Colors.GREEN,
                            bg_hover: Colors.GREEN_HOVER,
                            font_color: Colors.WHITE
                        }}
                    />
                </ContentCard>
            </ContentWide>
        </form>
    );
};
