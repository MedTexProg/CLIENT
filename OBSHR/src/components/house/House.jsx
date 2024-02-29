import React, {useEffect, useState} from "react";
import {getAllHouses} from "../utils/ApiFunctions.js";
import HouseCard from "./HouseCard.jsx";
import {Col, Container, Row} from "react-bootstrap";
import HouseFilter from "../common/HouseFilter.jsx";
import HousePaginator from "../common/HousePaginator.jsx";

const House = () => {
    const [data, setData] = useState([])
    const [error, setError] = useState(null)
    const [isLoading, setIsLoading] = useState(false)
    const [currentPage, setCurrentPage] = useState(1)
    const [housePerPage] = useState(6)
    const [filteredData, setFilteredData] = useState([{id: ""}])

    useEffect(() => {
        setIsLoading(true)
        getAllHouses().then((data) => {
            setData(data)
            setFilteredData(data)
            setIsLoading(false)
        }).catch((error) => {
            setError(error.message)
            setIsLoading(false)
        })
    }, [])
    if (isLoading) {
        return <div>Loading house.....</div>
    }
    if (error) {
        return <div className="text-danger">Error: {error}</div>
    }

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber)
    }

    const totalPages = Math.ceil(filteredData.length / housePerPage)
    const renderHouses = () => {
        const startIndex = (currentPage - 1) * housePerPage
        const endIndex = startIndex + housePerPage
        return filteredData
            .slice(startIndex, endIndex)
            .map((house) => <HouseCard key={house.id} house={house}/>
            )
    }
    return (
        <Container>
            <Row>
                <Col md={6} className="mb-3 mb-md-0">
                    <HouseFilter data={data} setFilteredData={setFilteredData()}/>
                </Col>
                <Col md={6} className="d-flex align-items-center justify-content-end">
                    <HousePaginator
                        currentPage={currentPage}
                        totalPages={totalPages}
                        onPageChange={handlePageChange}
                    />
                </Col>
            </Row>

            <Row>
                {renderHouses()}
            </Row>
            <Row>
                <Col md={6} className="d-flex align-items-center justify-content-end">
                    <HousePaginator
                        currentPage={currentPage}
                        totalPages={totalPages}
                        onPageChange={handlePageChange}
                    />
                </Col>
            </Row>
        </Container>
    )
}
export default House