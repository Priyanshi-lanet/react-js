import * as Actions from "./chat-context";
import { UserAuth } from "../../../context/AuthContext";

const initialState = {
  chatId: "",
  user: {},
};

const chatReducer = (state = initialState, action) => {
  const { user } = UserAuth();
  console.log("userr", user);
  switch (action.type) {
    case "CHANGE_USER":
      return {
        user: action.payload,
        chatId:
          user.uid > action.payload.data.id
            ? user.uid + action.payload.data.id
            : action.payload.data.id + user.uid,
      };

    default:
      return state;
  }
};
export default chatReducer;
