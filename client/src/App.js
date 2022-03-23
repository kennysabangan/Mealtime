import { BrowserRouter, Routes, Route } from 'react-router-dom';
import 'mdb-ui-kit';
import './index.css';
import LoginRegistration from './views/LoginRegistration';
import Dashboard from './views/Dashboard';
import { Toaster } from 'react-hot-toast';

function App() {

  return (
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LoginRegistration/>} />
          <Route path="/dashboard" element={<Dashboard/>} />
        </Routes>
        <Toaster/>
      </BrowserRouter>
  );
}

export default App;
