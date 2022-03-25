<<<<<<< Updated upstream
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import 'mdb-ui-kit';
import './index.css';
import LoginRegistration from './views/LoginRegistration';
import Dashboard from './views/Dashboard';
import GeneratedMeals from './views/GeneratedMeals';
import ProfileCard from './views/ProfileCard';
=======
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import "mdb-ui-kit";
import "./index.css";
import LoginRegistration from "./views/LoginRegistration";
import Dashboard from "./views/Dashboard";
import GeneratedMeals from "./views/GeneratedMeals";
import OneRecipe from "./views/OneRecipe";
>>>>>>> Stashed changes

function App() {
  return (
<<<<<<< Updated upstream
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LoginRegistration/>} />
          <Route path="/dashboard" element={<Dashboard/>} />
          <Route path="/meals" element={<GeneratedMeals/>} />
          <Route path="/profile" element={<ProfileCard/>} />
        </Routes>
        <Toaster/>
      </BrowserRouter>
=======
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginRegistration />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/meals" element={<GeneratedMeals />} />
        <Route path="/onerecipe" element={<OneRecipe />} />
      </Routes>
      <Toaster />
    </BrowserRouter>
>>>>>>> Stashed changes
  );
}

export default App;
