import React, { useState } from 'react';
import axios from 'axios';

function BackThankYou() {
  const [responseData, setResponseData] = useState(null);
  const [id, setId] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [drTeamList, setDrTeamList] = useState([]);
  const[descriptionSub1,setDescriptionSub1]=useState('')
  const[descriptionSub2,setDescriptionSub2]=useState('')
  const[descriptionSub3,setDescriptionSub3]=useState('')



  const handlePost = async () => {
    // ... (unchanged)
  };

  const handleGet = async () => {
    try {
      const response = await axios.get(`https://eikon-api.onrender.com/Home/${id}`); // Include the ID in the URL
      const data = response.data;
      setResponseData(data);
      setTitle(data.title); // Set the title in the input field
      setDescription(data.description)
      setDescriptionSub1(data.descriptionSub1)
      setDescriptionSub2(data.descriptionSub2)
      setDescriptionSub3(data.descriptionSub3); // Set the description in the input field
      ; // Set the description in the input field
      setDrTeamList(data.DrTeamList); // Set the DrTeamList
    } catch (error) {
      console.error('Error making GET request:', error);
      // Handle errors here.
    }
  };

  const handleDelete = async () => {
    // ... (unchanged)
  };

  const handlePut = async () => {
    // ... (unchanged)
  };

  const handleUpdate = async () => {
    try {
      const response = await axios.patch(`http://localhost:8080/home/${id}`, {
        title: title,
        description: description,
        DrTeamList: drTeamList, // Include any other fields you want to update
      });
      setResponseData(response.data);
    } catch (error) {
      console.error('Error making PATCH request:', error);
      // Handle errors here.
    }
  };

  return (
    <div>
      <h2>Backend code for About Us page </h2>
      <div className="row ">
        <div className="col-sm-6">
          <input
            type="text"
            className="form-control m-1"
            placeholder="Enter ID"
            value={id}
            onChange={(e) => setId(e.target.value)}
          />
        </div>
        <div className="col-sm-6">
          <div className="btn-group ">
            <button className="btn btn-primary m-1" onClick={handlePost}>
              POST
            </button>
            <button className="btn btn-primary m-1 " onClick={handleGet}>
              GET
            </button>
            <button className="btn btn-danger m-1" onClick={handleDelete}>
              DELETE
            </button>
            <button className="btn btn-warning m-1" onClick={handlePut}>
              PUT
            </button>
            <button className="btn btn-success m-1" onClick={handleUpdate}>
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
          {/* <div>
            <label>DrTeamList:</label>
            <input
              type="text"
              value={drTeamList}
              onChange={(e) => setDrTeamList(e.target.value)}
            />
          </div> */}
          {/* Add input fields for other fields here */}
        </div>
      )}
      {responseData && (
        <div>
          <h3>Response Data:</h3>
          <pre>{JSON.stringify(responseData, null, 2)}</pre>
        </div>
      )}
    </div>
  );
}

export default BackThankYou;
