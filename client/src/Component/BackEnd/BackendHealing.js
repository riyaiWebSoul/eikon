import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function BackendHealing() {
  const navigate = useNavigate();
  const handleGoBack = () => {
    navigate('/backHome/backendDashboard/');
  };

  const [responseData, setResponseData] = useState(null);
  const [title, setTitle] = useState('');
  const [cards, setCards] = useState([
    { title: '', count: '' },
    { title: '', count: '' },
    { title: '', count: '' },
  ]);

  const [showConfirmationModal, setShowConfirmationModal] = useState(false);

  useEffect(() => {
    handleGet();
  }, []);

  const handleGet = async () => {
    try {
      const response = await axios.get(`https://eikon-api.onrender.com/healingTouch/6512680bf1696448ae389b12`);
      const data = response.data;
      setResponseData(data);
      setTitle(data.title);
      setCards(data.card);
    } catch (error) {
      console.error('Error making GET request:', error);
    }
  };

  const handleUpdate = async () => {
    try {
      const response = await axios.patch(`http://localhost:8080/healingTouch/6512680bf1696448ae389b12`, {
        title: title,
        card: cards,
      });
      setResponseData(response.data);
    } catch (error) {
      console.error('Error making PATCH request:', error);
    }
  };

  const openConfirmationModal = () => {
    setShowConfirmationModal(true);
  };

  const addNewCard = () => {
    const newCards = [...cards, { title: '', count: '' }];
    setCards(newCards);
  };

  const deleteCard = (index) => {
    const newCards = [...cards];
    newCards.splice(index, 1);
    setCards(newCards);
  };

  return (
    <div className='container'>
      <h2 className=' p-5 text-center'> Healing Touch  </h2>
      <div className='row '>
        <div className='col-sm-6'>
          <div className='btn-group '>
            {/* <button className='btn btn-primary m-1 ' onClick={handleGet}>
              GET
            </button> */}
            <button className='btn btn-success m-1' onClick={openConfirmationModal}>
              UPDATE
            </button>
            {/* <button className='btn btn-gray m-1' onClick={handleGoBack}>
              Back
            </button> */}
          </div>
        </div>
      </div>
      <br />
      <div className='z-0' style={{ display: 'block', zIndex: 1 }}>
        <h3>Edit Data:</h3>
        <div>
          <label>Title:</label>
          <input
            className='form-control'
            type='text'
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        {cards.map((card, index) => (
          <div key={index}>
            <div className='form-group'>
              <label>DescriptionSub {index + 1}:</label>
              <textarea
                className='form-control'
                value={card.title}
                onChange={(e) => {
                  const newCards = [...cards];
                  newCards[index].title = e.target.value;
                  setCards(newCards);
                }}
              />
            </div>
            <div className='form-group'>
              <label>Count:</label>
              <textarea
                className='form-control'
                value={card.count}
                onChange={(e) => {
                  const newCards = [...cards];
                  newCards[index].count = e.target.value;
                  setCards(newCards);
                }}
              />
            </div>
            <button className='btn btn-danger' onClick={() => deleteCard(index)}>
              Delete Card
            </button>
          </div>
        ))}
        <button className='btn btn-primary my-2' onClick={addNewCard}>
          Add New Card
        </button>
      </div>
      <div>
        {showConfirmationModal && (
          <div className='modal fade show ' style={{ display: 'block' }}>
            <div className='modal-dialog modal-dialog-centered'>
              <div className='modal-content bg-warning'>
                <div className='modal-header'>
                  <h5 className='modal-title'>Confirm Update</h5>
                  <button
                    type='button'
                    className='close'
                    onClick={() => setShowConfirmationModal(false)}
                  >
                    <span aria-hidden='true'>&times;</span>
                  </button>
                </div>
                <div className='modal-body'>Are you sure you want to update?</div>
                <div className='modal-footer'>
                  <button
                    type='button'
                    className='btn btn-secondary'
                    onClick={() => setShowConfirmationModal(false)}
                  >
                    Cancel
                  </button>
                  <button
                    type='button'
                    className='btn btn-primary'
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

export default BackendHealing;
