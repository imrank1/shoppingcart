import React, { Component } from 'react';
import Item from './Item'

import {removeItemFromCart}  from '../actions/actions.js'
class ShoppingCart extends Component {
  constructor(props) {
    super(props)
    const {store} = props
    this.state = {cartItems: store.getState().cartItems.length}
  }

  componentDidMount() {
    const { store } = this.props;
    this.unsubscribe = store.subscribe(() =>
      this.forceUpdate()
    )
  }

  componentWillUnmount() {
    this.unsubscribe()
  }

  removeCartItem = (e) => {
    debugger;
    this.props.store.dispatch(removeItemFromCart(this.props.id))
  }

  render() {
    const {store} = this.props;
    const state = store.getState()
    debugger;
    let itemsInCart = state.cartItems.map((cartItem) =>
     <div key={cartItem.id}> {cartItem.name}, Price: {cartItem.price}
            <button onClick={this.removeCartItem}> Remove</button>
     </div>
    )

    return (
      <div className="ShoppingCart">
        This is a shopping cart!

        <Item store={store} id="1" name="Bubble Gum" description="It's bubble Gum!"
              price="1.00" quantity="5"/>


        <div>
        Items in the cart:{state.cartItems.length}
        <ul>{itemsInCart}</ul>

        </div>
</div>
    );
  }
}


export default ShoppingCart;
