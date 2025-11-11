import {InputText} from "~/pages/dashboard/components/input-text";
import {ContentTypes, EnvironConstants, PomodoroConstats} from "../../../../../enums/constants";
import React, {useEffect, useState} from "react";
import {HtmlType} from "../../../../../enums/html-type";
import {Dialog} from "~/dialog/dialog";
import {Div100Percent} from "~/pages/dashboard/components/div-hundrend-percent";
import {InputTime} from "~/pages/dashboard/components/input-time";
import {Colors} from "../../../../../enums/colors";
import {DivInputGroup} from "~/pages/dashboard/components/div-input-group";
import {useAuth} from "../../../../../context/auth-context";
import {HTTPTypes} from "../../../../../enums/http-types";

interface PomodoroSaveParams {
    pomodoroId: string,
    namePomodoro: string;
    minutesPomodoro: number;
    secondsPomodoro: number;
    shortBreakPomodoro: number;
    longBreakPomodoro: number;
    roundsNumberPomodoro: number;
    reload: boolean;
    setReload: (value: boolean) => void;
    setPomodoroUpdateScreen: (visible: boolean) => void;
}

export const PomodoroDetails = ({
    pomodoroId,
    namePomodoro,
    minutesPomodoro,
    secondsPomodoro,
    shortBreakPomodoro,
    longBreakPomodoro,
    roundsNumberPomodoro,
    reload,
    setReload,
    setPomodoroUpdateScreen
}: PomodoroSaveParams) => {
    const authentic = useAuth();

    const [dialogTitlePomodoro, setDialogTitlePomodoro] = useState<string>("");
    const [dialogMessagePomodoro, setDialogMessagePomodoro] = useState<string>("");

    const [pomodoroNameDetail, setPomodoroNameDetail] = useState<string>("");

    const [focusMinutesDetail, setFocusMinutesDetail] = useState<number>(0);
    const [focusSecondsDetail, setFocusSecondsDetail] = useState<number>(0);
    const [breakShortDetail, setBreakShortDetail] = useState<number>(0);

    const [breakLongDetail, setBreakLongDetail] = useState<number>(0);
    const [roundsDetail, setRoundsDetail] = useState<number>(0);

    const [openDialogPomodoro, setOpenDialogPomodoro] = useState<boolean>(false);

    const [success, setSuccess] = useState<boolean>(false);

    useEffect(() => {
        if (authentic?.isLoading) return;

        setPomodoroNameDetail(namePomodoro);
        setFocusMinutesDetail(minutesPomodoro);
        setFocusSecondsDetail(secondsPomodoro);
        setBreakShortDetail(shortBreakPomodoro);
        setBreakLongDetail(longBreakPomodoro);
        setRoundsDetail(roundsNumberPomodoro);
    }, []);

    const updatePomodoroName = (value: string) => setPomodoroNameDetail(value);

    const closePomodoroDetails = () => {
        setPomodoroUpdateScreen(false);
    }

    const handleUpdate = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!pomodoroNameDetail) {
            setDialogTitlePomodoro("Nome do Pomodoro");
            setDialogMessagePomodoro("Digite um Nome para esse Pomodoro");
            setOpenDialogPomodoro(true);
            return;
        }

        const pomodoro = {
            user_id: authentic?.user?.user_id || 0,
            pomodoro_name: pomodoroNameDetail,
            focus_minutes: focusMinutesDetail,
            focus_seconds: focusSecondsDetail,
            break_short: breakShortDetail,
            break_long: breakLongDetail,
            rounds: roundsDetail,
        };

        try {
            const url = `${EnvironConstants.API_BASE_URL}/pomodoro/${pomodoroId}`
            const response = await fetch(url, {
                method: HTTPTypes.PATCH,
                body: JSON.stringify(pomodoro),
                headers: {
                    "Content-Type": ContentTypes.JSON,
                    "Authorization": `Bearer ${authentic?.token}`,
                },
            });

            const body = await response.json();

            if (!response.ok) {
                console.log(body);

                setDialogTitlePomodoro("Erro no Cadastro");
                setDialogMessagePomodoro("Não foi possível cadastrar esse pomodoro!");

                return;
            }

            setDialogTitlePomodoro("Sucesso");
            setDialogMessagePomodoro("Pomodoro cadastrado com sucesso!");
            setSuccess(true);
            setReload(!reload);
        }
        catch (error) {
            console.error(error);

            setDialogTitlePomodoro("Erro no Servidor");
            setDialogMessagePomodoro("Não foi possível cadastrar esse pomodoro!");
        }
        finally {
            setOpenDialogPomodoro(true);
        }
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

        if (success) {
            setSuccess(false);
            setPomodoroUpdateScreen(false);
        }
    }

    return (
        <form>
            {openDialogPomodoro && (seePomodoroDialog())}
            {!openDialogPomodoro && (<>
                <StylePomodoro />
                <div className={"popup-overlay"}>
                    <div className={"dialog-container"}>
                        <div id={"TitleDiv"}>
                            <div id={"TextDiv"}>
                                <h2>Detalhes do Pomodoro</h2>
                            </div>
                        </div>

                        <DivInputGroup>
                            <InputText
                                labelContent={"Nome do Pomodoro*"}
                                name={"pomodoro-name-details"}
                                placeholder={"Nome do Pomodoro*"}
                                required={true}
                                disabled={false}
                                value={pomodoroNameDetail}
                                updateValue={updatePomodoroName}
                            />

                            <div className={"div-display-flex"}>
                                <Div100Percent>
                                    <InputTime
                                        name={"minutes-details"}
                                        label={"Minutes*"}
                                        value={focusMinutesDetail}
                                        required={true}
                                        minValue={PomodoroConstats.SECONDS_MIN}
                                        maxValue={PomodoroConstats.SECONDS_MAX}
                                        updateValue={setFocusMinutesDetail}
                                    />
                                </Div100Percent>

                                <Div100Percent>
                                    <InputTime
                                        name={"seconds"}
                                        label={"Segundos*"}
                                        value={focusSecondsDetail}
                                        required={true}
                                        minValue={PomodoroConstats.SECONDS_MIN}
                                        maxValue={PomodoroConstats.SECONDS_MAX}
                                        updateValue={setFocusSecondsDetail}
                                    />
                                </Div100Percent>

                                <Div100Percent>
                                    <InputTime
                                        name={"rounds"}
                                        label={"Rounds*"}
                                        value={roundsDetail}
                                        required={true}
                                        minValue={PomodoroConstats.SECONDS_MIN}
                                        maxValue={PomodoroConstats.SECONDS_MAX}
                                        updateValue={setRoundsDetail}
                                    />
                                </Div100Percent>

                                <Div100Percent>
                                    <InputTime
                                        name={"interval"}
                                        label={"Intervalo*"}
                                        value={breakShortDetail}
                                        required={true}
                                        minValue={PomodoroConstats.SECONDS_MIN}
                                        maxValue={PomodoroConstats.SECONDS_MAX}
                                        updateValue={setBreakShortDetail}
                                    />
                                </Div100Percent>

                                <Div100Percent>
                                    <InputTime
                                        name={"rest"}
                                        label={"Descanso*"}
                                        value={breakLongDetail}
                                        required={true}
                                        minValue={PomodoroConstats.SECONDS_MIN}
                                        maxValue={PomodoroConstats.SECONDS_MAX}
                                        updateValue={setBreakLongDetail}
                                    />
                                </Div100Percent>
                            </div>
                        </DivInputGroup>

                        <div id={"ButtonDiv"}>
                            <button
                                type={HtmlType.SUBMIT}
                                className={"button-general margin-top-15 button-width-100-percent"}
                                onClick={handleUpdate}
                            >Atualizar Pomodoro</button>
                            <button type={HtmlType.BUTTON} className={"button-not margin-top-15 button-width-100-percent"} onClick={closePomodoroDetails} formNoValidate={true}>Cancelar e Fechar</button>
                        </div>
                    </div>
                </div>
            </>)}
        </form>
    );
};

const StylePomodoro = () => {
    return (<style>{`
    #TitleDiv {
        display: flex;
        text-align: left;
    }
    #TitleText {
        width: 100%;
        justify-content: left;
    }
    #DivClose h2 {
        font-weight: normal;
    }
    #Div100Percent {
        width: 100%;
        padding-left: 5px;
        padding-right: 5px;
    }
    #ButtonDiv {
        justify-content: center;
        align-items: center;
    }
    
    .div-display-flex {
        display: flex;
    }
    
    .popup-overlay {
        position: fixed;
        top: 0;
        left: 0;
        width: 100vw;
        height: 100vh;
        background-color: rgba(0, 0, 0, 0.55);
    
        display: flex;
        justify-content: center;
        align-items: center;
    
        z-index: 1000;
    }
    
    .dialog-container {
        background-color: #ffffff;
        padding: 30px 40px;
        border-radius: 12px;
        box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
    
        max-width: 720px;
        width: 100%;
    
        position: relative;
    }
    
    .dialog-container p {
        text-align: left;
        font-size: 1.2rem;
        margin-bottom: 20px;
    }
    
    .dialog-container h2 {
        margin-bottom: 15px;
        color: #333;
        font-size: 2em;
    }
    
    .button-width-100-percent {
        width: 100%;
    }
    
    .button-general {
        font-weight: bold; 
        background-color: ${Colors.LIGHT_BLUE};
        color: ${Colors.WHITE};
        padding: 8px 20px;
        border-radius: 17px;
        cursor: pointer;
        font-size: 1.5em;
    }
    
    .button-general:hover {
        background-color: ${Colors.LIGHT_BLUE_HOVER}
    }
    
    .button-yes {
        font-weight: bold; 
        margin-left: 8px;
        background-color: ${Colors.LIGHT_BLUE};
        color: ${Colors.WHITE};
        padding: 8px 20px;
        border-radius: 17px;
        cursor: pointer;
        font-size: 1.5em;
    }
    
    .button-yes:hover {
        background-color: ${Colors.LIGHT_BLUE_HOVER}
    }
    
    .button-not {
        font-weight: bold; 
        background-color: ${Colors.RED};
        color: ${Colors.WHITE};
        padding: 8px 20px;
        border-radius: 17px;
        cursor: pointer;
        font-size: 1.5em;
    }
    
    .margin-top-15 {
        margin-top: 15px;
    }
    
    .button-not:hover {
        background-color: ${Colors.RED_HOVER}
    }
    `}</style>);
};
