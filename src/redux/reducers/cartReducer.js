const initialState = {
    cartItems: [],
}

export const cartReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'ADD_TO_CART':
            return {
                ...state,
                cartItems: [...state.cartItems, action.payload],
            }
        case 'REMOVE_FROM_CART':
            return {
                ...state,
                cartItems: state.cartItems.filter(item => item._id !== action.payload),
            }
        case 'CLEAR_CART':
            return {
                ...state,
                cartItems: [], // Return a new state with cartItems reset to an empty array
            }
        default:
            return state
    }
}
