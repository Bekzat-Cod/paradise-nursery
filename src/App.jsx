import React from 'react';
import './App.css';
import { BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import AboutUs from './components/AboutUs';
import ProductList from './components/ProductList';
import CartItem from './components/CartItem';

/**
 * Приземлённая страница Paradise Nursery:
 * название компании и кнопка «Начать», ведущая в каталог растений.
 */
function LandingPage() {
  const navigate = useNavigate();

  return (
    <div className="landing-page">
      <div className="landing-content">
        <h1 className="landing-title">Paradise Nursery</h1>
        <p className="landing-subtitle">
          Комнатные растения, которые делают дом живым
        </p>
        <button
          type="button"
          className="get-started-button"
          onClick={() => navigate('/plants')}
        >
          Начать
        </button>
      </div>

      <AboutUs />
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route
          path="/plants"
          element={
            <>
              <Navbar />
              <ProductList />
            </>
          }
        />
        <Route
          path="/cart"
          element={
            <>
              <Navbar />
              <CartItem />
            </>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
