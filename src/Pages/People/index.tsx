import { useEffect, useState } from "react";
import { BloodType, City, People } from "../../Types";
import { addPeople, deletePeople, getPeoples } from "../../Services/PeopleService";
import { IconButton, Typography } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

import "./styles.scss";
import AddPeopleDialog from "./AddPeopleDialog";
import { getBloodTypes } from "../../Services/BloodTypesService";
import { getCities } from "../../Services/CityService";

export default function PeoplePage() {
  const [peoples, setPeoples] = useState<People[]>([]);
  const [bloodTypes, setBloodTypes] = useState<BloodType[]>([]);
  const [cities, setCities] = useState<City[]>([]);
  const [showModalAdd, setShowModalAdd] = useState<boolean>(false);

  const handleShowModalAdd = () => {
    setShowModalAdd(!showModalAdd);
  };

  const handleAddPeople = (
    nome: string,
    rua: string,
    numero: number,
    complemento: string,
    documento: string,
    cidadeId: number,
    bloodTypeId: number
  ) => {
    addPeople(nome, rua, numero, complemento, documento, cidadeId, bloodTypeId)
      .then((data) => console.log(data))
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    getPeoples()
      .then((data) => setPeoples(data))
      .catch((err) => console.error(err));
    getBloodTypes()
      .then((data) => setBloodTypes(data))
      .catch((err) => console.error(err));
    getCities()
      .then((data) => setCities(data))
      .catch((err) => console.error(err));
  }, []);

  const handleDeletePeople = async (id: number) => {
    const deletedPeople = await deletePeople(id);
    const newPeoples = peoples.filter(el => el.id !== deletedPeople.id)
    setPeoples(newPeoples)
  }

  return (
    <div className="people-page">
      <div className="title">
        <Typography>Pessoas</Typography>
      </div>
      <div className="button-content">
        <IconButton onClick={handleShowModalAdd}>
          <AddIcon />
        </IconButton>
      </div>
      <div className="people-content">
        {peoples.map((people) => (
          <div key={JSON.stringify(people)} className="people-item">
            <div className="name-people-item">
              <Typography>{people.nome}</Typography>
            </div>
            <div className="buttons-people-item">
              <IconButton color="primary">
                <EditIcon />
              </IconButton>
              <IconButton color="error" onClick={() => handleDeletePeople(people.id)}>
                <DeleteIcon />
              </IconButton>
            </div>
          </div>
        ))}
      </div>
      <AddPeopleDialog
        open={showModalAdd}
        onClose={handleShowModalAdd}
        bloodTypes={bloodTypes}
        cities={cities}
        onSubmit={handleAddPeople}
      />
    </div>
  );
}
