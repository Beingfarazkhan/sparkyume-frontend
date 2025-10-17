import { refreshAccessToken } from '@/api/user'
import { getStoredAccessToken, setStoredAccessToken } from '@/utils/helper'
import axios from 'axios'

const api = axios.create({
    baseURL:`${import.meta.env.VITE_API_URL}/api`,
    withCredentials:true,
    headers:{
        'Content-Type' : 'application/json'
    },
})

// Attach Access Token to Request after refresh
api.interceptors.request.use((config)=>{
    const accessToken = getStoredAccessToken()
    if(accessToken){
        config.headers.Authorization = `Bearer ${accessToken}`
    } 
    return config
})

// Refresh Access Token When It Expires
api.interceptors.response.use((res)=>res, async(error)=>{
    const originalRequest = error.config
    if(error.response?.status === 401 &&
        !originalRequest?.url?.includes('/auth/refresh') &&
        !originalRequest._retry
    ){
        originalRequest._retry = true
        try{
        const {newAccessToken} = await refreshAccessToken()
        setStoredAccessToken(newAccessToken)

        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`

        return api(originalRequest)
    }catch (err) {
        console.log('Refresh Token Failed : ', err)
    }
    }   

    return Promise.reject(error)
    
})

export default api