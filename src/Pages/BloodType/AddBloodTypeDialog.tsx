import {
    Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
} from "@mui/material";
import React, { useState } from "react";

interface AddBloodTypeDialogProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (tipo: string, fator: string) => void;
}

export default function AddBloodTypeDialog({
  open,
  onClose,
  onSubmit,
}: AddBloodTypeDialogProps) {
  const [tipo, setTipo] = useState<string>("");
  const [fator, setFator] = useState<string>("");

  const handleTipoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTipo(event.target.value);
  };

  const handleFatorChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFator(event.target.value);
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      PaperProps={{
        component: "form",
      }}
    >
      <DialogTitle>Adicionar Tipo Sanguíneo</DialogTitle>
      <DialogContent>
        <div className="content-people-modal">
          <DialogContentText>
            Preencha os dados abaixo para inserir um novo Tipo Sanguíneo no
            banco
          </DialogContentText>
          <TextField
          onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
            handleTipoChange(event)
          }
          value={tipo}
          placeholder="Tipo"
        />
        <TextField
          onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
            handleFatorChange(event)
          }
          value={fator}
          placeholder="Fator"
        />
        <DialogActions>
          <Button onClick={onClose}>Cancel</Button>
          <Button type="submit" onClick={() => onSubmit(tipo, fator)}>Salvar</Button>
        </DialogActions>
        </div>
      </DialogContent>
    </Dialog>
  );
}
