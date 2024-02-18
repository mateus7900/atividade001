export interface People {
    id: number
    nome: string
    rua: string
    numero: string
    complemento: string
    documento: string
    cidadeId: number
    tipoId: number
    createdAt: string
    updatedAt: string
}

export interface BloodType {
    id: number
    tipo: string
    fator: string
    createdAt: string
    updatedAt: string
}


export interface CollectPoint {
    id: number
    nome: string
    rua: string
    numero: string
    complement: string
    cidadeId: number
    createdAt: string
    updatedAt: string
}

export interface Donation {
    id: number
    pessoa_id: number
    local_id: number
    data: string
    createdAt: string
    updatedAt: string
}

export interface City {
    id: number
    nome: string
    estadoId: number
    createdAt: string
    updatedAt: string
}

export interface State {
    id: number
    nome: string
    sigla: string
    createdAt: string
    updatedAt: string
}