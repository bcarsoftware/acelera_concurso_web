import type {
    NoteSubjectResponse,
    NoteTopicResponse,
    PublicTenderResponse,
    QuestionResponse,
    SubjectResponse,
    TopicResponse
} from "../../../../data/data";
import type {QuestionScreen} from "../../../../enums/question-screen";
import {ContentWide} from "~/pages/dashboard/components/content-wide";

interface IQuestionsScreen {
    screen: QuestionScreen;
    questionsGenerated?: QuestionResponse;
    publicTender?: PublicTenderResponse;
    subject?: SubjectResponse;
    topic?: TopicResponse;
    noteSubject?: NoteSubjectResponse;
    noteTopic?: NoteTopicResponse;
    goingToMainPage: () => void;
}

export const QuestionsScreenSolver = (
    {
        screen,
        questionsGenerated,
        subject,
        topic,
        noteSubject,
        noteTopic,
        goingToMainPage,
    }: IQuestionsScreen
) => {
    return (<ContentWide>
        <div></div>
    </ContentWide>);
};
