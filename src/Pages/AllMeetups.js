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
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      await dispatch(getCardList(searchTerm, user.uid));
      setLoading(false);
    };
    fetchData();
  }, [searchTerm, dispatch]);
  console.log(searchTerm);
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
          <MeetupList meetups={cardDetails} onDeleteMeetup={onDeleteMeetup} />
        </>
      )}
    </div>
  );
}
export default AllMeetups;
