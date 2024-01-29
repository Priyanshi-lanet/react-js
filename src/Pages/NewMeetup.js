import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Newmeetups from "../components/meetups/Newmeetups";
function NewMeetup(props) {
  const location = useLocation();
  console.log("inside MEet Up ::", location.state);
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
  return (
    <section>
      <h1> ADD NEW MEETS</h1>
      <Newmeetups onAddMeetup={addMeetupHandler} details={location.state} />
    </section>
  );
}
export default NewMeetup;
