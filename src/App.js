import logo from './logo.svg';
import './App.css';
import Login from './auth/Login';
import Registration from './auth/Registration';
import SearchBox from './auth/SearchBox';
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Dashboard from './Pages/Dashboard';


function App() {
  return (
  <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/registration" element={<Registration />} />
          <Route path="/search" element={<SearchBox />} />
          <Route path="/dashboard" element={<Dashboard />} />

        </Routes>
  </BrowserRouter>
  );
}

export default App;
