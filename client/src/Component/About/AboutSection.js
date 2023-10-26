   import React,{useState,useEffect} from 'react'
   import axios from 'axios'
   import img2 from '../../assets/images/run-20221119101612544.png'
  
   export default function AboutSection() {

    
      const[data,setData]=useState([])


      useEffect(() => {
         const apiUrl = 'https://eikon-api.onrender.com/about/';
         axios.get(apiUrl)
         .then((response) => {
            
            setData(response.data[0].mainContant);
         })
         .catch((error) => {
            console.error('Error fetching data:', error);
         });
      }, []);
   return (
      <div>
         <section>
            <div className="w-100 float-left py-5 quality-system-con About_just">
               
                  
                    {data.map((item,index)=>{
                     return(
                        
                        <div className="container">
                           <div className="row">
  <div className="col-lg-6 col-md-6">
                        <div className="quality-system-right-con position-relative text-center">
                         
                           <figure className="mb-4">
                              <img src={`https://eikon-api.onrender.com/imageUploads/${item.Image}`} alt="quality-system-img" className="img-fluid human-img"/>
                           </figure>
                        
                        </div>
                     </div>
                     <div className="col-lg-6 col-md-6 d-flex align-items-center">
                        <div className="quality-system-left-con">
                           
                           <h2  type="text" 
        name="title"> {item.SubTile}
                           </h2>
                           <p className='mb-2'>{item.descriptionSub0}</p>
                           <p className='mb-2'>{item.descriptionSub1}</p>
                           <p className='mb-2'>{item.descriptionSub2}</p>
                           <p className='mb-0'>{item.descriptionSub3}</p>
                           
                           {/* <Link to="#" className="appointment-btn mt-2">Read More</Link> */}
                        </div>
                     </div>
                        </div>
                        </div>
                     )
                    })}

                
                  
                 
               
            </div>
         </section>
      </div>
   )
   }
