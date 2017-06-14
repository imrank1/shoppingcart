import { createStore } from 'redux'
import {ADD_ITEM_TO_CART} from './actions.js'
import {REMOVE_ITEM_FROM_CART} from './actions.js'

/**
 * The initial state of our store.
 *
 * We could set this up to get the state from a server response
 *
 * @type {{cartItems: Array, items: [{}], coupon: {code: string, percentageOff: number}, hasValidCoupon: boolean}}
 */
const initialState = {
  cartItems: [],
  items : {
            1: {id: 1, name: "BatMan Legos", description: "Lego set from the Batman Lego Movie", price: "20.00", quantity: "5"},
            2: {id: 2, name: "Lego Duplo Farm Set", description: "Lego Duplo Set with Farm Theme", price: "30.00", quantity: "3"}
         },
  coupon : {code: "NONE", percentageOff:0},
  hasValidCoupon: false
};

/**
 * A pure function that applies the given action to the current state of the application
 *
 * @param state - The current state of the app
 * @param action - An action to be applied to the store
 * @returns {{}} - A new state
 */
function reducer(state = [], action) {
  switch(action.type) {
      /**
       * Handles adding an item to a cart
       *
       * 1. We find the item that was selected to be added to the cart in the items array.
       * 2. We add an entry in cartItems for that entry.
       *    a. If the item is already there we update the quantity amount.
       *
       */
      case  ADD_ITEM_TO_CART:
      const itemToAdd = state.items[action.itemId];

      const existingItem = state.cartItems.find(function(item){
        return item.id == action.itemId;
      })
      if (existingItem) {
          return Object.assign({}, state, {
              cartItems: state.cartItems.map((cartItem, index) =>{
                if (cartItem.id == existingItem.id) {
                  return Object.assign({}, cartItem, { quantity: ++cartItem.quantity})
                } else {
                  return cartItem
                }
              }),
              items: Object.assign(...Object.keys(state.items).map(id => {
                        let item = state.items[id]
                        if (id == action.itemId) {
                          return {[id]: Object.assign({}, item, {
                              quantity : --item.quantity
                          })}
                        } else {
                          return {[id]: item }
                        }
              }))
          })
      } else {
        return Object.assign({}, state, {
          cartItems: [
            ...state.cartItems,
            {
              id: itemToAdd.id,
              name: itemToAdd.name,
              price: itemToAdd.price,
              quantity: 1,
              description: itemToAdd.description
            }
          ],
          items: Object.assign(...Object.keys(state.items).map(id => {
                  let item = state.items[id]
                  if (id == action.itemId) {
                      return {[id]: Object.assign({}, item, {
                          quantity : --item.quantity
                      })}
                  } else {
                      return {[id]: item }
                  }
          }))
        })
      }

      break;

      /**
       * Removes an from the cart.
       *
       * 1. We find the item via itemId that needs to be removed.
       * 2. We remove the item from the cartItems array.
       *    a. If the quantity selected from the item is greater than one we decrement the quantity.
       *
       */
      case REMOVE_ITEM_FROM_CART:
        const cartItem = state.cartItems.find(function(item){
          return item.id == action.itemId
        })

        if (cartItem.quantity > 1) {
          return Object.assign({}, state, {
            cartItems: state.cartItems.map((item, index) => {
              if (item.id == cartItem.id) {
                return Object.assign({}, item, {quantity: --item.quantity})
              } else {
                return item;
              }
            }),
            items:Object.assign(...Object.keys(state.items).map(id => {
                let item = state.items[id]
                if (id == action.itemId) {
                    return {[id]: Object.assign({}, item, {
                        quantity : ++item.quantity
                    })}
                } else {
                    return {[id]: item }
                }
            }))
          })
        } else {
          return Object.assign({}, state, {
            cartItems: state.cartItems.filter((item, index) => {
              return item.id != cartItem.id
            }),
            items:Object.assign(...Object.keys(state.items).map(id => {
                let item = state.items[id]
                if (id == action.itemId) {
                    return {[id]: Object.assign({}, item, {
                        quantity : ++item.quantity
                    })}
                } else {
                    return {[id]: item }
                }
            }))
          })
        }
      break;
      default:
        return state
  }
}

/**
 *
 * @returns {Store<S>}
 */
export default function configureStore() {
  return createStore(reducer, initialState)
}
