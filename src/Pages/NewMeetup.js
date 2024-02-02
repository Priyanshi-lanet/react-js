import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Newmeetups from "../components/meetups/Newmeetups";
import Loading from "../components/Loader/Loading";
import { auth, database } from "../firebase";
import { push, ref, set } from "firebase/database";
function NewMeetup(props) {
  const [loader, setloader] = useState(false);
  const location = useLocation();
  const history = useNavigate();
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    // Listen for authentication state changes
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        // User is signed in, set the user ID state
        setUserId(user.uid);
      } else {
        // User is signed out, clear the user ID state
        setUserId(null);
      }
    });

    // Clean up the subscription
    return () => unsubscribe();
  }, []);
  const addMeetupHandler = async (meetupData) => {
    try {
      if (!userId) {
        console.error("User is not signed in");
        return;
      }

      // Set data under the user's authentication ID (UUID)
      await push(ref(database, `users/${userId}`), meetupData);

      console.log("Data added successfully");
    } catch (error) {
      console.error("Error adding data:", error.message);
    }
  };
  // function addMeetupHandler(meetupData) {
  //   try {
  //     if (!userId) {
  //       console.error("User is not signed in");
  //       return;
  //     }
  //      await set(ref(database, `users/${userId}`), userData);

  //   } catch (error) {
  //     console.error("User is not signed in");
  //   }

  //   //   try {
  //   //     // Post data with user ID
  //   //     const postData = {
  //   //       userId: userId,
  //   //       // Add other data properties as needed
  //   //     };

  //   //     // Example using push to automatically generate a unique ID for the post
  //   //     const newPostRef = push(ref(database, 'your_data_collection'));
  //   //     await set(newPostRef, postData);

  //   //     console.log('Data posted successfully');
  //   //   } catch (error) {
  //   //     console.error('Error posting data:', error.message);
  //   //   }
  //   // };
  //   //   const token = localStorage.getItem("userToken");
  //   // const userId = localStorage.getItem("userId");

  //   // setloader(true);
  //   // fetch(
  //   //   `https://fir-project-f7ce8-default-rtdb.firebaseio.com/users.json/${userId}.json/?auth=${token}`,
  //   //   {
  //   //     method: "POST",
  //   //     body: JSON.stringify(meetupData),
  //   //     headers: {
  //   //       Authorization: `Bearer ${token}`,
  //   //       "Content-Type": "application/json",
  //   //     },
  //   //   }
  //   // ).then(() => {
  //   //   setloader(false);
  //   //   history("/all-meetup");
  //   // });
  // }
  function updateMeetupHandler(updatedMeetupData) {
    setloader(true);
    fetch(
      `https://fir-project-f7ce8-default-rtdb.firebaseio.com/meetups/${updatedMeetupData.id}.json`,
      {
        method: "PATCH", // or "PUT" if you want to replace the existing data completely
        body: JSON.stringify(updatedMeetupData),
        headers: {
          "Content-Type": "application/json",
        },
      }
    ).then(() => {
      setloader(false);
      history("/all-meetup");
    });
  }

  return (
    <section>
      <h1> ADD NEW MEETS</h1>

      {loader ? (
        <Loading />
      ) : (
        <Newmeetups
          onAddMeetup={addMeetupHandler}
          onUpdateMeetup={updateMeetupHandler}
          details={location.state ? location.state : ""}
          edit={location.state && location.state.edit}
        />
      )}
    </section>
  );
}
export default NewMeetup;
