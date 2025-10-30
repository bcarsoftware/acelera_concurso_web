import React from "react";

interface IInputSave {
    name: string;
    label: string;
    value: number;
    required: boolean;
    minValue: number;
    disabled?: boolean;
    maxValue?: number;
    updateValue: (valueNumber: number) => void;
}

export const InputTime = ({
   name, label, minValue, maxValue, required, value, updateValue, disabled
}: IInputSave) => {
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const valueStr = e.target.value;

        const numberValue = Number(valueStr);

        updateValue(numberValue);
    }

    return (
        <div className="data-group">
            <label htmlFor={name}>{label}</label>
            <input
                type={"number"}
                name={name}
                id={name}
                value={value}
                required={required}
                disabled={disabled}
                min={minValue}
                max={maxValue}
                onChange={handleChange}
            />
        </div>
    );
};
