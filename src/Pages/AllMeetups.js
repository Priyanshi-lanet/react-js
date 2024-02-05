import React, { useState, useEffect } from "react";
import MeetupList from "../components/meetups/MeetupList";
import Loading from "../components/Loader/Loading";
import { UserAuth } from "../components/context/AuthContext";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getCardList } from "../components/store/actions/card";
import "../components/layout/MainNavigator.css";
import { CiSearch } from "react-icons/ci";
import { IoMdClose } from "react-icons/io";
import { auth, database } from "../firebase";
import Meetupitem from "../components/meetups/Meetupitem";

function AllMeetups() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user, logout } = UserAuth();
  const [searchTerm, setSearchTerm] = useState("");
  const handleLogout = async () => {
    try {
      await logout();
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };
  const cardDetails = useSelector((state) => state.card.cardList);
  const [loading, setLoading] = useState(false);

  const [userId, setUserId] = useState(null);

  useEffect(() => {
    // Listen for authentication state changes
    const unsubscribe = auth.onAuthStateChanged((user) => {
      console.log("insidee", user.uid);
      if (user) {
        // User is signed in, set the user ID state
        setUserId(user.uid);
        dispatch(getCardList(searchTerm, user.uid));
      } else {
        // User is signed out, clear the user ID state
        setUserId(null);
      }
    });

    // Clean up the subscription
    return () => unsubscribe();
  }, []);
  console.log("cardDetails", JSON.stringify(cardDetails, null, 2));
  const updatedCardDetails = cardDetails.map((item) => {
    const updatedItem = { ...item }; // Create a copy of the object
    Object.keys(item).forEach((key) => {
      if (typeof item[key] === "object" && key !== "id") {
        // Check if the value is an object
        updatedItem[key].id = key; // Assign the key as the id property
      }
    });
    return updatedItem;
  });
  console.log(
    "updatedCardDetails",
    JSON.stringify(updatedCardDetails, null, 2)
  );
  function onDeleteMeetup(id) {}

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };
  const handleClose = () => {
    setSearchTerm("");
  };
  return (
    <div>
      {loading ? (
        <Loading />
      ) : (
        <>
          <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
              paddingBottom: "25px",
            }}
          >
            <div
              style={{
                position: "relative",
                display: "inline-block",
              }}
            >
              <CiSearch className="search-icon" />
              <input
                type="text"
                placeholder="Search title"
                value={searchTerm}
                onChange={handleSearch}
              />
              <IoMdClose className="close-icon" onClick={handleClose} />
            </div>
          </div>
          {updatedCardDetails.map((item) => {
            return Object.values(item).map((obj) => {
              console.log("obj", obj);
              if (typeof obj === "object" && obj.hasOwnProperty("title")) {
                return (
                  <Meetupitem data={obj} />
                  // <p style={{ color: "white" }} key={obj.title}>
                  //   {obj.title}
                  // </p>
                );
              }
              return null;
            });
          })}
          {/* ++=? */}

          {/* <div className="search-container">
            <div
              className="searchin"
              style={{ backgroundColor: "pink", position: "relative" }}
            >
              <CiSearch
                className="search-icon"
                style={{
                  position: "absolute",
                  left: "10px",
                  top: "50%",
                  transform: "translateY(-50%)",
                }}
              />
              <input
                type="text"
                placeholder="Search title"
                value={searchTerm}
                onChange={handleSearch}
              />
              <IoMdClose
                className="close-icon"
                style={{
                  position: "absolute",
                  right: "10px",
                  top: "50%",
                  transform: "translateY(-50%)",
                }}
              />
            </div>
          </div> */}
          {/* <MeetupList
            meetups={cardDetails && cardDetails}
            onDeleteMeetup={onDeleteMeetup}
          /> */}
        </>
      )}
    </div>
  );
}
export default AllMeetups;
