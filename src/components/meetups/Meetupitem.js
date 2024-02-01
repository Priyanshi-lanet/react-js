import React, { useContext } from "react";
import "./Meetupitem.css";
// import "./card.css";
import FavouriteContext from "../store/fav-context";
import { CiEdit } from "react-icons/ci";
import { useNavigate } from "react-router-dom";
import { MdFavorite, MdFavoriteBorder } from "react-icons/md";
import { RiDeleteBin5Line } from "react-icons/ri";

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
        date: props.date,
      });
    }
  }

  const handleClick = (data) => {
    console.log("data", data);
    history("/new-meetup", {
      state: {
        data: data,
        edit: true,
      },
    });
  };
  const handledelete = async (data) => {
    try {
      // await deleteCard(data.id);
    } catch (error) {}
  };
  return (
    <div
      className="card"
      style={{
        padding: 0,
        marginBottom: 0,
        backgroundColor: "black",
        height: "16rem",
        borderWidth: 0.01,
      }}
    >
      <img
        src={props.image}
        style={{ height: "14rem", width: "100%", objectFit: "cover" }}
      />
      <div
        style={{
          flex: 1,
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          scrollPaddingRight: "5px",
        }}
      >
        {/* <div>
          <h1
            style={{
              fontSize: "1rem",
            }}
          >
            {props.title}
          </h1>
        </div> */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div>
            <h2
              className="card-title"
              style={{ marginLeft: "5px", fontSize: "1.2rem" }}
            >
              {props.title}
            </h2>
          </div>
          <div>
            <button
              style={{
                backgroundColor: "black",
                border: "none",
                cursor: "pointer",
              }}
              onClick={toggleStatus}
            >
              {itemISFavourite ? (
                <MdFavorite style={{ stroke: "none", color: "grey" }} />
              ) : (
                <MdFavoriteBorder style={{ stroke: "none", color: "grey" }} />
              )}
              {
                <CiEdit
                  onClick={() => handleClick(props)}
                  style={{ marginLeft: "8", stroke: "none", color: "grey" }}
                />
              }
              <RiDeleteBin5Line
                onClick={() => handledelete(props)}
                style={{ marginLeft: "8", stroke: "none", color: "grey" }}
              />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Meetupitem;
