import { useEffect, useState } from "react"
import { CollectPoint, Donation, People } from "../../Types"
import { deleteDonation, getDonations } from "../../Services/DonationsService"
import { getPeoples } from "../../Services/PeopleService"
import { getCollectionPoints } from "../../Services/CollectionPointService"
import { IconButton, Typography } from "@mui/material"

import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";

export default function DonationsPage() {
    const [donations, setDonations] = useState<Donation[]>([])
    const [peoples, setPeoples] = useState<People[]>([])
    const [collectPoints, setCollectPoints] = useState<CollectPoint[]>([])

    useEffect(() => {
        getDonations()
            .then(data => setDonations(data))
            .catch(err => console.error(err))
        getPeoples()
            .then(data => setPeoples(data))
            .catch(err => console.error(err))
        getCollectionPoints()
            .then(data => setCollectPoints(data))
            .catch(err => console.error(err))
    }, [])

    const getPeopleName = (id: number) => {
        const people = peoples.find(el => el.id === id)
        return people?.nome
    }

    const getLocalName = (id: number) => {
        const collectPoint = collectPoints.find(el => el.id === id)
        return collectPoint?.nome 
    }

    const handleDeleteDonation = async (id: number) => {
      const donationDeleted = await deleteDonation(id);
      const newDonations = donations.filter(el => el.id !== donationDeleted.id)
      setDonations(newDonations);
    }

    return (
        <div className="people-page">
      <div className="title">
        <Typography>Doações</Typography>
      </div>
      <div className="button-content">
        <IconButton>
          <AddIcon />
        </IconButton>
      </div>
      <div className="people-content">
        {donations.map((donation) => {
            const peopleName = getPeopleName(donation.pessoa_id)
            const collectPointName = getLocalName(donation.local_id)
            return (
            <div key={JSON.stringify(donation)} className="people-item">
                <div className="name-people-item">
                <Typography>{peopleName}</Typography>
                <Typography>{collectPointName}</Typography>
                </div>
                <div className="buttons-people-item">
                <IconButton color="error" onClick={() => handleDeleteDonation(donation.id)} >
                    <DeleteIcon />
                </IconButton>
                </div>
            </div>
            )})}
      </div>
    </div>
    )
}