import React, {useEffect, useState} from "react";
import {getHouseById, updateHouse} from "../utils/ApiFunctions.js";
import {Link, useParams} from "react-router-dom";

const EditHouse = () => {
    const [house, setHouse] = useState({
        photo: null,
        houseType: "",
        housePrice: "",
        numOfRoom: "",
        numOfBathroom: ""
    });

    const [imagePreview, setImagePreview] = useState("");
    const [successMessage, setSuccessMessage] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const {houseId} = useParams();

    const handleImageChange = (e) => {
        const selectedImage = e.target.files[0];
        setHouse({...house, photo: selectedImage});
        setImagePreview(URL.createObjectURL(selectedImage));
    };

    const handleInputChange = (event) => {
        const {name, value} = event.target;
        setHouse({...house, [name]: value});
    };

    useEffect(() => {
            const fetchHouse = async () => {
                try {
                    const houseData = await getHouseById(houseId);
                    setHouse(houseData);
                    setImagePreview(houseData.photo);
                } catch (error) {
                    console.error(error);
                }
            }
            fetchHouse()
        },
        [houseId])

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await updateHouse(houseId, house);
            if (response.status === 200) {
                setSuccessMessage("House updated successfully!");
                const updatedHouseData = await getHouseById(houseId);
                setHouse(updatedHouseData);
                setImagePreview(updatedHouseData.photo);
                setErrorMessage("");
            } else {
                setErrorMessage("Error updating room ");
            }
        } catch (error) {
            console.error(error);
            setErrorMessage(error.message);
        }
    };

    return (
        <section className="container mt-5 mb-5">
            <div className="row justify-content-center">
                <div className="col-md-8">
                    <h2 className="text-center mb-4">Edit House</h2>
                    {successMessage && (
                        <div className="alert alert-success fade show" role="alert">
                            {successMessage}
                        </div>
                    )}
                    {errorMessage && (
                        <div className="alert alert-danger fade show" role="alert">
                            {errorMessage}
                        </div>
                    )}

                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <label htmlFor="houseType" className="form-label">
                                House Type
                            </label>
                            <input
                                className="form-control"
                                id="houseType"
                                name="houseType"
                                type="text"
                                value={house.houseType}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="housePrice" className="form-label">
                                House Price
                            </label>
                            <input
                                className="form-control"
                                required
                                id="housePrice"
                                name="housePrice"
                                type="number"
                                value={house.housePrice}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className="row mb-3">
                            <div className="col">
                                <label htmlFor="numOfRoom" className="form-label">
                                    Number of Rooms
                                </label>
                                <input
                                    type="number"
                                    name="numOfRoom"
                                    value={house.numOfRoom}
                                    onChange={handleInputChange}
                                    className="form-control"
                                />
                            </div>
                            <div className="col">
                                <label htmlFor="numOfBathroom" className="form-label">
                                    Number of Bathrooms
                                </label>
                                <input
                                    type="number"
                                    name="numOfBathroom"
                                    value={house.numOfBathroom}
                                    onChange={handleInputChange}
                                    className="form-control"
                                />
                            </div>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="photo" className="form-label">
                                Photo
                            </label>
                            <input
                                required
                                id="photo"
                                name="photo"
                                type="file"
                                className="form-control"
                                onChange={handleImageChange}
                            />

                            {imagePreview && (
                                <img
                                    src={`data:image/jpeg;base64,${imagePreview}`}
                                    alt="Preview House"
                                    style={{maxWidth: "400px", maxHeight: "400px"}}
                                    className="mt-2 img-fluid"
                                />
                            )}
                        </div>
                        <div className="d-grid gap-2 d-md-flex mt-2">
                            <Link to={"/existing-houses"} className="btn btn-outline-info ml-5">
                                Back
                            </Link>
                            <button type="submit" className="btn btn-outline-warning">
                                Edit Room
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </section>
    );
};

export default EditHouse;
