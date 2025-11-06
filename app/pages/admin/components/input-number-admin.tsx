import {DivInputGroup} from "~/pages/dashboard/components/div-input-group";

interface InputParams {
    labelContent: string;
    name: string;
    placeholder: string;
    required: boolean;
    disabled: boolean;
    value: number;
    updateValue?: (value: number) => void;
}

export const InputNumberAdmin = (
    props: InputParams
) => {
    return (
        <DivInputGroup>
            <label htmlFor={props.name}>{props.labelContent}</label>
            <input type="number" id={props.name} name={props.name} disabled={props.disabled}
                   placeholder={props.placeholder} required={props.required} value={props.value} />
        </DivInputGroup>
    );
};
