import React from "react";
import { IoCheckbox } from "react-icons/io5";
import { MdCheckBoxOutlineBlank } from "react-icons/md";

function UserList({
  userList,
  selectedItems,
  isTouched,
  handleTouchStart,
  handleTouchEnd,
  handleOnClick,
  craetegroup,
}) {
  return (
    <>
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
                ? "#65749e"
                : "#1A2544",

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
                  whiteSpace: "nowrap",
                  color: "#B1B9D8", // Ensure text does not wrap
                }}
              >
                {item.name}
              </div>
              <div
                style={{
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                  color: "#B1B9D8", // Ensure text does not wrap
                }}
              >
                {item.email}
              </div>
            </div>
            {selectedItems.includes(item) ? (
              <IoCheckbox style={{ color: "#B1B9D8" }} /> // Show checkbox if item is selected
            ) : (
              <MdCheckBoxOutlineBlank style={{ color: "#B1B9D8" }} /> // Show blank checkbox if item is not selected
            )}
          </div>
        </div>
      ))}
      {selectedItems?.length && (
        <div
          style={{
            marginTop: "10px",
            display: "flex",
            flexDirection: "row",
            alignContent: "center",
            justifyContent: "center",
            alignItems: "center",
            borderWidth: "1px",
            borderRadius: "10px",
            borderColor: "black",
            backgroundColor: "#697689",
            padding: "10px",
            marginLeft: "10px",
            marginRight: "10px",
            fontFamily: "roboto",
            fontWeight: "bold",
          }}
          onClick={craetegroup}
        >
          {"Create Group "}
        </div>
      )}
    </>
  );
}

export default UserList;
