import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import Home from '../../frontend/src/Pages/Home';
import Login from '../../frontend/src/Pages/Login';
import Register from './Pages/Register.js';
import CreateProduct from "./Components/Body/CreateProduct";
import Header from '../../frontend/src/Components/Header/Header';
import "bootstrap/dist/css/bootstrap.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";

function App() {
  const token = localStorage.getItem('token');

  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        
        <Route path="/" exact element={<Home />} />
        <Route path="/create-product" element={<CreateProduct />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
