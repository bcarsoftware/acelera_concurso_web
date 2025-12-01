import {ContentTypes, EnvironConstants} from "../enums/constants";
import {HTTPTypes} from "../enums/http-types";
import {EnumCategory, EnumStatus} from "../data/data";

export class QuestionSolverHandler {
    static async subjectHandleFulfillment(
        subjectId: number,
        userId: number,

        setDialogTitle: (title: string) => void,
        setDialogMessage: (message: string) => void,
        setSuccess: (value: boolean) => void,
        showDialog: (value: boolean) => void,
        fulfillment?: number,
        token?: string,
    ): Promise<void> {
        try {
            const payload = {
                public_tender_id: 0,
                name: "Subject Example",
                category: EnumCategory.GENERAL,
                fulfillment: fulfillment,
                status: EnumStatus.INCOMPLETE,
            };

            const url = `${EnvironConstants.API_BASE_URL}/subject/${subjectId}/fulfillment/${userId}/user`;
            const response = await fetch(url, {
                method: HTTPTypes.PATCH,
                body: JSON.stringify(payload),
                headers: {
                    "Content-Type": ContentTypes.JSON,
                    "Authorization": `Bearer ${token}`,
                }
            });

            if (!response.ok) {
                setDialogTitle("Erro ao Atualizar");
                setDialogMessage("Não foi possível atualizar a taxa de sucesso das questões de disciplina!");
                return;
            }

            setSuccess(true);
            setDialogTitle("Sucesso");
            setDialogMessage("Taxa de acerto nas questões de disciplina atualizada!");
        }
        catch (error) {
            setDialogTitle("Erro no Servidor");
            setDialogMessage("Não foi possível atualizar a taxa de sucesso das questões de disciplina!");
        }
        finally {
            showDialog(true);
        }
    }

    static async topicHandleFulfillment(
        topicId: number,
        userId: number,

        setDialogTitle: (title: string) => void,
        setDialogMessage: (message: string) => void,
        setSuccess: (value: boolean) => void,
        showDialog: (value: boolean) => void,
        fulfillment?: number,
        token?: string,
    ): Promise<void> {
        try {
            const payload = {
                subject_id: 0,
                name: "Topic Example",
                fulfillment: fulfillment,
                status: EnumStatus.INCOMPLETE,
            };

            const url = `${EnvironConstants.API_BASE_URL}/topic/${topicId}/fulfillment/${userId}/user`;
            const response = await fetch(url, {
                method: HTTPTypes.PATCH,
                body: JSON.stringify(payload),
                headers: {
                    "Content-Type": ContentTypes.JSON,
                    "Authorization": `Bearer ${token}`,
                }
            });

            if (!response.ok) {
                setDialogTitle("Erro ao Atualizar");
                setDialogMessage("Não foi possível atualizar a taxa de sucesso das questões de assunto!");
                return;
            }

            setSuccess(true);
            setDialogTitle("Sucesso");
            setDialogMessage("Taxa de acerto nas questões de assunto atualizada!");
        }
        catch (error) {
            setDialogTitle("Erro no Servidor");
            setDialogMessage("Não foi possível atualizar a taxa de sucesso das questões de assunto!");
        }
        finally {
            showDialog(true);
        }
    }

    static async noteSubjectHandleRateSuccess(
        noteSubjectId: number,
        userId: number,

        setDialogTitle: (title: string) => void,
        setDialogMessage: (message: string) => void,
        setSuccess: (value: boolean) => void,
        showDialog: (value: boolean) => void,
        rateSuccess?: number,
        token?: string,
    ): Promise<void> {
        try {
            const payload = {
                subject_id: 0,
                name: "Subject Example",
                description: "description text",
                finish: false,
                rate_success: rateSuccess,
                deleted: false,
            };

            const url = `${EnvironConstants.API_BASE_URL}/note-subject/${noteSubjectId}/rate-success/${userId}/user`;
            const response = await fetch(url, {
                method: HTTPTypes.PATCH,
                body: JSON.stringify(payload),
                headers: {
                    "Content-Type": ContentTypes.JSON,
                    "Authorization": `Bearer ${token}`,
                }
            });

            if (!response.ok) {
                setDialogTitle("Erro ao Atualizar");
                setDialogMessage("Não foi possível atualizar a taxa de sucesso das questões de nota de disciplina!");
                return;
            }

            setSuccess(true);
            setDialogTitle("Sucesso");
            setDialogMessage("Taxa de acerto nas questões de nota de disciplina atualizada!");
        }
        catch (error) {
            setDialogTitle("Erro no Servidor");
            setDialogMessage("Não foi possível atualizar a taxa de sucesso das questões de nota de disciplina!");
        }
        finally {
            showDialog(true);
        }
    }

    static async noteTopicHandleRateSuccess(
        noteTopicId: number,
        userId: number,

        setDialogTitle: (title: string) => void,
        setDialogMessage: (message: string) => void,
        setSuccess: (value: boolean) => void,
        showDialog: (value: boolean) => void,
        rateSuccess?: number,
        token?: string,
    ): Promise<void> {
        try {
            const payload = {
                topic_id: 0,
                name: "Subject Example",
                description: "description text",
                finish: false,
                rate_success: rateSuccess,
                deleted: false,
            };

            const url = `${EnvironConstants.API_BASE_URL}/note-topic/${noteTopicId}/rate-success/${userId}/user`;
            const response = await fetch(url, {
                method: HTTPTypes.PATCH,
                body: JSON.stringify(payload),
                headers: {
                    "Content-Type": ContentTypes.JSON,
                    "Authorization": `Bearer ${token}`,
                }
            });

            if (!response.ok) {
                setDialogTitle("Erro ao Atualizar");
                setDialogMessage("Não foi possível atualizar a taxa de sucesso das questões de nota de assunto!");
                return;
            }

            setSuccess(true);
            setDialogTitle("Sucesso");
            setDialogMessage("Taxa de acerto nas questões de nota de assunto atualizada!");
        }
        catch (error) {
            setDialogTitle("Erro no Servidor");
            setDialogMessage("Não foi possível atualizar a taxa de sucesso das questões de nota de assunto!");
        }
        finally {
            showDialog(true);
        }
    }
}
