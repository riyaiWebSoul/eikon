import React, { useState,useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";

function BackAbout() {
 
 
  const [responseData, setResponseData] = useState(null);
  const [id, setId] = useState('');
  const [title, setTitle] = useState('');
  const[SubTile,setSubtitle]=useState('');

  const [description, setDescription] = useState('');
  const [descriptionSub0, setDescriptionSub0] = useState([]);
  const[descriptionSub1,setDescriptionSub1]=useState('')
  const[descriptionSub2,setDescriptionSub2]=useState('')
  const[descriptionSub3,setDescriptionSub3]=useState('')
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);



  const handlePost = async () => {
    // ... (unchanged)
  };

  const handleGet = async () => {
    try {
      const response = await axios.get(`https://eikon-api.onrender.com/about/65167a7585c32c09813f3561`); // Include the ID in the URL
      const data = response.data;
      setResponseData(data);
      setTitle(data.title); // Set the title in the input field
      setDescription(data.description)
      setSubtitle(data.SubTile)
      setDescriptionSub1(data.descriptionSub1)
      setDescriptionSub2(data.descriptionSub2)
      setDescriptionSub3(data.descriptionSub3); // Set the description in the input field
      ; // Set the description in the input field
      setDescriptionSub0(data.descriptionSub0); // Set the DrTeamList
    } catch (error) {
      console.error('Error making GET request:', error);
      // Handle errors here.
    }
  };

  const handleDelete = async () => {
    // ... (unchanged)
  };

useEffect(()=>{
  handleGet()
},[])
  const handlePut = async () => {
    // ... (unchanged)
  };
const  openConfirmationModal=async()=>{
  setShowConfirmationModal(true);}
  const handleUpdate = async () => {
    try {
      const response = await axios.patch(`http://localhost:8080/about/65167a7585c32c09813f3561`, {
        title: title,
        description: description,
        SubTile:SubTile,
        descriptionSub0:descriptionSub0,
        descriptionSub1:descriptionSub1,
        descriptionSub2:descriptionSub2,
        descriptionSub3:descriptionSub3

         // Include any other fields you want to update
      });
      
      setResponseData(response.data);
    } catch (error) {
      console.error('Error making PATCH request:', error);
      // Handle errors here.
    }
  };

  return (
    <div className='container'>
      <h2 className=' p-5 text-center'> About Us </h2>
      <div className="row ">
        
        <div className="col-sm-6">
          <div className="btn-group ">
            
            
           
           
            <button className="btn btn-success m-1" onClick={openConfirmationModal}>
              UPDATE
            </button>
            
          </div>
        </div>
      </div>
      <br />
     
        <div className='z-0' style={{ display: 'block' ,zIndex:1}}>
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
          <div className="form-group">
            <label>subtitle:</label>
            <textarea className="form-control"
              value={SubTile}
              onChange={(e) => setDescriptionSub0(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label>descriptionSub:</label>
            <textarea className="form-control"
              value={descriptionSub0}
              onChange={(e) => setDescriptionSub0(e.target.value)}
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
          <div>
            <label>descriptionSub3:</label>
            <textarea className="form-control"
              value={descriptionSub3}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          
        </div>
     
      {/* {responseData && (
        <div>
          <h3>Response Data:</h3>
          <pre>{JSON.stringify(responseData, null, 2)}</pre>
        </div>
      )} */}
      <div>
      {showConfirmationModal && (
        <div className="modal fade show " style={{ display: 'block' }}>
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

export default BackAbout;
