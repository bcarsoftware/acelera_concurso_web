import type {PublicTenderResponse, StudyTipsResponse, SubjectResponse, TopicResponse} from "../data/data";

export interface DataFunctionsScreen {
    setMainPage: (arg: boolean) => void;
    setShowPublicTenderNew: (arg: boolean) => void;
    setShowSubjectNew: (arg: boolean) => void;
    setShowTopicNew: (arg: boolean) => void;
    setShowNoteSubjectNew: (arg: boolean) => void;
    setShowNoteTopicNew: (arg: boolean) => void;
    setShowStudyTipsNew: (arg: boolean) => void;

    setShowPublicTenderDetails: (arg: boolean) => void;
    setShowSubjectDetails: (arg: boolean) => void;
    setShowTopicDetails: (arg: boolean) => void;
    setShowStudyTipsDetails: (arg: boolean) => void;

    setSelectedPublicTender: (arg?: PublicTenderResponse) => void;
    setSelectedSubject: (arg?: SubjectResponse) => void;
    setSelectedTopic: (arg?: TopicResponse) => void;
    setSelectedStudyTips: (arg?: StudyTipsResponse) => void;
}
