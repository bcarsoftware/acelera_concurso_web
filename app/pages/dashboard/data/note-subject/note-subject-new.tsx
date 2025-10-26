import {ContentWide} from "~/pages/dashboard/components/content-wide";
import {ContentCard} from "~/pages/dashboard/components/content-card";
import {InputNumber} from "~/pages/dashboard/components/input-number";
import {InputText} from "~/pages/dashboard/components/input-text";
import {HtmlType} from "../../../../../enums/html-type";
import {Colors} from "../../../../../enums/colors";
import {Button} from "~/pages/dashboard/components/button";

export const NoteSubjectNew = () => {
    return (
        <form>
            <h1>Catasdro de Nota Disciplina</h1>
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
                        labelContent={"Nota Disciplina*"}
                        name={"note-subject-name"}
                        placeholder={"Nome da Nota Disciplina"}
                        required={true}
                        disabled={false}
                    />
                    <InputText
                        labelContent={"Descrição do Disciplina*"}
                        name={"note-subject-description"}
                        placeholder={"Descrição da Nota Disciplina"}
                        required={true}
                        disabled={false}
                    />

                    <Button
                        buttonContent={"Cadastrar Nota Disciplina"}
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
