import {ContentWide} from "~/pages/dashboard/components/content-wide";
import {ContentCard} from "~/pages/dashboard/components/content-card";
import {InputText} from "~/pages/dashboard/components/input-text";
import {SelectCategory} from "~/pages/dashboard/components/select-category";
import {SelectStatus} from "~/pages/dashboard/components/select-status";
import {HtmlType} from "../../../../../enums/html-type";
import {Colors} from "../../../../../enums/colors";
import {ButtonNew} from "~/pages/dashboard/components/button";
import {EnumCategory, EnumStatus, type PublicTenderResponse} from "../../../../../data/data";
import {useAuth} from "../../../../../context/auth-context";
import {useEffect, useState} from "react";
import {Dialog} from "~/dialog/dialog";
import {ContentTypes, EnvironConstants} from "../../../../../enums/constants";
import {HTTPTypes} from "../../../../../enums/http-types";

interface ISubjectNew {
    publicTender?: PublicTenderResponse,
    goingToMainPage: () => void,
}

export const SubjectNew = (
    { publicTender, goingToMainPage }: ISubjectNew
) => {
    const authUser = useAuth();

    const [tenderName, setTenderName] = useState<string | undefined>(undefined);

    const [subjectName, setSubjectName] = useState<string | undefined>(undefined);
    const [subjectCategory, setSubjectCategory] = useState<EnumCategory | string>("");
    const [subjectStatus, setSubjectStatus] = useState<EnumStatus | string>(EnumStatus.INCOMPLETE);

    const [showDialog, setShowDialog] = useState<boolean>(false);
    const [dialogTitle, setDialogTitle] = useState<string>("");
    const [dialogMessage, setDialogMessage] = useState<string>("");

    const [success, setSuccess] = useState<boolean>(false);

    useEffect(() => {
        if (authUser?.isLoading) return;

        if (!publicTender) {
            goingToMainPage();
            return;
        }

        setTenderName(publicTender.tender_name);
    }, []);

    const handleRegisterNewSubject = async () => {
        const payload = {
            public_tender_id: publicTender?.public_tender_id,
            name: subjectName,
            category: subjectCategory,
            status: subjectStatus,
            deleted: false,
        };

        try {
            const url = `${EnvironConstants.API_BASE_URL}/subject`;
            const response = await fetch(url, {
                method: HTTPTypes.POST,
                body: JSON.stringify(payload),
                headers: {
                    "Content-Type": ContentTypes.JSON,
                    "Authorization": `Bearer ${authUser?.token}`,
                }
            });

            const subjectBody = await response.json();

            if (!response.ok) {
                console.log(subjectBody);

                setDialogTitle("Erro no Cadastro");
                setDialogMessage("Não foi possível cadastrar esta disciplina!");

                return;
            }

            setSuccess(true);
            setDialogTitle("Sucesso");
            setDialogMessage("Disciplina cadastrada com sucesso!");
        }
        catch (error) {
            console.error(error);

            setDialogTitle("Erro no Servidor");
            setDialogMessage("Não foi possível cadastrar esta disciplina!");
        }
        finally {
            setShowDialog(true);
        }
    };

    const seeDialog = () => {
        const closingFunction = success ? (value: boolean) => {
            setShowDialog(value);
            setSuccess(value);
            goingToMainPage();
        } : setShowDialog;

        return (<Dialog
            name={"dialog-result"}
            title={dialogTitle}
            message={dialogMessage}
            buttonText={"Fechar"}
            closeFunction={closingFunction}
            zIndex={1001}
        />);
    }

    return (
        <form>
            {showDialog && (seeDialog())}
            <h1>Cadastro Nova Disciplina</h1>
            <ContentWide>
                <ContentCard>
                    <InputText
                        labelContent={"Nome do Concurso"}
                        name={"public-tender-name"}
                        placeholder={"Nome do Concurso"}
                        required={false}
                        disabled={true}
                        value={tenderName}
                    />
                    <InputText
                        labelContent={"Nome da Disciplina*"}
                        name={"subject-name"}
                        placeholder={"Nome da Disciplina"}
                        required={true}
                        disabled={false}
                        value={subjectName}
                        updateValue={setSubjectName}
                    />
                    <SelectCategory value={subjectCategory} updateValue={setSubjectCategory} disable={false} />
                    <SelectStatus value={subjectStatus} updateValue={setSubjectStatus} disable={false} />

                    <ButtonNew
                        buttonContent={"Cadastrar Nova Disciplina"}
                        buttonType={HtmlType.BUTTON}
                        name={"new-subject-button"}
                        styles={{
                            bg_color: Colors.GREEN,
                            bg_hover: Colors.GREEN_HOVER,
                            font_color: Colors.WHITE
                        }}
                        onClickFunction={handleRegisterNewSubject}
                    />
                </ContentCard>
            </ContentWide>
        </form>
    );
};
