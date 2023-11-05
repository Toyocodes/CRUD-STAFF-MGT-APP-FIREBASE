import React, {useContext} from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import "./App.css";
import Home from "./pages/home";
import Login from "./pages/login/Login";
import AddEdit from "./pages/AddEdit";
import View from "./pages/View";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AuthContext } from "./context/AuthContext";

// import Navbar from "./Components/navbar";

function App() {

  const { currentUser } = useContext(AuthContext)

  const RequireAuth = ({children})=>{
    return currentUser ? children : <Navigate to="/"/>
  }
  console.log(currentUser)
  return (
    
      <Router>
        <div className="App">
     
      <ToastContainer position="top-right"/>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/home" element={<RequireAuth><Home /></RequireAuth>} />
          <Route path="/add" element={<AddEdit />} />
          <Route path="/update/:id" element={<AddEdit />}/>
          <Route path="/view/:id" element={<View />}/>
        </Routes>
        </div>
      </Router>
    
  );
}

export default App;