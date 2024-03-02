import axios from "axios";
import error from "eslint-plugin-react/lib/util/error.js";

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

/* this function gets all houses from the database */
export async function getAllHouses() {
    try {
        const result = await api.get("/houses/all-rooms")
        return result.data

    } catch (error) {
        throw new Error("Error fetching houses")
    }
}

/* this function delete house by id from the database */
export async function deleteHouse(houseId) {
    try {
        const result = await api.delete(`/houses/delete/house/${houseId}`)
        return result.data

    } catch (error) {
        throw new Error(`Error deleting house ${error.message}`)
    }
}

/* this function update house in the database */
export async function updateHouse(houseId, houseData) {
    const formData = new FormData()
    formData.append("photo", houseData.photo);
    formData.append("houseType", houseData.houseType);
    formData.append("housePrice", houseData.housePrice);
    formData.append("numOfRoom", houseData.numOfRoom);
    formData.append("numOfBathroom", houseData.numOfBathroom);

    return await api.put(`/houses/update/${houseId}`, formData)
}

/* this function get house by id in the database */
export async function getHouseById(houseId) {
    try {
        const result = await api.get(`/houses/house/${houseId}`)
        return result.data

    } catch (e) {
        throw new Error(`Error fetching room ${error.message}`)
    }
}