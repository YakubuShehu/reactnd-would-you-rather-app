import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';



/* Boostrap Components & Styles */
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button } from 'react-bootstrap'


/* Font Awesome and its Awesomeness */
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRight } from '@fortawesome/free-solid-svg-icons'


export class PollExcerpt extends Component {

  static propTypes = {
    question: PropTypes.object.isRequired,
    unanswered: PropTypes.bool.isRequired
  };

  state = {
    viewPoll: false
  };

  handleClick = e => {
    this.setState(prevState => ({
      viewPoll: !prevState.viewPoll
    }));
  };

  render() {
    const { question, unanswered } = this.props;

    if (this.state.viewPoll === true) {
      return <Redirect push to={`/questions/${question.id}`} />;
    }

    return (
      <div>

        <p className="text-center">{question.optionOne.text}</p>
        <p>or</p>
        <p>...</p>

        <div className="d-grid">
          <Button
            className="fs-6 font-monospace"
            onClick={this.handleClick}
            variant={unanswered === true ? "secondary" : "success"}
          >
            {unanswered === true ? "Answer Poll" : "View Results"} <FontAwesomeIcon icon={faArrowRight} />
          </Button>
        </div>

      </div>
    );

  }
}

export default PollExcerpt;
