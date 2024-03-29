import React from "react";
import {Card, Col} from "react-bootstrap";
import {Link} from "react-router-dom";

const HouseCard = ({house}) => {
    return (
        <Col key={house.id} className="mb-4" xs={12}>

            <Card>
                <Card.Body className="d-flex flex-wrap align-items-center">
                    <div className="flex-shrink-0 mr-3 mb-3 mb-md-0">
                        <Link to={`book-house/${house.id}`} className="btn btn-hotel btn-sm">

                            <Card.Img
                                variant='top'
                                src={`data:image/png;base64,${house.photo}`}
                                alt="house photo"
                                style={{width: "100%", maxWidth: "200px", height: "auto"}}
                            />

                        </Link>
                    </div>
                    <div className="flex-grow-1 ml-3 px-5">
                        <Card.Title className="hotel-color">{house.houseType}</Card.Title>
                        <Card.Title className="room-price">{house.housePrice}</Card.Title>
                        <Card.Title className="hotel-color">{house.numOfRoom}</Card.Title>
                        <Card.Title className="hotel-color">{house.numOfBathroom}</Card.Title>
                        <Card.Text> Some House information goes here for the guest to read through </Card.Text>
                    </div>
                    <div className="flex-shrink-0 mt-3">
                        <Link to={`book-house/${house.id}`} className="btn btn-hotel btn-sm">
                            Book Now
                        </Link>
                    </div>
                </Card.Body>
            </Card>

        </Col>
    )
}
export default HouseCard