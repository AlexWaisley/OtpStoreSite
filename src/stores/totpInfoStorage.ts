import { defineStore } from "pinia";
import { TotpCreateRequest, TotpDto } from "../models";
import {ref, onMounted} from 'vue';
import { api } from "../api";
import moment from "moment";

export const useTotpStore = defineStore('TotpInfoStore',()=>{
    const totpList = ref<TotpDto[]>([]);
    const isReady = ref(false);
    const timeToUpdate = ref(0);
    const isListLoaded = ref(true);

    onMounted(async()=>{
        await startSite();
    });

    const startSite = async()=>{    
        await fetchTotpList();
        if(!isListLoaded.value){
            return;
        }
        isReady.value = true;
        update();
        return;
    }
    
    const fetchTotpList = async ()=>{
        const list = await api.getTotpList();
        if(!list){
            isListLoaded.value = false;
            return;
        }
        totpList.value = list;
        return;
    }

    const addTotp = async (totp: TotpCreateRequest)=>{
        const result = await api.postTotp(totp);
        totpList.value.push(result);
        await fetchTotpList();
    }

    const deleteTotp = async (id: string)=>{
        totpList.value = totpList.value.filter(totp=>totp.id !== id);
        await api.deleteTotp(id);
        await fetchTotpList();
    }

    const update = () => {
        const now = moment().unix();
        const reminder = now % 30;
        const needTime = 30 - reminder;

        timeToUpdate.value = needTime;

        setTimeout(async() => {
            await fetchTotpList();
            setInterval(async () => {
                await fetchTotpList();
            }, 15000);
        }, needTime * 1000);        
    }
    

    return {
        totpList,
        isReady,
        timeToUpdate,
        fetchTotpList,
        addTotp,
        deleteTotp
    }
});