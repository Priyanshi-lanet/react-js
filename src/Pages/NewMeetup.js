import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Newmeetups from "../components/meetups/Newmeetups";
import Loading from "../components/Loader/Loading";
function NewMeetup(props) {
  const [loader, setloader] = useState(false);
  const location = useLocation();
  const history = useNavigate();

  function addMeetupHandler(meetupData) {
    setloader(true);
    fetch(
      "https://fir-project-f7ce8-default-rtdb.firebaseio.com/meetups.json",
      {
        method: "POST",
        body: JSON.stringify(meetupData),
        headers: {
          "Content-Type": "application/json",
        },
      }
    ).then(() => {
      setloader(false);
      history("/all-meetup");
    });
  }
  function updateMeetupHandler(updatedMeetupData) {
    setloader(true);
    fetch(
      `https://fir-project-f7ce8-default-rtdb.firebaseio.com/meetups/${updatedMeetupData.id}.json`,
      {
        method: "PATCH", // or "PUT" if you want to replace the existing data completely
        body: JSON.stringify(updatedMeetupData),
        headers: {
          "Content-Type": "application/json",
        },
      }
    ).then(() => {
      setloader(false);
      history("/all-meetup");
    });
  }
  return (
    <section>
      <h1> ADD NEW MEETS</h1>

      {loader ? (
        <Loading />
      ) : (
        <Newmeetups
          onAddMeetup={addMeetupHandler}
          onUpdateMeetup={updateMeetupHandler}
          details={location.state ? location.state : ""}
          edit={location.state && location.state.edit}
        />
      )}
    </section>
  );
}
export default NewMeetup;
