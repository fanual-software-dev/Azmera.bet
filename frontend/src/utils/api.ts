import api from "../lib/axios";

export async function authapi(type:string, data:object) {
    const response  = await api.post(`/auth/${type}`, data,{
        withCredentials:false
    });
    return response;
}