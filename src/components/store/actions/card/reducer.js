import * as Actions from "./card-context";

const initialState = {
  cardList: [],
  totalCard: 0,
  userList: [],
};
const cardReducer = (state = initialState, action) => {
  switch (action.type) {
    case Actions.GET_CARD_LIST: {
      return {
        ...state,
        cardList: action.payload,
        totalCard: action.payload.length,
      };
    }
    case Actions.GET_USER_LIST: {
      return {
        ...state,
        userList: action.payload,
        totalList: action.payload.length,
      };
    }
    default: {
      return state;
    }
  }
};
export default cardReducer;
