import type {Route} from "../../../../.react-router/types/app/routes/+types/home";
import {ContentWide} from "~/pages/dashboard/components/content-wide";
import {ContentCard} from "~/pages/dashboard/components/content-card";
import {Select} from "~/pages/dashboard/components/select";
import {useAuth} from "../../../../context/auth-context";
import {type ChangeEvent, useEffect, useState} from "react";
import {
    EnumCategory,
    type NoteSubjectResponse,
    type PublicTenderResponse,
    type SubjectResponse
} from "../../../../data/data";
import {ContentTypes, EnvironConstants} from "../../../../enums/constants";
import {HTTPTypes} from "../../../../enums/http-types";
import {Colors} from "../../../../enums/colors";
import {ButtonNew} from "~/pages/dashboard/components/button";
import {HtmlType} from "../../../../enums/html-type";
import {Dialog} from "~/dialog/dialog";

export function meta({}: Route.MetaArgs) {
    return [
        { title: "Disciplinas Acelera Concurso" },
        { name: "description", content: "Sua melhor preparação!" },
    ];
}

interface ISubject {
    setShowNewSubject: (value: boolean) => void;
    setShowNewNoteSubject: (value: boolean) => void;

    setShowDetailsSubject: (value: boolean) => void;
    setShowDetailsNoteSubject: (value: boolean) => void;

    dashboardSubject: (subject?: SubjectResponse) => void;
    dashboardPublicTender: (publicTender?: PublicTenderResponse) => void;
    dashboardNoteSubject: (note?: NoteSubjectResponse) => void;
    showThisPage: (value: boolean) => void;
}

export default function SubjectDashboardPage(
    {
        setShowNewSubject,
        setShowNewNoteSubject,

        setShowDetailsSubject,
        setShowDetailsNoteSubject,

        dashboardSubject,
        dashboardPublicTender,
        dashboardNoteSubject,
        showThisPage
    }: ISubject
) {
    const authUser = useAuth();

    const [publicTenders, setPublicTenders] = useState<PublicTenderResponse[]>([]);
    const [indexPublicTender, setIndexPublicTender] = useState<string>("-1");

    const [subjects, setSubjects] = useState<SubjectResponse[]>([]);
    const [selectedSubject, setSelectedSubject] = useState<SubjectResponse | undefined>(undefined);

    const [noteSubjects, setNoteSubjects] = useState<NoteSubjectResponse[]>([]);

    const [showDialog, setShowDialog] = useState<boolean>(false);
    const [dialogTitle, setDialogTitle] = useState<string>("");
    const [dialogMessage, setDialogMessage] = useState<string>("");

    useEffect(() => {
        if (authUser?.isLoading) return;

        gettingPublicTenders().then();
    }, []);

    const gettingNoteSubjects = async (subjectId: number) => {
        try {
            const url = `${EnvironConstants.API_BASE_URL}/note-subject/${subjectId}/subject`;
            const response = await fetch(url, {
                method: HTTPTypes.GET,
                headers: {
                    "Content-Type": ContentTypes.JSON,
                    "Authorization": `Bearer ${authUser?.token}`,
                }
            });

            const noteSubjectsBody = await response.json();

            if (!response.ok) {
                setNoteSubjects([]);
                return;
            }

            setNoteSubjects(noteSubjectsBody.data);
        }
        catch (error) {
            setNoteSubjects([]);
        }
    }

    const gettingPublicTenders = async () => {
        try {
            const url = `${EnvironConstants.API_BASE_URL}/public-tender`;
            const response = await fetch(url, {
                method: HTTPTypes.GET,
                headers: {
                    "Content-Type": ContentTypes.JSON,
                    "Authorization": `Bearer ${authUser?.token}`,
                    "UserID": `${authUser?.user?.user_id}`,
                }
            });

            const tendersData = await response.json();

            if (!response.ok) {
                setPublicTenders([]);
                return;
            }

            setPublicTenders(tendersData.data);
        }
        catch (error) {
            setPublicTenders([]);
        }
    };

    const gettingSubjects = async (index: number) => {
        try {
            const publicTenderId = publicTenders[index].public_tender_id;

            const url = `${EnvironConstants.API_BASE_URL}/subject`;
            const response = await fetch(url, {
                method: HTTPTypes.GET,
                headers: {
                    "Content-Type": ContentTypes.JSON,
                    "Authorization": `Bearer ${authUser?.token}`,
                    "TenderID": `${publicTenderId}`,
                }
            });

            const subjectData = await response.json();

            if (!response.ok) {
                setSubjects([]);
                setNoteSubjects([]);
                setSelectedSubject(undefined);
                dashboardSubject(undefined);
                return;
            }

            setSubjects(subjectData.data);
        }
        catch (error) {
            console.log(indexPublicTender);
            setSubjects([]);
            setNoteSubjects([]);
            setSelectedSubject(undefined);
            dashboardSubject(undefined);
        }
    };

    const selectingPublicTender = async (value: string) => {
        const index = parseInt(value);

        if (index === -1) {
            setSubjects([]);
            setIndexPublicTender(value);
            setNoteSubjects([]);
            setSelectedSubject(undefined);
            dashboardSubject(undefined);
            dashboardPublicTender(undefined);
            return;
        }

        dashboardPublicTender(publicTenders[index]);
        setIndexPublicTender(value);
        await gettingSubjects(index);
    };

    const handleSelectSubject = async (
        subjectData: SubjectResponse,
        event: ChangeEvent<HTMLInputElement>,
    ) => {
        if (event.target.checked) {
            setSelectedSubject(subjectData);
            await gettingNoteSubjects(subjectData.subject_id);
            dashboardSubject(subjectData);
        }

        else {
            setSelectedSubject(undefined);
            dashboardSubject(undefined);
            setNoteSubjects([]);
        }
    }

    const handleGoingToCreateSubjectNote = () => {
        showThisPage(false);
        setShowNewNoteSubject(true);
    };

    const handleGoingToSubjectRegister = () => {
        if (indexPublicTender === "-1") {
            setDialogTitle("Erro no Concurso");
            setDialogMessage("Primeiro selecione um concurso!");
            setShowDialog(true);
            return;
        }

        showThisPage(false);
        setShowNewSubject(true);
    };

    const seeDialog = () => (<Dialog
        name={"dialog-result"}
        title={dialogTitle}
        message={dialogMessage}
        buttonText={"Fechar"}
        closeFunction={setShowDialog}
        zIndex={1001}
    />);

    return (<div>
        <form>
            {showDialog && (seeDialog())}
            <StyleSubject />
            <h1>Mural de Disciplinas</h1>
            <ContentWide>
                <ContentCard>
                    <Select
                        name={"subject-public-tenders"}
                        required={true}
                        disabled={false}
                        label={"Selecione o Concurso*"}
                        value={indexPublicTender}
                        updateValue={selectingPublicTender}
                    >
                        <option value={"-1"}>Selecione o Concurso</option>
                        {publicTenders.map((publicTender, index) => (
                            <option key={index} value={`${index}`}>{publicTender.tender_name}</option>
                        ))}
                    </Select>
                    <ButtonNew
                        buttonContent={"Cadastrar Nova Disciplina"}
                        buttonType={HtmlType.BUTTON}
                        name={"new-subject-btn"}
                        styles={{
                            bg_color: Colors.GREEN,
                            bg_hover: Colors.GREEN_HOVER,
                            font_color: Colors.WHITE
                        }}
                        onClickFunction={handleGoingToSubjectRegister}
                    />
                </ContentCard>
            </ContentWide>

            <div className={"div-flex"}>
                <div className={"margin-right"}>
                    <ContentWide>
                        <ContentCard>
                            <h1>Disciplina Gerais</h1>

                            <ContentCard>
                                {subjects.map((subject) => {
                                    if (subject.category == EnumCategory.GENERAL) {
                                        return (
                                            <div className="check-tip" key={subject.subject_id}>
                                                <input
                                                    onChange={(event) =>
                                                        handleSelectSubject(subject, event)}
                                                    className="checkbutton"
                                                    type="checkbox"
                                                />
                                                <section
                                                    onClick={() => {
                                                        dashboardSubject(subject);
                                                        showThisPage(false);
                                                        setShowDetailsSubject(true);
                                                    }}
                                                    className={"section"}>
                                                    <p className={"text-section"}>{subject.name}</p>
                                                </section>
                                            </div>
                                        );
                                    }
                                })}
                            </ContentCard>
                        </ContentCard>
                    </ContentWide>
                </div>
                <div className={"margin-left"}>
                    <ContentWide>
                        <ContentCard>
                            <h1>Disciplina Específicas</h1>
                            <ContentCard>
                                {subjects.map((subject) => {
                                    if (subject.category == EnumCategory.SPECIFIC) {
                                        return (
                                            <div className="check-tip" key={subject.subject_id}>
                                            <input
                                                onChange={(event) =>
                                                    handleSelectSubject(subject, event)}
                                                className="checkbutton"
                                                type="checkbox"
                                            />
                                            <section
                                                onClick={() => {
                                                    dashboardSubject(subject);
                                                    showThisPage(false);
                                                    setShowDetailsSubject(true);
                                                }}
                                                className={"section"}>
                                                <p className={"text-section"}>{subject.name}</p>
                                            </section>
                                            </div>
                                        );
                                    }
                                })}
                            </ContentCard>
                        </ContentCard>
                    </ContentWide>
                </div>
            </div>

            <ContentWide>
                <ContentCard>
                    <h1>{"Notas das Disciplinas" + (noteSubjects.length > 0 ? `: ${noteSubjects.length}` : "")}</h1>
                    {selectedSubject && <h2 id={"AddNote"} onClick={handleGoingToCreateSubjectNote}>
                        Adicionar Nota</h2>}
                    <ContentCard>
                        {noteSubjects.map((noteSubject) => (
                            <section
                                onClick={() => {
                                    dashboardNoteSubject(noteSubject);
                                    showThisPage(false);
                                    setShowDetailsNoteSubject(true);
                                }}
                            ><p className={"text-section"}>{noteSubject.name + ": " + noteSubject.description}</p>
                            </section>
                        ))}
                    </ContentCard>
                </ContentCard>
            </ContentWide>
        </form>
    </div>);
};

const StyleSubject = () => (<style>{`
    #AddNote {
        color: ${Colors.LIGHT_BLUE};
        cursor: pointer;
    }
    #AddNote:hover {
        color: ${Colors.LIGHT_BLUE_HOVER};
        text-decoration: underline;
    }
    .div-flex {
        margin: 12px 0 12px 0;
        display: flex;
        flex: 1;
    }
    .margin-right {
        width: 100%;
        margin-right: 6px;
    }
    .margin-left {
        width: 100%;
        margin-left: 6px;
    }
    .check-tip {
        display: flex;
    }
    .section {
        width: 100%;
    }
`}</style>);
