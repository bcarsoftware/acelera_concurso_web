import {DivInputGroup} from "~/pages/dashboard/components/div-input-group";
import type {ChangeEvent} from "react";
import {EnumStatus} from "../../../../data/data";

export const SelectStatus = (props: {
    disable: boolean,
    value?: string,
    updateValue?: (value: string) => void,
}) => {
    const handlerUpdateValue = (event: ChangeEvent<HTMLSelectElement>) => {
        const value = event.target.value;

        if (props.updateValue) props.updateValue(value);
    }

    return (
        <DivInputGroup>
            <label htmlFor={"status"}>Selecione o Status*</label>
            <select value={props.value} onChange={handlerUpdateValue} name={"status"} id={"status"} required={true} disabled={props.disable}>
                <option value={EnumStatus.INCOMPLETE}>Incompleto</option>
                <option value={EnumStatus.COMPLETE}>Completo</option>
            </select>
        </DivInputGroup>
    );
};
