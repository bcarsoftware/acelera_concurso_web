import {DivInputGroup} from "~/pages/dashboard/components/div-input-group";

export const SelectCategory = (props: {disable: boolean}) => {
    return (
        <DivInputGroup>
            <label htmlFor={"category"}>Selecione a Cegororia*</label>
            <select name={"category"} id={"category"} required={true} disabled={props.disable}>
                <option>Categoria</option>
                <option value={"GENERAL"}>Disciplinas Gerais</option>
                <option value={"SPECIFIC"}>Disciplinas Específicas</option>
            </select>
        </DivInputGroup>
    );
};
