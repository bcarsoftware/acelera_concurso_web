export interface StartScreen {
    userPoints: number;
    setMainPage: (arg: boolean) => void;
    hiddenScreens: () => void;
    setLogout: (value: boolean) => void;
}
