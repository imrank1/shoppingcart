import React, { Component } from 'react';
import ItemComponent from './Item'
import {removeItemFromCart, applyCoupon}  from '../actions.js'
import '../App.css';
import { connect } from 'react-redux'



/**
 *
 * ShoppingCart - Component that models the items that
 * have been added to a cart by a user.
 */

class ShoppingCart extends Component {
    /**
     * Returns a JSX for the items that have been added to the cart
     * @returns {Array}
     */
  itemsInCart() {
    return this.props.cartItems.map((cartItem) =>
      <div key={cartItem.id}> {cartItem.name}, Price: {cartItem.price}, Qty: {cartItem.quantity}
          <button onClick={() => this.props.removeCartItem(cartItem.id)}> Remove</button>
      </div>)
  }

  getPercentageOff () {
      return this.props.hasValidCoupon ? this.props.coupon.percentageOff : 0
  }

    /**
     * Calculates and returns the total based on the items that are in the cart
     *
     *
     * @returns {*}
     */
  getCartTotal () {
    let total = this.props.cartItems.reduce((acc, cartItem) => {return acc + cartItem.quantity * cartItem.price}, 0)

    if(this.props.hasValidCoupon) {
        total = total * this.getPercentageOff();
    }
    return total
  }


    /**
     * Called whenever the state changes
     *
     * @returns {JSX}
     */
  render() {
    let couponKey = this.props.coupon.code === "NONE" ? "" : this.props.coupon.code;
    return (
      <div className="shoppingCart">
        <ItemComponent id="1"/>
        <ItemComponent id="2"/>
        <div>
          Items in the cart:{this.props.cartItems.length}
          <ul>{this.itemsInCart()}</ul>
        </div>


        <div className="couponSection">
            Coupon:<input type="text" value={couponKey} onChange={(e) => this.props.handleCouponInput(e)}/>
        </div>

        <div>Total: {this.getCartTotal()}</div>
        </div>
    );
  }
}



const mapStateToProps = (state) => {
    return state
}

const mapDispatchToProps = (dispatch) => {
    return {
        handleCouponInput: (e) => {
            dispatch(applyCoupon(e.target.value));
        },
        removeCartItem: (itemId) => {
            dispatch(removeItemFromCart(itemId))
        }
    }
}
const ShoppingCartComponent = connect(
    mapStateToProps,
    mapDispatchToProps
)(ShoppingCart)

export default ShoppingCartComponent;
