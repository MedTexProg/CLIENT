import React, {useState} from 'react'

const AddHouse = () => {
  const [newHouse, setNewHouse] = useState({
    photo :null,
    houseType: "",
    housePrice: "",
    numOfRoom: "",
    numOfBathroom: ""
  })

  const [imagePreview, setImagePreview] = useState("")
  const [successMessage, setSuccessMessage] =useState("")
  const [erroMessage, setErrorMessage]= useState("")


  const handleRoomInputChange = (e) => {
    const name = e.target.name
    let value = e.target.value
    if (name ===  "housePrice") {
      if (!isNaN(value)) {
        value.parseInt(value)
      } else {
        value = ""
      }
    }
    setNewHouse({...newHouse,[name]:value})
  }

  const handleImageChange = (e) => {
    const selectedImage = e.target.files[0]
    setNewHouse({...newHouse, photo: selectedImage})
    setImagePreview(URL.createObjectURL(selectedImage))
  }





  return (
    <div>AddHouse</div>
  )
}

export default AddHouse