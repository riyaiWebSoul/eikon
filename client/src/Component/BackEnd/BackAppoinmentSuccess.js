import React, { useState, useEffect } from 'react';
import axios from 'axios';


function BackAppointmentSuccess() {
 
  const [responseData, setResponseData] = useState([]);
  const [id, setId] = useState('');
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [comments, setComments] = useState('');
  const [time, setTime] = useState('');
  const [date, setDate] = useState('');
  const [gender, setGender] = useState('');
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);

  useEffect(() => {
    handleGet();
  }, []);




  const handleGet = async () => {
    try {
      const response = await axios.get(`https://eikon-api.onrender.com/appointments`);
      const data = response.data;
      setResponseData(data);
    } catch (error) {
      console.error('Error making GET request:', error);
      // Handle errors here.
    }
  };
  const openConfirmationModal = async () => {
    setShowConfirmationModal(true);
  }
  const handleDelete = async (index) => {
    try {
      const updatedData = [...responseData];
      const checkId = updatedData[index]._id;
      const checkIdString = checkId.toString();
      console.log(checkIdString);
  
      const response = await axios.delete(`http://localhost:8080/appointments/${checkIdString}`);
  
      if (response.status === 200) {
        // Remove the deleted item from updatedData
        updatedData.splice(index, 1);
        setResponseData(updatedData); // Update the state with the updated list
      }
    } catch (error) {
      console.error('Error making DELETE request:', error);
      // Handle errors here.
    }
  };
 

  const handleUpdate = async () => {
    try {
      const updatedData = [...responseData];
      const index = updatedData.findIndex((entry) => entry._id === id);

      if (index !== -1) {
        updatedData[index] = {
          _id: id,
          name: userName,
          email: email,
          phone: phone,
          comments: comments,
          time: time,
          date: date,
          gender: gender,
        };

        setResponseData(updatedData);

        // Perform the PATCH request to the server to update the corresponding entry
        // You can use axios.patch here to update the entry on the server
      }
    } catch (error) {
      console.error('Error making PATCH request:', error);
      // Handle errors here.
    }
  };

  return (
    <div className="container">
      <h2 className='text-center p-5'>Booked Appointments List</h2>
      <div className="row">
        
        <div className="col-sm-6">
          <div className="btn-group">
{/*           
            <button className="btn btn-primary m-1" onClick={handleGet}>
              GET
            </button> */}
            
           
          </div>
        </div>
      </div>
      <br />
      {responseData.length > 0 && (
        <div>
          <h3>Edit Data:</h3>
          <table className="table">
            <thead>
              <tr>
                {/* <th>ID</th> */}
                <th>Serial Number</th>
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Comments</th>
                <th>Time</th>
                <th>Date</th>
                <th>Gender</th>
                {/* <th>Edit</th> */}
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              {responseData.map((entry, index) => (
                <tr key={index}>
                  {/* <td>{entry._id}</td> */}
                  <td>{index + 1}</td>
                  <td>{entry.name}</td>
                  <td>{entry.email}</td>
                  <td>{entry.phone}</td>
                  <td>{entry.comments}</td>
                  <td>{entry.time}</td>
                  <td>{entry.date}</td>
                  <td>{entry.gender}</td>
                
                  <td>
                    <button className="btn btn-danger" onClick={() => handleDelete(index)}>
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          
        </div>
      )}
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

export default BackAppointmentSuccess;
