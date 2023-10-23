import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export default function Banner() {
  const [jsonData, setJsonData] = useState({});
  const [images, setImages] = useState("");

  useEffect(() => {
    const apiUrl = "https://eikon-api.onrender.com/imageUploads/home/";

    // Make an HTTP GET request to the backend for JSON data
    axios
      .get(apiUrl)
      .then((response) => {
        const data = response.data;
        console.log("JSON data:", data);
        setJsonData(data[0]);
        const imageName = data[0].section.imageSrc; // Get the image name from the fetched data
        console.log(imageName);
        
        // Make an HTTP GET request to fetch images
        const imageUrl = `https://eikon-api.onrender.com/imageUploads/${imageName}`;
        setImages(imageUrl);
      })
      .catch((error) => {
        console.error("Error fetching JSON data:", error);
      });
  }, []); // Include [] as the dependency array to run the effect only once

  return (
    <div>
      <section>
        <div className="w-100 float-left banner-con text-xl-left text-lg-left text-center header-and-banner-con banner-overlay-img">
          <div className="container">
            <div className="row">
              <div className="col-lg-6 order-xl-0 order-lg-0 order-2">
                <div className="banner-left-con">
                  <figure className="mb-0">
                    <img
                      src={images}
                      alt="banner-left-img"
                      className="img-fluid banner-left-img"
                    />
                  </figure>
                </div>
              </div>
              <div className="col-lg-6">
                <div className="banner-right-content text-white">
                  <h5 style={{ color: "#00bcad" }}>
                    {jsonData.section?.title}
                  </h5>
                  <h1 className="banner_headingh1">
                    {jsonData.section?.heading}
                  </h1>

                  <p className="text-white col-lg-10 col-md-9 ml-xl-0 mr-xl-0 ml-lg-0 mr-lg-0 ml-auto mr-auto pl-0 pr-0">
                    {jsonData.section?.description}
                  </p>
                  <Link to="/about" className="appointment-btn">
                    Read More
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}