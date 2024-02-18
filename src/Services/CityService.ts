import { City } from "../Types";
import api from "./api";

export async function getCities(): Promise<City[]> {
    const response = await api.get("/city/all", {
        headers: {
            "Content-Type": "application/json",
        },
    });

    const result = response.data
    return result.cities as City[]
}