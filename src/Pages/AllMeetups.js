import React, { useState, useEffect } from "react";
import MeetupList from "../components/meetups/MeetupList";
import Loading from "../components/Loader/Loading";
import { UserAuth } from "../components/context/AuthContext";
import { useNavigate } from "react-router-dom";
import { database } from "../firebase";
import { useDispatch, useSelector } from "react-redux";
import { set, ref, remove } from "firebase/database";
import { getCardList } from "../components/store/actions/card";
function AllMeetups() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user, logout } = UserAuth();
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
      await dispatch(getCardList());
      setLoading(false);
    };

    fetchData();
  }, []);

  function onDeleteMeetup(id) {
    const dataRef = database.ref(
      `https://fir-project-f7ce8-default-rtdb.firebaseio.com/meetups/${id}.json`
    );
    remove(ref(database, "/${id}"), {});
    console.log("dataRef", dataRef.toString());
  }
  return (
    <div>
      {loading ? (
        <Loading />
      ) : (
        <>
          <MeetupList meetups={cardDetails} onDeleteMeetup={onDeleteMeetup} />
        </>
      )}
    </div>
  );
}
export default AllMeetups;
