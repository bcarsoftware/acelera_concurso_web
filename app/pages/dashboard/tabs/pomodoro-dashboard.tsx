import React, {useEffect, useState} from "react";
import {Colors} from "../../../../enums/colors";
import {ContentWide} from "~/pages/dashboard/components/content-wide";
import {ContentCard} from "~/pages/dashboard/components/content-card";
import {ButtonNew} from "~/pages/dashboard/components/button";
import {HtmlType} from "../../../../enums/html-type";
import {Pomodoro} from "~/utilities/pomodoro-utilities";
import {Dialog} from "~/dialog/dialog";
import {DialogConfirm} from "~/dialog/dialog-confirm";
import {PomodoroConstats} from "../../../../enums/constants";
import {PomodoroNew} from "~/pages/dashboard/data/pomodoro/pomodoro-new";

const fnStr = (str: string) => {};

export const PomodoroDashboardPage = () => {
    const [pomodoro, setPomodoro] = useState<Pomodoro>(new Pomodoro(fnStr, fnStr));

    const [minute, setMinutes] = useState<number>(0);
    const [second, setSeconds] = useState<number>(0);
    const [round, setRound] = useState<number>(0);
    const [interShort, setInterShort] = useState<number>(0);
    const [interLong, setInterLong] = useState<number>(0);

    const [play, setPlay] = useState<boolean>(false);
    const [pause, setPause] = useState<boolean>(false);
    const [reset, setReset] = useState<boolean>(false);
    const [resume, setResume] = useState<boolean>(false);

    const [playBtn, setPlayBtn] = useState<string>("INICIAR");
    const [pauseBtn, setPauseBtn] = useState<string>("PAUSAR");
    const [resetBtn, setResetBtn] = useState<string>("CONTINUAR");
    const [resumeBtn, setResumeBtn] = useState<string>("RESETAR");

    const [pomodoroTitle, setPomodoroTitle] = useState<string>("");
    const [pomodoroTimer, setPomodoroTimer] = useState<string>("");

    const [openDialog, setOpenDialog] = useState<boolean>(false);
    const [openDialogConfirm, setOpenDialogConfirm] = useState<boolean>(false);

    const [dialogTitle, setDialogTitle] = useState<string>("");
    const [dialogMessage, setDialogMessage] = useState<string>("");

    const [pomodoroRegisterScreen, setPomodoroRegisterScreen] = useState(false);

    useEffect(() => {
        setPomodoro(new Pomodoro(setPomodoroTimer, setPomodoroTitle));

        setMinutes(pomodoro.pomodoro.focusMinutes);
        setSeconds(pomodoro.pomodoro.focusSeconds);
        setRound(pomodoro.pomodoro.rounds);
        setInterShort(pomodoro.pomodoro.shortBreak);
        setInterLong(pomodoro.pomodoro.longBreak);
        setPomodoroTimer(pomodoro.pomodoro.watcher);

        setPomodoroTitle(pomodoro.pomodoro.title);
    }, []);

    const seeDialog = () => {
        return (<Dialog
            name={"pomodoro-dashboard-dialog"}
            title={dialogTitle}
            message={dialogMessage}
            buttonText={"Fechar"}
            closeFunction={setOpenDialog}
        />);
    };
    const seeConfirmDialog = () => {
        return (<DialogConfirm
            name={"pomodoro-dashboard-dialog-confirm"}
            title={dialogTitle}
            message={dialogMessage}
            yesFunction={toPlay}
            closeFunction={setOpenDialogConfirm}
        />);
    };

    const updateMinutes = (value: number) => {
        setMinutes(value);
        pomodoro.pomodoro.focusMinutes = value;
    };
    const updateSeconds = (value: number) => {
        setSeconds(value);
        pomodoro.pomodoro.focusSeconds = value;
    };
    const updateRound = (value: number) => {
        setRound(value);
        pomodoro.pomodoro.rounds = value;
    }
    const updateInterShort = (value: number) => {
        setInterShort(value);
        pomodoro.pomodoro.shortBreak = value;
    };
    const updateInterLong = (value: number) => {
        setInterLong(value);
        pomodoro.pomodoro.longBreak = value;
    };

    const stopAll = (): void => {
        setPlay(false);
        setPause(false);
        setReset(false);
        setResume(false);
    }

    const toPlay = () => {
        if (play) return;
        stopAll();
        setPlay(true);
        setPlayBtn("CONTANDO...");
        pomodoro?.play();
    };
    const toPause = () => {
        if (pause) return;
        stopAll();
        setPause(true);
        setPauseBtn("PAUSADO!");
        pomodoro?.pause();
    };
    const toReset = () => {
        if (reset) return;
        stopAll();
        setReset(true);
        setResetBtn("RESETADO!");
        pomodoro?.reset();
    };
    const toResume = () => {
        if (resume) return;
        stopAll();
        setResume(true);
        setResumeBtn("CONTINUA!");
        pomodoro?.resume();
    };

    const showPomodoroNewScreen = () => (<PomodoroNew
        minutesPomodoro={minute}
        secondsPomodoro={second}
        shortBreakPomodoro={interShort}
        longBreakPomodoro={interLong}
        roundsNumberPomodoro={round}
        setPomodoroRegisterScreen={setPomodoroRegisterScreen}
    />);

    const openPomodoroNew = () => {
        setPomodoroRegisterScreen(true);
    }

    return (
        <>
            <PomodoroStyle />
            <form>
                {pomodoroRegisterScreen && (showPomodoroNewScreen())}
                <h1>Ferramenta de Pomodoro</h1>
                <ContentWide>
                    <ContentCard>
                        <div id={"InputDiv"} className={"center-items"}>
                            <Div100Percent>
                                <InputTime
                                    name={"minute"}
                                    label={"Minutos*"}
                                    value={minute}
                                    required={true}
                                    minValue={PomodoroConstats.MINUTES_MIN}
                                    maxValue={PomodoroConstats.MINUTES_MAX}
                                    updateValue={updateMinutes}
                                />
                            </Div100Percent>
                            <Div100Percent>
                                <InputTime
                                    name={"seconds"}
                                    label={"Segundos*"}
                                    value={second}
                                    required={true}
                                    minValue={PomodoroConstats.SECONDS_MIN}
                                    maxValue={PomodoroConstats.SECONDS_MAX}
                                    updateValue={updateSeconds}
                                />
                            </Div100Percent>
                            <Div100Percent>
                                <InputTime
                                    name={"rounds"}
                                    label={"Rounds*"}
                                    value={round}
                                    required={true}
                                    minValue={PomodoroConstats.ROUNDS_MIN}
                                    maxValue={PomodoroConstats.ROUNDS_MAX}
                                    updateValue={updateRound}
                                />
                            </Div100Percent>
                            <Div100Percent>
                                <InputTime
                                    name={"short-break"}
                                    label={"Intervalo*"}
                                    value={interShort}
                                    required={true}
                                    minValue={PomodoroConstats.BREAK_SHORT_MIN}
                                    maxValue={PomodoroConstats.BREAK_SHORT_MAX}
                                    updateValue={updateInterShort}
                                />
                            </Div100Percent>
                            <Div100Percent>
                                <InputTime
                                    name={"long-break"}
                                    label={"Descanso*"}
                                    value={interLong}
                                    required={true}
                                    minValue={PomodoroConstats.BREAK_LONG_MIN}
                                    maxValue={PomodoroConstats.BREAK_LONG_MAX}
                                    updateValue={updateInterLong}
                                />
                            </Div100Percent>
                        </div>
                    </ContentCard>
                    <ContentCard>
                        <div id={"InputDiv"} className={"center-items"}>
                            <Div100Percent>
                                <ContentCard>
                                    <div className={"center-text"}>
                                        <h2>Pomodoro: {pomodoroTitle}</h2>
                                        <h1 id={"TIMER"}>{pomodoroTimer}</h1>
                                    </div>
                                </ContentCard>
                            </Div100Percent>
                            <Div100Percent>
                                <ContentCard>
                                    <div className={"center-text"}>
                                        <h2>Número de Rounds</h2>
                                        <h1 id={"TIMER"}>{`${pomodoro.rounds}/${round}`}</h1>
                                    </div>
                                </ContentCard>
                            </Div100Percent>
                        </div>
                    </ContentCard>
                    <ContentCard>
                        {openDialog && (seeDialog())}
                        {openDialogConfirm && (seeConfirmDialog())}
                        <div id={"InputDivButtons"} className={"center-items"}>
                            <Div100Percent>
                                <ButtonNew buttonContent={(() => play ? playBtn : "INICIAR")()} buttonType={HtmlType.BUTTON} name={"start"} styles={{
                                    bg_color: Colors.RED,
                                    bg_hover: Colors.RED_HOVER,
                                    font_color: Colors.WHITE
                                }}
                                onClickFunction={toPlay}
                                />
                            </Div100Percent>

                            <Div100Percent>
                                <ButtonNew buttonContent={(() => pause ? pauseBtn : "PAUSAR")()} buttonType={HtmlType.BUTTON} name={"pause"} styles={{
                                    bg_color: Colors.RED,
                                    bg_hover: Colors.RED_HOVER,
                                    font_color: Colors.WHITE
                                }}
                                onClickFunction={toPause}
                                />
                            </Div100Percent>

                            <Div100Percent>
                                <ButtonNew buttonContent={(() => resume ? resumeBtn : "CONTINUAR")()} buttonType={HtmlType.BUTTON} name={"restart"} styles={{
                                    bg_color: Colors.DART_BLUE,
                                    bg_hover: Colors.LIGHT_BLUE_HOVER,
                                    font_color: Colors.WHITE
                                }}
                                onClickFunction={toResume}
                                />
                            </Div100Percent>

                            <Div100Percent>
                                <ButtonNew buttonContent={(() => reset ? resetBtn : "RESETAR")()} buttonType={HtmlType.BUTTON} name={"reset"} styles={{
                                    bg_color: Colors.DART_BLUE,
                                    bg_hover: Colors.LIGHT_BLUE_HOVER,
                                    font_color: Colors.WHITE
                                }}
                                onClickFunction={toReset}
                                />
                            </Div100Percent>

                            <Div100Percent>
                                <ButtonNew buttonContent={"SALVAR"} buttonType={HtmlType.BUTTON} name={"save-pomodoro"} styles={{
                                    bg_color: Colors.GREEN,
                                    bg_hover: Colors.GREEN_HOVER,
                                    font_color: Colors.WHITE
                                }}
                                onClickFunction={openPomodoroNew}
                                />
                            </Div100Percent>
                        </div>
                    </ContentCard>
                </ContentWide>
            </form>
        </>
    );
}

interface IInput {
    name: string;
    label: string;
    value: number;
    required: boolean;
    minValue: number;
    maxValue?: number;
    updateValue: (valueNumber: number) => void;
}

const InputTime = ({
    name, label, minValue, maxValue, required, value, updateValue
}: IInput) => {
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const valueStr = e.target.value;

        const numberValue = Number(valueStr);

        updateValue(numberValue);
    }

    return (
        <div className="data-group">
            <label htmlFor={name}>{label}</label>
            <input type="number" id={name} name={name} value={value}
            min={minValue} max={maxValue} required={required} onChange={handleChange}/>
        </div>
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

const PomodoroStyle = () => {
    const style = `
    #Button {
        margin-left: 5px;
        margin-right: 5px;
        width: 100%;
    }
    /*IDS*/
    #Div100Percent {
        width: 100%;
        padding-left: 5px;
        padding-right: 5px;
    }
    #InputDiv {
        display: flex;
        width: 100%;
    }
    #InputDivButtons {
        display: flex;
        width: 100%;
    }
    #TIMER {
        font-weight: bold;
        font-size: 8rem;
    }
    /* classes */
    .center-items {
        align-items: center;
        justify-content: center;
    }
    .center-text {
        text-align: center;
    }
    /*colors*/
    .bg-black {
        background-color: ${Colors.BLACK};
    }
    /*colors end*/
    .data-group {
        text-align: left;
        position: relative;
    }
    
    .data-group label {
        display: block;
        margin-bottom: 8px;
        color: #555;
        font-weight: 600; /* Semi-bold */
    }
    
    .data-group input {
        width: 100%;
        padding: 12px 15px;
        border: 1px solid #ddd;
        border-radius: 6px;
        font-size: 16px;
        transition: border-color 0.3s, box-shadow 0.3s;
    }
    /* classes end */
    `;
    return (<style>{style}</style>)
};
