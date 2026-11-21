import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  decrementQuantity,
  incrementQuantity,
  removeFromCart,
} from '../redux/CartSlice';
import './CartItem.css';

const FALLBACK_IMAGE =
  'https://placehold.co/400x400/e8f5e9/2e7d32?text=Plant';

/**
 * Страница корзины покупок.
 */
function CartItem() {
  const dispatch = useDispatch();
  const { items, totalQuantity, totalAmount } = useSelector(
    (state) => state.cart
  );

  const handleCheckout = () => {
    window.alert('Скоро! Оформление заказа появится совсем скоро.');
  };

  if (items.length === 0) {
    return (
      <main className="cart-page">
        <h1 className="cart-title">Корзина покупок</h1>

        <div className="empty-cart">
          <span className="empty-cart-icon" aria-hidden="true">
            🪴
          </span>
          <p>Ваша корзина пока пуста.</p>
          <Link to="/plants" className="continue-button">
            Продолжить покупки
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="cart-page">
      <h1 className="cart-title">Корзина покупок</h1>

      <p className="cart-summary">
        Товаров: <strong>{totalQuantity}</strong> · К оплате:{' '}
        <strong>${totalAmount.toFixed(2)}</strong>
      </p>

      <div className="cart-items">
        {items.map((item) => (
          <article className="cart-item" key={item.id}>
            <img
              className="cart-item-image"
              src={item.image}
              alt={item.name}
              onError={(event) => {
                event.currentTarget.onerror = null;
                event.currentTarget.src = FALLBACK_IMAGE;
              }}
            />

            <div className="cart-item-info">
              <h3 className="cart-item-name">{item.name}</h3>
              <p className="cart-item-unit-price">
                Цена за единицу: ${item.price.toFixed(2)}
              </p>
              <p className="cart-item-total">
                Стоимость: ${(item.price * item.quantity).toFixed(2)}
              </p>
            </div>

            <div className="quantity-controls">
              <button
                type="button"
                className="quantity-button"
                aria-label="Уменьшить количество"
                onClick={() => dispatch(decrementQuantity(item.id))}
              >
                −
              </button>
              <span className="quantity-value">{item.quantity}</span>
              <button
                type="button"
                className="quantity-button"
                aria-label="Увеличить количество"
                onClick={() => dispatch(incrementQuantity(item.id))}
              >
                +
              </button>
            </div>

            <button
              type="button"
              className="remove-button"
              onClick={() => dispatch(removeFromCart(item.id))}
            >
              Удалить
            </button>
          </article>
        ))}
      </div>

      <footer className="cart-footer">
        <h2 className="cart-total">Общая сумма: ${totalAmount.toFixed(2)}</h2>

        <div className="cart-actions">
          <Link to="/plants" className="continue-button">
            Продолжить покупки
          </Link>

          <button
            type="button"
            className="checkout-button"
            onClick={handleCheckout}
          >
            Оформить заказ
          </button>
        </div>
      </footer>
    </main>
  );
}

export default CartItem;
