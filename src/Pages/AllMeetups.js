import React, { useState, useEffect } from "react";
import MeetupList from "../components/meetups/MeetupList";

function AllMeetups() {
  const [Loading, setLoading] = useState(false);
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

  if (Loading) {
    return (
      <section>
        <p>Loading....</p>
      </section>
    );
  }
  return (
    <div>
      <MeetupList meetups={loadedMeetups} />
    </div>
  );
}
export default AllMeetups;
