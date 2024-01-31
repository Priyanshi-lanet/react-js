import React, { useContext, useEffect, useState } from "react";
import "./MainNavigator.css";
import { Link, useLocation } from "react-router-dom";
import FavouriteContext from "../store/fav-context";
import { FaEquals } from "react-icons/fa";
import { IoClose } from "react-icons/io5";

function MainNavigation() {
  const [activeLink, setActiveLink] = useState(""); // State variable to track active link
  const [color, setColor] = useState("White");

  useEffect(() => {
    function handleResize() {
      if (window.innerWidth < 960) {
        setColor("grey");
      } else {
        setColor("White");
      }
    }

    window.addEventListener("resize", handleResize);

    // Initial call to set color based on window width
    handleResize();

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const location = useLocation();
  const favCtx = useContext(FavouriteContext);

  const handleMouseEnter = () => {
    setColor("grey");
  };

  const handleMouseLeave = () => {
    setColor("White");
  };
  console.log("color", color);
  const showNavigation =
    location.pathname !== "/" && location.pathname !== "/sign-up";
  return (
    showNavigation && (
      <header className="header">
        <nav style={{ height: "50px", marginTop: "50px" }}>
          <ul>
            <li
              style={{
                color: color,
                height: "50px",
              }}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              <Link
                // className="header2"
                to="/all-meetup"
                onClick={() => setActiveLink("all-meetup")}
              >
                Meetups
              </Link>
            </li>
            <li>
              <Link
                className="a"
                to="/new-meetup"
                style={{
                  color: color,
                }}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                onClick={() => setActiveLink("new-meetup")}
              >
                New Meetup
              </Link>
            </li>
            <li>
              <Link
                // className="header2"
                to="/favourite"
                style={{
                  color: color,
                }}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                onClick={() => setActiveLink("favourite")}
              >
                Favourite
                <span className="badge">{favCtx.totalFavourite}</span>
              </Link>
            </li>
          </ul>
        </nav>
      </header>
    )
  );
}

export default MainNavigation;
