import {ContentWide} from "~/pages/dashboard/components/content-wide";
import {ContentCard} from "~/pages/dashboard/components/content-card";
import {InputNumber} from "~/pages/dashboard/components/input-number";
import {InputText} from "~/pages/dashboard/components/input-text";
import {Select} from "~/pages/dashboard/components/select";
import {HtmlType} from "../../../../../enums/html-type";
import {Colors} from "../../../../../enums/colors";
import {Button} from "~/pages/dashboard/components/button";

export const StudyTipsNew = () => {
    return (
        <form>
            <h1>Cadastro Dica de Estudo</h1>
            <ContentWide>
                <ContentCard>
                    <InputNumber
                        labelContent={"ID Usuário*"}
                        name={"user-id"}
                        placeholder={"123"}
                        required={true}
                        disabled={false}
                    />
                    <InputText
                        labelContent={"Nome da Dica*"}
                        name={"study-tips-name"}
                        placeholder={"Nome da Dica de Estudo"}
                        required={true}
                        disabled={false}
                    />
                    <InputText
                        labelContent={"Descrição da Dica"}
                        name={"study-tips-description"}
                        placeholder={"Descrição da Dica de Estudo"}
                        required={false}
                        disabled={false}
                    />
                    <Select
                        name={"generate-ai"}
                        required={true}
                        disabled={false}
                        label={"Selecione IA*"}
                    >
                        <option value={eval("true")}>NÃO</option>
                        <option value={eval("false")}>SIM</option>
                    </Select>

                    <Button
                        buttonContent={"Cadastrar Dica de Estudo"}
                        buttonType={HtmlType.SUBMIT}
                        name={"new-study-tip-button"}
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
