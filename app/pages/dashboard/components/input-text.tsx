import type {InputParams} from "../../../../types/input-params";
import type {ChangeEvent} from "react";
import {DivInputGroup} from "~/pages/dashboard/components/div-input-group";

export const InputText = (
    props: InputParams
) => {
    const handlerUpdateValue = (event: ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;

        if (props.updateValue) props?.updateValue(value);
    }

    return (
        <DivInputGroup>
            <label htmlFor={props.name}>{props.labelContent}</label>
            <input type="text" id={props.name} name={props.name}
                   placeholder={props.placeholder} required={props.required}
            value={props.value}
            onChange={handlerUpdateValue}/>
        </DivInputGroup>
    );
};
