import React from "react";

interface SelectProps {
    name: string;
    required: boolean;
    disabled: boolean;
    label: string;
    children: React.ReactNode; // 2. 'children' é apenas mais uma prop
}

export const Select = ({ label, name, required, disabled, children }: SelectProps) => {
    return (
        <div className={"input-group"}>
            <label htmlFor={name}>{label}</label>
            <select name={name} id={name} required={required} disabled={disabled}>
                {children}
            </select>
        </div>
    );
};
