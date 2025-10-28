import {clearInterval} from "node:timers";

/* POMODORO ZONE */
export class PomodoroData {
    private _focusMinutes: number;
    private _shortBreak: number;
    private _longBreak: number;
    private _rounds: number;
    private _paused: boolean;
    private _watcher: string;

    constructor() {
        this._focusMinutes = 25;
        this._shortBreak = 5;
        this._longBreak = 20;
        this._rounds = 4;
        this._paused = true;
        this._watcher = "00:00";
    }

    public reset(): void {
        this.focusMinutes = 25;
        this.shortBreak = 5;
        this.longBreak = 20;
        this.rounds = 4;
        this.paused = true;
        this.watcher = "00:00";
    }

    get focusMinutes(): number {
        return this._focusMinutes;
    }

    set focusMinutes(value: number) {
        this._focusMinutes = value;
    }

    get shortBreak(): number {
        return this._shortBreak;
    }

    set shortBreak(value: number) {
        this._shortBreak = value;
    }

    get longBreak(): number {
        return this._longBreak;
    }

    set longBreak(value: number) {
        this._longBreak = value;
    }

    get rounds(): number {
        return this._rounds;
    }

    set rounds(value: number) {
        this._rounds = value;
    }

    get paused(): boolean {
        return this._paused;
    }

    set paused(value: boolean) {
        this._paused = value;
    }

    get watcher(): string {
        return this._watcher;
    }

    set watcher(value: string) {
        this._watcher = value;
    }
}
export class Pomodoro {
    private minutes: number;
    private seconds: number;
    private rounds: number;
    private continuing?: any;
    private pomodoro: PomodoroData;
    private readonly setPomodoroTimer: (timer: string) => void;

    constructor(pomodoro: PomodoroData, setPomodoroTimer: (timer: string) => void) {
        this.minutes = 0;
        this.seconds = 0;
        this.rounds = 0;
        this.continuing = null;
        this.pomodoro = pomodoro;
        this.setPomodoroTimer = setPomodoroTimer;
    }

    private updateTimer(): void {
        this.seconds += 1;

        if (this.seconds === 60) {
            this.seconds = 0;
            this.minutes += 1;
        }

        const minutesFormated = String(this.minutes).padStart(2, "0");
        const secondsFormated = String(this.seconds).padStart(2, "0");

        this.pomodoro.watcher = `${minutesFormated}:${secondsFormated}`;

        this.setPomodoroTimer(this.pomodoro.watcher);
    }

    public play(): void {
        console.log("Playing Pomodoro...");
        this.pomodoro.watcher = "00:00";
        clearInterval(this.continuing);
        this.continuing = null;
        this.seconds = 0;
        this.minutes = 0;

        console.log("playing");

        if (this.pomodoro.paused) {
            this.pomodoro.paused = false;

            this.continuing = setInterval(() => {
                this.updateTimer();

                if (this.minutes === this.pomodoro.focusMinutes) {
                    this.rounds += 1;
                    this.pomodoro.paused = true;
                    console.log("fim do round", this.rounds);
                    this.runShortBreak();
                }

                if (this.rounds === this.pomodoro.rounds) {
                    this.pomodoro.paused = true;
                    this.runLongBreak();
                }
            }, 1000);
        }
    };

    public pause(): void {
        clearInterval(this.continuing);
        this.pomodoro.paused = true;
        this.continuing = null;
    }

    public reset(): void {
        clearInterval(this.continuing);
        this.continuing = null;
        this.rounds = 0;
        this.minutes = 0;
        this.seconds = 0;
        this.pomodoro.watcher = "00:00";
        this.pomodoro.paused = true;
    }

    public resetAll(): void {
        this.reset();
        this.pomodoro.reset();
    }

    public runShortBreak(): void {
        this.pomodoro.watcher = "00:00";
        clearInterval(this.continuing);
        this.continuing = null;
        this.seconds = 0;
        this.minutes = 0;

        console.log("interval")

        const sopped = this.rounds === this.pomodoro.rounds;

        if (sopped) {}

        else if (this.pomodoro.paused) {
            this.pomodoro.paused = false;

            this.continuing = setInterval(() => {
                this.updateTimer();

                if (this.minutes === this.pomodoro.shortBreak) {
                    this.pomodoro.paused = true;
                    clearInterval(this.continuing);
                    this.continuing = null;
                    this.play();
                }
            }, 1000);
        }
    }

    public runLongBreak(): void {
        this.pomodoro.watcher = "00:00";
        clearInterval(this.continuing);
        this.continuing = null;
        this.seconds = 0;
        this.minutes = 0;
        this.rounds = 0;

        console.log("long interval")

        if (this.pomodoro.paused) {
            this.pomodoro.paused = false;

            this.continuing = setInterval(() => {
                this.updateTimer();

                if (this.minutes === this.pomodoro.longBreak) {
                    this.pomodoro.paused = true;
                    clearInterval(this.continuing);
                    this.continuing = null;
                    this.play();
                }
            }, 1000);
        }
    }
}
/* POMODORO ZONE */
