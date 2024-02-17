import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { auth } from "../firebase";
import { getCardList } from "../components/store/actions/card";
import { MdCheckBoxOutlineBlank } from "react-icons/md";
import { IoCheckbox } from "react-icons/io5";

function Userlist() {
  const dispatch = useDispatch();
  const userList = useSelector((state) => state.card.userList);
  const [isTouched, setIsTouched] = useState(false);
  const [selectedItems, setSelectedItems] = useState([]);
  const [dimensions, setDimensions] = useState({
    width: window.innerWidth / 2,
    height: window.innerHeight,
  });

  useEffect(() => {
    const handleResize = () => {
      setDimensions({
        width: window.innerWidth / 2,
        height: window.innerHeight,
      });
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        dispatch(getCardList("", user.uid));
      }
    });

    return () => unsubscribe();
  }, [dispatch]);

  const handleOnClick = (item) => {
    const selectedIndex = selectedItems.indexOf(item);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = [...selectedItems, item];
    } else {
      newSelected = selectedItems.filter(
        (selectedItem) => selectedItem !== item
      );
    }

    setSelectedItems(newSelected);
  };

  const handleTouchStart = () => {
    setIsTouched(true);
  };

  const handleTouchEnd = () => {
    setIsTouched(false);
  };

  return (
    <div style={{ display: "flex" }}>
      <div
        style={{
          width: dimensions.width,
          backgroundColor: "pink",
          height: dimensions.height,
        }}
      ></div>
      <div
        style={{
          width: dimensions.width,
          backgroundColor: "blue",
          height: dimensions.height,
        }}
      >
        {userList.map((item, index) => (
          <div
            className={`touchable ${isTouched ? "touched" : ""}`}
            style={{
              paddingTop: "10px",
              scroll: "true",
              paddingLeft: "10px",
              paddingRight: "10px",
            }}
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
            onClick={() => handleOnClick(item)}
            key={index}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                backgroundColor: selectedItems.includes(item)
                  ? "lightblue"
                  : "white",
                borderRadius: "10px",
                padding: "10px", // Add padding to the container
              }}
            >
              <img
                src={item.profile}
                alt="Profile"
                style={{
                  borderRadius: "50%",
                  width: "50px", // Adjust width and height as needed
                  height: "50px",
                  marginRight: "10px", // Add margin to the right for spacing
                }}
              />
              <div style={{ flex: 1 }}>
                <div
                  style={{
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap", // Ensure text does not wrap
                  }}
                >
                  {item.name}
                </div>
                <div
                  style={{
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                  }}
                >
                  {item.email}
                </div>
              </div>
              {selectedItems.includes(item) ? (
                <IoCheckbox /> // Show checkbox if item is selected
              ) : (
                <MdCheckBoxOutlineBlank /> // Show blank checkbox if item is not selected
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Userlist;
