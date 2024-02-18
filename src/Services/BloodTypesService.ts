import { BloodType } from "../Types";
import api from "./api";

export async function getBloodTypes(): Promise<BloodType[]> {
    const response = await api.get("/blood-type/find-all", {
        headers: {
            "Content-Type": "application/json",
        },
    });

    const result = response.data
    return result.bloodTypes as BloodType[];
}

export async function createBloodType(tipo: string, fator: string): Promise<BloodType> {
    const body = { tipo, fator }
    
    const response = await api.post("/blood-type/insert", body, {
        headers: {
            "Content-Type": "application/json",
        },
    });

    const result = response.data.bloodType
    return result as BloodType;
}

export async function deleteBloodType(id: number): Promise<BloodType> {
    const response = await api.delete(`/blood-type/${id}`,{
        headers: {
            "Content-Type": "application/json",
        }
    });

    const result = response.data.bloodType
    return result as BloodType;
}