import "./MeetupList.css";
import React from "react";
import Meetupitem from "./Meetupitem";

function MeetupList(props) {
  return (
    <ul className="list">
      {props.meetups.map((mup) => (
        <Meetupitem
          key={mup.id}
          id={mup.id}
          image={mup.image}
          title={mup.title}
          address={mup.address}
          description={mup.description}
          date={mup.date}
        />
      ))}
    </ul>
  );
}

export default MeetupList;
