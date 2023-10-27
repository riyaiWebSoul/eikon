import React, { useState ,useEffect} from 'react'
import axios from 'axios'
import img1 from '../../assets/images/1(7).jpg'
import img2 from '../../assets/images/cervical.PNG'
import img3 from '../../assets/images/Balappa Kurale 1.bmp'
import img4 from '../../assets/images/Balappa Kurale 2.bmp'
import img5 from '../../assets/images/spine.PNG'
import img6 from '../../assets/images/run-20221119100130576.png'
import img7 from '../../assets/images/run-20221119101612544.png'
 

export default function Portfolio() {
    const [activeTab, setActiveTab] = useState('*'); // Default active tab
    const [modalImage, setModalImage] = useState(null);
    const [videos, setVideos] = useState([]);
    const [images, setImages] = useState([]);
    const [newImage, setNewImage] = useState('');
  
    const handleGet = async () => {
      try {
        const response = await axios.get('https://eikon-api.onrender.com/portfolio/653b54e7e507da41183ec74d');
        setVideos(response.data.videos);
        setImages(response.data.images);
      } catch (error) {
        console.error('Error making GET request:', error);
        // Handle errors here.
      }
    };
  
    const openModal = (imgSrc) => {
      setModalImage(imgSrc);
    };
  
    const closeModal = () => {
      setModalImage(null);
    };
    const handleTabClick = (filter) => {
      setActiveTab(filter);
    };
  
    const tabData = [
      { label: 'All', filter: '*' },
      { label: 'Images', filter: '.personal' },
      { label: 'Video', filter: '.corporate' },
    ];
  
    useEffect(()=>{handleGet()},[])
    return (
    
    <div>
       <section>
         <div className="w-100 float-left fun-facts-con">
            <div className="container">
               <div className="row text-xl-left text-lg-left text-center">
                  <div className="col-lg-12">
                     <div className="fun-facts-heading ">
                        <h2 className='text-center'>Gallery
                        </h2>
                     </div>
                     
                    
                  </div>

            <div className='col-12'>
                <ul className="tab-list_portfolio">
                        {tabData.map((tab, index) => (
                        <li
                            key={index}
                            className={activeTab === tab.filter ? 'active' : ''}
                            onClick={() => handleTabClick(tab.filter)}
                        >
                            {tab.label}
                        </li>
                        ))}
                    </ul>
    
            </div>
            
            <div className='col-12'>
                            {/* Render content based on activeTab */}
      <div className="tab-content ">
        {/* Content for All */}
        {activeTab === '*' && <div>
            
            <div className='row gy-4'>
            {images.map((imgSrc, index) => (
                  
                  <div className='col-lg-3 col-md-4 col-12 mt-4' key={index}>
                        <img src={`https://eikon-api.onrender.com/imageUploads/${imgSrc}`}  width={'100%'}
                  alt={`${index + 1}`}
                  onClick={() => openModal(imgSrc)}
                  style={{ cursor: 'pointer' }} />
                    </div>
                    
                ))}
            <div className='col-lg-3 col-md-4 col-12 mt-4'>
            <iframe
                width="100%"
                height="100%"
                src="https://www.youtube.com/embed/Kdzp4GKC2s4"
                title="ANNOTATIONS &amp; MEASUREMENT TOOLS USED DURING SURGERY"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              >
              </iframe>     
               </div>
                {/* Image modal */}
      {modalImage && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content">
            <img src={modalImage} alt="Modal" />
          </div>
        </div>
      )}
            </div>
                            
            </div>}
        {/* video */}
        {activeTab === '.corporate' && <div>

                      <div className='row gy-4'>
               
                      <div className='col-lg-3 col-md-4 col-12 mt-4'>
            <iframe
                width="100%"
                height="250 "
                src="https://www.youtube.com/embed/Kdzp4GKC2s4"
                title="ANNOTATIONS &amp; MEASUREMENT TOOLS USED DURING SURGERY"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              >
              </iframe>     
               </div>
               
            </div>          
                            
            </div>}
        {/*  Personal */}
  {/* Tab content for Personal */}
  {activeTab === '.personal' && (
        <div>
          <div className='row gy-4'>
            {images.map((imgSrc, index) => (
              <div className='col-lg-3 col-md-4 col-12 mt-4' key={index}>
                <img
                  src={`https://eikon-api.onrender.com/imageUploads/${imgSrc}`}
                  width={'100%'}
                  alt={` ${index + 1}`}
                  onClick={() => openModal(imgSrc)}
                  style={{ cursor: 'pointer' }}
                />
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Image modal */}
      {modalImage && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content">
            <img src={modalImage} alt="Modal" />
          </div>
        </div>
      )}

      </div>
            </div>

                  
               </div>
               
            </div>
         </div>
      </section>

      
    

    </div>
  )
}
