import type {ChangeEvent} from "react";

interface PasswordInput {
    labelName: string;
    showPassword: boolean;
    required?: boolean;
    value?: string;
    updateValue?: (value: string) => void;
}

export const InputPassword = (
    { labelName, showPassword, required, value, updateValue }: PasswordInput
) => {
    const handlerUpdateValue = (event: ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;

        if (updateValue) updateValue(value);
    }

    return (
        <>
            <label htmlFor="password">{labelName}</label>
            <input
                type={showPassword ? "text" : "password"}
                id="password"
                name="password"
                placeholder="Sua senha"
                required={required}
                value={value}
                onChange={handlerUpdateValue}
            />
        </>
    );
};
