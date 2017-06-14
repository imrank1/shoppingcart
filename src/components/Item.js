import React, { Component } from 'react';
import {addItemToCart} from '../actions.js'
import '../App.css';
import { connect } from 'react-redux'

/**
 * Component to model an Item that can be added to the cart
 */
class Item extends Component {
    /**
     * Renders and item
     * @returns {XML}
     */
  render() {
    return (
      <div className="cartItem">
        <div className="itemHeader">
          <div>{this.props.name}</div>
        </div>

        <div className="itemPrice">
          Price: {this.props.price}
        </div>

        <div className="itemQuantity">
          Quantity: {this.props.quantity}
          </div>

          {this.props.quantity > 0 ?(<button onClick={ () => this.props.handleAddItemToCart(this.props.id)}>Add to cart</button>) : <div> None Left! </div>}
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
    return state.items.find(function(item){
        return item.id == ownProps.id
    });
}

const mapDispatchToProps = (dispatch) => {
    return {
        handleAddItemToCart: (itemId) => {
            dispatch(addItemToCart(itemId))
        }
    }
}
const ItemComponent = connect(
    mapStateToProps,
    mapDispatchToProps
)(Item)

export default ItemComponent
