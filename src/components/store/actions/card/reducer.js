import * as Actions from "./card-context";

const initialState = {
  cardList: [],
  totalCard: 0,
  userList: [],
  totalCount: 0,
  totalList: 0,
  groupList: [],
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
    case Actions.CREATE_GROUP: {
      return {
        ...state,
        groupList: [...state.groupList, action.payload],
        totalCount: state.totalCount + 1,
      };
    }
    default: {
      return state;
    }
  }
};
export default cardReducer;
