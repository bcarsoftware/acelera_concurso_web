import type {InputParams} from "../../../../types/input-params";

export const InputNumber = (
    props: InputParams
) => {
    return (
        <div className="input-group">
            <label htmlFor={props.name}>{props.labelContent}</label>
            <input type="number" defaultValue={0} id={props.name} name={props.name} disabled={props.disabled}
                   placeholder={props.placeholder} required={props.required}/>
        </div>
    );
};
