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

const setAllScreensFalse = (
    screens: { [x: string]: (arg: boolean) => void; }
) => {
    const screenKeys = Object.keys(screens);

    for (const key of screenKeys) {
        screens[key](false)
    }
};

const switchPageShown = (
    screenName: ScreenNames,
    props: AllScreens
) => {
    swapScreenHiddenOthers(
        screenName,
        {
            setMainPage: props.setMainPage,
            setPublicTender: props.setPublicTender,
            setSubject: props.setSubject,
            setTopic: props.setTopic,
            setQuestions: props.setQuestions,
            setSettings: props.setSettings,
            setPomodoro: props.setPomodoro,
            setLogout: props.setLogout,
        }
    );
};

const accessingMainPage = (props: AllScreens) => {
    switchPageShown(ScreenNames.START, props);
};
const accessingPublicTenderPage = (props: AllScreens) => {
    switchPageShown(ScreenNames.PUBLIC_TENDER, props);
}
const accessingSubjectPage = (props: AllScreens) => {
    switchPageShown(ScreenNames.SUBJECT, props);
}
const accessingTopicPage = (props: AllScreens) => {
    switchPageShown(ScreenNames.TOPIC, props);
}
const accessingQuestionPage = (props: AllScreens) => {
    switchPageShown(ScreenNames.QUESTIONS, props);
}
const accessingPomodoroPage = (props: AllScreens) => {
    switchPageShown(ScreenNames.POMODORO, props);
}
const accessingSettingPage = (props: AllScreens) => {
    switchPageShown(ScreenNames.SETTINGS, props);
}
const accessingLogoutPage = (props: AllScreens) => {
    switchPageShown(ScreenNames.LOGOUT, props);
}

/* get accessing functions */

export const getAccessFunctions = (props: AllScreens) => {
    return {
        accessingMainPage: () => accessingMainPage(props),
        accessingPublicTenderPage: () => accessingPublicTenderPage(props),
        accessingSubjectPage: () => accessingSubjectPage(props),
        accessingTopicPage: () => accessingTopicPage(props),
        accessingQuestionPage: () => accessingQuestionPage(props),
        accessingPomodoroPage: () => accessingPomodoroPage(props),
        accessingSettingPage: () => accessingSettingPage(props),
        accessingLogoutPage: () => accessingLogoutPage(props)
    };
};

export const getStartHeader = (props: StartScreen) => {
    const allScreens: AllScreens = {
        setMainPage: props.setMainPage,
        setPublicTender: () => false,
        setSubject: () => false,
        setTopic: () => false,
        setQuestions: () => false,
        setPomodoro: () => false,
        setSettings: () => false,
        setLogout: () => false,
    };

    return {
        accessingMainPage: () => accessingMainPage(allScreens),
    };
};
