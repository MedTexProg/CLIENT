import React, {useEffect, useState} from "react";
import {getAllHouses} from "../utils/ApiFunctions.js";
import {Link} from "react-router-dom";
import {Card, Carousel, Col, Container, Row} from "react-bootstrap";
import error from "eslint-plugin-react/lib/util/error.js";

const HouseCarousel = () => {
    const [houses, setHouses] = useState([{
        id: "",
        houseType: "",
        housePrice: "",
        numOfRoom: "",
        numOfBathroom: "",
        photo: ""
    }])
    const [errorMessage, setErrorMessage] = useState("")
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        setIsLoading(true)
        getAllHouses().then((data) => {
            setHouses(data)
            setIsLoading(false)

        }).catch((error) => {
            setErrorMessage(error.message)
            setIsLoading(false)
        })
    }, [])

    if (isLoading) {
        return <div className="mt-5">
            Loading houses...
        </div>
    }
    if (error) {
        return <div className=" text-danger  mb-5 mt-5">
            Error: {errorMessage}
        </div>

    }
    return (
        <section className="bg-light mb-5 mt-5 shadow">
            <Link to="/browse-all-houses" className="hotel-color text-center">
                Browse all houses

            </Link>
            <Container>
                <Carousel indicators={false}>
                    {[...Array(Math.ceil(houses.length / 4))].map((_, index) => (
                        <Carousel.Item key={index}>
                            <Row>
                                {houses.slice(index * 4, index * 4 + 4).map((house) => (
                                    <Col key={house.id} className="mb-4" xs={12} mb={6} lg={3}>
                                        <Card>
                                            <Link to={`/book-house/${house.id}`}>
                                                <Card.Img
                                                    variant="top"
                                                    src={`data:image/png;base64, ${house.photo}`}
                                                    alt="house photo"
                                                    className="w-100"
                                                    style={{height: "200px"}}
                                                />
                                            </Link>
                                            <Card.Body>
                                                <Card.Title className="hotel-color">{house.houseType}</Card.Title>
                                                <Card.Title className="room-price">{house.housePrice}/month</Card.Title>
                                                <Card.Title className="hotel-color">{house.numOfRoom}</Card.Title>
                                                <Card.Title className="hotel-color">{house.numOfBathroom}</Card.Title>
                                                <div className="flex-shrink-0">
                                                    <Link className="btn btn-sm btn-hotel"
                                                          to={`/book-house/${house.id}`}>
                                                        View/Book Now
                                                    </Link>
                                                </div>
                                            </Card.Body>
                                        </Card>
                                    </Col>
                                ))}

                            </Row>
                        </Carousel.Item>
                    ))}

                </Carousel>
            </Container>


        </section>
    )
}
export default HouseCarousel