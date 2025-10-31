import React from "react";
import {DivInputGroup} from "~/pages/dashboard/components/div-input-group";

interface SelectProps {
    name: string;
    required: boolean;
    disabled: boolean;
    label: string;
    children: React.ReactNode; // 2. 'children' é apenas mais uma prop
}

export const Select = ({ label, name, required, disabled, children }: SelectProps) => {
    return (
        <DivInputGroup>
            <label htmlFor={name}>{label}</label>
            <select name={name} id={name} required={required} disabled={disabled}>
                {children}
            </select>
        </DivInputGroup>
    );
};
