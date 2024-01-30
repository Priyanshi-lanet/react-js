import React, { useContext } from "react";
import "./Meetupitem.css";
import FavouriteContext from "../store/fav-context";

import { useNavigate } from "react-router-dom";
import { MdFavorite, MdFavoriteBorder } from "react-icons/md";
function Meetupitem(props) {
  const history = useNavigate();

  const favCtx = useContext(FavouriteContext);
  const itemISFavourite = favCtx.itemIsFavourite(props.id);
  function toggleStatus() {
    if (itemISFavourite) {
      favCtx.removeFavourite(props.id);
    } else {
      favCtx.addFavourite({
        id: props.id,
        title: props.title,
        description: props.description,
        image: props.image,
        address: props.address,
      });
    }
  }
  const handleClick = (data) => {
    console.log("dd", data);
    console.log("Div clicked!");
    history("/new-meetup", {
      state: {
        data: data,
        edit: true,
      },
    });
  };
  return (
    <div
      onClick={() => handleClick(props)}
      style={{ backgroundColor: "grey", padding: "10px", borderRadius: "5px" }}
      className="card"
    >
      <img src={props.image} alt="Card" className="card-image" />
      <div className="card-content">
        <div style={{ display: "flex", alignItems: "center" }}>
          <h2 className="card-title">{props.title}</h2>
          <button
            style={{
              backgroundColor: "grey",
              border: "none",
              cursor: "pointer",
            }}
            onClick={toggleStatus}
          >
            {itemISFavourite ? (
              <MdFavorite style={{ stroke: "none", color: "black" }} />
            ) : (
              <MdFavoriteBorder style={{ stroke: "none", color: "black" }} />
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
export default Meetupitem;
