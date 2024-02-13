import React from "react";
import "./ChatScreen.css";
import { UserAuth } from "../context/AuthContext";

const NavScreen = () => {
  const { user, logout } = UserAuth();
  return (
    <div className="navbar">
      <span className="logo1">Chat Screen</span>
      <div className="user">
        <img src="https://images.unsplash.com/photo-1618355776464-8666794d2520?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" />
        {/* <span>{user && user.email.split("@")[0]}</span> */}
        <button
          variant="contained"
          className="logout"
          style={{ borderRadius: 12 }}
          onClick={async () => {
            await logout;
          }}
        >
          logout
        </button>
      </div>
    </div>
  );
};

export default NavScreen;
