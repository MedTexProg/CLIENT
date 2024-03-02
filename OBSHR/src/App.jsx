import React from "react";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css"
import "/node_modules/bootstrap/dist/js/bootstrap.min.js"
import './App.css'
import AddHouse from "./components/house/AddHouse.jsx";
import ExistingHouses from "./components/house/ExistingHouses.jsx";
import EditHouse from "./components/house/EditHouse.jsx";

import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import Home from "./components/home/Home.jsx";
import NavBar from "./components/layout/NavBar.jsx";
import Footer from "./components/layout/Footer.jsx";
import HouseListing from "./components/house/HouseListing.jsx";
import Admin from "./components/admin/Admin.jsx";

function App() {
    return <>
        <main>
            <Router>
                <NavBar/>
                <Routes>
                    <Route path="/" element={<Home/>}/>
                    <Route path="/edit-house/:houseId" element={<EditHouse/>}/>
                    <Route path="/existing-houses" element={<ExistingHouses/>}/>
                    <Route path="/add-house" element={<AddHouse/>}/>
                    <Route path="/browse-all-houses" element={<HouseListing/>}/>
                    <Route path="/admin" element={<Admin/>}/>


                </Routes>
                <Footer/>
            </Router>
        </main>

    </>
}

export default App
