import React from "react";
import MainHeader from "../layout/MainHeader.jsx";
import Header from "../common/Header.jsx";
import HotelService from "../common/HotelService.jsx";
import Parallax from "../common/Parallax.jsx";
import HouseCarousel from "../common/HouseCarousel.jsx";

const Home = () => {
    return (
        <section>
            <MainHeader/>
            <section className="container">
                <HouseCarousel/>
                <Parallax/>
                <HouseCarousel/>
                <HotelService/>
                <Parallax/>
                <HouseCarousel/>
            </section>
            <Header/>
        </section>
    )
}

export default Home