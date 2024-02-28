import React from "react";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css"
import "/node_modules/bootstrap/dist/js/bootstrap.min.js"
import './App.css'
import AddHouse from "./components/house/AddHouse.jsx";
import ExistingHouses from "./components/house/ExistingHouses.jsx";
import EditHouse from "./components/house/EditHouse.jsx";

import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import Home from "./components/home/Home.jsx";

function App() {
    return <>
        <main>
            <Router>
                <Routes>
                    <Route path="/" element={<Home/>}/>
                    <Route path="/edit-house/:roomId" element={<EditHouse/>}/>
                    <Route path="/existing-houses" element={<ExistingHouses/>}/>
                </Routes>
            </Router>
        </main>

    </>
}

export default App
