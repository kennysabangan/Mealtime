import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import "mdb-ui-kit";
import "./index.css";
import LoginRegistration from "./views/LoginRegistration";
import Dashboard from "./views/Dashboard";
import GeneratedMeals from "./views/GeneratedMeals";
import ProfileCard from "./views/ProfileCard";
import OneRecipe from "./views/OneRecipe";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginRegistration />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/meals" element={<GeneratedMeals />} />
        <Route path="/onerecipe" element={<OneRecipe />} />
        <Route path="/profile" element={<ProfileCard />} />
      </Routes>
      <Toaster />
    </BrowserRouter>
  );
}

export default App;
