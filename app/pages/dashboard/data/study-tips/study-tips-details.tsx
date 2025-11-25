import {ContentWide} from "~/pages/dashboard/components/content-wide";
import {ContentCard} from "~/pages/dashboard/components/content-card";
import {InputNumber} from "~/pages/dashboard/components/input-number";
import {InputText} from "~/pages/dashboard/components/input-text";
import {Select} from "~/pages/dashboard/components/select";
import {HtmlType} from "../../../../../enums/html-type";
import {Colors} from "../../../../../enums/colors";
import {Button} from "~/pages/dashboard/components/button";
import {useAuth} from "../../../../../context/auth-context";
import {useEffect, useState} from "react";
import {Dialog} from "~/dialog/dialog";
import {ContentTypes, EnvironConstants} from "../../../../../enums/constants";
import {HTTPTypes} from "../../../../../enums/http-types";
import type {StudyTipsResponse} from "../../../../../data/data";

interface IStudyTipDetails {
    studyTipData?: StudyTipsResponse;
    goingToMainPage: () => void;
}

export const StudyTipsDetails = (
    { studyTipData, goingToMainPage }: IStudyTipDetails
) => {
    const [name, setName] = useState<string>("");
    const [description, setDescription] = useState<string | undefined>(undefined);
    const [genAI, setGenAI] = useState<string>("false");

    const [showDialog, setShowDialog] = useState<boolean>(false);
    const [dialogTitle, setDialogTitle] = useState<string>("");
    const [dialogMessage, setDialogMessage] = useState<string>("");
    const [success, setSuccess] = useState<boolean>(false);

    const authUser = useAuth();
    const [userId, setUserId] = useState<number | undefined>(undefined);

    useEffect(() => {
        if (authUser?.isLoading) return;

        if (!studyTipData) goingToMainPage();

        setUserId(authUser?.user?.user_id);

        setName(studyTipData?.name || "");
        setDescription(studyTipData?.description || undefined);
        setGenAI(`${studyTipData?.ai_generate}`);
    }, []);

    const handleSaveStudyTipAIGenerate = async () => {
        const payload = {
            user_id: userId,
            name: name.replace("[AI] ", ""),
            ai_generate: eval(genAI),
            description: description,
            deleted: false,
        };

        try {
            const url = `${EnvironConstants.API_BASE_URL}/study-tips`;
            const response = await fetch(url, {
                method: HTTPTypes.POST,
                body: JSON.stringify(payload),
                headers: {
                    "Content-Type": ContentTypes.JSON,
                    "Authorization": `Bearer ${authUser?.token}`,
                }
            });

            const json = await response.json();

            if (!response.ok) {
                console.log(json);

                setDialogTitle("Erro no Cadastro");
                setDialogMessage("Não foi possível cadastrar esta nota de estudo!");

                return;
            }

            setSuccess(true);
            setDialogTitle("Sucesso");
            setDialogMessage("Nota de estudo gerada por AI salva com sucesso!");
        }
        catch (error) {
            console.error(error);

            setDialogTitle("Erro no Cadastro");
            setDialogMessage("Não foi possível cadastrar esta nota de estudo!");
        }
        finally {
            setShowDialog(true);
        }
    };

    const handleUpdateStudyTip = async () => {
        const payload = {
            user_id: userId,
            name: name,
            ai_generate: eval(genAI),
            description: description,
            deleted: false,
        };

        try {
            const url = `${EnvironConstants.API_BASE_URL}/study-tips/${studyTipData?.study_tip_id}/user/${userId}`;
            const response = await fetch(url, {
                method: HTTPTypes.PATCH,
                body: JSON.stringify(payload),
                headers: {
                    "Content-Type": ContentTypes.JSON,
                    "Authorization": `Bearer ${authUser?.token}`,
                }
            });

            const studyTipBody = await response.json();

            if (!response.ok) {
                console.log(studyTipBody);

                setDialogTitle("Erro na Atualização");
                setDialogMessage("Não foi possível atualizar esta nota de estudo!");

                return;
            }

            setSuccess(true);
            setDialogTitle("Sucesso");
            setDialogMessage("Nota de estudo atualizada com sucesso!");
        }
        catch (error) {
            console.error(error);

            setDialogTitle("Erro no Servidor");
            setDialogMessage("Não foi possível atualizar esta nota de estudo!");
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
            <h1>Detalhes da Dica de Estudo</h1>
            <ContentWide>
                <ContentCard>
                    <InputNumber
                        labelContent={"ID Usuário*"}
                        name={"user-id"}
                        placeholder={"123"}
                        required={true}
                        disabled={true}
                        value={userId}
                    />
                    <InputText
                        labelContent={"Nome da Dica*"}
                        name={"study-tips-name"}
                        placeholder={"Nome da Dica de Estudo"}
                        required={true}
                        disabled={false}
                        value={name}
                        updateValue={setName}
                    />
                    <InputText
                        labelContent={"Descrição da Dica"}
                        name={"study-tips-description"}
                        placeholder={"Descrição da Dica de Estudo"}
                        required={false}
                        disabled={false}
                        value={description}
                        updateValue={setDescription}
                    />
                    <Select
                        name={"generate-ai"}
                        required={true}
                        disabled={false}
                        label={"Gerado com IA*"}
                        value={genAI}
                        updateValue={setGenAI}
                    >
                        <option value={"true"}>SIM</option>
                        <option value={"false"}>NÃO</option>
                    </Select>

                    {studyTipData?.name.startsWith("[AI] ") ?
                        (<Button
                            buttonContent={"Cadastrar Nota de Estudo [AI]"}
                            buttonType={HtmlType.BUTTON}
                            name={"new-ai-study-tip-button"}
                            styles={{
                                bg_color: Colors.GOLDEN,
                                bg_hover: Colors.GOLDEN_HOVER,
                                font_color: Colors.BLACK
                            }}
                            onClickFunction={handleSaveStudyTipAIGenerate}
                        />) :
                        (<Button
                            buttonContent={"Atualizar de Estudo"}
                            buttonType={HtmlType.BUTTON}
                            name={"update-study-tip-button"}
                            styles={{
                                bg_color: Colors.GREEN,
                                bg_hover: Colors.GREEN_HOVER,
                                font_color: Colors.WHITE
                            }}
                            onClickFunction={handleUpdateStudyTip}
                        />)
                    }
                </ContentCard>
            </ContentWide>
        </form>
    );
};
