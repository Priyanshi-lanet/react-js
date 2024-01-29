import React, { useContext } from "react";
import "./Meetupitem.css";
import FavouriteContext from "../store/fav-context";
import { useNavigate } from "react-router-dom";

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
      replace: true,
      state: data,
    });
  };
  return (
    <div
      onClick={() => handleClick(props)}
      style={{ backgroundColor: "pink" }}
      className="card"
    >
      <img src={props.image} alt="Card" className="card-image" />
      <div className="card-content">
        <h2 className="card-title">{props.title}</h2>
        {/* <h2 className="card-description">{props.description}</h2> */}

        {/* <div>
          // <label style={{ color: "pink" }} htmlFor="title">
          //   edit
          // </label>
        </div> */}
        <div className="actions">
          <button className="btnText" onClick={toggleStatus}>
            {itemISFavourite ? "Remove From Favoutrite " : "To Favourite"}
          </button>
        </div>
      </div>
    </div>
  );
}
export default Meetupitem;
