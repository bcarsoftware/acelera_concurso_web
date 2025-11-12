import type {PublicTenderResponse} from "../data/data";

export interface DataFunctionsScreen {
    setMainPage: (arg: boolean) => void;
    setShowPublicTenderNew: (arg: boolean) => void;
    setShowSubjectNew: (arg: boolean) => void;
    setShowTopicNew: (arg: boolean) => void;
    setShowNoteSubjectNew: (arg: boolean) => void;
    setShowNoteTopicNew: (arg: boolean) => void;
    setShowStudyTipsNew: (arg: boolean) => void;
    setShowPublicTenderDetails: (arg: boolean) => void;
    setSelectedPublicTender: (arg: PublicTenderResponse) => void;
}
