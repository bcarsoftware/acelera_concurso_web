import React, {type ChangeEvent} from "react";
import {DivInputGroup} from "~/pages/access/components/div-input-group";

interface SelectProps {
    name: string;
    required: boolean;
    disabled: boolean;
    label: string;
    children: React.ReactNode;
    value?: string;
    updateValue?: (value: string) => void;
}

export const Select = (
    {
        label, name, required, disabled, children, value, updateValue,
    }: SelectProps
) => {
    const handlerUpdateValue = (event: ChangeEvent<HTMLSelectElement>) => {
        const value = event.target.value;

        if (updateValue) updateValue(value);
    }

    return (
        <DivInputGroup>
            <label htmlFor={name}>{label}</label>
            <select
                name={name}
                id={name}
                required={required}
                disabled={disabled}
                value={value}
                onChange={handlerUpdateValue}
            >
                {children}
            </select>
        </DivInputGroup>
    );
};
