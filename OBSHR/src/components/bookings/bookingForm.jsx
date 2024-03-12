import React, {useEffect, useState} from "react";
import {bookHouse, getHouseById} from "../utils/ApiFunctions.js";
import {useNavigate, useParams} from "react-router-dom";
import moment from "moment";
import error from "eslint-plugin-react/lib/util/error.js";
import {FormControl, FormGroup, FormLabel} from "react-bootstrap";
import BookingSummary from "./BookingSummary.jsx";

const BookingForm = () => {
    const [isValidated, setIsValidated] = useState(false)
    const [isSubmitted, setIsSubmitted] = useState(false)
    const [errorMessage, setErrorMessage] = useState("")
    const [housePrice, setHousePrice] = useState(0)
    const [booking, setBooking] = useState({
        guestName: "",
        guestEmail: "",
        checkInDate: "",
        checkOutDate: "",
        numberOfAdults: "",
        numberOfChildren: "",
    })


    const [houseInfo, setHouseInfo] = useState({
        photo: "",
        housePrice: "",
        houseType: "",
        numOfRoom: "",
        numOfBathroom: ""
    })

    const {houseId} = useParams()
    const navigate = useNavigate()

    const handleInputChange = (e) => {
        const {name, value} = e.target
        setBooking({...booking, [name]: value})
        setErrorMessage("")
    }


    const getHousePriceById = async (houseId) => {
        try {
            const response = await getHouseById(houseId)
            setHousePrice(response.housePrice)

        } catch (error) {
            throw new Error(error)
        }
    }

    useEffect(() => {
        getHousePriceById(houseId)
    }, [houseId])

    const calculatePayment = () => {
        const checkInDate = moment(booking.checkInDate)
        const checkOutDate = moment(booking.checkOutDate)
        const diffInDays = checkOutDate.diff(checkInDate)
        const price = housePrice ? housePrice : 0
        return diffInDays * price
    }

    const isGuestCountValid = () => {
        const adultCount = parseInt(booking.numberOfAdults)
        const childrenCount = parseInt(booking.numberOfChildren)
        const totalCount = adultCount + childrenCount
        return totalCount >= 1 && adultCount >= 1
    }

    const isCheckOutDateValid = () => {
        if (!moment(booking.checkOutDate).isSameOrAfter(moment(booking.checkInDate))) {
            setErrorMessage("Check out date must come before check-in date")
            return false
        } else {
            setErrorMessage("")
            return true
        }
    }

    const handleBooking = async () => {
        try {
            const confirmationCode = await bookHouse(houseId, booking)
            setIsSubmitted(true)
            navigate("/", {state: {message: confirmationCode}})
        } catch (e) {
            setErrorMessage(error.message)
            navigate("/", {state: {error: errorMessage}})

        }
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        const form = e.currentTarget
        if (form.checkValidity() === false || !isGuestCountValid() || !isCheckOutDateValid()) {
            e.stopPropagation()
        } else {
            setIsSubmitted(true)
        }
        setIsValidated(true)
    }

    return (

        <>
            <div className="container mb-5">
                <div className="row">
                    <div className="col-md-6">
                        <div className="card card-body mb-5">
                            <h4 className="card card-title"> Reserve house</h4>
                            <form noValidate validated={isValidated} onSubmit={handleSubmit}>
                                <FormGroup>
                                    <FormLabel htmlFor="guestName"> Full Name :</FormLabel>

                                    <FormControl
                                        required
                                        type="text"
                                        id="guestName"
                                        name="guestName"
                                        value={booking.guestName}
                                        placeholder={"Enter you full name"}
                                        onChange={handleInputChange}
                                    />
                                    <FormControl.feedback type="invalid">
                                        Please enter your fullname
                                    </FormControl.feedback>
                                </FormGroup>

                                <FormGroup>
                                    <FormLabel htmlFor="guestEmail"> Email :</FormLabel>

                                    <FormControl
                                        required
                                        type="email"
                                        id="guestEmail"
                                        name="guestEmail"
                                        value={booking.guestEmail}
                                        placeholder={"Enter your Email"}
                                        onChange={handleInputChange}
                                    />
                                    <FormControl.Feedback type="invalid">
                                        Please enter your Email address
                                    </FormControl.Feedback>
                                </FormGroup>


                                <fieldset style={{border: "2px"}}>
                                    <legend>Lodging period</legend>
                                    <div className="row">
                                        <div className="col-6">
                                            <FormLabel htmlFor="checkInDate">
                                                Check-In date :</FormLabel>
                                            <FormControl
                                                required
                                                type="date"
                                                id="checkInDate"
                                                name="checkInDate"
                                                value={booking.checkInDate}
                                                placeholder="check-In date"
                                                onChange={handleInputChange}
                                            />
                                            <Form.Control.Feedback type="invalid">
                                                Please select a check-In date
                                            </Form.Control.Feedback>
                                        </div>

                                        <div className="col-6">
                                            <FormLabel htmlFor="checkOutDate">
                                                Check-Out date :</FormLabel>
                                            <FormControl
                                                required
                                                type="date"
                                                id="checkOutDate"
                                                name="checkOutDate"
                                                value={booking.checkOutDate}
                                                placeholder="check-Out date"
                                                onChange={handleInputChange}
                                            />
                                            <Form.Control.Feedback type="invalid">
                                                Please select a check-In date
                                            </Form.Control.Feedback>
                                        </div>
                                        {errorMessage && <p className="error-massage text-danger">{errorMessage}</p>}


                                    </div>
                                </fieldset>

                                <fieldset>
                                    <legend>
                                        Number of Guest
                                    </legend>
                                    <div className="col-6">
                                        <FormLabel htmlFor="numberOfAdults">
                                            Adults :
                                        </FormLabel>
                                        <FormControl
                                            required
                                            type="number"
                                            id="numberOfAdults"
                                            name="numberOfAdults"
                                            value={booking.numberOfAdults}
                                            placeholder={"0"}
                                            min={1}
                                            onChange={handleInputChange}
                                        />
                                        <Form.Control.Feedback type="invalid">
                                            Please select at least one 1 adult.
                                        </Form.Control.Feedback>
                                    </div>

                                    <div className="col-6">
                                        <FormLabel htmlFor="numberOfChildren">
                                            Children :
                                        </FormLabel>
                                        <FormControl
                                            required
                                            type="number"
                                            id="numberOfChildren"
                                            name="numberOfChildren"
                                            value={booking.numberOfChildren}
                                            placeholder={"0"}
                                            onChange={handleInputChange}
                                        />
                                    </div>
                                </fieldset>
                                <div className="form-group mt-2 mb-2">
                                    <button type="submit" className="btn btn-hotel"> Continue
                                    </button>

                                </div>


                            </form>
                        </div>

                    </div>
                    <div className="col-md-6">
                        {isSubmitted && (
                            <BookingSummary
                                booking={booking}
                                payment={calculatePayment}
                                isFormValid={isValidated}
                                onConfirm={handleBooking()}
                            />
                        )}

                    </div>

                </div>

            </div>

        </>
    )
}

export default BookingForm