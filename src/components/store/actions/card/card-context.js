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
  return (dispatch) => {
    fetch("https://fir-project-f7ce8-default-rtdb.firebaseio.com/users.json")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        return response.json();
      })
      .then((data) => {
        const meetups = Object.keys(data).map((key) => ({
          id: key,
          ...data[key],
        }));
        const filtered = meetups.filter((item) => item.id === userId);

        dispatch({
          type: GET_CARD_LIST,
          payload: filtered,
        });
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  };
}
