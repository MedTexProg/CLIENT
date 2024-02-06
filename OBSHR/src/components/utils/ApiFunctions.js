import axios   from "axios";

export  const api = axios.create({
    baseURL: "https://localhost:9192"
})

/* this function  add a new House to the database */
export async function addHouse (photo, houseType, housePrice, numOfRoom, numOfBathroom){
    const formData = new FormData()
    formData.append("photo",photo)
    formData.append("houseType",houseType)
    formData.append("housePrice",housePrice)
    formData.append("numOfRoom",numOfRoom)
    formData.append("numOfBathroom",numOfBathroom)

    const response = await  api.post("/houses/add/new-house", formData)
    if(response.status === 201){
        return true
    } else {
        return false
    }

}

/* this function gets all house type from the database  */
export async function getHouseType(){
    try{
        const response = await api.get("/houses/house-types")
        return response.data
    }catch (error ){
    throw new Error("Error fetching room types")
    }
}
