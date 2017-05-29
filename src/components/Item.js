import React, { Component } from 'react';
import {addItemToCart} from '../actions/actions.js'
class Item extends Component {
  constructor(props) {
    super(props);
    const {store} = props.store
    this.state = {id: props.id,
                  name: props.name,
                  description: props.description,
                  price: props.price,
                  quantity: props.quantity};
  }

  componentDidMount() {
    const { store } = this.props
    this.unsubscribe = store.subscribe(() =>
      this.forceUpdate()
    )
  }

  componentWillUnmount() {
    this.unsubscribe()
  }

  handleAddItemToCart = () => {
    this.props.store.dispatch(addItemToCart(this.props.id))
  }


  render() {
    const {store} = this.props;
    const state = store.getState().items.find(function(item){
      return item.id === this.props.id
    }.bind(this));


    const canAddItem = state.quantity > 0;
    let addItemElement = null;
    if (canAddItem) {
      addItemElement = <button onClick={this.handleAddItemToCart}>Add to cart</button>
    } else {
      addItemElement = <div> None Left! </div>
    }

    return (

      <div className="Item">
        <div className="Item-header">
          <img src="logo" className="itemImg" alt="" />
          <div>{state.name}</div>
        </div>
        <p className="itemDescription">
          {state.description}
        </p>

        <div className="itemPrice">
          {state.price}
        </div>

        <div className="itemQuantity">
          Quantity: {state.quantity}
          </div>
        {addItemElement}
      </div>
    );
  }
}

export default Item;
