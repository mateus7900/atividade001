import { useEffect, useState } from "react";
import { BloodType } from "../../Types";
import { createBloodType, deleteBloodType, getBloodTypes } from "../../Services/BloodTypesService";
import { IconButton, Typography } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import AddBloodTypeDialog from "./AddBloodTypeDialog";

export default function BloodTypePage() {
  const [bloodTypes, setBloodTypes] = useState<BloodType[]>([]);
  const [showModalAddBloodType, setShowModalAddBloodType] = useState<boolean>(false);

  useEffect(() => {
    getBloodTypes()
      .then((data) => setBloodTypes(data))
      .catch((err) => console.error(err));
  }, []);

  async function handleDeleteBloodType (id: number) {
    const deleted = await deleteBloodType(id);
    const newBloodTypes = bloodTypes.filter(el => el.id !== deleted.id)
    setBloodTypes(newBloodTypes); 
  }

  const handleShowModalAddBloodType = () => {
    setShowModalAddBloodType(!showModalAddBloodType);
  }

  const handleCreateBloodType = async (tipo: string, fator: string) => {
    const inserted = await createBloodType(tipo, fator)
    setBloodTypes(prev => [...prev, inserted])
    return false;
  }

  return (
    <div className="people-page">
      <div className="title">
        <Typography>Tipo Sanguíneo</Typography>
      </div>
      <div className="button-content">
        <IconButton onClick={handleShowModalAddBloodType}>
          <AddIcon />
        </IconButton>
      </div>
      <div className="people-content">
        {bloodTypes.map((bloodType) => (
            <div key={JSON.stringify(bloodType)} className="people-item">
                <div className="name-people-item">
                <Typography>{bloodType.tipo}{bloodType.fator}</Typography>
                </div>
                <div className="buttons-people-item">
                <IconButton color="error" onClick={() => handleDeleteBloodType(bloodType.id)}>
                    <DeleteIcon />
                </IconButton>
                </div>
            </div>
            ))}
      </div>
      <AddBloodTypeDialog 
        open={showModalAddBloodType} 
        onClose={handleShowModalAddBloodType} 
        onSubmit={handleCreateBloodType} 
      />
    </div>
  );
}
