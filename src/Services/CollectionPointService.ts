import { CollectPoint } from "../Types";
import api from "./api";

export async function getCollectionPoints(): Promise<CollectPoint[]> {
    const response = await api.get("/collection-point/find-all", {
        headers: {
            "Content-Type": "application/json"
        }
    })

    const result = response.data.collectionPoints
    return result as CollectPoint[]
}

export async function deleteCollectionPoint(id: number): Promise<CollectPoint> {
    const body = { id }
    const response = await api.post("/collection-point/delete", body, {
        headers: {
            "Content-Type": "application/json"
        }
    })

    const result = response.data.collectionPoint
    return result as CollectPoint
}