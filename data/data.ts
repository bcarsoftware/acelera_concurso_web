enum EnumGender {
    FEMALE = "FEMALE",
    MALE = "MALE",
    NOT_BINARY = "NOT_BINARY",
    NOT_SAY = "NOT_SAY",
}

enum EnumStatus {
    COMPLETE = "COMPLETE",
    INCOMPLETE = "INCOMPLETE",
}

enum EnumCategory {
    GENERAL = "GENERAL",
    SPECIFIC = "SPECIFIC",
}

export interface NoteSubjectResponse {
    note_subject_id: number;
    subject_id: number;
    name: string;
    description: string;
    finish?: boolean;
    rate_success?: number | null;
    deleted?: boolean;
    create_at: string;
    update_at?: string | null;
}

export interface NoteTopicResponse {
    note_topic_id: number;
    topic_id: number;
    name: string;
    description: string;
    finish?: boolean;
    rate_success?: number | null;
    deleted?: boolean;
    create_at: string;
    update_at?: string | null;
}

export interface PomodoroResponse {
    pomodoro_id: number;
    user_id: number;
    pomodoro_name: string;
    focus_minutes: number;
    focus_seconds: number;
    break_short: number;
    break_long: number;
    rounds: number;
    create_at: string;
    update_at?: string | null;
}

export interface PublicTenderBoardResponse {
    public_tender_board_id: number;
    sail: string;
    name: string;
    create_at: string;
    update_at?: string | null;
}

export interface PublicTenderResponse {
    public_tender_id: number;
    user_id: number;
    tender_name: string;
    tender_board: string;
    work_tile: string;
    institute: string;
    notice_link?: string | null;
    tender_date?: string | null;
    deleted?: boolean;
    create_at: string;
    update_at?: string | null;
}

export interface StudyTipsResponse {
    study_tip_id: number;
    user_id: number;
    name: string;
    ai_generate: boolean;
    description?: string | null;
    deleted?: boolean;
    create_at: string;
    update_at?: string | null;
}

export interface SubjectResponse {
    subject_id: number;
    public_tender_id: number;
    name: string;
    category: EnumCategory;
    status?: EnumStatus;
    deleted?: boolean;
    create_at: string;
    update_at?: string | null;
}

export interface TopicResponse {
    topic_id: number;
    subject_id: number;
    name: string;
    description?: string | null;
    status: EnumStatus;
    fulfillment?: number | null;
    deleted?: boolean;
    create_at: string;
    update_at?: string | null;
}

export interface UserAdminResponse {
    user_admin_id: number;
    full_name: string;
    username: string;
    password: string;
    create_at: string;
    update_at?: string | null;
}

export interface UserResponse {
    user_id: number;
    first_name: string;
    last_name: string;
    date_born: string;
    gender: EnumGender;
    username: string;
    email: string;
    points?: number;
    deleted?: boolean;
    create_at: string;
    update_at?: string | null;
}
