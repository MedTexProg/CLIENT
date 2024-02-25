import React, {useEffect, useState} from "react";
import {getHouseType} from "../utils/ApiFunctions.js";

const HouseTypeSelector = ({handleHouseInputChange, newHouse}) => {

    const [houseTypes, setHouseTypes] = useState([""])
    const [showNewHouseTypeInput, setShowNewHouseTypeInput] = useState(false)
    const [newHouseType, setNewHouseType] = useState("")

    useEffect(() => {
        getHouseType().then((data) => {
            setHouseTypes(data)
        })
    }, [])

    const handleNewHouseTypeInputChange = (e) => {
        setHouseTypes(e.target.value);
    }

    const handleAddNewHouseType = () => {
        if (newHouseType !== "") {
            setHouseTypes([...houseTypes, newHouseType])
            setNewHouseType("")
            setShowNewHouseTypeInput(false)
        }
    }

    return (
        <>
            {houseTypes.length > 0 && (
                <div>
                    <select
                        required
                        name='houseType'

                        onChange={(e) => {
                            if (e.target.value === "Add New") {
                                setShowNewHouseTypeInput(true)
                            } else {
                                handleHouseInputChange(e)
                            }
                        }}
                        value={newHouse.houseType}
                    >
                        <option value={""}> select a house type</option>
                        <option value={"Add New"}> Add New</option>
                        {
                            houseTypes.map((type, index) => (
                                <option key={index} value={type}>
                                    {type}
                                </option>
                            ))}

                    </select>
                    {showNewHouseTypeInput && (
                        <div className='input-group'>
                            <input
                                className='form-control'
                                type='text'
                                placeholder='Enter a new house type'
                                onChange={handleNewHouseTypeInputChange}
                            />
                            <button className='btn btn-hotel' type='button' onClick={handleAddNewHouseType}> Add
                            </button>
                        </div>
                    )}
                </div>
            )}

        </>
    )
}

export default HouseTypeSelector