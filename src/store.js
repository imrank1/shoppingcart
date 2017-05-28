import { createStore } from 'redux'
import * as actions from './actions/actions.js'

const initialState = {
  cartItems: [],
  items : [{id: "1", name: "BatMan Legos", description: "Lego set from the Batman Lego Movie", price:"20.00", quantity:"5"},
          {id: "2", name: "Lego Duplo Farm Set", description: "Lego Duplo Set with Farm Theme", price:"30.00", quantity:"3"}
          ]
  }

function shoppingCartApp(state = initialState, action) {
  switch(action.type) {
    case actions.ADD_ITEM_TO_CART:
      return Object.assign({}, state, {
        cartItems: [
          ...state.cartItems,
          {
            id: action.itemId
          }
        ]
      })
      default:
      return state
  }

  return state;
}

export default function configureStore() {
  return createStore(shoppingCartApp)
}
