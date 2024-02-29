import React from "react";
import {Col, Container, Row} from "react-bootstrap";

const Footer = () => {
    let today = new Date();
    return (
        <footer className="bg-dark text-light py-3 mt-lg-5 footer">
            <Container>
                <Row>
                    <Col xs={12} className="text-center">
                        <p>&copy; {today.getFullYear()} OBSHR</p>
                    </Col>
                </Row>
            </Container>
        </footer>
    );
};

export default Footer;
