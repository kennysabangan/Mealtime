import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import 'mdb-ui-kit';
import './index.css';
import LoginRegistration from './views/LoginRegistration';
import Dashboard from './views/Dashboard';
import GeneratedMeals from './views/GeneratedMeals';

function App() {

  return (
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LoginRegistration/>} />
          <Route path="/dashboard" element={<Dashboard/>} />
          <Route path="/meals" element={<GeneratedMeals/>} />
        </Routes>
        <Toaster/>
      </BrowserRouter>
  );
}

export default App;
