import React, { useState,useEffect } from 'react'
import pdf1 from '../assets/images/IDEATOR.pdf'
import pdf2 from '../assets/images/IDEATOR-FP (1).pdf'
import pdf3 from '../assets/images/iDEATOR-DWS.pdf'
import { Link } from 'react-router-dom'
import axios from 'axios'

export default function Navbar() {
   const [jsonData, setJsonData] = useState([]);
   const[logoImages,setLogoImages]=useState([])

   const handleGet = async () => {
      try {
        const response = await axios.get('https://eikon-api.onrender.com/portfolio/653b54e7e507da41183ec74d');
 
        setLogoImages(response.data.logos[0].logoImages);
      } catch (error) {
        console.error('Error making GET request:', error);
        // Handle errors here.
      }
    };
console.log(logoImages)
   useEffect(() => {
      const apiUrl = 'https://eikon-api.onrender.com/footer/';
      // Make an HTTP GET request to the backend
      axios
        .get(apiUrl)
        .then((response) => {
          setJsonData(...response.data);
        
        })
        .catch((error) => {
          console.error('Error fetching data:', error);
        });
        handleGet()
    }, []);

  return (
    <div>
        {/*  <!-- navbar-start --> */}
        <nav className="navbar navbar-expand-lg navbar-light">
                  <Link className="navbar-brand" to="/">
                     {logoImages.map((imgSrc, index) => (
                        <img src={`https://eikon-api.onrender.com/imageUploads/${imgSrc}`}  width={'100%'}
                  alt={`${index + 1}`}      
                  style={{ cursor: 'pointer' }} />
    
                ))}
                     </Link>
                  <button className="navbar-toggler p-0 collapsed" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                  <span className="navbar-toggler-icon"></span>
                  <span className="navbar-toggler-icon"></span>
                  <span className="navbar-toggler-icon"></span>
                  </button>                     
                  <div className="collapse navbar-collapse" id="navbarSupportedContent">
                     <ul className="navbar-nav ml-auto mr-auto">
                        <li className="nav-item active ">
                           <Link className="nav-link p-0 text-white" to="/">Home<span className="sr-only">(current)</span></Link>
                        </li>
                        <li className="nav-item">
                           <Link className="nav-link p-0 text-white" to="/about">About Us</Link>
                        </li>
                        <li className="nav-item dropdown pr-lg-0">
                           <Link className="nav-link dropdown-toggle p-0 text-white"  id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                           Services
                           </Link>
                           <div className="dropdown-menu p-0" aria-labelledby="navbarDropdown">
                              <Link className="dropdown-item" to="/medical">Medical</Link>
                              <Link className="dropdown-item" to="/maping-ecommerce">Maping ecommerce</Link>
                           </div>
                         </li>

                         <li className="nav-item dropdown pr-lg-0">
                           <Link className="nav-link dropdown-toggle p-0 text-white"  id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                           Product
                           </Link>
                           <div className="dropdown-menu p-0" aria-labelledby="navbarDropdown">
                           <Link className="dropdown-item" target='_blank' to={pdf1} >iDEATOR</Link>
                              <Link className="dropdown-item" target='_blank' to={pdf2} >iDEATOR-FP</Link>
                              <Link className="dropdown-item" target='_blank'  to={pdf3}>iDEATOR-DWS</Link>
                           </div>
                         </li>
                      
                   

                         <li className="nav-item">
                           <Link className="nav-link p-0 text-white" to="/Contact" > Contact Us </Link>
                        </li>
                     </ul>
                     <Link to="tel:9654370277" target='_blank' className="navbar-btn text-white">
                     <i className="fas fa-phone-volume"></i>
                     +91 {jsonData.section?.phone}
                     </Link>
                  </div>
               </nav>
               {/*  <!-- navbar-end --> */}
    </div>
  )
}
