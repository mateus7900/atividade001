import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
} from "@mui/material";
import { useState } from "react";
import { BloodType, City } from "../../Types";

interface AddPeopleDialogProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (
    nome: string,
    rua: string,
    numero: number,
    complemento: string,
    documento: string,
    cidadeId: number,
    bloodTypeId: number
  ) => void;
  cities: City[];
  bloodTypes: BloodType[];
}

export default function AddPeopleDialog({
  open,
  onClose,
  onSubmit,
  cities,
  bloodTypes,
}: AddPeopleDialogProps) {
  const [nome, setNome] = useState<string>("");
  const [rua, setRua] = useState<string>("");
  const [numero, setNumero] = useState<number>();
  const [complemento, setComplemento] = useState<string>("");
  const [documento, setDocumento] = useState<string>("");
  const [cidadeNome, setCidadeNome] = useState<string>("");
  const [bloodType, setBloodType] = useState<BloodType>();

  const handleSubmit = () => {
    const cidade = cities.find((el) => el.nome === cidadeNome);

    onSubmit(
      nome,
      rua,
      numero as number,
      complemento,
      documento,
      cidade?.id as number,
      bloodType?.id as number
    );
  };

  const handleCidadeChange = (event: SelectChangeEvent) => {
    setCidadeNome(event.target.value);
  };

  const handleBloodTypeChange = (event: SelectChangeEvent) => {
    const [tipo, fator] = event.target.value as string;
    const bloodType = bloodTypes.find(
      (el) => el.tipo === tipo && el.fator === fator
    );
    setBloodType(bloodType);
  };

  const handleChangeNome = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNome(event.target.value);
  };

  const handleChangeRua = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRua(event.target.value);
  };

  const handleChangeNumero = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNumero(parseInt(event.target.value));
  };

  const handleChangeComplemento = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setComplemento(event.target.value);
  };

  const handleChangeDocumento = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setDocumento(event.target.value);
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      PaperProps={{
        component: "form",
        onSubmit: () => handleSubmit(),
      }}
    >
      <DialogTitle>Adicionar Pessoa</DialogTitle>
      <DialogContent>
        <div className="content-people-modal">
        <DialogContentText>
          Preencha os dados abaixo para inserir uma nova pessoa no banco
        </DialogContentText>
        <TextField
          onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
            handleChangeNome(event)
          }
          value={nome}
          placeholder="Nome"
        />
        <TextField
          onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
            handleChangeRua(event)
          }
          value={rua}
          placeholder="Rua"
        />
        <TextField
          onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
            handleChangeNumero(event)
          }
          value={numero}
          placeholder="Numero"
        />
        <TextField
          onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
            handleChangeComplemento(event)
          }
          value={complemento}
          placeholder="Complemento"
        />
        <TextField
          onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
            handleChangeDocumento(event)
          }
          value={documento}
          placeholder="Documento"
        />

        <InputLabel id="cidade">Cidade</InputLabel>  
        <Select labelId="cidade" value={cities[0].nome} onChange={handleCidadeChange} placeholder="Cidade">
          {cities.map((city) => (
            <MenuItem value={city.nome} key={JSON.stringify(city)}>
              {city.nome}
            </MenuItem>
          ))}
        </Select>


        <InputLabel id="tipo">Tipo Sanguíneo</InputLabel>     
        <Select
          labelId="tipo"
          value={`${bloodTypes[0].tipo}${bloodTypes[0].fator}`}
          onChange={handleBloodTypeChange}
          placeholder="Tipo Sanguíneo"
        >
          {bloodTypes.map((item) => (
            <MenuItem
              value={`${item.tipo}${item.fator}`}
              key={JSON.stringify(item)}
            >{`${item.tipo}${item.fator}`}</MenuItem>
          ))}
        </Select>
        <DialogActions>
          <Button onClick={onClose}>Cancel</Button>
          <Button type="submit">Salvar</Button>
        </DialogActions>
        </div>
      </DialogContent>
    </Dialog>
  );
}
