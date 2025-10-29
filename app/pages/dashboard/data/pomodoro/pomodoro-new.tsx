import {InputText} from "~/pages/dashboard/components/input-text";
import {PomodoroConstats} from "../../../../../enums/constants";
import React, {useEffect, useState} from "react";
import {StylePomodoro} from "~/pages/dashboard/data/pomodoro/style-pomodoro";
import {HtmlType} from "../../../../../enums/html-type";
import {Dialog} from "~/dialog/dialog";

interface PomodoroSaveParams {
    minutesPomodoro: number;
    secondsPomodoro: number;
    shortBreakPomodoro: number;
    longBreakPomodoro: number;
    roundsNumberPomodoro: number;
    setPomodoroRegisterScreen: (visible: boolean) => void;
}

export const PomodoroNew = ({
   minutesPomodoro, secondsPomodoro, shortBreakPomodoro, longBreakPomodoro, roundsNumberPomodoro, setPomodoroRegisterScreen
}: PomodoroSaveParams) => {
    const [pomodoroName, setPomodoroName] = React.useState<string>("");

    const [focusMinutes, setFocusMinutes] = React.useState<number>(0);
    const [focusSeconds, setFocusSeconds] = React.useState<number>(0);
    const [breakShort, setBreakShort] = React.useState<number>(0);
    const [breakLong, setBreakLong] = React.useState<number>(0);
    const [rounds, setRounds] = React.useState<number>(0);

    const [userID, setUserID] = React.useState<number>(0);

    const [openDialogPomodoro, setOpenDialogPomodoro] = useState<boolean>(false);
    const [dialogTitlePomodoro, setDialogTitlePomodoro] = useState<string>("");
    const [dialogMessagePomodoro, setDialogMessagePomodoro] = useState<string>("");

    const updatePomodoroName = (value: string) => setPomodoroName(value);

    const closePomodoroNew = () => {
        setPomodoroRegisterScreen(false);
    }

    const handleSave = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!pomodoroName) {
            setOpenDialogPomodoro(true);
            setDialogTitlePomodoro("Nome do Pomodoro");
            setDialogMessagePomodoro("Digite um Nome para esse Pomodoro");
        }

        const pomodoro = {
            user_id: userID,
            pomodoro_name: pomodoroName,
            focus_minutes: focusMinutes,
            focus_seconds: focusSeconds,
            break_short: breakShort,
            break_long: breakLong,
            rounds: rounds,
        };
    }

    const seePomodoroDialog = () => {
        return (<Dialog
            name={"pomodoro-new-dialog"}
            title={dialogTitlePomodoro}
            message={dialogMessagePomodoro}
            buttonText={"Fechar"}
            closeFunction={closePomodoroDialog}
        />);
    };

    const closePomodoroDialog = () => {
        setOpenDialogPomodoro(false);
        setDialogTitlePomodoro("");
        setDialogMessagePomodoro("");
    }

    useEffect(() => {
        setUserID(0);
        setFocusMinutes(minutesPomodoro);
        setFocusSeconds(secondsPomodoro);
        setBreakShort(shortBreakPomodoro);
        setBreakLong(longBreakPomodoro);
        setRounds(roundsNumberPomodoro);
    }, []);

    return (
        <form>
            {openDialogPomodoro && (seePomodoroDialog())}
            {!openDialogPomodoro && (<>
                <StylePomodoro />
                <div className={"popup-overlay"}>
                    <div className={"dialog-container"}>
                        <div id={"TitleDiv"}>
                            <div id={"TextDiv"}>
                                <h2>Cadastro Pomodoro</h2>
                            </div>
                        </div>

                        <div className={"input-group"}>
                            <InputText
                                labelContent={"Nome do Pomodoro*"}
                                name={"pomodoro-name"}
                                placeholder={"Nome do Pomodoro*"}
                                required={true}
                                disabled={false}
                                value={pomodoroName}
                                updateValue={updatePomodoroName}
                            />

                            <div className={"div-display-flex"}>
                                <Div100Percent>
                                    <InputTime
                                        name={"minutes"}
                                        label={"Minutes*"}
                                        value={focusMinutes}
                                        required={true}
                                        minValue={PomodoroConstats.SECONDS_MIN}
                                        maxValue={PomodoroConstats.SECONDS_MAX}
                                        updateValue={setFocusMinutes}
                                    />
                                </Div100Percent>

                                <Div100Percent>
                                    <InputTime
                                        name={"seconds"}
                                        label={"Segundos*"}
                                        value={focusSeconds}
                                        required={true}
                                        minValue={PomodoroConstats.SECONDS_MIN}
                                        maxValue={PomodoroConstats.SECONDS_MAX}
                                        updateValue={setFocusSeconds}
                                    />
                                </Div100Percent>

                                <Div100Percent>
                                    <InputTime
                                        name={"rounds"}
                                        label={"Rounds*"}
                                        value={rounds}
                                        required={true}
                                        minValue={PomodoroConstats.SECONDS_MIN}
                                        maxValue={PomodoroConstats.SECONDS_MAX}
                                        updateValue={setRounds}
                                    />
                                </Div100Percent>

                                <Div100Percent>
                                    <InputTime
                                        name={"interval"}
                                        label={"Intervalo*"}
                                        value={breakShort}
                                        required={true}
                                        minValue={PomodoroConstats.SECONDS_MIN}
                                        maxValue={PomodoroConstats.SECONDS_MAX}
                                        updateValue={setBreakShort}
                                    />
                                </Div100Percent>

                                <Div100Percent>
                                    <InputTime
                                        name={"rest"}
                                        label={"Descanso*"}
                                        value={breakLong}
                                        required={true}
                                        minValue={PomodoroConstats.SECONDS_MIN}
                                        maxValue={PomodoroConstats.SECONDS_MAX}
                                        updateValue={setBreakLong}
                                    />
                                </Div100Percent>
                            </div>
                        </div>

                        <div id={"ButtonDiv"}>
                            <button
                                type={HtmlType.SUBMIT}
                                className={"button-general margin-top-15 button-width-100-percent"}
                                onClick={handleSave}
                            >Cadastrar Pomodoro</button>
                            <button className={"button-not margin-top-15 button-width-100-percent"} onClick={closePomodoroNew} formNoValidate={true}>Cancelar e Fechar</button>
                        </div>
                    </div>
                </div>
            </>)}
        </form>
    );
};

interface IElement {
    children: React.ReactNode;
}

const Div100Percent = ({children}: IElement) => {
    return (
        <div id={"Div100Percent"}>{children}</div>
    );
};

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

const InputTime = ({
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
