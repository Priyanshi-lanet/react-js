import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { auth } from "../firebase";
import { getCardList } from "../components/store/actions/card";

function Userlist() {
  const dispatch = useDispatch();

  const userList = useSelector((state) => state.card.userList);
  const numRows = Math.ceil(userList.length / 3); // Calculate number of rows needed
  const containerHeight = numRows * 50 + 20 * (numRows - 1);

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

  const handleOnClick = (data) => {
    console.log("data", data);
  };
  return (
    <div
      style={{
        color: "white",
        display: "flex",
        flexWrap: "wrap",
        height: `${containerHeight}px`, // Set height dynamically
        width: "100%",
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
            backgroundColor: "grey",
            display: "flex",
            flexDirection: "column",
          }}
          onClick={() => handleOnClick(meetup)}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              flex: 1,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <img
              src={meetup.profile}
              alt="Profile"
              style={{
                borderRadius: "50%",
                width: "30%",
                height: "60%",
              }}
            />
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                flex: 1,
                marginLeft: "10px",
                overflow: "hidden", // Ensure text does not overflow
              }}
            >
              <div
                style={{
                  flex: 1,
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                }}
              >
                {meetup.name}
              </div>
              <div
                style={{
                  flex: 1,
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                }}
              >
                {meetup.email}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
export default Userlist;
