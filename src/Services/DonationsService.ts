import { Donation } from "../Types";
import api from "./api";

export async function getDonations(): Promise<Donation[]> {
    const response = await api.get("/donations/find-all", {
        headers: {
            "Content-Type": "application/json",
        },
    })

    const result = response.data.donations
    return result as Donation[]
}

export async function createDonation(pessoaId: number, localId: number, data: string): Promise<Donation> {
    const body = { pessoaId, localId, data}
    const response = await api.post("/donations/insert", body, {
        headers: {
            "Content-Type": "application/json",
        },
    })

    const result = response.data.donation
    return result as Donation
}

export async function deleteDonation(id: number): Promise<Donation> {
    const body = { id }
    const response = await api.post("/donations/delete", body, {
        headers: {
            "Content-Type": "application/json",
        },
    })

    const result = response.data.donation
    return result as Donation
}