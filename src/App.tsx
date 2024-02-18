import { Route, Routes } from "react-router-dom";
import Header from "./Components/Header";
import "./styles.scss";
import HomePage from "./Pages/Home";
import PeoplePage from "./Pages/People";
import BloodTypePage from "./Pages/BloodType";
import CollectPointsPage from "./Pages/CollectPoints";
import DonationsPage from "./Pages/Donations";

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" Component={HomePage} />
        <Route path="/peoples" Component={PeoplePage} />
        <Route path="/blood-type" Component={BloodTypePage} />
        <Route path="/collect-points" Component={CollectPointsPage} />
        <Route path="/donations" Component={DonationsPage} />
      </Routes>
    </>
  )
}

export default App
