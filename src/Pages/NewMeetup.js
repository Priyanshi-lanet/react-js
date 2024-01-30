import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Newmeetups from "../components/meetups/Newmeetups";
function NewMeetup(props) {
  const location = useLocation();
  console.log("inside MEet Up ::", location);
  const history = useNavigate();

  function addMeetupHandler(meetupData) {
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
      history("/");
    });
  }
  function updateMeetupHandler(updatedMeetupData) {
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
      history("/all-meetup");
    });
  }
  return (
    <section>
      <h1> ADD NEW MEETS</h1>
      <Newmeetups
        onAddMeetup={addMeetupHandler}
        onUpdateMeetup={updateMeetupHandler}
        details={location.state}
        edit={location.state.edit ? true : false}
      />
    </section>
  );
}
export default NewMeetup;
