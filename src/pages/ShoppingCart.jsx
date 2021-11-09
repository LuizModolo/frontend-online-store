import React from 'react';
import { Link } from 'react-router-dom';

class ShoppingCart extends React.Component {
  constructor(props) {
    super(props);

    const arrayItems = JSON.parse(localStorage.getItem('products'));

    this.state = {
      productArray: arrayItems,
      disabledButton: false,
    };
  }

  increaseQuantity = ({ target }) => {
    const { productArray } = this.state;
    if (productArray) {
      const productIndex = productArray.findIndex((p) => p.id === target.className);
      const productObj = productArray.find((p) => p.id === target.className);
      productObj.quantity += 1;
      productArray.splice(productIndex, 1, productObj);
      localStorage.setItem('products', JSON.stringify(productArray));
      if (productObj.stock <= productObj.quantity) {
        this.setState({
          productArray,
          disabledButton: true,
        });
      } else {
        this.setState({
          productArray,
          disabledButton: false,
        });
      }
    } else {
      this.setState({
        productArray,
      });
    }
  }

  decreaseQuantity = ({ target }) => {
    const { productArray } = this.state;
    if (productArray) {
      const productIndex = productArray.findIndex((p) => p.id === target.className);
      const productObj = productArray.find((p) => p.id === target.className);
      if (productObj.quantity > 1) {
        productObj.quantity -= 1;
        productArray.splice(productIndex, 1, productObj);
        localStorage.setItem('products', JSON.stringify(productArray));
        if (productObj.stock <= productObj.quantity) {
          this.setState({
            productArray,
            disabledButton: true,
          });
        } else {
          this.setState({
            productArray,
            disabledButton: false,
          });
        }
      } else {
        productArray.splice(productIndex, 1);
        localStorage.setItem('products', JSON.stringify(productArray));
        this.setState({
          productArray,
        });
      }
    } else {
      this.setState({
        productArray,
      });
    }
  }

  removeItem = ({ target }) => {
    const { productArray } = this.state;
    if (productArray) {
      const productIndex = productArray.findIndex((p) => p.id === target.className);
      productArray.splice(productIndex, 1);
      localStorage.setItem('products', JSON.stringify(productArray));
      this.setState({
        productArray,
      });
    } else {
      this.setState({
        productArray,
      });
    }
  }

  render() {
    const { productArray, disabledButton } = this.state;
    return (
      <div className='cartPage'>
        <div className='mainCart'>
          <h2>Confira os itens do seu carrinho:</h2>
          {!productArray ? (
            <p data-testid="shopping-cart-empty-message">
              Seu carrinho está vazio
            </p>)
            : productArray.map((product) => (
              <div className='cartProductSession' key={ product.name }>
                <img src={ product.image } alt={ product.name } />
                <h1 data-testid="shopping-cart-product-name">{ product.name }</h1>
                <div className='quantitySession'>
                  <button
                    data-testid="product-decrease-quantity"
                    onClick={ this.decreaseQuantity }
                    type="button"
                    className={ product.id }
                  >
                    -

                  </button>
                  <p data-testid="shopping-cart-product-quantity">{ product.quantity }</p>
                  <button
                    data-testid="product-increase-quantity"
                    onClick={ this.increaseQuantity }
                    type="button"
                    className={ product.id }
                    disabled={ disabledButton }
                  >
                    +

                  </button>
                </div>
                <div className='priceCart'>
                  <p>
                    Preço Unitário: R$
                    {' '}
                    { product.price }
                  </p>
                  <p>
                    {' '}
                    Preço Total: R$
                    {' '}
                    { (product.price * product.quantity).toFixed(2) }
                  </p>
                </div>
                <button
                  type="button"
                  className={ product.id }
                  onClick={ this.removeItem }
                >
                  Remover

                </button>
              </div>
            ))}
        </div>
        <div className='cartButtons'>
          <Link
            to="/checkout"
            data-testid="checkout-products"
          >
            <button type="button">Finalizar Compra</button>
          </Link>
          <Link
           to="/"
          >
            <button type="button">Continuar Comprando</button>
          </Link>
        </div>
      </div>
    );
  }
}

export default ShoppingCart;
