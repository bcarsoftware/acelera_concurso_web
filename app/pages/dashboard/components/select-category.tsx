export const SelectCategory = (props: {disable: boolean}) => {
    return (
        <div className={"input-group"}>
            <label htmlFor={"category"}>Selecione a Cegororia*</label>
            <select name={"category"} id={"category"} required={true} disabled={props.disable}>
                <option>Categoria</option>
                <option value={"GENERAL"}>Disciplinas Gerais</option>
                <option value={"SPECIFIC"}>Disciplinas Específicas</option>
            </select>
        </div>
    );
};
