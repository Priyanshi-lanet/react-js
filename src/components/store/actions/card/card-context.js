export const GET_CARD_LIST = "GET_CARD_LIST";
export const GET_USER_LIST = "GET_USER_LIST";
export const CREATE_GROUP = "CREATE_GROUP";

export function getCardList(searchTerm, userId) {
  console.log("insideeee");
  return (dispatch) => {
    fetch("https://reactjs-834f1-default-rtdb.firebaseio.com/users.json")
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
        // console.log("filtered", JSON.stringify(filtered, null, 2));
        // console.log("meetups", JSON.stringify(meetups, null, 2));

        const transformedCardDetails = filtered.map((item) => {
          const newObj = {};
          newObj[item.id] = {
            cards: Object.entries(item)
              .filter(
                ([key]) =>
                  key !== "id" &&
                  key !== "email" &&
                  key !== "name" &&
                  key !== "profile"
              )
              .map(([key, value]) => ({ id: key, ...value })),
            email: item.email,
            name: item.name,
            profile: item.profile,
          };
          return newObj;
        });

        function searchCards(transformedCardDetails, searchTerm) {
          return transformedCardDetails.map((item) => {
            const newObj = {};
            newObj[Object.keys(item)[0]] = {
              cards: item[Object.keys(item)[0]].cards.filter((card) =>
                Object.values(card).some(
                  (value) =>
                    typeof value === "string" &&
                    value.toLowerCase().includes(searchTerm.toLowerCase())
                )
              ),
              email: item[Object.keys(item)[0]].email,
              name: item[Object.keys(item)[0]].name,
              profile: item[Object.keys(item)[0]].profile,
            };
            return newObj;
          });
        }
        const filteredTransformedCardDetails = searchCards(
          transformedCardDetails,
          searchTerm
        );

        dispatch({
          type: GET_CARD_LIST,
          payload: searchTerm?.length
            ? filteredTransformedCardDetails
            : transformedCardDetails,
        });
        dispatch({
          type: GET_USER_LIST,
          payload: meetups,
        });
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  };
}
export function collectGroupInfo(list, name) {
  return (dispatch) => {
    let obj = {
      group_Name: name,
      group_List: list,
    };
    dispatch({
      type: CREATE_GROUP,
      payload: obj,
    });
  };
}
