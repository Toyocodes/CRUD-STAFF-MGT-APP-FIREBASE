import { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import './Navbar.css';


const Navbar = () => {
  const [activeTab, setActiveTab] = useState("Home");
  
  const location = useLocation(); //to activate active page when I navigate

  const [search, setSearch] = useState("");

  const navigate = useNavigate()

  useEffect(() => {
    if (location.pathname === "/") {
      setActiveTab("Home");
    } else if (location.pathname === "/add") {
      setActiveTab("AddContact");
    } else if (location.pathname === "/about") {
      setActiveTab("About");
    }
  }, [location.pathname]);

  const handleSubmit =(e)=>{
    e.preventDefault();
    navigate(`/search?name=${search}`)
    setSearch("")
  }

  return (
    <div className="header">
      <Link to="/">
        <p className="logo">Contact App</p>
      </Link>

      <div className="header-right">
        
        <div className='navlinks'>
          <Link to="/home">
            <p
              className={`${activeTab === "Home" ? "active" : ""}`}
              onClick={() => setActiveTab("Home")}
            >
              Home
            </p>
          </Link>
          <Link to="/add">
            <p
              className={`${activeTab === "AddContact" ? "active" : ""}`}
              onClick={() => setActiveTab("AddContact")}
            >
              Add Contact
            </p>
          </Link>
          {/* <Link to="/about">
            <p
              className={`${activeTab === "About" ? "active" : ""}`}
              onClick={() => setActiveTab("About")}
            >
              About
            </p>
          </Link> */}
        </div>
        <form onSubmit={handleSubmit} >
          <input type='text' 
          placeholder='Search Name...'
          className='inputField'
          onChange={(e)=>setSearch(e.target.value)}
          value={search}/>
        </form>
      </div>
    </div>
  );
};

export default Navbar;
