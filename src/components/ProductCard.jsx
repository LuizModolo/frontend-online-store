import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

class ProductCard extends React.Component {
  constructor(props) {
    super(props);
    const { productInfo } = this.props;
    this.state = {
      product: productInfo,
    };
  }

  addCartDetails = () => {
    const { hasClicked } = this.props;
    const { product } = this.state;
    const newItem = {
      id: product.id,
      image: product.thumbnail.replace(/\w.jpg/, 'H.jpg'),
      name: product.title,
      price: product.price,
      stock: product.available_quantity,
      quantity: 1 };
    let savedItem = JSON.parse(localStorage.getItem('products'));
    if (savedItem) {
      const productIndex = savedItem.findIndex((p) => p.id === newItem.id);
      const productObj = savedItem.find((p) => p.id === newItem.id);
      if (productIndex >= 0) {
        productObj.quantity += 1;
        savedItem.splice(productIndex, 1, productObj);
        localStorage.setItem('products', JSON.stringify(savedItem));
      } else {
        savedItem = [...savedItem, newItem];
        localStorage.setItem('products', JSON.stringify(savedItem));
      }
    } else {
      const firstProductSaved = [newItem];
      localStorage.setItem('products', JSON.stringify(firstProductSaved));
    }
    hasClicked();
  }

  render() {
    const { productInfo } = this.props;
    const { title, thumbnail, id, price,
      shipping: { free_shipping: freeShipping } } = productInfo;
    return (
      <div className='productCart'>
        <Link
          data-testid="product-detail-link"
          to={ { pathname: `/product/${id}`, state: { ...productInfo } } }
        >
          <div data-testid="product" key={ id }>
            <h3>{ title }</h3>
            <img src={ thumbnail.replace(/\w.jpg/, 'H.jpg') } alt={ title } />
            <p>R$ { price.toFixed(2) }</p>
          </div>
        </Link>
        { freeShipping && <p data-testid="free-shipping">Frete Grátis!</p> }
        <button
          type="button"
          onClick={ this.addCartDetails }
          data-testid="product-add-to-cart"
        >
          Adicionar ao Carrinho

        </button>
      </div>
    );
  }
}

ProductCard.propTypes = {
  key: PropTypes.string,
  title: PropTypes.string,
  thumbnail: PropTypes.string,
  hasClicked: PropTypes.func,
}.isRequired;

export default ProductCard;
