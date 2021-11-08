import PropTypes from 'prop-types';
import React from 'react';
import { Link } from 'react-router-dom';
import EvaluationCard from '../components/EvaluationCard';
import Form from '../components/Form';
import Cart from '../components/cart/Cart';

class ProductDetails extends React.Component {
  constructor(props) {
    super(props);
    const { location } = this.props;
    const { state } = location;
    this.state = {
      product: state,
      quantity: 0,
    };
  }

  componentDidMount() {
    this.getQuantity();
  }

  getQuantity = () => {
    const getItems = JSON.parse(localStorage.getItem('products'));
    const quantity = getItems ? getItems.reduce((total, i) => {
      total += Number(i.quantity);
      return total;
    }, 0) : 0;
    this.setState({
      quantity,
    });
  }

  addCartDetails = () => {
    const { product } = this.state;
    const newItem = {
      id: product.id,
      image: product.thumbnail,
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
    this.getQuantity();
  }

  render() {
    const { product, quantity } = this.state;
    const getEvaluations = JSON.parse(localStorage.getItem('evaluations'));
    const filteredEvaluations = getEvaluations
      ? getEvaluations.filter((ev) => ev.id === product.id) : false;
    const { price, thumbnail: image, title: productName } = product;
    return (
      <div>
        <Link
          to="/shopping-cart"
          data-testid="shopping-cart-button"
        >
          <Cart quantity={ quantity } />
        </Link>
        <h4 data-testid="product-detail-name">
          { productName }
        </h4>
        <h3>
          R$
          { price }
        </h3>
        <img src={ image } alt="" />
        { product.shipping.free_shipping
        && <p data-testid="free-shipping">Frete Grátis!</p> }
        <button
          type="button"
          onClick={ this.addCartDetails }
          data-testid="product-detail-add-to-cart"
        >
          Adicionar ao Carrinho

        </button>
        <Link to="/">Voltar</Link>
        <Form id={ product.id } />
        {
          filteredEvaluations
            && filteredEvaluations
              .map((evaluation, index) => (<EvaluationCard
                evaluation={ evaluation }
                key={ index }
              />))
        }
      </div>
    );
  }
}

ProductDetails.propTypes = {
  location: PropTypes.objectOf(PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.object,
  ])).isRequired,
};

export default ProductDetails;
