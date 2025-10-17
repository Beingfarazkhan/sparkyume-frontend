export type Idea = {
  _id: string,
  title: string,
  user:string,
  summary: string,
  description: string,
  tags: string[],
  createdAt: string
}

export type User = {
    id:string,
    name:string,
    email:string
}