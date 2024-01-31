import React, { useState, useEffect } from "react";
import MeetupList from "../components/meetups/MeetupList";
import Loading from "../components/Loader/Loading";
import { UserAuth } from "../components/context/AuthContext";
import { useNavigate } from "react-router-dom";
function AllMeetups() {
  const navigate = useNavigate();
  const { user, logout } = UserAuth();
  const handleLogout = async () => {
    try {
      await logout();
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };
  const [loading, setLoading] = useState(false);
  const [loadedMeetups, setloadedMeetups] = useState([]);
  useEffect(() => {
    setLoading(true);
    fetch("https://fir-project-f7ce8-default-rtdb.firebaseio.com/meetups.json")
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        const Meetups = [];
        for (const key in data) {
          const meetup = {
            id: key,
            ...data[key],
          };
          Meetups.push(meetup);
        }
        setLoading(false);
        setloadedMeetups(Meetups);
      });
  }, []);

  return (
    <div>
      {loading ? (
        <Loading />
      ) : (
        <>
          <p style={{ color: "pink" }}>user Email: {user && user.email}</p>
          <button onClick={handleLogout}>Logout</button>
          <MeetupList meetups={loadedMeetups} />
        </>
      )}
    </div>
  );
}
export default AllMeetups;
