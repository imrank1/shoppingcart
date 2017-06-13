import React, { Component } from 'react';
import Item from './Item'
import {removeItemFromCart}  from '../actions.js'
import '../App.css';


/**
 *
 * ShoppingCart - Component that models the items that
 * have been added to a cart by a user.
 */

class ShoppingCart extends Component {
  constructor(props) {
    super(props)
    this.state = props.store.getState()
  }

    /**
     * Called after the component has been mounted by React
     */
  componentDidMount() {
    const { store } = this.props;

    // We'll subscribe to changes in the store
    // The shopping cart cares about the entire store
    // Every time the state changes we cause a render by setting the state of this component.
    this.unsubscribe = store.subscribe(() =>
      this.setState(store.getState())
    )
  }

    /**
     * When the component is about to unmount unsubscribe from store changes.
     */
  componentWillUnmount() {
    this.unsubscribe()
  }

    /**
     * Dispatches an action to remove an item from the cart
     * @param itemId
     */
  removeCartItem = (itemId) => {
    this.props.store.dispatch(removeItemFromCart(itemId))
  }


    /**
     * Returns a JSX for the items that have been added to the cart
     * @returns {Array}
     */
  itemsInCart() {
    return this.state.cartItems.map((cartItem) =>
      <div key={cartItem.id}> {cartItem.name}, Price: {cartItem.price}, Qty: {cartItem.quantity}
          <button onClick={() => this.removeCartItem(cartItem.id)}> Remove</button>
      </div>)
  }

    /**
     * Calculates and returns the total based on the items that are in the cart
     *
     *
     * @returns {*}
     */
  getCartTotal () {
    let total = this.state.cartItems.reduce((acc, cartItem) => {return acc + cartItem.quantity * cartItem.price}, 0)
    return total
  }


    /**
     * Called whenever the state changes
     *
     * @returns {JSX}
     */
  render() {
    const {store} = this.props;
    return (
      <div className="shoppingCart">
        <Item store={store} id="1"/>
        <Item store={store} id="2"/>
        <div>
          Items in the cart:{this.state.cartItems.length}
          <ul>{this.itemsInCart()}</ul>
        </div>



        <div>Total: {this.getCartTotal()}</div>
        </div>
    );
  }
}


export default ShoppingCart;
