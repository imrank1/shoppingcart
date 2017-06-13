export const ADD_ITEM_TO_CART = 'ADD_ITEM_TO_CART';
export const REMOVE_ITEM_FROM_CART = 'REMOVE_ITEM_FROM_CART';
export const CLEAR_CART = 'CLEAR_CART';
export const CHECKOUT = 'CHECKOUT';
export const APPLY_COUPON = 'APPLY_COUPON';

export function addItemToCart(itemId) {
  return {type: ADD_ITEM_TO_CART, itemId: itemId}
}


export function removeItemFromCart(itemId) {
  return {type: REMOVE_ITEM_FROM_CART, itemId: itemId}
}

export function clearCart() {
  return {type: CLEAR_CART }
}

export function checkout() {
  return {type: CHECKOUT}
}

export function applyCoupon(couponKey) {
  return {type: APPLY_COUPON, couponKey: couponKey}
}
