import React, {useState} from 'react';
import {addHouse} from "../utils/ApiFunctions.js";
import HouseTypeSelector from "../common/HouseTypeSelector.jsx";

const AddHouse = () => {
    const [newHouse, setNewHouse] = useState({
        photo: null,
        houseType: "",
        housePrice: "",
        numOfRoom: "",
        numOfBathroom: ""
    });

    const [imagePreview, setImagePreview] = useState("");
    const [successMessage, setSuccessMessage] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    const handleHouseInputChange = (e) => {
        const name = e.target.name;
        let value = e.target.value;
        if (name === "housePrice") {
            if (!isNaN(value)) {
                value = parseInt(value);
            } else {
                value = "";
            }
        }
        setNewHouse({...newHouse, [name]: value});
    };

    const handleImageChange = (e) => {
        const selectedImage = e.target.files[0];
        setNewHouse({...newHouse, photo: selectedImage});
        setImagePreview(URL.createObjectURL(selectedImage))
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const success = await addHouse(newHouse.photo, newHouse.houseType, newHouse.housePrice, newHouse.numOfRoom, newHouse.numOfBathroom);

            if (success) {
                setSuccessMessage("A new house was added to the database");
                setNewHouse({photo: null, houseType: "", housePrice: "", numOfBathroom: "", numOfRoom: ""});
                setImagePreview("");
                setErrorMessage("");
            } else {
                setErrorMessage("Error adding house");
            }
        } catch (error) {
            setErrorMessage(error.message);
        }
        setTimeout(() => {
            setSuccessMessage("");
            setErrorMessage("");
        }, 3000);

    };

    return (
        <section className="container mt-5 mb-5">
            <div className="row justify-content-center">
                <div className="col-md-8">
                    <h2 className="text-center mb-4">Add a New House</h2>
                    {successMessage && (
                        <div className="alert alert-success fade show"> {successMessage}</div>
                    )}
                    {errorMessage && <div className="alert alert-danger fade show"> {errorMessage}</div>}

                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <label htmlFor="houseType" className="form-label">House Type</label>
                            <HouseTypeSelector
                                handleHouseInputChange={handleHouseInputChange}
                                newHouse={newHouse}
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="housePrice" className="form-label">House Price</label>
                            <input
                                className="form-control"
                                required
                                id="housePrice"
                                name="housePrice"
                                type="number"
                                value={newHouse.housePrice}
                                onChange={handleHouseInputChange}
                            />
                        </div>
                        <div className="row mb-3">
                            <div className="col">
                                <label htmlFor="numOfRoom" className="form-label">Number of Rooms</label>
                                <input
                                    type="number"
                                    name="numOfRoom"
                                    value={newHouse.numOfRoom}
                                    onChange={handleHouseInputChange}
                                    className="form-control"
                                />
                            </div>
                            <div className="col">
                                <label htmlFor="numOfBathroom" className="form-label">Number of Bathrooms</label>
                                <input
                                    type="number"
                                    name="numOfBathroom"
                                    value={newHouse.numOfBathroom}
                                    onChange={handleHouseInputChange}
                                    className="form-control"
                                />
                            </div>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="photo" className="form-label">House Photo</label>
                            <input
                                id="photo"
                                name="photo"
                                type="file"
                                className="form-control"
                                onChange={handleImageChange}
                            />
                            {newHouse.photo && (
                                <p className="mt-2">Selected Photo: {newHouse.photo.name}</p>
                            )}
                            {imagePreview && (
                                <img
                                    src={imagePreview}
                                    alt="Preview House Photo"
                                    className="mt-2 img-fluid"
                                />
                            )}
                        </div>
                        <div className="d-grid">
                            <button className="btn btn-primary" type="submit">Save House</button>
                        </div>
                    </form>
                </div>
            </div>
        </section>
    )
}

export default AddHouse;
