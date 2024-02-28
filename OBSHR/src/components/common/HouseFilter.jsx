import React, {useState} from "react";

const HouseFilter = ({data, setFilteredData}) => {
    const [filter, setFilter] = useState("")

    const handleSelectChange = (e) => {
        const selectedHouseType = e.target.value
        setFilter(selectedHouseType)
        const filteredHouses = data.filter((house) =>
            house.houseType.toLowerCase()
                .includes(selectedHouseType.toLowerCase()))
        setFilteredData(filteredHouses)
    }

    const clearFilter = () => {
        setFilter("")
        setFilteredData(data)
    }
    const houseTypes = ["", ...new Set(data.map((house) => house.houseType))]
    return (
        <div className="input-group mb-3">
            <span className="input-group-text" id="house-type-filter"> filter houses by type</span>
            <select className="form-select"
                    value={filter}
                    onChange={handleSelectChange}>
                <option value={""}>select a house type to filter...</option>
                {houseTypes.map((type, index) => (
                    <option key={index} value={type}>
                        {type}
                    </option>
                ))}

            </select>
            <button className="btn btn-hotel" type="button" onClick={clearFilter}>
                Clear Filter
            </button>

        </div>
    )
}
export default HouseFilter