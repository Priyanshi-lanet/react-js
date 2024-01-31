import "./MeetupList.css";
import React, { useEffect, useState } from "react";
import Meetupitem from "./Meetupitem";

function MeetupList(props) {
  const [color, setColor] = useState("PINK");

  // Define handleMouseEnter and handleMouseLeave functions
  const handleMouseEnter = () => {
    if (window.innerWidth < 960) {
      setColor("RED");
    } else {
      setColor("PINK");
    }
  };

  const handleMouseLeave = () => {
    if (window.innerWidth < 960) {
      setColor("PINK");
    } else {
      setColor("initial"); // Set to whatever initial color you want for larger screens
    }
  };

  useEffect(() => {
    window.addEventListener("resize", handleMouseEnter);

    return () => {
      window.removeEventListener("resize", handleMouseEnter);
    };
  }, []);

  return (
    <ul className="list">
      {/* <div
        style={{ color: color }}
        onMouseEnter={handleMouseEnter} // Use the handleMouseEnter function here
        onMouseLeave={handleMouseLeave} // Use the handleMouseLeave function here
      >
        gdjgvfdsg
      </div> */}
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
