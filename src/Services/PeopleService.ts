import { People } from "../Types";
import api from "./api";

export async function getPeoples(): Promise<People[]> {
  const response = await api.get("/people/find-all", {
    headers: {
      "Content-Type": "application/json",
    },
  });

  const result = response.data;
  return result.peoples as People[];
}

export async function addPeople(
  nome: string,
  rua: string,
  numero: number,
  complemento: string,
  documento: string,
  cidadeId: number,
  bloodTypeId: number
): Promise<People> {
  const body = {
    nome,
    rua,
    numero,
    complemento,
    documento,
    cidadeId,
    tipoId: bloodTypeId,
  };

  console.log(body);

  const response = await api.post("/people", body, {
    headers: {
      "Content-Type": "application/json",
    },
  });

  const result = response.data.people;
  return result as People;
}


export async function deletePeople(id: number): Promise<People> {
  const body = { id }
  const response = await api.post("/people/delete", body, {
    headers: {
      "Content-Type": "application/json",
    },
  });

  const result = response.data.people;
  return result as People;
}