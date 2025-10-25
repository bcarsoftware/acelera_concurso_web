export interface AllScreens {
    setMainPage: (arg: boolean) => void;
    setPublicTender: (arg: boolean) => void;
    setSubject: (arg: boolean) => void;
    setTopic: (arg: boolean) => void;
    setQuestions: (arg: boolean) => void;
    setPomodoro: (arg: boolean) => void;
    setSettings: (arg: boolean) => void;
    setLogout: (arg: boolean) => void;
    hiddenNewRegisters: () => void;
}
