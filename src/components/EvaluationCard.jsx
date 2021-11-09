import React from 'react';
import PropTypes from 'prop-types';

class EvaluationCard extends React.Component {
  render() {
    const { evaluation } = this.props;
    const { email, grade, evaluation: comment } = evaluation;
    return (
      <div className="evaluation-card">
        <h2>E-mail: {email}</h2>
        <span>
          Nota:
          {' '}
          {grade}
        </span>
        <p>{comment}</p>
      </div>
    );
  }
}

EvaluationCard.propTypes = {
  evaluation: PropTypes.shape({
    email: PropTypes.string,
    grade: PropTypes.number,
    evaluation: PropTypes.string,
  }).isRequired,
};

export default EvaluationCard;
