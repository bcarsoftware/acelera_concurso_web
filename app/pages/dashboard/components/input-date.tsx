import type {InputParams} from "../../../../types/input-params";
import {DivInputGroup} from "~/pages/dashboard/components/div-input-group";

export const InputDate = (props: InputParams) => {
    return (
        <DivInputGroup>
            <label htmlFor={props.name}>{props.labelContent}</label>
            <input type="date" id={props.name} name={props.name} placeholder={props.placeholder} required={props.required}/>
        </DivInputGroup>
    );
};
