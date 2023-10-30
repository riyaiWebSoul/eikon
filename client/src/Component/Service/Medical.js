import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function Medical() {
   
  const[data,setData]=useState([])

  useEffect(() => {
    const apiUrl = 'https://eikon-api.onrender.com/medical/';

    // Make an HTTP GET request to the backend
    axios
      .get(apiUrl)
      .then((response) => {
        
        setData(response.data[0].MedicalPage.section2)
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []);

  return (
    <div>
      <section>
        <div className="w-100 float-left py-5 quality-system-con">
        <div className="container">
            {data.map((item, index) => (
              <div className="row" key={index}>
                <div className="col-lg-6 col-md-6">
                  <div className=" position-relative text-center">
                    <figure className="mb-4">
                      <img src={`https://eikon-api.onrender.com/imageUploads/${item.Image}`} alt="quality-system-img" className="img-fluid human-img" />
                    </figure>
                  </div>
                </div>
                <div className="col-lg-6 col-md-6 d-flex align-items-center">
                  <div className="quality-system-left-con">
                    <p className='mb-2'>{item.description}</p>
                    <p className=''>{item.subDescription}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
