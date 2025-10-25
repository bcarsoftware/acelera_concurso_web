import type {AllScreens} from "../../types/all-screens";
import type {StartScreen} from "../../types/start-screen";

export enum ScreenNames {
    START = "START",
    PUBLIC_TENDER = "PUBLIC_TENDER",
    SUBJECT = "SUBJECT",
    TOPIC = "TOPIC",
    QUESTIONS = "QUESTIONS",
    SETTINGS = "SETTINGS",
    POMODORO = "POMODORO",
    LOGOUT = "LOGOUT",
}

export const swapScreenHiddenOthers = (
    screenName: ScreenNames,
    func: {
        setMainPage: (arg: boolean) => void;
        setPublicTender: (arg: boolean) => void;
        setSubject: (arg: boolean) => void;
        setTopic: (arg: boolean) => void;
        setQuestions: (arg: boolean) => void;
        setSettings: (arg: boolean) => void;
        setPomodoro: (arg: boolean) => void;
        setLogout: (arg: boolean) => void;
    }
) => {
    const screens = {...Object(ScreenNames)};

    screens.START = func.setMainPage
    screens.PUBLIC_TENDER = func.setPublicTender;
    screens.SUBJECT = func.setSubject;
    screens.TOPIC = func.setTopic;
    screens.QUESTIONS = func.setQuestions;
    screens.SETTINGS = func.setSettings;
    screens.POMODORO = func.setPomodoro;
    screens.LOGOUT = func.setLogout;

    setAllScreensFalse(screens);
    screens[screenName](true)
};

/* functions privates those looks like a utility */

class Props {
    private static instance: any

    static setInstance(newInstance: AllScreens) {
        if (!this.instance) {
            this.instance = newInstance
        }
    }

    static getInstance(): AllScreens {
        return this.instance;
    }
}

const setAllScreensFalse = (
    screens: { [x: string]: (arg: boolean) => void; }
) => {
    const screenKeys = Object.keys(screens);

    for (const key of screenKeys) {
        screens[key](false)
    }
};

const switchPageShown = (
    screenName: ScreenNames
) => {
    swapScreenHiddenOthers(
        screenName,
        {
            setMainPage: Props.getInstance().setMainPage,
            setPublicTender: Props.getInstance().setPublicTender,
            setSubject: Props.getInstance().setSubject,
            setTopic: Props.getInstance().setTopic,
            setQuestions: Props.getInstance().setQuestions,
            setSettings: Props.getInstance().setSettings,
            setPomodoro: Props.getInstance().setPomodoro,
            setLogout: Props.getInstance().setLogout,
        }
    );
};

const accessingMainPage = () => {
    switchPageShown(ScreenNames.START);
};
const accessingPublicTenderPage = () => {
    switchPageShown(ScreenNames.PUBLIC_TENDER);
}
const accessingSubjectPage = () => {
    switchPageShown(ScreenNames.SUBJECT);
}
const accessingTopicPage = () => {
    switchPageShown(ScreenNames.TOPIC);
}
const accessingQuestionPage = () => {
    switchPageShown(ScreenNames.QUESTIONS);
}
const accessingPomodoroPage = () => {
    switchPageShown(ScreenNames.POMODORO);
}
const accessingSettingPage = () => {
    switchPageShown(ScreenNames.SETTINGS);
}
const accessingLogoutPage = () => {
    switchPageShown(ScreenNames.LOGOUT);
}

/* get accessing functions */

export const getAccessFunctions = (props: AllScreens) => {
    Props.setInstance(props);

    return {
        accessingMainPage,
        accessingPublicTenderPage,
        accessingSubjectPage,
        accessingTopicPage,
        accessingQuestionPage,
        accessingPomodoroPage,
        accessingSettingPage,
        accessingLogoutPage
    };
};

export const getStartHeader = (props: StartScreen) => {
    Props.setInstance(props as AllScreens);

    return {
        accessingMainPage,
    };
};
