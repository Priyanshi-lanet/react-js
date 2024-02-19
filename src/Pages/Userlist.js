import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { auth } from "../firebase";
import { getCardList, getGroupList } from "../components/store/actions/card";
import { UserAuth } from "../components/context/AuthContext";
import UserList from "../components/commonComponent/UserList";
import "./Userlist.css";
// import { userDetails } from "../components/commonComponent/userDetails";

function Userlist() {
  const dispatch = useDispatch();
  const { BuildCoalition, user } = UserAuth();

  const userList = useSelector((state) => state.card.userList);
  const groupList = useSelector((state) => state.card.groupList);
  const [showUserList, setshowUserList] = useState(false);
  const [isTouched, setIsTouched] = useState(false);
  const [selectedItems, setSelectedItems] = useState([]);
  const [dimensions, setDimensions] = useState({
    width: window.innerWidth / 2,
    // height: window.innerHeight,
  });
  const [groupName, setGroupName] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setDimensions({
        width: window.innerWidth / 2,
        // height: window.innerHeight,
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
        dispatch(getGroupList("", user.uid));
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
    // dispatch(collectGroupInfo(selectedItems, groupName));
    await BuildCoalition(selectedItems, groupName);

    setSelectedItems([]);
    setGroupName("");

    setIsModalOpen(false);
  };

  const openModal = () => {
    setshowUserList((v) => !v);
  };
  const createGroup = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };
  const [selectedGroup, setSelectedGroup] = useState(null);

  const handleCardClick = (group) => {
    setSelectedGroup(group);
  };
  const getGroup = (obj) => {
    setSelectedGroup(obj);
  };
  return (
    <div style={{ display: "flex" }}>
      <div
        style={{
          width: dimensions.width,
          backgroundColor: "white",
          // height: dimensions.height,
          backgroundColor: "#242B42",
        }}
      >
        {/* for group */}
        <div style={{ borderRadius: "12px" }}>
          {groupList.map((groupObj) => {
            return (
              <>
                {Object.values(groupObj).map((group, index) => (
                  <>
                    {index === 0 && ( // Check if it's the first index
                      <div
                        className="card"
                        style={{
                          backgroundColor: "#2E3650",
                          flex: 1,
                          alignItems: "center",
                          display: "flex",
                          fontFamily: "roboto",
                          fontSize: "20px",
                          justifyContent: "center",
                          color: "#7F88A9",
                        }}
                        onClick={openModal}
                      >
                        + Create group
                      </div>
                    )}
                    {group.group_Name && (
                      <div
                        style={{ backgroundColor: "#2E3650", color: "#7F88A9" }}
                        className="card"
                        onClick={() => {
                          getGroup(group);
                        }}
                        key={group.group_Name}
                      >
                        <h2
                          style={{
                            fontFamily: "roboto",
                            fontSize: "15px",
                            overflow: "hidden",
                            // borderRadius: "15px",
                            borderWidth: "1px",
                            borderColor: "black",
                            fontWeight: "bold",
                            color: "#B1B9D8",
                          }}
                        >
                          {group.group_Name}
                        </h2>
                        <h2
                          style={{
                            fontFamily: "roboto",
                            fontSize: "10px",
                            overflow: "hidden",
                            color: "#7F88A9",
                          }}
                        >
                          {"total member : " + group?.group_List?.length}
                        </h2>
                      </div>
                    )}
                  </>
                ))}
              </>
            );
          })}
        </div>
      </div>

      <div
        style={{
          width: dimensions.width,
          backgroundColor: "#242B42",
          height: dimensions.height,
        }}
      >
        {/* // for users */}
        {showUserList ? (
          <UserList
            userList={userList}
            selectedItems={selectedItems}
            isTouched={true} // Example value, you can change it as needed
            handleTouchStart={handleTouchStart}
            handleTouchEnd={handleTouchEnd}
            handleOnClick={handleOnClick}
            craetegroup={createGroup}
          />
        ) : (
          <div style={{ marginTop: "150px" }}>
            {selectedGroup && (
              <h2 style={{ marginLeft: "10px", color: "#B1B9D8" }}>
                Associated user
              </h2>
            )}
            {selectedGroup &&
              selectedGroup.group_List.map((i, index) => (
                <>
                  <h2 style={{ color: "#7F88A9", marginLeft: "10px" }}>
                    {i.name}
                  </h2>
                  <div
                    className="email-card"
                    style={{
                      padding: "10px",
                      marginTop: "10px",
                      borderRadius: "8px",
                      borderWidth: "1px",
                      marginLeft: "10px",
                      color: "#7F88A9",
                    }}
                  >
                    {i.email}
                  </div>
                </>
              ))}
          </div>
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
