import { configureStore } from "@reduxjs/toolkit"
import booksReducer from "../action/BookSlice"
import cartReducer from "../action/CartSlice"

export const store = configureStore({
  reducer: {
    books: booksReducer,
    cart: cartReducer,
  },
})
