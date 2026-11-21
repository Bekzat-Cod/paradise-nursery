import { createSlice } from '@reduxjs/toolkit';

/**
 * Redux-срез корзины покупок.
 *
 * Состояние:
 *  - items        — товары в корзине: { id, name, image, price, quantity }
 *  - totalQuantity — общее количество единиц товара (для счётчика в навбаре)
 *  - totalAmount   — общая стоимость корзины
 */
const initialState = {
  items: [],
  totalQuantity: 0,
  totalAmount: 0,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    // Добавление растения в корзину.
    addToCart(state, action) {
      const plant = action.payload;
      const existingItem = state.items.find((item) => item.id === plant.id);

      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.items.push({
          id: plant.id,
          name: plant.name,
          image: plant.image,
          price: plant.price,
          quantity: 1,
        });
      }

      state.totalQuantity += 1;
      state.totalAmount += plant.price;
    },

    // Увеличение количества единиц товара.
    incrementQuantity(state, action) {
      const item = state.items.find((cartItem) => cartItem.id === action.payload);
      if (!item) return;

      item.quantity += 1;
      state.totalQuantity += 1;
      state.totalAmount += item.price;
    },

    // Уменьшение количества единиц товара (при нуле — удаление).
    decrementQuantity(state, action) {
      const item = state.items.find((cartItem) => cartItem.id === action.payload);
      if (!item) return;

      item.quantity -= 1;
      state.totalQuantity -= 1;
      state.totalAmount -= item.price;

      if (item.quantity <= 0) {
        state.items = state.items.filter(
          (cartItem) => cartItem.id !== item.id
        );
      }
    },

    // Полное удаление товара из корзины.
    removeFromCart(state, action) {
      const item = state.items.find((cartItem) => cartItem.id === action.payload);
      if (!item) return;

      state.totalQuantity -= item.quantity;
      state.totalAmount -= item.price * item.quantity;
      state.items = state.items.filter(
        (cartItem) => cartItem.id !== item.id
      );
    },
  },
});

export const {
  addToCart,
  incrementQuantity,
  decrementQuantity,
  removeFromCart,
} = cartSlice.actions;

export default cartSlice.reducer;
