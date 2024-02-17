import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { auth } from "../firebase";
import { getCardList } from "../components/store/actions/card";

function Userlist() {
  const dispatch = useDispatch();
  useEffect(() => {
    // setLoading(true);
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        dispatch(getCardList("", user.uid));
      } else {
      }
    });
    // setLoading(false);
    return () => unsubscribe();
  }, []);

  const userList = useSelector((state) => state.card.userList);
  const numRows = Math.ceil(userList.length / 3); // Calculate number of rows needed
  const containerHeight = numRows * 50 + 20 * (numRows - 1);
  return (
    <div
      style={{
        color: "white",
        display: "flex",
        flexWrap: "wrap",

        height: `${containerHeight}px`, // Set height dynamically
        width: "90%",
      }}
    >
      {userList.map((meetup, index) => (
        <div
          key={meetup.id}
          style={{
            width: "30%",
            height: "50%",
            margin: "10px",
            padding: "10px",
            border: "1px solid #ccc",
            borderRadius: "5px",
            flex: 1,
            flexDirection: "row",
            backgroundColor: "grey",
          }}
        >
          <div style={{ flex: "row" }}>
            <img
              src={meetup.profile}
              alt="Profile"
              style={{ borderRadius: "50%", width: "30%", height: "80%" }}
            />

            <div>
              <div>Name: {meetup.name}</div>
              <div>Email: {meetup.email}</div>
            </div>
          </div>
          {/* <button onClick={() => handleOnClick(meetup)}>Click</button> */}
        </div>
      ))}
    </div>
  );
}
export default Userlist;
