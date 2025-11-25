import {DivInputGroup} from "~/pages/dashboard/components/div-input-group";
import type {ChangeEvent} from "react";

export interface IInputNumber {
    labelContent: string;
    name: string;
    placeholder: string;
    required: boolean;
    disabled: boolean;
    value?: number;
    updateValue?: (value: number) => void;
}

export const InputNumber = (
    props: IInputNumber
) => {
    const handlerUpdateValue = (event: ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;

        if (props.updateValue) props?.updateValue(parseInt(value));
    }

    return (
        <DivInputGroup>
            <label htmlFor={props.name}>{props.labelContent}</label>
            <input type="number" defaultValue={0} value={props.value} id={props.name} name={props.name}
                   disabled={props.disabled} onChange={handlerUpdateValue}
                   placeholder={props.placeholder} required={props.required}/>
        </DivInputGroup>
    );
};
