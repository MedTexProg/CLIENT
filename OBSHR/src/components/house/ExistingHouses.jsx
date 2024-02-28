import React, {useEffect, useState} from "react";
import {deleteHouse, getAllHouses} from "../utils/ApiFunctions.js";
import HouseFilter from "../common/HouseFilter.jsx";
import HousePaginator from "../common/HousePaginator.jsx";
import {Col} from "react-bootstrap";
import {FaEdit, FaEye, FaTrashAlt} from "react-icons/fa";
import {Link} from "react-router-dom";

const ExistingHouses = () => {
    const [houses, setHouses] = useState([{id: "", houseType: "", housePrice: "", numOfRoom: "", numOfBathroom: ""}])
    const [currentPage, setCurrentPage] = useState(1)
    const [housesPerPage] = useState(8)
    const [isLoading, setIsLoading] = useState(false)
    const [filteredHouses, setFilteredHouses] = useState([{
        id: "",
        houseType: "",
        housePrice: "",
        numOfRoom: "",
        numOfBathroom: ""
    }])
    const [selectedHouseType, setSelectedHouseType] = useState("")
    const [successMessage, setSuccessMessage] = useState("")
    const [errorMessage, setErrorMessage] = useState("")

    useEffect(() => {
        fetchHouses()

    }, []);


    const fetchHouses = async () => {
        setIsLoading(true)
        try {
            const result = await getAllHouses()
            setHouses(result)
            setIsLoading(false)
        } catch (error) {
            setErrorMessage(error.message)
        }
    }

    useEffect(() => {
        if (selectedHouseType === "") {
            setFilteredHouses(houses)
        } else {
            const filtered = houses.filter((house) => house.houseType === selectedHouseType)
            setFilteredHouses(filtered)
        }
        setCurrentPage(1)
    }, [houses, selectedHouseType])

    const handlePaginationClick = (pageNumber) => {
        setCurrentPage(pageNumber)
    }

    const handleDelete = async (houseId) => {
        try {
            const result = await deleteHouse(houseId)
            if (result === "") {
                setSuccessMessage(`House No ${houseId} was deleted`)
                fetchHouses()
            } else {
                console.error(`Error deleting house : ${result.message}`)
            }

        } catch (error) {
            setErrorMessage(error.message)
        }
        setTimeout(() => {
            setSuccessMessage("")
            setErrorMessage("")
        }, 3000)
    }

    const calculateTotalPages = (filteredHouses, housesPerPage, houses) => {
        const totalHouses = filteredHouses.length > 0 ? filteredHouses.length : houses.length
        return Math.ceil(totalHouses / housesPerPage)
    }

    const indexOfLastHouse = currentPage * housesPerPage
    const indexOfFirstHouse = indexOfLastHouse - housesPerPage
    const currentHouses = filteredHouses.slice(indexOfFirstHouse, indexOfLastHouse)


    return (
        <>
            {isLoading ? (
                <p>Loading existing houses</p>
            ) : (
                <section className="mt-5 mb-5 container">
                    <div className="d-flex justify-content-center mb-3 mt-5">
                        <h2>Existing houses</h2>
                    </div>
                    <Col md={6} className="mb-3 mb-md-0">
                        <HouseFilter data={houses} setFilteredData={setFilteredHouses}/>
                    </Col>

                    <table className='table table-bordered table-hover'>
                        <thead>
                        <tr className="text-center">
                            <th>ID</th>
                            <th>House Type</th>
                            <th>House Price</th>
                            <th>Number of Room</th>
                            <th>Number of Bathroom</th>
                            <th>Actions</th>
                        </tr>
                        </thead>
                        <tbody>
                        {currentHouses.map((house) => (
                            <tr key={house.id} className="text-center">
                                <td>{house.id}</td>
                                <td>{house.houseType}</td>
                                <td>{house.housePrice}</td>
                                <td>{house.numOfRoom}</td>
                                <td>{house.numOfBathroom}</td>
                                <td className="gap-2">
                                    <Link to={`/edit-house/${house.id}`}>
                                        <span className="btn btn-info btn-sm">
                                            <FaEye/>
                                        </span>
                                        <span className="btn btn-warning btn-sm">
                                            <FaEdit/>
                                        </span>

                                    </Link>


                                    <button
                                        className="btn btn-danger btn-sm"
                                        onClick={() => handleDelete(house.id)}>
                                        <FaTrashAlt/>
                                    </button>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                    <HousePaginator
                        currentPage={currentPage}
                        totalPages={calculateTotalPages(filteredHouses, housesPerPage, houses)}
                        onPageChange={handlePaginationClick}
                    />

                </section>
            )}

        </>
    )
}
export default ExistingHouses;