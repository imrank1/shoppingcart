import React, { Component } from 'react';
import {addItemToCart} from '../actions.js'
import '../App.css';

/**
 * Component to model an Item that can be added to the cart
 */
class Item extends Component {
  constructor(props) {
    super(props);
    this.state = this.props.store.getState().items[this.props.id]
  }

    /**
     * Called when the component mounts.
     *
     * We subscribe to state changes and update our state with the item that the
     * component was created for
     */
  componentDidMount() {
    const { store } = this.props;
    this.unsubscribe = store.subscribe(() =>{
      this.setState(store.getState().items[this.props.id]);
        }
    )
  }

    /**
     * When the component is going to unmount unsubscribe from the store
     */
  componentWillUnmount() {
    this.unsubscribe()
  }

    /**
     * Dispatches and action to add an item to the cart
     */
  handleAddItemToCart = () => {
    this.props.store.dispatch(addItemToCart(this.props.id));
  }


    /**
     * Renders and item
     * @returns {XML}
     */
  render() {
    return (
      <div className="cartItem">
        <div className="itemHeader">
          <div>{this.state.name}</div>
        </div>

        <div className="itemPrice">
          Price: {this.state.price}
        </div>

        <div className="itemQuantity">
          Quantity: {this.state.quantity}
          </div>


          {this.state.quantity > 0 ?(<button onClick={this.handleAddItemToCart}>Add to cart</button>) : <div> None Left! </div>}
      </div>
    );
  }
}

export default Item;
