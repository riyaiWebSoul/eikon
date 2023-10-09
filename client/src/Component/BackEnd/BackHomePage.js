import React, { useEffect, useState } from 'react';
import axios from 'axios';
 


function BackHomePage() {
  

  // State variables to store data retrieved from the API
  const [responseData, setResponseData] = useState(null);
  const [title, setTitle] = useState('');
  const [heading, setHeading] = useState('');
  const [description, setDescription] = useState('');
  const [file, setFile] = useState(null);
  const [imageList, setImageList] = useState([]);
  const [selectedImageName, setSelectedImageName] = useState('');
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null); // Track selected image

  // Function to handle the GET request to retrieve data
  const handleGet = async () => {
    try {
      // Make a GET request to retrieve the list of images
      const imagesListResponse = await axios.get('http://localhost:8080/listImages');
      const list = imagesListResponse.data;

      // Make a GET request to retrieve the data for a specific ID
      const response = await axios.get('http://localhost:8080/home/650d4595f2c62afdc75b54ba');
      const data = response.data;

      // Update the state variables with the retrieved data
      setImageList(list.images);
      setResponseData(data);
      setTitle(data.section.title);
      setDescription(data.section.description);
      setHeading(data.section.heading);
    } catch (error) {
      console.error('Error making GET request:', error);
      // Handle errors here.
    }
  };

  // useEffect to automatically fetch images list on component mount
  useEffect(() => {
    handleGetImagesList();
    handleGet();
    
  }, []);

  // Function to handle the GET request to retrieve the images list
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

  // Function to open the confirmation modal
  const openConfirmationModal = () => {
    setShowConfirmationModal(true);
  }

  // Function to handle the UPDATE (PATCH) request
  const handleUpdate = async () => {
    try {
      // Make a PATCH request to update the data with the specified ID
      const response = await axios.patch('http://localhost:8080/home/650d4595f2c62afdc75b54ba', {
        section: {
          imageSrc: selectedImageName, // Use selectedImageName instead of image
          title: title,
          heading: heading,
          description: description,
        }
      });

      // Update the state variable with the response data
      setResponseData(response.data);
    } catch (error) {
      console.error('Error making PATCH request:', error);
      // Handle errors here.
    }
  };
const handleUploadImages=async()=>{
  try {
    // Make a PATCH request to update the data with the specified ID
    const response = await axios.post('http://localhost:8080/imageUpload',{
     
    });

    // Update the state variable with the response data
    setResponseData(response.data);
  } catch (error) {
    console.error('Error making PATCH request:', error);
    // Handle errors here.
  }
}
  // Function to handle image click and update the selected image name
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
  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = () => {
    const formData = new FormData();
    formData.append('image', file);

    axios.post('http://localhost:8080/imageUpload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
    .then((response) => {
      console.log(response.data);
      // Handle success, e.g., show a success message
    })
    .catch((error) => {
      console.error(error);
      // Handle error, e.g., show an error message
    });
  };
  const handleDeleteImage = async () => {
    try {
      if (!selectedImageName) {
        // No selected image to delete
        return;
      }

      // Make a DELETE request to delete the selected image
      await axios.delete(`http://localhost:8080/imageUploads${selectedImageName}`);

      // Update the image list state by removing the deleted image
      setImageList((prevImageList) =>
        prevImageList.filter((imageName) => imageName !== selectedImageName)
      );

      // Clear the selected image and image name
      setSelectedImageName('');
      setSelectedImage(null);
    } catch (error) {
      console.error('Error making DELETE request:', error);
      // Handle errors here.
    }
  };
  return (
    <div className="container">
      <h2 className="p-5 text-center">Home Banner</h2>
      <div className="row">
        <div className="col-sm-6">
          <div className="btn-group">
            
            {/* <button className="btn btn-primary m-1" onClick={handleGet}>
              GET
            </button> */}
          
            {/* <button className="btn btn-primary m-1" onClick={handleGetImagesList}>
              GET Images List
            </button> */}
    
            <button className="btn btn-success m-1" onClick={openConfirmationModal}>
              UPDATE
            </button>
         
            
          </div>
        </div>
      </div>
      <br />
      <div className="z-0" style={{ display: 'block', zIndex: 1 }}>
        <h3>Edit Data:</h3>
        <div>
          {/* Input field for Title */}
          <label>Title:</label>
          <input
            className="form-control"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div>
          {/* Textarea for Description */}
          <label>Description:</label>
          <textarea
            className="form-control"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <div className="form-group">
          {/* Input field for Image name */}
          <label>Image Name:</label>
          <input 
            className="form-control"
            value={ selectedImageName} // Use selectedImageName instead of image
            onChange={(e) => setSelectedImageName(e.target.value)}
          />
        </div>
        <div>
      <input type="file" accept="image/*" onChange={handleFileChange} />
      <button onClick={handleUpload}>Upload Image</button>
    </div>
    <div className="row">
        <div className="col-sm-6">
          <div className="btn-group">
            {/* ... (your other buttons) */}
            {/* Button to delete the selected image */}
            <button className="btn btn-danger m-1" onClick={handleDeleteImage}>
              DELETE Image
            </button>
          </div>
        </div>
      </div>
        <div className="form-group">
          {/* Textarea for Heading */}
          <label>Heading:</label>
          <textarea
            className="form-control"
            value={heading}
            onChange={(e) => setHeading(e.target.value)}
          />
        </div>
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
      <div>
        {/* Confirmation modal */}
        {showConfirmationModal && (
          <div className="modal fade show" style={{ display: 'block' }}>
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
                    onClick={() => {
                      setShowConfirmationModal(false);
                      handleUpdate();
                    }}
                  >
                    Confirm
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default BackHomePage;
