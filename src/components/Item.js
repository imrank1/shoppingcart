import React, { Component } from 'react';
import addItemToCart from '../actions/actions.js'
import store from '../store.js';
class Item extends Component {
  constructor(props) {
    super(props);
    this.state = {id: props.id,
                  name: props.name,
                  description: props.description,
                  price: props.price};
  }

  handleAddItemToCart = () => {
    store.dispatch(addItemToCart(this.id))
    console.log('Add the item!!');
  }


  render() {
    return (
      <div className="Item">
        <div className="Item-header">
          <img src="logo" className="itemImg" alt="" />
          <div>{this.state.name}</div>
        </div>
        <p className="itemDescription">
          {this.state.description}
        </p>

        <div className="itemPrice">
          {this.state.price}
        </div>
        <button onClick={this.handleAddItemToCart}>
        Add to cart</button>
      </div>
    );
  }
}

export default Item;
