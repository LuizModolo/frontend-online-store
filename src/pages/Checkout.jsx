import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Input from '../components/Input';

class Checkout extends Component {
  constructor(props) {
    super(props);

    const arrayItems = JSON.parse(localStorage.getItem('products'));

    this.state = {
      productArray: arrayItems,
      totalPurchase: 0,
      name: '',
      email: '',
      cpf: '',
      phone: '',
      cep: '',
      address: '',
    };
  }

  componentDidMount() {
    this.createTotalPrice();
  }

  createTotalPrice = () => {
    const { productArray } = this.state;
    if (productArray) {
      const totalPrice = productArray.reduce((total, p) => {
        total += p.price * p.quantity;
        return total;
      }, 0);
      this.setState({
        totalPurchase: totalPrice,
      });
    }
  }

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
  };

  submitPurchase = () => {
    localStorage.removeItem('products');
    this.setState({
      name: '',
      email: '',
      cpf: '',
      phone: '',
      cep: '',
      address: '',
    });
    alert('Obrigado! Compra efetuada com sucesso!')
  }

  render() {
    const {
      productArray,
      totalPurchase,
      name,
      email,
      cpf,
      cep,
      phone,
      address } = this.state;
    return (
      <div className='checkoutPage'>
        {!productArray ? (
          <p>
            Você não tem produtos para finalizar uma compra!
          </p>)
          : productArray.map((product) => (
            <div className='checkoutProduct' key={ product.name }>
              <img src={ product.image } alt={ product.name } />
              <div className='titleProductCheckout'>
                <h1>{ product.name }</h1>
                <p>{ product.quantity } Unid.</p>
              </div>
              <div className='priceProductCheckout'>
                <p>
                  Unitário: R$
                  {' '}
                  { (product.price).toFixed(2) }
                </p>
                <p>
                  {' '}
                  Subtotal: R$
                  {' '}
                  { (product.price * product.quantity).toFixed(2) }
                </p>
              </div>
            </div>
          ))}
        <h3 className='priceTotalCheckout'>Total da Compra: R$ { totalPurchase.toFixed(2) }</h3>
        <div className='formCheckout'>
          <h3>Insira seus dados para finalizar compra:</h3>
          <div className='nameForm'>
            <Input
              labelText="Nome completo"
              testId="checkout-fullname"
              name="name"
              type="text"
              maxLength="30"
              value={ name }
              onChange={ this.handleChange }
            />
          </div>
          <div className='statsForm'>
            <Input
              labelText="E-mail"
              testId="checkout-email"
              name="email"
              type="email"
              maxLength="35"
              value={ email }
              onChange={ this.handleChange }
            />
            <Input
              labelText="CPF"
              testId="checkout-cpf"
              name="cpf"
              type="text"
              maxLength="11"
              value={ cpf }
              onChange={ this.handleChange }
            />
            <Input
              labelText="Telefone"
              testId="checkout-phone"
              name="phone"
              type="text"
              maxLength="11"
              value={ phone }
              onChange={ this.handleChange }
            />
          </div>
          <div className='adressForm'>
            <Input
              labelText="Endereço"
              testId="checkout-address"
              name="address"
              type="text"
              maxLength="40"
              value={ address }
              onChange={ this.handleChange }
            />
            <Input
              labelText="CEP"
              testId="checkout-cep"
              name="cep"
              type="text"
              maxLength="8"
              value={ cep }
              onChange={ this.handleChange }
            />
          </div>
        </div>
        <div className='buttonsCheckout'>
          <Link
            to="/shopping-cart"
          >
            <button type="button">Voltar</button>
          </Link>
          <Link
            to="/"
          >
            <button type="button" onClick={ this.submitPurchase }>Comprar</button>
          </Link>
        </div>
      </div>
    );
  }
}

export default Checkout;
