import type {AllScreens} from "../../types/all-screens";
import type {StartScreen} from "../../types/start-screen";

export enum ScreenNames {
    PROFILE = "PROFILE",
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
        setProfilePage: (arg: boolean) => void;
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

    screens.PROFILE = func.setProfilePage
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
            setProfilePage: props.setProfilePage,
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
const accessingProfilePage = (props: AllScreens) => {
    switchPageShown(ScreenNames.PROFILE, props);
}
const accessingMainPage = (props: AllScreens) => {
    props.hiddenNewRegisters();
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
    props.setMainPage(true);
}

/* get accessing functions */

export const getAccessFunctions = (props: AllScreens) => {
    return {
        accessingProfilePage: () => accessingProfilePage(props),
        accessingMainPage: () => accessingMainPage(props),
        accessingPublicTenderPage: () => accessingPublicTenderPage(props),
        accessingSubjectPage: () => accessingSubjectPage(props),
        accessingTopicPage: () => accessingTopicPage(props),
        accessingQuestionPage: () => accessingQuestionPage(props),
        accessingPomodoroPage: () => accessingPomodoroPage(props),
        accessingSettingPage: () => accessingSettingPage(props),
        accessingLogoutPage: () => accessingLogoutPage(props),
    };
};

export const getStartHeader = (props: StartScreen) => {
    const allScreens: AllScreens = {
        setMainPage: props.setMainPage,
        setProfilePage: () => false,
        setPublicTender: () => false,
        setSubject: () => false,
        setTopic: () => false,
        setQuestions: () => false,
        setPomodoro: () => false,
        setSettings: () => false,
        setLogout: () => false,
        hiddenNewRegisters: props.hiddenNewRegisters,
    };

    return {
        accessingMainPage: () => accessingMainPage(allScreens),
    };
};
