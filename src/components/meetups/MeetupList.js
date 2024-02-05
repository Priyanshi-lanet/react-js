import "./MeetupList.css";
import React from "react";
import Meetupitem from "./Meetupitem";

function MeetupList({ props }) {
  return (
    <ul className="list">
      {props.meetups.map((detail) => {
        const id = detail.id;
        const properties = Object.values(detail).filter(
          (value) => typeof value === "object"
        );

        return properties.map((property, index) => (
          <Meetupitem key={`${id}-${index}`} property={property} />
        ));
      })}

      {/* {Object.values(props.meetups)
        .filter((item) => typeof item === "object")
        .map(
          (item, index) => (
            console.log("mup", JSON.stringify(item.title, null, 2)),
            (
              <Meetupitem
                key={item.index}
                id={item.index}
                image={item.image}
                title={item.title}
                address={item.address}
                description={item.description}

                // onDeleteMeetup={props.onDeleteMeetup}
              />
            )
            // <div key={index}>
            //   <h2>{item.title}</h2>
            //   <p>{item.description}</p>
            //   <a href={item.image} target="_blank" rel="noopener noreferrer">
            //     View Image
            //   </a>
            // </div>
          )
        )} */}
      {/* {props.meetups.map(
        (mup) => (
          console.log("mup", JSON.stringify(mup, null, 2)),
          (
            <Meetupitem
              key={mup.id}
              id={mup.id}
              image={mup.image}
              title={mup.title}
              address={mup.address}
              description={mup.description}

              // onDeleteMeetup={props.onDeleteMeetup}
            />
          )
        )
      )} */}
    </ul>
  );
}

export default MeetupList;
