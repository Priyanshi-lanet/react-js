import { get, ref } from "firebase/database";
import { database } from "../../../../firebase";
import UniversalToast from "../../../UniversalToast";
import React from "react";

export const CHANGE_USER = "CHANGE_USER";

export function getChatdata(user) {
  console.log("user", user);
  return (dispatch) => {
    dispatch({
      type: CHANGE_USER,
      payload: user,
      // : transformedCardDetails,
    });
  };
}
