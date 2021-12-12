import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import PollExcerpt from './PollExcerpt';


/* Boostrap Components & Styles */
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Col, Image, Card } from 'react-bootstrap'


export class PollCard extends Component {
  static propTypes = {
    question_id: PropTypes.string,
    unanswered: PropTypes.bool,
  };

  render() {
    const { author, question, unanswered } = this.props;

    return (

      <Container id={`${unanswered ? 'unanswered' : 'answered'}PollContainer`} className='p-1 mb-5'>
        <Card className='shadow'>
          <Card.Header className='bg-light p-3'>
            <span className='fw-bold eight-bit-font'>{author.name}</span>
            &nbsp;
            <span className=''>wants to know...</span>
          </Card.Header>
          <Card.Body>
            <Row>
              <Col className="m-auto text-center" sm={4}>
                <Image className="img-fluid" roundedCircle thumbnail src={author.avatarURL} width={125} draggable='false' />
              </Col>
              <Col className="left-border-col" sm={8}>
                <h6 className="fw-bold">Would you rather...</h6>
                <Container className='p-4 bg-light border rounded text-center' id='questionsContainer'>
                  <PollExcerpt
                    question={question}
                    unanswered={unanswered}
                  />
                </Container>
              </Col>
            </Row>
          </Card.Body>
        </Card>
      </Container>
    )

  }

}

function mapStateToProps({ authorizedUser, users, questions }, { question_id }) {

  let question;

  if (question_id !== undefined) {
    question = questions[question_id]
    // console.log('Question being viewed --> ', question)
  }

  const author = users[question.author];

  return {
    authorizedUser,
    question,
    author
  };
}

export default connect(mapStateToProps)(PollCard);