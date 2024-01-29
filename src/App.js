import { BrowserRouter, Routes, Route } from "react-router-dom";
import AllMeetups from "./Pages/AllMeetups";
import NewMeetup from "./Pages/NewMeetup";
import Favourites from "./Pages/Favourites";
import MainNavigatation from "./components/layout/MainNavigatation";

function App() {
  return (
    <div>
      <BrowserRouter>
        <MainNavigatation />
        <Routes>
          <Route path="/" exact element={<AllMeetups />} />
          <Route path="/new-meetup" element={<NewMeetup />} />
          <Route path="/favourite" element={<Favourites />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
