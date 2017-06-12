import React, { Component } from 'react';
import Item from './Item'

import {removeItemFromCart}  from '../actions/actions.js'
class ShoppingCart extends Component {
  constructor(props) {
    super(props)
    const {store} = props
    this.state = store.getState()
  }

  componentDidMount() {
    const { store } = this.props;
    this.unsubscribe = store.subscribe(() =>
      this.setState(store.getState())
    )
  }

  componentWillUnmount() {
    this.unsubscribe()
  }

  removeCartItem = (itemId) => {
    // debugger;
    this.props.store.dispatch(removeItemFromCart(itemId))
  }

  render() {
    const {store} = this.props;
    debugger;
    let itemsInCart = null;
    if (this.state.cartItems.length) {
      itemsInCart = this.state.cartItems.map((cartItem) =>
          <div key={cartItem.id}> {cartItem.name}, Price: {cartItem.price}, Qty: {cartItem.quantity}
            <button onClick={() => this.removeCartItem(cartItem.id)}> Remove</button>
          </div>)
    } else {
      itemsInCart = (<div></div>)
    }

    return (
      <div className="ShoppingCart">
        This is a shopping cart!

        <Item store={store} id="1" name="Bubble Gum" description="It's bubble Gum!"
              price="1.00" quantity="5"/>


        <div>
        Items in the cart:{this.state.cartItems.length}
        <ul>{itemsInCart}</ul>

        </div>
</div>
    );
  }
}


export default ShoppingCart;
