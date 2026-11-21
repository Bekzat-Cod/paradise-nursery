import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import './Navbar.css';

/**
 * Навигационная панель: показывается на странице растений и в корзине.
 * Счётчик корзины берётся из Redux и обновляется автоматически.
 */
function Navbar() {
  const totalQuantity = useSelector((state) => state.cart.totalQuantity);

  return (
    <nav className="navbar">
      <Link to="/" className="navbar-brand">
        🌿 Paradise Nursery
      </Link>

      <div className="navbar-links">
        <NavLink
          to="/"
          end
          className={({ isActive }) =>
            isActive ? 'navbar-link active' : 'navbar-link'
          }
        >
          Главная
        </NavLink>

        <NavLink
          to="/plants"
          className={({ isActive }) =>
            isActive ? 'navbar-link active' : 'navbar-link'
          }
        >
          Растения
        </NavLink>

        <NavLink
          to="/cart"
          className={({ isActive }) =>
            isActive ? 'navbar-link cart-link active' : 'navbar-link cart-link'
          }
        >
          <span className="cart-icon" aria-hidden="true">
            🛒
          </span>
          Корзина
          <span className="cart-count">{totalQuantity}</span>
        </NavLink>
      </div>
    </nav>
  );
}

export default Navbar;
