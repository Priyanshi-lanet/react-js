import React, { useContext } from "react";
import FavouriteContext from "../components/store/actions/fav-context";
import Meetupitem from "../components/meetups/Meetupitem";
function Favourites() {
  const favCtx = useContext(FavouriteContext);
  let context;
  if (favCtx.totalFavourite === 0) {
    context = <p>you got no favourites yet.Start adding some?</p>;
  } else {
    context = favCtx.favoutite.map((item) => (
      <Meetupitem key={item.id} data={item} />
    ));
  }
  return (
    <section>
      <h1>My favourite</h1>
      {context}
    </section>
  );
}
export default Favourites;
