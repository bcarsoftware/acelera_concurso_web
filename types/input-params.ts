export interface InputParams {
    labelContent: string;
    name: string;
    placeholder: string;
    required: boolean;
    disabled: boolean;
    value?: string;
    updateValue?: (value: string) => void;
}
