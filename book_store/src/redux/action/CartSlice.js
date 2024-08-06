import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  items: [],
}

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const { id, title, author, cover_image } = action.payload

      const existingItem = state.items.find((item) => item.id === id)
      if (existingItem) {
        existingItem.quantity++
      } else {
        state.items.push({
          id,
          title,
          author,
          quantity: 1,
          cover_image,
        })
      }
    },
    removeFromCart: (state, action) => {
      const idToRemove = action.payload
      state.items = state.items.filter((item) => item.id !== idToRemove)
    },
    incrementQuantity: (state, action) => {
      const idToUpdate = action.payload
      const itemToUpdate = state.items.find((item) => item.id === idToUpdate)
      if (itemToUpdate) {
        itemToUpdate.quantity++
      }
    },
    decrementQuantity: (state, action) => {
      const idToUpdate = action.payload
      const itemToUpdate = state.items.find((item) => item.id === idToUpdate)
      if (itemToUpdate && itemToUpdate.quantity > 1) {
        itemToUpdate.quantity--
      }
    },
    emptyCart: (state) => {
      state.items.length = 0
    },
  },
})

export const {
  addToCart,
  removeFromCart,
  incrementQuantity,
  decrementQuantity,
  emptyCart,
} = cartSlice.actions

export default cartSlice.reducer
