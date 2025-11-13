import {DivInputGroup} from "~/pages/dashboard/components/div-input-group";
import type {ChangeEvent} from "react";
import type {EnumCategory} from "../../../../data/data";

export const SelectCategory = (props: {
    disable: boolean,
    value?: string | EnumCategory,
    updateValue?: (value: string | EnumCategory) => void,
}) => {
    const handlerUpdateValue = (event: ChangeEvent<HTMLSelectElement>) => {
        const value = event.target.value as EnumCategory;

        if (props.updateValue) props.updateValue(value);
    }

    return (
        <DivInputGroup>
            <label htmlFor={"category"}>Selecione a Categoria*</label>
            <select name={"category"} id={"category"} required={true} onChange={handlerUpdateValue} value={props.value} disabled={props.disable}>
                <option value={""}>Selecione a Categoria</option>
                <option value={"GENERAL"}>Disciplinas Gerais</option>
                <option value={"SPECIFIC"}>Disciplinas Específicas</option>
            </select>
        </DivInputGroup>
    );
};
