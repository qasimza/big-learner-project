import { createResource } from "solid-js"

type Reservation = {
  reservationId: string
  reservationNumber: string
  name: string
  email: string
  reservationType: string
  createdTimestamp: string
  modifiedTimestamp: string
  paymentId: string
  shortId: string
}

type CountCard = {
  reservationType: string
  reservationCount: string
}

// To Fetch all Data
const fetchData = async (): Promise<any> => {
    const response = (await fetch('http://localhost:8080/'))
    const results = await response.json()
    console.log(results)
    return results
  }
  
// Store data in data
export const [data] = createResource(fetchData)

const getAll = (): Reservation[] => {
  let allReservations: Reservation[] = []
  data().All.forEach(function (value: any){
    allReservations.push(value as Reservation)
  })
  return allReservations
}

