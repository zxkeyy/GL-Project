import { Outlet } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import React from "react";


function App() {
  return ( 
    <div>
      <main>
        <Outlet /> {/* Dynamic rendering of child routes */}
      </main>
    </div>
    
  );
}

export default App;

/*    <Container>
      <Typography variant="h2" gutterBottom>
        Welcome to Vite + Material UI
      </Typography>
      <Button variant="contained" color="primary">
        Get Started
      </Button>
    </Container>*/
