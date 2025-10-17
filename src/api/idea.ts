import api from "@/lib/axios"
import type { Idea } from "@/types"


export const fetchIdea = async (ideaId: string): Promise<Idea | null> => {
  try{
    const res = await api(`/ideas/${ideaId}`)
  if ((res.status !== 200)) throw new Error("Failed to fetch data")

  return res.data
  }catch(error){
    console.log("error fetching data", error)
    return null
  }
  
}

export const fetchAllIdeas = async (): Promise<Idea[]> => {
  const res = await api.get("/ideas")
  if (res.status !== 200) throw new Error("Error retriving ideas")

  return res.data
}

export const createNewIdea = async(data:{
    title:string,
    summary:string,
    description:string,
    tags:string[]
}):Promise<Idea>=>{
    const res = await api.post('/ideas',{
        ...data
    })
    if(res.status!==201) throw new Error("Unable to create Idea!")
    return res.data
} 

export const updateIdea = async(ideasId:string, data:{
    title:string,
    summary:string,
    description:string,
    tags:string[]
}):Promise<Idea>=>{
  
    const res = await api.put(`/ideas/${ideasId}`,data)
    if(res.status!==200) throw new Error("Unable to Update Idea!")
    return res.data
} 

export const deleteIdea = async(ideasId:string) =>{
  const res = await api.delete(`ideas/${ideasId}`)
  if(res.status!==200) throw new Error("Unable to delete Idea!")
  return res.data
}