import React, { useState ,useEffect} from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";


function BackPatientReviews() {
  // State for API response, patient data, confirmation modal, and editing index
  const navigate=useNavigate();
  const handleGoBack=()=>{
    navigate('/backHome/backendDashboard/')
  }
  const [responseData, setResponseData] = useState(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [imageList, setImageList] = useState([]);
  const [selectedImageName, setSelectedImageName] = useState('');
  const [selectedImage, setSelectedImage] = useState(null);
  const [userReview, setUserReview] = useState({
    testimonial: {
      title: "",
      description: "",
    },
    userReview: [
      {
        Name: "",
        Patient: "",
        description: "",
        image: "",
      },
    ],
  });
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const [editingIndex, setEditingIndex] = useState(null); // Track currently edited patient index

  // State for adding a new patient
  const [newPatient, setNewPatient] = useState({
    Name: "",
    Patient: "",
    description: "",
    image: "",
  });

  useEffect(()=>{
    handleGet();
    handleGetImagesList()
  },[])
  // Function to fetch data from the API
  const handleGet = async () => {
    try {
      const response = await axios.get(
        "https://eikon-api.onrender.com/patientreview/65127ff99ff116e15901d5ff"
      );
      const data = response.data;
      setResponseData(data);
      setTitle(data.testimonial.title);
      setDescription(data.testimonial.description);
      setUserReview(data);
  
    } catch (error) {
      console.error("Error making GET request:", error);
    }
  };

  // Function to open the confirmation modal
  const openConfirmationModal = () => {
    setShowConfirmationModal(true);
  };

  // Function to update patient data
  const handleUpdate = async () => {
    try {
      const response = await axios.patch(
        "http://localhost:8080/patientreview/65127ff99ff116e15901d5ff",
        {
          testimonial: {
            title: title,
            description: description,
          },
          userReview: [
            ...userReview.userReview
          ],
        }
      );
  
    //   setResponseData(response.data);
    } catch (error) {
      console.error("Error making PATCH request:", error);
    }
  
    setShowConfirmationModal(false); // Close the confirmation modal after handling update
  };
  

  // Function to add a new patient to the user review array
  const handleAddPatient = () => {
    // Create a copy of the existing user review array and add the new patient
    const updatedUserReview = [...userReview.userReview, newPatient];

    // Update the state with the new user review array
    setUserReview((prevUserReview) => ({
      ...prevUserReview,
      userReview: updatedUserReview,
    }));

    // Clear the form for adding a new patient
    setNewPatient({
      Name: "",
      Patient: "",
      description: "",
      image: "",
    });
  };
  const handleGetImagesList = async () => {
    try {
      // Make a GET request to retrieve the list of images
      const imagesListResponse = await axios.get('http://localhost:8080/listImages');
      const list = imagesListResponse.data;

      // Update the state variable with the retrieved list of images
      setImageList(list.images);
    } catch (error) {
      console.error('Error making GET request:', error);
      // Handle errors here.
    }
  };
  // Function to edit a patient's details
  const handleEditPatient = (index) => {
    // Set the editing index and populate the form with the patient's data
    setEditingIndex(index);
    const editedPatient = userReview.userReview[index];
    setNewPatient({ ...editedPatient });
  };
  const handleImageClick = (imageName) => {
    setSelectedImageName(imageName);

    // Remove border from previously selected image
    if (selectedImage) {
      selectedImage.classList.remove('selected-image');
    }

    // Add border to the newly selected image
    const newSelectedImage = document.querySelector(`[data-image-name="${imageName}"]`);
    if (newSelectedImage) {
      newSelectedImage.classList.add('selected-image');
      setSelectedImage(newSelectedImage);
    }
  };

  // Function to save edited patient details
  const handleSavePatient = () => {
    // Copy the userReview array
    const updatedUserReview = [...userReview.userReview];

    // Update the patient's details at the editing index
    updatedUserReview[editingIndex] = { ...newPatient };

    // Update the state
    setUserReview((prevUserReview) => ({
      ...prevUserReview,
      userReview: updatedUserReview,
    }));

    // Clear the form and reset editing index
    setNewPatient({
      Name: "",
      Patient: "",
      description: "",
      image: "",
    });
    setEditingIndex(null);
  };

  // Function to delete an existing patient by index
  const handleDeletePatient = (index) => {
    // Copy the userReview array
    const updatedUserReview = [...userReview.userReview];

    // Remove the patient at the specified index
    updatedUserReview.splice(index, 1);

    // Update the state
    setUserReview((prevUserReview) => ({
      ...prevUserReview,
      userReview: updatedUserReview,
    }));
  };
  const handleImage =(index)=>{

  }

  return (
    <div className="container">
      <h2 className="p-5 text-center">Patient Review</h2>
      <div className="row ">
        {/* Input field for ID */}
       
        <div className="col-sm-6">
          <div className="btn-group ">
            {/* Button to trigger GET request */}
            {/* <button className="btn btn-primary m-1 " onClick={handleGet}>
              GET
            </button> */}
            {/* Button to trigger UPDATE confirmation modal */}
            <button
              className="btn btn-success m-1"
              onClick={openConfirmationModal}
            >
              UPDATE
            </button>
            <button
              className="btn btn-primary m-1"
              onClick={handleAddPatient}
            >
              Add
            </button>
            <button
              className="btn btn-primary m-1"
              onClick={handleGetImagesList}
            >
              images
            </button>
            {/* <button className="btn btn-gray m-1" onClick={handleGoBack}>
              Back
            </button> */}
          </div>
        </div>
      </div>
      <div className="col-sm-6 mt-lg-5">
          <input
            type="text"
            className="form-control m-1"
            placeholder="Enter on Get Button to get API"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <input
            type="text"
            className="form-control m-1"
            placeholder="Enter on Get Button"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
      {/* Display existing patients and provide a way to edit and delete them */}
      <div>
        <h3>Existing Patients:</h3>
        {userReview.userReview.map((patient, index) => (
          <div key={index}>
            {editingIndex === index ? (
              // Render input fields for editing
              <div>
                <div>
                  <label>Name:</label>
                  <input
                    className="form-control"
                    type="text"
                    value={newPatient.Name}
                    onChange={(e) =>
                      setNewPatient({ ...newPatient, Name: e.target.value })
                    }
                  />
                </div>
                <div>
                  <label>Patient:</label>
                  <input
                    className="form-control"
                    type="text"
                    value={newPatient.Patient}
                    onChange={(e) =>
                      setNewPatient({ ...newPatient, Patient: e.target.value })
                    }
                  />
                </div>
                <div>
                  <label>Description:</label>
                  <textarea
                    className="form-control"
                    value={newPatient.description}
                    onChange={(e) =>
                      setNewPatient({
                        ...newPatient,
                        description: e.target.value,
                      })
                    }
                  />
                </div>
                <div>
                  <label>Image URL:</label>
                  <input
                    className="form-control"
                    type="text"
                    value={newPatient.image}
                    onChange={(e) =>
                      setNewPatient({ ...newPatient, image: e.target.value })
                    }
                  />
                </div>
                <button
                  className="btn btn-primary"
                  onClick={() => handleSavePatient(index)}
                >
                  Save
                </button>
              </div>
            ) : (
              // Render patient details
              <div >
                <p>Name: {patient.Name}</p>
                <p>Patient: {patient.Patient}</p>
                <p>Description: {patient.description}</p>
                <p>Image URL: {patient.image}</p>
                <button
                  className="btn btn-primary"
                  onClick={() => handleEditPatient(index)}
                >
                  Edit
                </button>
                
                <button
                  className="btn btn-danger"
                  onClick={() => handleDeletePatient(index)}
                >
                  Delete
                </button>
              </div>
            )}
          </div>
        ))}
        <div className="container">
          <div className="row">
            <div className="col">
              <div className="form-group">
                <label>Images:</label>
                <div className="row">
                  {/* Display the list of images */}
                  {imageList.map((item, index) => (
                    <div key={index} className="col-12 col-md-2 ">
                      <div
                        className="card mb-2 imageListStyle"
                        onClick={() => handleImageClick(item)}
                        data-image-name={item} // Add data-image-name attribute
                      >
                        <img
                          src={`http://localhost:8080/imageUploads/${item}`}
                          alt={`Image ${index}`}
                          className="card-img-top "
                        />
                        <div className="card-body">
                          {/* Add your content here */}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Confirmation modal */}
      {showConfirmationModal && (
        <div className="modal fade show " style={{ display: "block" }}>
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content bg-warning">
              <div className="modal-header">
                <h5 className="modal-title">Confirm Update</h5>
                <button
                  type="button"
                  className="close"
                  onClick={() => setShowConfirmationModal(false)}
                >
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">Are you sure you want to update?</div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => setShowConfirmationModal(false)}
                >
                  Cancel
                </button>
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={handleUpdate}
                >
                  Confirm
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default BackPatientReviews;
