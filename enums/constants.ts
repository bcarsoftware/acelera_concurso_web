export enum PomodoroConstats {
    MINUTES_MIN = 1,
    MINUTES_MAX = 240,
    SECONDS_MIN = 0,
    SECONDS_MAX = 59,
    ROUNDS_MIN = 1,
    ROUNDS_MAX = 10,
    BREAK_SHORT_MIN = 1,
    BREAK_SHORT_MAX = 30,
    BREAK_LONG_MIN = 1,
    BREAK_LONG_MAX = 60,
}

export enum ContentTypes {
    JSON = 'application/json',
}

export const EnvironConstants = {
    API_BASE_URL: import.meta.env.VITE_API_BASE_URL || "http://localhost",
    API_AI_BASE_URL: import.meta.env.VITE_API_AI_BASE_URL || "http://localhost",
};
