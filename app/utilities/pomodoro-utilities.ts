/* POMODORO ZONE */
class PomodoroData {
    private _focusMinutes: number;
    private _focusSeconds: number;
    private _shortBreak: number;
    private _longBreak: number;
    private _rounds: number;
    private _paused: boolean;
    private _watcher: string;
    private _title: string;

    constructor() {
        this._focusMinutes = 25;
        this._focusSeconds = 0;
        this._shortBreak = 5;
        this._longBreak = 20;
        this._rounds = 4;
        this._paused = true;
        this._watcher = "00:00";
        this._title = "Em Espera...";
    }

    public reset(): void {
        this.focusMinutes = 25;
        this.focusSeconds = 0;
        this.shortBreak = 5;
        this.longBreak = 20;
        this.rounds = 4;
        this.paused = true;
        this.watcher = "00:00";
        this.title = "Em Espera...";
    }

    get focusMinutes(): number {
        return this._focusMinutes;
    }

    set focusMinutes(value: number) {
        this._focusMinutes = value;
    }

    get focusSeconds(): number {
        return this._focusSeconds;
    }

    set focusSeconds(value: number) {
        this._focusSeconds = value;
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

    get title(): string {
        return this._title;
    }

    set title(value: string) {
        this._title = value;
    }
}
export class Pomodoro {
    private minutes: number;
    private seconds: number;
    private _rounds: number;
    private continuing?: any;
    private readonly _pomodoro: PomodoroData;
    private readonly setPomodoroTimer: (timer: string) => void;
    private readonly setPomodoroTitle: (title: string) => void;
    public isShortInterval: boolean;
    public isLongInterval: boolean;

    get pomodoro(): PomodoroData {
        return this._pomodoro;
    }

    get rounds(): number {
        return this._rounds;
    }

    constructor(
        setPomodoroTimer: (timer: string) => void,
        setPomodoroTitle: (title: string) => void,
    ) {
        this.minutes = 0;
        this.seconds = 0;
        this._rounds = 0;
        this.continuing = null;
        this._pomodoro = new PomodoroData();
        this.setPomodoroTimer = setPomodoroTimer;
        this.setPomodoroTitle = setPomodoroTitle;
        this.isShortInterval = false;
        this.isLongInterval = false;
    }

    public play(): void {
        this.resetInterval();

        this.playing();
    };

    public pause(): void {
        clearInterval(this.continuing);
        this.pomodoro.paused = true;
        this.continuing = null;
        this.pomodoro.title = "Em Espera...";
        this.setPomodoroTitle(this.pomodoro.title);
    }

    public resume(): void {
        if (this.isShortInterval) this.runShortBreak(true);
        else if (this.isLongInterval) this.runLongBreak(true);
        else this.playing();
    }

    public reset(): void {
        clearInterval(this.continuing);
        this.continuing = null;
        this._rounds = 0;
        this.minutes = 0;
        this.seconds = 0;
        this.pomodoro.watcher = "00:00";
        this.pomodoro.paused = true;

        this.setPomodoroTimer(this.pomodoro.watcher);
    }

    private playing(): void {
        if (this.pomodoro.paused) {
            this.pomodoro.paused = false;

            this.continuing = setInterval(() => {
                this.updateTimer();
                this.pomodoro.title = "Foco Total! Vai!"
                this.setPomodoroTitle(this.pomodoro.title);

                if (this.minutes === this.pomodoro.focusMinutes) {
                    this._rounds += 1;
                    this.pomodoro.paused = true;
                    this.runShortBreak(false);
                }

                if (this._rounds === this.pomodoro.rounds) {
                    this.pomodoro.paused = true;
                    this.runLongBreak(false);
                }
            }, 1000);
        }
    };

    private runShortBreak(isResume: boolean): void {
        if (!isResume) this.resetInterval();

        const sopped = this._rounds === this.pomodoro.rounds;

        if (sopped) {}

        else if (this.pomodoro.paused) {
            this.pomodoro.paused = false;
            this.isShortInterval = true;
            this.pomodoro.title = "Pausa Rápida!"
            this.setPomodoroTitle(this.pomodoro.title);

            this.continuing = setInterval(() => {
                this.updateTimer();

                if (this.minutes === this.pomodoro.shortBreak) {
                    this.pomodoro.paused = true;
                    clearInterval(this.continuing);
                    this.continuing = null;
                    this.isShortInterval = false;
                    this.play();
                }
            }, 1000);
        }
    }

    private runLongBreak(isResume: boolean): void {
        if (!isResume) this.resetInterval();
        this._rounds = 0;

        if (this.pomodoro.paused) {
            this.pomodoro.paused = false;
            this.isLongInterval = true;
            this.pomodoro.title = "Intervalo entre Rounds!";
            this.setPomodoroTitle(this.pomodoro.title);

            this.continuing = setInterval(() => {
                this.updateTimer();

                if (this.minutes === this.pomodoro.longBreak) {
                    this.pomodoro.paused = true;
                    clearInterval(this.continuing);
                    this.continuing = null;
                    this.isLongInterval = false;
                    this.play();
                }
            }, 1000);
        }
    }

    private resetInterval(): void {
        this.pomodoro.watcher = "00:00";
        this.setPomodoroTimer(this.pomodoro.watcher);
        clearInterval(this.continuing);
        this.continuing = null;
        this.seconds = 0;
        this.minutes = 0;
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
}
/* POMODORO ZONE */
