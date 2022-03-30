import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import "mdb-ui-kit";
import "./index.css";
import LoginRegistration from "./views/LoginRegistration";
import Dashboard from "./views/Dashboard";
import GeneratedMeals from "./views/GeneratedMeals";
import Profile from "./views/Profile";
import OneRecipe from "./views/OneRecipe";
import AddRecipe from "./views/AddRecipe";


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginRegistration />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/meals" element={<GeneratedMeals />} />
        <Route path="/onerecipe/:id" element={<OneRecipe />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/addrecipe" element={<AddRecipe />} />
      </Routes>
      <Toaster />
    </BrowserRouter>
  );
}

export default App;
