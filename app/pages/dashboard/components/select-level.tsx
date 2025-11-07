import {DivInputGroup} from "~/pages/dashboard/components/div-input-group";
import {EnumLevel} from "../../../../data/data";
import type {ChangeEvent} from "react";

interface ILevel {
    required: boolean;
    labelPhrase: string;
    value: EnumLevel;
    disabled?: boolean;
    updateValue: (value: EnumLevel) => void;
}

export const SelectLevel = ({
    required, labelPhrase, value, disabled, updateValue
}: ILevel) => {
    const handlerUpdateValue = (event: ChangeEvent<HTMLSelectElement>) => {
        const value = event.target.value;

        updateValue(value as EnumLevel);
    }

    return (
        <DivInputGroup>
            <label htmlFor={"select-level"}>{labelPhrase += required ? "*" : ""}</label>
            <select name={"select-level"} id={"select-level"}
                    defaultValue={EnumLevel.UNDEFINED}
                    value={value}
                    onChange={handlerUpdateValue}
                    required={required} disabled={disabled}>
                <option value={EnumLevel.UNDEFINED}>A Definir...</option>
                <option value={EnumLevel.HIGH_SCHOOL}>Nível Médio</option>
                <option value={EnumLevel.GRADUATED}>Nível Superior</option>
            </select>
        </DivInputGroup>
    );
};
