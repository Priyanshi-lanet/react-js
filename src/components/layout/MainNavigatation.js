import React, { useContext } from "react";
import "./MainNavigator.css";
import { Link } from "react-router-dom";
import FavouriteContext from "../store/fav-context";

function MainNavigatation() {
  const favCtx = useContext(FavouriteContext);
  return (
    <header className="header">
      <div className="logo">ReactMeet Hooks</div>
      <nav>
        <ul>
          <Link className="header2" to="/all-meetup">
            Meetups
          </Link>

          <Link className="header2" to="/new-meetup">
            New Meetup
          </Link>
          <Link className="header2" to="/favourite">
            Favourite<span className="badge">{favCtx.totalFavourite}</span>
          </Link>
        </ul>
      </nav>
    </header>
  );
}
export default MainNavigatation;
