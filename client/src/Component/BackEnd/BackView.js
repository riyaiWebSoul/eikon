import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";

function BackView() {
  const [responseData, setResponseData] = useState([]);
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);

  useEffect(() => {
    handleGet();
  }, []);

  const handleGet = async () => {
    try {
      const response = await axios.get(`https://eikon-api.onrender.com/enquiry`);
      const data = response.data;
      setResponseData(data);
    } catch (error) {
      console.error('Error making GET request:', error);
      // Handle errors here.
    }
  };

  const handleDelete = async (index) => {
    try {
      const updatedData = [...responseData];
      const checkId = updatedData[index]._id;
      const checkIdString = checkId.toString();

      const response = await axios.delete(`http://localhost:8080/enquiry/${checkIdString}`);

      if (response.status === 200) {
        // Remove the deleted item from updatedData
        updatedData.splice(index, 1);
        setResponseData(updatedData); // Update the state with the updated list
      }
    } catch (error) {
      console.error('Error making DELETE request:', error);
      // Handle errors here.
    }
    handleGet()
  };

  // Rest of your component code...

  return (
    <div className="container">
      <h2 className='text-center p-5'>Enquiry List</h2>
      <div className="row">
        <div className="col-sm-6">
          <div className="btn-group">
            {/* Add any other buttons or UI elements you need */}
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
                <th>Serial Number</th>
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              {responseData.map((entry, index) => (
                <tr key={entry._id}>
                  <td>{index + 1}</td>
                  <td>{entry.name}</td>
                  <td>{entry.email}</td>
                  <td>{entry.phone}</td>
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

      {/* Confirmation modal */}
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
                      // Handle confirmation action if needed
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

export default BackView;
