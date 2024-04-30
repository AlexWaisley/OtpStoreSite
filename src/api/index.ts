import axios from "axios";
import { TotpDto, TotpCreateRequest } from "../models";

const apiUrl = import.meta.env.VITE_API_URL;
export const api = {

    async getTotpList():Promise<TotpDto[]>{
        const {data, status} = await axios.get<TotpDto[]>(`${apiUrl}/totp`);
        console.log('[api]', 'Fetch totpList result', status);
        return data;
    },

    async postTotp(totp: TotpCreateRequest):Promise<TotpDto>{
        const {data, status} = await axios.post(`${apiUrl}/totp`, totp);
        console.log('[api]', 'Post totp result', status);
        return data;
    },

    async deleteTotp(id: string){
        const {status} = await axios.delete(`${apiUrl}/totp/${id}`);
        console.log('[api]', 'Delete totp result', status);
        return;
    }
}as const;