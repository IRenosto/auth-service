export interface IBodyLogin {
    email: string
    senha: string
}

export interface IUserResponse {
    id: number
    nome: string
    sobrenome: string
    senha: string
    permissoes: string[]
}