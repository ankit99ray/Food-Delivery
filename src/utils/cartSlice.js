import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
    name: "cart",
    initialState: {
        items: [],
    },
    reducers: {
        addItem: (state, action) => {
            //we are modifying the state over here (mutating the state)
            state.items.push(action.payload);
        },
        removeItem: (state, action) => {
            // const ind = state.items.findIndex(action.payload);
            // state.items.pop();
            const index = state.items.findIndex(item => item.card.info.id === action.payload.card.info.id);
            if (index !== -1) {
                state.items.splice(index, 1);
            }
        },
        
        clearCart: (state) => {
            state.items.length = 0;
        }
    },
});

export const {addItem, removeItem, clearCart} = cartSlice.actions;

export default cartSlice.reducer;