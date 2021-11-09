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
      <div>
        {!productArray ? (
          <p>
            Você não tem produtos para finalizar uma compra!
          </p>)
          : productArray.map((product) => (
            <div key={ product.name }>
              <img src={ product.image } alt={ product.name } />
              <h1>{ product.name }</h1>
              <p>{ product.quantity } Unid.</p>
              <p>
                Preço Unitário: R$
                {' '}
                { (product.price).toFixed(2) }
              </p>
              <p>
                {' '}
                Preço total por produto: R$
                {' '}
                { (product.price * product.quantity).toFixed(2) }
              </p>
            </div>
          ))}
        <h3>{ totalPurchase }</h3>
        <div>
          <h3>Insira seus dados para finalizar compra:</h3>
          <Input
            labelText="Nome completo"
            testId="checkout-fullname"
            name="name"
            type="text"
            maxLength="30"
            value={ name }
            onChange={ this.handleChange }
          />
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
          <Input
            labelText="CEP"
            testId="checkout-cep"
            name="cep"
            type="text"
            maxLength="8"
            value={ cep }
            onChange={ this.handleChange }
          />
          <Input
            labelText="Endereço"
            testId="checkout-address"
            name="address"
            type="text"
            maxLength="40"
            value={ address }
            onChange={ this.handleChange }
          />
        </div>
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
    );
  }
}

export default Checkout;
