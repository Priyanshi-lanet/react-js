import React, { useContext } from "react";
import "./MainNavigator.css";
import { Link, useLocation } from "react-router-dom";
import FavouriteContext from "../store/fav-context";

function MainNavigation() {
  const location = useLocation();
  const favCtx = useContext(FavouriteContext);

  // Check if the current route is not the home or sign-up page
  const showNavigation =
    location.pathname !== "/" && location.pathname !== "/sign-up";

  return (
    showNavigation && (
      <header className="header">
        <div className="logo">Voyage chronicle</div>
        <nav>
          <ul>
            <li>
              <Link className="header2" to="/all-meetup">
                Meetups
              </Link>
            </li>
            <li>
              <Link className="header2" to="/new-meetup">
                New Meetup
              </Link>
            </li>
            <li>
              <Link className="header2" to="/favourite">
                Favourite<span className="badge">{favCtx.totalFavourite}</span>
              </Link>
            </li>
          </ul>
        </nav>
      </header>
    )
  );
}

export default MainNavigation;
