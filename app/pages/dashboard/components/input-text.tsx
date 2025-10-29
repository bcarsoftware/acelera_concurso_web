import type {InputParams} from "../../../../types/input-params";
import type {ChangeEvent} from "react";

export const InputText = (
    props: InputParams
) => {
    const handlerUpdateValue = (event: ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;

        if (props.updateValue) props?.updateValue(value);
    }

    return (
        <div className="input-group">
            <label htmlFor={props.name}>{props.labelContent}</label>
            <input type="text" id={props.name} name={props.name}
                   placeholder={props.placeholder} required={props.required}
            value={props.value}
            onChange={handlerUpdateValue}/>
        </div>
    );
};
