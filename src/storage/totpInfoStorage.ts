import { defineStore } from "pinia";
import { TotpForm } from "../models/TotpForm";
import {ref, onMounted} from 'vue';
import { api } from "../api";
import moment from "moment";

export const useTotpStore = defineStore('TotpInfoStore',()=>{
    const totpList = ref<TotpForm[]>([]);
    const isReady = ref(false);
    const timeToUpdate = ref(0);

    onMounted(async()=>{
        totpList.value = await load();
        isReady.value = true;
        update();
    });
    
    const load = async ():Promise<TotpForm[]>=>{
        const list = await api.getTotpList();
        return list;
    }

    const addTotp = async (totp: TotpForm)=>{
        await api.postTotp(totp);
        totpList.value = await load();
    }

    const deleteTotp = async (key: string)=>{
        await api.deleteTotp(key);
        totpList.value = await load();
    }

    const update = async () => {
        const now = moment().unix();
        const reminder = now % 30;
        const needTime = 30 - reminder;

        timeToUpdate.value = needTime;

        setTimeout(async() => {
            totpList.value = await load();
            setInterval(async () => {
                totpList.value = await load();
            }, 30000);
        }, needTime * 1000);        
    }
    

    return {
        totpList,
        isReady,
        timeToUpdate,
        load,
        addTotp,
        deleteTotp
    }
});