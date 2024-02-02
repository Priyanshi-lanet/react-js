import { get, ref } from "firebase/database";
import { database } from "../../../../firebase";
import UniversalToast from "../../../UniversalToast";
import React from "react";

export const SHOW_MESSAGE = "[MESSAGE] SHOW";
export const CHANGE_THEME = "CHANGE_THEME";
export const SET_DEVICE_PERMISSIONS = "SET_DEVICE_PERMISSIONS";
export const CURRENTROUTE = "CURRENTROUTE";
export const CALL_ACTIVE = "CALL_ACTIVE";
export const CALL_DATA = "CALL_DATA";
export const SET_NOTIFICATION_REF = "SET_NOTIFICATION_REF";
export const SET_LOCATION_TRACKING_DATA = "SET_LOCATION_TRACKING_DATA";
export const SET_SINGLE_PERMISSIONS = "SET_SINGLE_PERMISSIONS";
export const GET_CARD_LIST = "GET_CARD_LIST";

export function showMessage(options) {
  global.universalToast.show(
    <UniversalToast
      message={options.message}
      variant={options.variant}
      type={options.type}
      icon={options.icon}
    />,
    2000
  );
  return (dispatch) => {
    dispatch({
      type: SHOW_MESSAGE,
      options,
    });
  };
}
export function getCardList(searchTerm = "", userId) {
  const userRef = ref(database, `users/${userId}`);
  return (dispatch) => {
    get(userRef)
      .then((snapshot) => {
        if (snapshot.exists()) {
          // Convert snapshot data to an array of meetups
          const meetups = Object.keys(snapshot.val()).map((key) => ({
            id: key,
            ...snapshot.val()[key],
          }));

          // Filter data based on search term
          let filteredMeetups = meetups;
          if (searchTerm) {
            filteredMeetups = meetups.filter((meetup) =>
              meetup.title.toLowerCase().includes(searchTerm.toLowerCase())
            );
          }

          dispatch({
            type: GET_CARD_LIST,
            payload: filteredMeetups,
          });
        } else {
          console.log("No data available for the specified user");
        }
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  };
}
