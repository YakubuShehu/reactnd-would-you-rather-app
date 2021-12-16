// Home.js
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

/* Boostrap Components & Styles */
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Card } from 'react-bootstrap'

/* Semantic UI for the complex tab data mapping */
import { Tab } from 'semantic-ui-react';


import PollCard from './PollCard';


export class Home extends Component {

  static propTypes = {
    userQuestionData: PropTypes.object.isRequired
  };

  render() {
    const { userQuestionData } = this.props;

    return (
      <Container className='p-5' id='homeContainer'>
        <Card>
          <Card.Body>

            {/* Semantic UI element to the rescue */}
            <Tab panes={panes({ userQuestionData })} className="tab" />

          </Card.Body>
        </Card>
      </Container>
    )
  }
}

const panes = props => {
  const { userQuestionData } = props;
  return [
    {
      menuItem: 'Unanswered Questions',
      render: () => (
        <Tab.Pane>
          {userQuestionData.unansweredQuestions.map(question => (
            <PollCard
              key={question.id}
              question_id={question.id}
              unanswered={true}
            />
          ))}
        </Tab.Pane>
      )
    },
    {
      menuItem: 'Answered Questions',
      render: () => (
        <Tab.Pane>
          {userQuestionData.answeredQuestions.map(question => (
            <PollCard
              key={question.id}
              question_id={question.id}
              unanswered={false}
            />
          ))}
        </Tab.Pane>
      )
    }
  ];
};

function mapStateToProps({ authorizedUser, users, questions }) {

  const answeredQuestionIDs = Object.keys(users[authorizedUser].answers);

  const answeredQuestions = Object.values(questions)
    .filter(
      question => answeredQuestionIDs.includes(question.id)
    )
    .sort(
      (a, b) => b.timestamp - a.timestamp
    );

  const unansweredQuestions = Object.values(questions)
    .filter(
      question => !answeredQuestionIDs.includes(question.id)
    )
    .sort(
      (a, b) => b.timestamp - a.timestamp
    );

  return {
    userQuestionData: {
      answeredQuestions,
      unansweredQuestions
    }
  };
}

export default connect(mapStateToProps)(Home);
