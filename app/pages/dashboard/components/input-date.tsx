import type {InputParams} from "../../../../types/input-params";

export const InputDate = (props: InputParams) => {
    return (
        <div className="input-group">
            <label htmlFor={props.name}>{props.labelContent}</label>
            <input type="date" id={props.name} name={props.name} placeholder={props.placeholder} required={props.required}/>
        </div>
    );
};
