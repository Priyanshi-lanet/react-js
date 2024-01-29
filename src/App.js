import { BrowserRouter, Routes, Route } from "react-router-dom";
import AllMeetups from "./Pages/AllMeetups";
import NewMeetup from "./Pages/NewMeetup";
import Favourites from "./Pages/Favourites";
import MainNavigatation from "./components/layout/MainNavigatation";
import Login from "./components/Login/Login";
import SIgnUp from "./components/Login/SignUp";

function App() {
  return (
    <div>
      <BrowserRouter>
        <MainNavigatation />
        <Routes>
          <Route path="/" exact element={<Login />} />
          <Route path="/all-meetup" element={<AllMeetups />} />
          <Route path="/new-meetup" element={<NewMeetup />} />
          <Route path="/sign-up" element={<SIgnUp />} />
          <Route path="/favourite" element={<Favourites />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
