import "./MeetupList.css";
import React from "react";
import Meetupitem from "./Meetupitem";
function MeetupList(props) {
  return (
    <ul className="list">
      <div
        style={{
          flex: 1,
          backgroundColor: "pink",
          height: 20,
          marginTop: 10,
        }}
      >
        gdjgvfdsg
      </div>
      {props.meetups.map((mup) => (
        <Meetupitem
          key={mup.id}
          id={mup.id}
          image={mup.image}
          title={mup.title}
          address={mup.address}
          description={mup.description}
        />
      ))}
    </ul>
  );
}

export default MeetupList;
