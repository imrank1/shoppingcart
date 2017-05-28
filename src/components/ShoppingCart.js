import React, { Component } from 'react';
import Item from './Item'
class ShoppingCart extends Component {
  render() {
    return (
      <div className="ShoppingCart">
        This is a shopping cart!

        <Item id="1" name="Bubble Gum" description="It's bubble Gum!"
              price="1.00"/>
        </div>

    );
  }
}


export default ShoppingCart;
