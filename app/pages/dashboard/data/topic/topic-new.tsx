import {ContentWide} from "~/pages/dashboard/components/content-wide";
import {ContentCard} from "~/pages/dashboard/components/content-card";
import {InputNumber} from "~/pages/dashboard/components/input-number";
import {InputText} from "~/pages/dashboard/components/input-text";
import {SelectStatus} from "~/pages/dashboard/components/select-status";
import {HtmlType} from "../../../../../enums/html-type";
import {Colors} from "../../../../../enums/colors";
import {Button} from "~/pages/dashboard/components/button";

export const TopicNew = () => {
    return (
        <form>
            <h1>Cadastro Novo Assunto</h1>
            <ContentWide>
                <ContentCard>
                    <InputNumber
                        labelContent={"ID Disciplina*"}
                        name={"subject-id"}
                        placeholder={"123"}
                        required={true}
                        disabled={false}
                    />
                    <InputText
                        labelContent={"Nome do Assunto*"}
                        name={"topic-name"}
                        placeholder={"Nome do Assunto"}
                        required={true}
                        disabled={false}
                    />
                    <InputText
                        labelContent={"Descrição do Assunto"}
                        name={"topic-description"}
                        placeholder={"Descrição sobre o Assunto"}
                        required={false}
                        disabled={false}
                    />
                    <SelectStatus disable={false} />

                    <Button
                        buttonContent={"Cadastrar Novo Assunto"}
                        buttonType={HtmlType.SUBMIT}
                        name={"new-topic-button"}
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
