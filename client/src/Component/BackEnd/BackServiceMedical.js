import React, { useState,useEffect } from 'react';
import axios from 'axios';



function BackServiceMedical() {

  const [responseData, setResponseData] = useState(null);
  const [id, setId] = useState('');
  const [title, setTitle] = useState('');
  const [subTitle,setSubTitle]=useState('');
  const [description, setDescription] = useState('');
  const[descriptionSub1,setDescriptionSub1]=useState('')
  const[descriptionSub2,setDescriptionSub2]=useState('')
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);

  const handleGet = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/medical/650d8a004a0a2ffd8152e4d3  `); // Include the ID in the URL
      const data = response.data;
      setResponseData(data);
      setTitle(data.MedicalPage.title); // Set the title in the input field
      setDescription(data.MedicalPage.description)
      setSubTitle(data.MedicalPage.section1.title)
      setDescriptionSub1(data.MedicalPage.section2.description)
      setDescriptionSub2(data.MedicalPage.section2.subDescription)
      // Set the description in the input field
      
    } catch (error) {
      console.error('Error making GET request:', error);
      // Handle errors here.
    }
  };


  const openConfirmationModal = async () => {
    setShowConfirmationModal(true);


  };
  const handleUpdate = async () => {
    try {
      const response = await axios.patch(`http://localhost:8080/medical/650d8a004a0a2ffd8152e4d3`, {
        MedicalPage: {
          title:title,
          description:description,
          section1: {
            title:subTitle
          },
          section2: {
          description: descriptionSub1,
            subDescription:descriptionSub2 
          }
        }
       
      });
      setResponseData(response.data);
    } catch (error) {
      console.error('Error making PATCH request:', error);
      // Handle errors here.
    }
  };
  useEffect(()=>{
    handleGet()
  })
  return (
    <div className='container'>
      <h2 className='text-center p-5'> Medical Service </h2>
      <div className="row ">
      
        <div className="col-sm-6">
          <div className="btn-group ">
            {/* <button className="btn btn-primary m-1" onClick={handlePost}>
              POST
            </button> */}
            {/* <button className="btn btn-primary m-1 " onClick={handleGet}>
              GET
            </button> */}
            {/* <button className="btn btn-danger m-1" onClick={handleDelete}>
              DELETE
            </button> */}
            {/* <button className="btn btn-warning m-1" onClick={handlePut}>
              PUT
            </button> */}
            <button className="btn btn-success m-1" onClick={openConfirmationModal}>
              UPDATE
            </button>
            
          </div>
        </div>
      </div>
      <br />
      {responseData && (
        <div>
          <h3>Edit Data:</h3>
          <div>
            <label>Title:</label>
            <input className="form-control"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div>
            <label>Description:</label>
            <textarea className="form-control"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          <div>
            <label>SubTitle:</label>
            <textarea className="form-control"
              value={subTitle}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label>descriptionSub1:</label>
            <textarea className="form-control"
              value={descriptionSub1}
              onChange={(e) => setDescriptionSub1(e.target.value)}
            />
          </div>
          <div>
            <label>descriptionSub2:</label>
            <textarea className="form-control"
              value={descriptionSub2}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
        
         
        </div>
      )}
      {/* {responseData && (
        <div>
          <h3>Response Data:</h3>
          <pre>{JSON.stringify(responseData, null, 2)}</pre>
        </div>
      )} */}
       <div>
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
                <div className="modal-body">
                  Are you sure you want to update?
                </div>
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

export default BackServiceMedical;
