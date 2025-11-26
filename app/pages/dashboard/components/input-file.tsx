import {type ChangeEvent, type MouseEvent} from "react";
import {DivInputGroup} from "~/pages/dashboard/components/div-input-group";
import {Colors} from "../../../../enums/colors";

interface IInputFile {
    id: string;
    selectedPDF?: File,
    settingFileFunction: (file?: File) => void;
}

export const InputFile = (
    { id, selectedPDF, settingFileFunction }: IInputFile
) => {
    const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files.length > 0) {
            if (!event.target.files[0].name.toLowerCase().endsWith(".pdf")) {
                event.target.value = "";
                return;
            }

            settingFileFunction(event.target.files[0]);
            return;
        }
        settingFileFunction(undefined);
    };

    const handleInputClick = (event: MouseEvent<HTMLInputElement>) => {
        event.currentTarget.value = "";
        settingFileFunction(undefined);
    }

    return (<DivInputGroup>
        <InputFileStyle />
        <label className={"label-pdf"} htmlFor={id}>Gerar questões a partir de PDF{
            selectedPDF ? `: ${selectedPDF.name}` : ": Vázio"
        }</label>
        <input id={id} name={id} className={"input-hidden"} accept={".pdf"}
               type="file" onChange={handleFileChange} onClick={handleInputClick} />
    </DivInputGroup>);
};

const InputFileStyle = () => (<style>{`
    .input-hidden {
        opacity: 0;
        position: absolute;
        z-index: -1;
        width: 0.1px;
        height: 0.1px;
    }
    .label-pdf {
        font-size: 1.2rem;
        cursor: pointer;
    }
    .label-pdf:hover {
        color: ${Colors.LIGHT_BLUE};
    }
`}</style>);