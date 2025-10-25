import {ContentWide} from "~/pages/dashboard/components/content-wide";
import {ContentCard} from "~/pages/dashboard/components/content-card";
import {InputText} from "~/pages/dashboard/components/input-text";
import {InputNumber} from "~/pages/dashboard/components/input-number";
import {SelectCategory} from "~/pages/dashboard/components/select-category";
import {SelectStatus} from "~/pages/dashboard/components/select-status";
import {HtmlType} from "../../../../../enums/html-type";
import {Colors} from "../../../../../enums/colors";
import {Button} from "~/pages/dashboard/components/button";

export const SubjectNew = () => {
    return (
        <form>
            <h1>Cadastro Nova Disciplina</h1>
            <ContentWide>
                <ContentCard>
                    <InputNumber
                        labelContent={"ID Concurso*"}
                        name={"public-tender-id"}
                        placeholder={"Nome do Concurso"}
                        required={true}
                    />
                    <InputText
                        labelContent={"Nome da Disciplina*"}
                        name={"subject-name"}
                        placeholder={"Nome do Concurso"}
                        required={true}
                    />
                    <SelectCategory disable={false} />
                    <SelectStatus disable={false} />

                    <Button
                        buttonContent={"Cadastrar Nova Disciplina"}
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
