import axios from "axios";

export const api = axios.create({
    baseURL: "http://localhost:1906" // Update the base URL if needed
});

/* This function adds a new House to the database */
export async function addHouse(photo, houseType, housePrice, numOfRoom, numOfBathroom) {
    try {
        const formData = new FormData();
        formData.append("photo", photo);
        formData.append("houseType", houseType);
        formData.append("housePrice", housePrice);
        formData.append("numOfRoom", numOfRoom);
        formData.append("numOfBathroom", numOfBathroom);

        const response = await api.post("/houses/add/new-house", formData);
        if (response.status === 201) {
            return true;
        } else {
            throw new Error("Failed to add house. Status: " + response.status);
        }
    } catch (error) {
        console.error("Error adding house:", error);
        throw new Error("An unexpected error occurred while adding the house.");
    }
}

/* This function gets all house types from the database */
export async function getHouseTypes() {
    try {
        const response = await api.get("houses/house/types");
        return response.data;
    } catch (error) {
        console.error("Error fetching house types:", error);
        throw new Error("An unexpected error occurred while fetching house types.");
    }
}

