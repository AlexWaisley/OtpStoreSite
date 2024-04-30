import axios, {AxiosResponse} from "axios";
import { TotpForm } from "../models/TotpForm";

const apiUrl = import.meta.env.VITE_API_URL;
export const api = {
    async getTotpList():Promise<TotpForm[]>{
        try {
            const response: AxiosResponse<TotpForm[]> = await axios.get(`${apiUrl}/api/Totp`);
            const {data, status} = response;
            console.log('[api]', 'Fetch totpList result', status);
            return data;
        }
        catch (ex) {
            console.log(ex);
            return [];
        }
    },
    async getTotp(key: string):Promise<string>{
        try {
            const response: AxiosResponse<string> = await axios.get(`${apiUrl}/api/Totp/${key}`);
            const {data, status} = response;
            console.log('[api]', 'Fetch totp result', status);
            return data;
        }
        catch (ex) {
            console.log(ex);
            return "";
        }
    },
    async postTotp(totp: TotpForm):Promise<TotpForm>{
        try {
            const response: AxiosResponse<TotpForm> = await axios.post(`${apiUrl}/api/Totp`, totp);
            const {data, status} = response;
            console.log('[api]', 'Post totp result', status);
            return data;
        }
        catch (ex) {
            console.log(ex);
            return {Name: '', Pass: '', DigitsCount: 0, IsDeleted: false};
        }
    },
    async deleteTotp(key: string):Promise<TotpForm>{
        try {
            const response: AxiosResponse<TotpForm> = await axios.delete(`${apiUrl}/api/Totp/${key}`);
            const {data, status} = response;
            console.log('[api]', 'Delete totp result', status);
            return data;
        }
        catch (ex) {
            console.log(ex);
            return {Name: '', Pass: '', DigitsCount: 0, IsDeleted: false};
        }
    }
}as const;