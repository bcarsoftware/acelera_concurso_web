import type {RateLogResponse} from "../data/data";
import {ContentTypes, EnvironConstants} from "../enums/constants";
import {HTTPTypes} from "../enums/http-types";

export class RateLogHandler {
    static async gettingRateLog(
        token?: string,
        user_id?: number,
        public_tender_id?: number,
        subject?: boolean,
        topic?: boolean,
        noteSubject?: boolean,
        noteTopic?: boolean,
    ): Promise<RateLogResponse[]> {
        try {
            const payload = {
                user_id: user_id || 0,
                public_tender_id: public_tender_id || 0,
                rate: 0,
                subject: subject || false,
                topic: topic || false,
                note_subject: noteSubject || false,
                note_topic: noteTopic || false,
            }
            const url = `${EnvironConstants.API_BASE_URL}/rate-logs/user`;
            const response = await fetch(url, {
                method: HTTPTypes.POST,
                body: JSON.stringify(payload),
                headers: {
                    "Content-Type": ContentTypes.JSON,
                    "Authorization": `Bearer ${token}`,
                }
            });

            if (!response.ok) {
                return [];
            }

            const body = await response.json();

            return body.data;
        }
        catch (error) {
            return [];
        }
    }
}
