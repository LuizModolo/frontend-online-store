import React from 'react';
import PropTypes from 'prop-types';

const DEFAULT_STATE = {
  email: '',
  grade: null,
  evaluation: '',
  isDisabled: true,
};

class Form extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      ...DEFAULT_STATE,
    };
  }

  onChange = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
    }, () => {
      const { email, grade } = this.state;
      const enabled = (email && grade);
      this.setState({
        isDisabled: !enabled,
      });
    });
  }

  onFormSubmit = (event) => {
    event.preventDefault();
    const { id } = this.props;
    const { email, grade, evaluation } = this.state;
    const evaluationInfo = {
      email,
      grade,
      evaluation,
      id,
    };
    const getEvaluations = JSON.parse(localStorage.getItem('evaluations')); // [{}, {}]
    const evaluationInfoArray = [evaluationInfo];
    if (getEvaluations) {
      const newSavedEvaluation = [...getEvaluations, evaluationInfo];
      localStorage.setItem('evaluations', JSON.stringify(newSavedEvaluation));
      this.setState({
        ...DEFAULT_STATE,
      });
      event.target.reset();
    } else {
      localStorage.setItem('evaluations', JSON.stringify(evaluationInfoArray));
      this.setState({
        ...DEFAULT_STATE,
      });
      event.target.reset();
    }
    window.location.reload();
  }

  render() {
    const { isDisabled } = this.state;
    return (
      <form action="" onSubmit={ this.onFormSubmit }>
        <label htmlFor="user-email">
          E-mail:
          <input type="email" id="user-email" name="email" onChange={ this.onChange } />
        </label>
        <label htmlFor="detail-evaluation">
          Opinião sobre o produto:
          <textarea
            name="evaluation"
            data-testid="product-detail-evaluation"
            id="detail-evaluation"
            cols="30"
            rows="10"
            onChange={ this.onChange }
          />
        </label>
        <label className='ratingRadio' htmlFor="grade">
          Nota:
          <input type="radio" name="grade" value="1" onChange={ this.onChange } />
          <span>1</span>
          <input type="radio" name="grade" value="2" onChange={ this.onChange } />
          <span>2</span>
          <input type="radio" name="grade" value="3" onChange={ this.onChange } />
          <span>3</span>
          <input type="radio" name="grade" value="4" onChange={ this.onChange } />
          <span>4</span>
          <input type="radio" name="grade" value="5" onChange={ this.onChange } />
          <span>5</span>
        </label>
        <button type="submit" name="send" disabled={ isDisabled }>Enviar</button>
      </form>
    );
  }
}

Form.propTypes = {
  id: PropTypes.string.isRequired,
};

export default Form;
