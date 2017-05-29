import { createStore } from 'redux'
import {ADD_ITEM_TO_CART} from './actions/actions.js'
import {REMOVE_ITEM_FROM_CART} from './actions/actions.js'

const initialState = {
  cartItems: [],
  items : [{id: "1", name: "BatMan Legos", description: "Lego set from the Batman Lego Movie", price:"20.00", quantity:"5"},
          {id: "2", name: "Lego Duplo Farm Set", description: "Lego Duplo Set with Farm Theme", price:"30.00", quantity:"3"}
          ]
  }

function shoppingCartApp(state = initialState, action) {
  switch(action.type) {
    case  ADD_ITEM_TO_CART:
      const itemToAdd = state.items.find(function(item) {
        return item.id == action.itemId;
      })

      // const existingItem = state.cartItems.find(function(item){
      //   return item.id == action.itemId;
      // })
      //
      // if (existingItem) {
      //
      // }

      return Object.assign({}, state, {
        cartItems: [
          ...state.cartItems,
          {
            id: itemToAdd.id,
            name: itemToAdd.name,
            price: itemToAdd.price,
            quantity: itemToAdd.quantity,
            description: itemToAdd.description
          }
        ],
        items: state.items.map((item, index) =>{
          if (item.id == action.itemId) {
            return Object.assign({}, item, {
              quantity : --item.quantity
            })
          } else {
            return item
          }
        })
      })
      break;
      case REMOVE_ITEM_FROM_CART:
        const itemToRemove = state.items.find(function(item) {
          return item.id == action.itemId;
        })
        debugger;
        return Object.assign({}, state, {
          cartItems: state.cartItems.filter((item, index) => {
            return item.id != itemToRemove.id
          }),
          items: state.items.map((item, index) =>{
            if (item.id == action.itemId) {
              return Object.assign({}, item, {
                quantity : ++item.quantity
              })
            } else {
              return item
            }
          })
        })
      break;
      default:
      return state
  }
}

export default function configureStore() {
  return createStore(shoppingCartApp)
}
