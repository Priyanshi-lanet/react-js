import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { auth } from "../firebase";
import {
  collectGroupInfo,
  getCardList,
} from "../components/store/actions/card";
import { MdCheckBoxOutlineBlank } from "react-icons/md";
import { IoCheckbox } from "react-icons/io5";

function Userlist() {
  const dispatch = useDispatch();
  const userList = useSelector((state) => state.card.userList);
  const groupList = useSelector((state) => state.card.groupList);
  console.log("groupList", JSON.stringify(groupList, null, 2));
  const [isTouched, setIsTouched] = useState(false);
  const [selectedItems, setSelectedItems] = useState([]);
  const [dimensions, setDimensions] = useState({
    width: window.innerWidth / 2,
    height: window.innerHeight,
  });
  const [groupName, setGroupName] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

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
      // Item not yet selected, add it to selectedItems
      newSelected = [...selectedItems, item];
    } else {
      // Item already selected, remove it from selectedItems
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

  const handleCreateGroup = async () => {
    dispatch(collectGroupInfo(selectedItems, groupName));
    setSelectedItems([]);
    setGroupName("");

    setIsModalOpen(false);
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div style={{ display: "flex" }}>
      <div
        style={{
          width: dimensions.width,
          backgroundColor: "white",
          height: dimensions.height,
        }}
      ></div>
      <div
        style={{
          width: dimensions.width,
          backgroundColor: "grey",
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
        {selectedItems?.length && (
          <button onClick={openModal}>Create Group</button>
        )}
      </div>
      {isModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={closeModal}>
              &times;
            </span>
            <h2>Create Group</h2>
            <input
              type="text"
              placeholder="Group Name"
              value={groupName}
              onChange={(e) => setGroupName(e.target.value)}
            />
            <button onClick={handleCreateGroup}>Create</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Userlist;
