import {type ChangeEvent, useState} from "react";
import {DivInputGroup} from "~/pages/dashboard/components/div-input-group";
import {Colors} from "../../../../enums/colors";

interface IInputFile {
    settingFileFunction: (file?: File) => void;
}

export const InputFile = (
    { settingFileFunction }: IInputFile
) => {
    const [filename, setFilename] = useState<string>("");

    const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files.length > 0) {
            if (!event.target.files[0].name.includes(".pdf")) return;

            settingFileFunction(event.target.files[0]);
            setFilename(event.target.files[0].name);
            return;
        }
        settingFileFunction(undefined);
        setFilename("");
    };

    const handleTextChange = (event: ChangeEvent<HTMLInputElement>) => {
        if (event.target.value) setFilename(event.target.value);
        else setFilename("");
    }

    return (<DivInputGroup>
        <InputFileStyle />
        <label className={"label-pdf"} htmlFor={"input-file"}>Gerar questões a partir de PDF{
            filename.length > 0 ? `: ${filename}` : ": Vázio"
        }</label>
        <input id={"input-file"} name={"input-file"} className={"input-hidden"}
               type="file" onChange={handleFileChange} />
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