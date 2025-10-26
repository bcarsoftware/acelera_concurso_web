import {ContentWide} from "~/pages/dashboard/components/content-wide";
import {ContentCard} from "~/pages/dashboard/components/content-card";
import {InputNumber} from "~/pages/dashboard/components/input-number";
import {InputText} from "~/pages/dashboard/components/input-text";
import {HtmlType} from "../../../../../enums/html-type";
import {Colors} from "../../../../../enums/colors";
import {Button} from "~/pages/dashboard/components/button";

export const NoteTopicNew = () => {
    return (
        <form>
            <h1>Catasdro de Nota Assunto</h1>
            <ContentWide>
                <ContentCard>
                    <InputNumber
                        labelContent={"ID Assunto*"}
                        name={"topic-id"}
                        placeholder={"123"}
                        required={true}
                        disabled={false}
                    />
                    <InputText
                        labelContent={"Nota Assunto*"}
                        name={"note-topic-name"}
                        placeholder={"Nome da Nota Assunto"}
                        required={true}
                        disabled={false}
                    />
                    <InputText
                        labelContent={"Descrição do Assunto*"}
                        name={"note-topic-description"}
                        placeholder={"Descrição da Nota Assunto"}
                        required={true}
                        disabled={false}
                    />

                    <Button
                        buttonContent={"Cadastrar Nota Assunto"}
                        buttonType={HtmlType.SUBMIT}
                        name={"new-note-subject-button"}
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
