interface PasswordInput {
    labelName: string;
    showPassword: boolean;
    required?: boolean;
}

export const InputPassword = ({ labelName, showPassword, required }: PasswordInput) => {
    return (
        <>
            <label htmlFor="password">{labelName}</label>
            <input
                type={showPassword ? "text" : "password"}
                id="password"
                name="password"
                placeholder="Sua senha"
                required={required}
            />
        </>
    );
};
