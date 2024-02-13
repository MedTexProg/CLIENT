import React, {useState} from 'react'
import {addHouse} from "../utils/ApiFunctions.js";
import HouseTypeSelector from "../common/HouseTypeSelector.jsx";

const AddHouse = () => {
    const [newHouse, setNewHouse] = useState({
        photo: null,
        houseType: "",
        housePrice: "",
        numOfRoom: "",
        numOfBathroom: ""
    })

    const [imagePreview, setImagePreview] = useState("")
    const [successMessage, setSuccessMessage] = useState("")
    const [erroMessage, setErrorMessage] = useState("")


    const handleHouseInputChange = (e) => {
        const name = e.target.name
        let value = e.target.value
        if (name === "housePrice") {
            if (!isNaN(value)) {
                value.parseInt(value);
            } else {
                value = "";
            }
        }
        setNewHouse({...newHouse, [name]: value})
    }

    const handleImageChange = (e) => {
        const selectedImage = e.target.files[0]
        setNewHouse({...newHouse, photo: selectedImage})
        setImagePreview(URL.createObjectURL(selectedImage))
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const success = await addHouse(newHouse.photo, newHouse.houseType, newHouse.housePrice, newHouse.numOfRoom, newHouse.numOfBathroom)

            if (success !== undefined) {
                setSuccessMessage("a new house was added to the database")
                setNewHouse({photo: null, houseType: "", housePrice: "", numOfBathroom: "", numOfRoom: ""})
                setImagePreview("")
                setErrorMessage("")
            } else {
                setErrorMessage("Error adding house")
            }
        } catch (error) {
            setErrorMessage(error.message)
        }
        

    }


    return (
        <>
            <section className="container, mt-5 mb-5">
                <div className="row justify-content-center">
                    <div className="col-mb-8 col-lg-6">
                        <h2 className="mt-5 mb-2"> Add a New House </h2>
                        <form onSubmit={handleSubmit}>
                            <div className="mb-3">
                                <label htmlFor="houseType" className="form-label"> House Type
                                </label>
                                <div>
                                    <HouseTypeSelector
                                        handleHouseInputChange={handleHouseInputChange}
                                        newHouse={newHouse}
                                    />

                                </div>

                            </div>
                            <div className="mb-3">
                                <label htmlFor="housePrice" className="form-label"> House Price
                                </label>
                                <input className="form-control"
                                       required
                                       id="housePrice"
                                       name="housePrice"
                                       type="number"
                                       value={newHouse.housePrice}
                                       onChange={handleHouseInputChange}/>


                            </div>
                            <div className="mb-3">
                                <label htmlFor="photo" className="form-label"> House Photo
                                </label>
                                <input
                                    id="photo"
                                    name="photo"
                                    type="file"
                                    className="form-control"
                                    value={newHouse.photo}
                                    onChange={handleImageChange}/>

                                {imagePreview && (
                                    <img src={imagePreview}
                                         alt="preview House Photo"
                                         style={{maxWidth: "400px", maxHeight: "400px"}}
                                         className="mb-3"
                                    />
                                )}

                            </div>
                            <div className="d-grid d-flex mt-2">
                                <button className="btn btn-outline-primary ml-5">
                                    save House
                                </button>
                            </div>

                        </form>
                    </div>
                </div>
            </section>

        </>
    )
}

export default AddHouse