import React, { useState ,useEffect} from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";


function BackFooter() {
 
  const [responseData, setResponseData] = useState(null);
  const [id, setId] = useState("");
  const [title, setTitle] = useState("");
  const [email, setEmail] = useState("");
  const [number, setNumber] = useState("");
  const [address, setAddress] = useState([]);
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);

  const handleGet = async () => {
    try {
      const response = await axios.get(
        `https://eikon-api.onrender.com/footer/6516a3de9043681689488233`
      ); // Include the ID in the URL
      const data = response.data;
      setResponseData(data);
      setTitle(data.rightSection.title);     
      setEmail(data.section.email);
      setNumber(data.section.phone);
      setAddress(data.section.Address);
    } catch (error) {
      console.error("Error making GET request:", error);
      
    }
  };

  const openConfirmationModal = async () => {
    setShowConfirmationModal(true);
  };
  const handleUpdate = async () => {
    try {
      const response = await axios.patch(
        `http://localhost:8080/footer/6516a3de9043681689488233`,
        {
          rightSection: {
            title: title,
          },
          section: {
            email: email,
            phone: number,
            Address: address,
          },
       }
      );

      setResponseData(response.data);
    } catch (error) {
      console.error("Error making PATCH request:", error);
    }
  };
  useEffect(()=>{
    handleGet()
  },[])
  return (
    <div className="container">
      <h2 className=" p-5 text-center"> Footer page </h2>
      <div className="row ">
      
        <div className="col-sm-6">
          <div className="btn-group  ">
          
           
           

            <button
              className="btn btn-success m-1"
              onClick={openConfirmationModal}
            >
              UPDATE
            </button>
            
          </div>
        </div>
      </div>
      <br />

      <div className="z-0" style={{ display: "block", zIndex: 1 }}>
        <h3>Edit Data:</h3>
        <div>
          <label>RightSection Title Text:</label>
          <input
            className="form-control"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div>
          <label>Number</label>
          <textarea
            className="form-control"
            value={number}
            onChange={(e) => setNumber(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label>Email id ckeck:</label>
          <textarea
            className="form-control"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label>Address:</label>
          <textarea
            className="form-control"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
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

export default BackFooter;
