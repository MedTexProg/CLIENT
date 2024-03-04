import React, {useEffect, useState} from "react";
import {deleteHouse, getAllHouses} from "../utils/ApiFunctions.js";
import HouseFilter from "../common/HouseFilter.jsx";
import HousePaginator from "../common/HousePaginator.jsx";
import {Col, Row} from "react-bootstrap";
import {FaEdit, FaEye, FaTrashAlt} from "react-icons/fa";
import {Link} from "react-router-dom";
import {FaPlus} from "react-icons/fa";

const ExistingHouses = () => {
    const [houses, setHouses] = useState([{id: "", houseType: "", housePrice: "", numOfRoom: "", numOfBathroom: ""}]);
    const [currentPage, setCurrentPage] = useState(1);
    const [housesPerPage] = useState(8);
    const [isLoading, setIsLoading] = useState(false);
    const [filteredHouses, setFilteredHouses] = useState([{
        id: "",
        houseType: "",
        housePrice: "",
        numOfRoom: "",
        numOfBathroom: ""
    }])
    const [selectedHouseType, setSelectedHouseType] = useState("");
    const [successMessage, setSuccessMessage] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    useEffect(() => {
        fetchHouses();
    }, []);

    const fetchHouses = async () => {
        setIsLoading(true);
        try {
            const result = await getAllHouses();
            setHouses(result);
            setIsLoading(false);
        } catch (error) {
            setErrorMessage(error.message);
            setIsLoading(false);
        }
    };

    useEffect(() => {
        if (selectedHouseType === "") {
            setFilteredHouses(houses);
        } else {
            const filteredHouses = houses.filter((house) => house.houseType === selectedHouseType);
            setFilteredHouses(filteredHouses);
        }
        setCurrentPage(1);
    }, [houses, selectedHouseType]);

    const handlePaginationClick = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const handleDelete = async (houseId) => {
        try {
            const result = await deleteHouse(houseId)
            if (result === "") {
                setSuccessMessage(`House No:${houseId} was deleted`);
                fetchHouses();
            } else {
                console.error(`Error deleting house : ${result.message}`);
            }
        } catch (error) {
            setErrorMessage(error.message);
        }
        setTimeout(() => {
            setSuccessMessage("");
            setErrorMessage("");
        }, 3000);
    };

    const calculateTotalPages = () => {
        const totalHouses = filteredHouses.length > 0 ? filteredHouses.length : houses.length
        return Math.ceil(totalHouses / housesPerPage);
    };

    const indexOfLastHouse = currentPage * housesPerPage;
    const indexOfFirstHouse = indexOfLastHouse - housesPerPage;
    const currentHouses = filteredHouses.slice(indexOfFirstHouse, indexOfLastHouse);

    return (
        <>
            <div className="container col-md-8 col-lg-6">
                {successMessage && <p className="alert alert-success mt-5">{successMessage}</p>}
                {errorMessage && <p className="alert alert-danger mt-5">{errorMessage}</p>}
            </div>
            {isLoading ? (
                <p>Loading existing houses</p>
            ) : (
                <section className="mt-5 mb-5 container">
                    <div className="d-flex justify-content-between mb-3 mt-5">
                        <h2>Existing houses</h2>
                    </div>
                    <Row>
                        <Col md={6} className="mb-3 mb-md-0">
                            <HouseFilter data={houses} setFilteredData={setFilteredHouses}/>
                        </Col>
                        <Col md={6} className="d-flex justify-content-end">
                            <Link to={"/add-house"}>
                                <FaPlus/> Add house
                            </Link>
                        </Col>
                    </Row>
                    <table className="table table-bordered table-hover">
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
                                        onClick={() => handleDelete(house.id)}
                                    >
                                        <FaTrashAlt/>
                                    </button>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                    <HousePaginator
                        currentPage={currentPage}
                        totalPages={calculateTotalPages()}
                        onPageChange={handlePaginationClick}
                    />
                </section>
            )}
        </>
    );
};

export default ExistingHouses;
