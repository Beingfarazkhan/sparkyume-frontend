import { images } from "@/constants/images"

export const getImage = ():string =>{
    const ideaId = Math.ceil((Math.random()*6))
    return images[(+ideaId-1)%6]
}

export const getInitials = (name:string) => name.split(' ').map(word => word.charAt(0)).join('').toUpperCase();

let accessToken:string|null = null

export const getStoredAccessToken = () =>{
    return accessToken
}

export const setStoredAccessToken = (token:string | null) =>{
    accessToken = token
}