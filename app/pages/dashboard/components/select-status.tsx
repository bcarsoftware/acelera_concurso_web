import {DivInputGroup} from "~/pages/dashboard/components/div-input-group";

export const SelectStatus = (props: {disable: boolean}) => {
    return (
        <DivInputGroup>
            <label htmlFor={"status"}>Selecione o Status*</label>
            <select name={"status"} id={"status"} required={true} disabled={props.disable}>
                <option value={"SPECIFIC"}>Incopleto</option>
                <option value={"GENERAL"}>Completo</option>
            </select>
        </DivInputGroup>
    );
};
