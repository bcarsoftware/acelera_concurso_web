import type {InputParams} from "../../../../types/input-params";
import {DivInputGroup} from "~/pages/dashboard/components/div-input-group";

export const InputNumber = (
    props: InputParams
) => {
    return (
        <DivInputGroup>
            <label htmlFor={props.name}>{props.labelContent}</label>
            <input type="number" defaultValue={0} id={props.name} name={props.name} disabled={props.disabled}
                   placeholder={props.placeholder} required={props.required}/>
        </DivInputGroup>
    );
};
