import { useEffect, useState } from "react"
import { CollectPoint } from "../../Types"
import { deleteCollectionPoint, getCollectionPoints } from "../../Services/CollectionPointService"
import { IconButton, Typography } from "@mui/material"
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";

export default function CollectPointsPage (){
    const [collectionPoints, setCollectionPoints] = useState<CollectPoint[]>([])

    useEffect(() => {
        getCollectionPoints()
            .then(data => setCollectionPoints(data))
            .catch(err => console.error(err))
    }, [])

    const handleDeleteCollectionPoint = async (id: number) => {
      const collectionPoint = await deleteCollectionPoint(id);
      const newCollectionPoints: CollectPoint[] = collectionPoints.filter(el => el.id === collectionPoint.id)
      setCollectionPoints(newCollectionPoints);
    }

    return (
        <div className="people-page">
      <div className="title">
        <Typography>Tipo Sanguíneo</Typography>
      </div>
      <div className="button-content">
        <IconButton>
          <AddIcon />
        </IconButton>
      </div>
      <div className="people-content">
        {collectionPoints.map((collectionPoint) => (
            <div key={JSON.stringify(collectionPoint)} className="people-item">
                <div className="name-people-item">
                <Typography>{collectionPoint.nome}</Typography>
                </div>
                <div className="buttons-people-item">
                <IconButton color="error" onClick={() => handleDeleteCollectionPoint(collectionPoint.id)}>
                    <DeleteIcon />
                </IconButton>
                </div>
            </div>
            ))}
      </div>
    </div>
    )
}