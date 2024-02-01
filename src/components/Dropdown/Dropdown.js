import React, { useRef, useState } from "react";
import "./Dropdown.css";
import { Link, useNavigate } from "react-router-dom";
import { IoMdArrowDropdown } from "react-icons/io";
import { MenuItems } from "./menuitem";
import { UserAuth } from "../context/AuthContext";

function Dropdown({ toggleModal }) {
  const dropdownRef = useRef(null);
  const navigate = useNavigate();
  const { user, logout } = UserAuth();
  const [click, setClick] = useState(false);

  const handleAboutClick = () => {
    toggleModal();
  };
  const toggleDropdoen = () => {
    setClick((v) => !v);
  };
  const handleSignOut = async () => {
    try {
      await logout;
    } catch (error) {
      alert(error);
    }
  };
  console.log("click", click);
  return (
    <div className="dropdown" ref={dropdownRef}>
      <button className="dropbtn" onClick={toggleDropdoen}>
        User
      </button>
      {/* Conditional rendering based on dropdown state */}
      {click && (
        <div>
          <div className="dropdown-links">
            {/* Added a div for flex display */}
            <Link to="/" onClick={handleSignOut}>
              Sign Out
            </Link>{" "}
            {/* Converted button to Link */}
            <Link to="/all-meetup" onClick={handleAboutClick}>
              About Us
            </Link>
            {/* Converted button to Link */}
          </div>
        </div>
      )}
    </div>
    // <div className="dropdown">
    //   <IoMdArrowDropdown
    //     onClick={handleClick} // Change to onClick event
    //     style={{ stroke: "none", color: "black" }}
    //   />

    //   <div className={click ? "dropdown-content active" : "dropdown-content"}>
    //     {/* MenuItems */}
    //     <Link
    //       to="/all-meetup"
    //       onClick={() => setClick(false)}
    //       className="dropdown-item"
    //     >
    //       {MenuItems[0].title}
    //     </Link>
    //     {/* Second item */}
    //     <Link
    //       to={MenuItems[1].path}
    //       onClick={() => {
    //         setClick(false);
    //         handleLogout();
    //       }}
    //       className="dropdown-item"
    //     >
    //       {MenuItems[1].title}
    //     </Link>
    //   </div>
    // </div>
  );
}

export default Dropdown;
