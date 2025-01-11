import { Outlet } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import React from "react";


function App() {
  return ( 
    <div>
      <main>
        <Outlet /> 
      </main>
    </div>
  )
}

export default App;
