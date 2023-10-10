import React from "react";
import './assets/style.css';
import './assets/mobile.css';
import './assets/super-classes.css';
import Router from "./Router";
// import BackEndRouter from "./Component/BackEnd/BackEndRouter";

function App() {
  // const [backend, setBackend] = useState(false);
  
  // useEffect(() => {
  //   const url = window.location.href;

  //   if (url === "http://localhost:3000/backend" || url==="http://localhost:3000/backHome/backEndDashboard") {
  //     setBackend(true);
  //   }
  // }, []);

  return (
    <div className="App">
      {/* {backend ? <BackEndRouter /> : <Router />} */}
      <Router/>
   
    </div>
  );
}

export default App;
