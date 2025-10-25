import type {InputParams} from "../../../../types/input-params";

export const InputText = (
    props: InputParams
) => {
    return (
        <div className="input-group">
            <label htmlFor={props.name}>{props.labelContent}</label>
            <input type="text" id={props.name} name={props.name} placeholder={props.placeholder} required={props.required}/>
        </div>
    );
};
