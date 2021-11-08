import PropTypes from 'prop-types';
import React from 'react';
import cartIcon from './cartIcon.png';

class Cart extends React.Component {
  render() {
    const { quantity } = this.props;
    return (
      <div>
        <img src={ cartIcon } alt="Cart Icon" />
        <span data-testid="shopping-cart-size">{quantity}</span>
      </div>
    );
  }
}

Cart.propTypes = {
  quantity: PropTypes.number.isRequired,
};

export default Cart;
