import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom'
import { handleSaveQuestionAnswer } from '../actions/users';
import PollResults from './PollResults';


/* Boostrap Components & Styles */
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Col, Image, Card, Form, Button } from 'react-bootstrap'

/* Font Awesome and its Awesomeness */
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPaperPlane, faChevronLeft } from '@fortawesome/free-solid-svg-icons';


export class PollQuestion extends Component {
  static propTypes = {
    authorizedUser: PropTypes.string.isRequired,
    handleSaveQuestionAnswer: PropTypes.func.isRequired,
    question: PropTypes.object
  };

  state = {
    value: ''
  };

  // handleChange = (e, { value }) => this.setState({ value });
  handleChange = (e) => {
    this.setState({ value: e.target.value });
  }

  handleClick = () => {
    this.props.history.push('/');
  };

  handleSubmit = e => {
    e.preventDefault();
    if (this.state.value && this.state.value !== '') {
      const { authorizedUser, question, handleSaveQuestionAnswer } = this.props;
      handleSaveQuestionAnswer(authorizedUser, question.id, this.state.value);
    }
  };


  render() {
    const { question, author, hasAnswered, questionDoesntExist } = this.props;
    const disabled = this.state.value === '' ? true : false;

    // Redirect to Error404 page if question is not found
    if (questionDoesntExist === true) {
      return <Redirect to="/questions/not-found" />;
    }

    // Redirect to Results Page if already answered
    if (hasAnswered) {
      // return <Redirect to={`/questions/${question.id}/results`} />
      return (<PollResults />)
    }

    return (
      <Container id='questionViewContainer' className='p-1'>
        <Card className='shadow-sm'>
          <Card.Header className='bg-light p-3'>
            <span className='fw-bold eight-bit-font'>{author.name}</span>
            &nbsp;
            <span className=''>wants to know...</span>
          </Card.Header>
          <Card.Body>
            <Row>
              <Col className="m-auto text-center" sm={4}>
                <Image className="img-fluid border-dark" roundedCircle thumbnail src={author.avatarURL} width={125} draggable='false' />
              </Col>
              <Col className="" sm={8}>
                <h6 className="fw-bold text-center text-sm-start">Would you rather...</h6>
                <Container className='p-4 bg-light border rounded text-left' id='questionsContainer'>


                  <Form onSubmit={this.handleSubmit}>

                    <Form.Group className="">
                      <Form.Check
                        type="radio"
                        id="option1"
                        name="radioGroupOptions"
                        label={question.optionOne.text}
                        value="optionOne"
                        onChange={this.handleChange}
                        required
                      />

                      <Form.Check
                        type="radio"
                        id="option2"
                        name="radioGroupOptions"
                        label={question.optionTwo.text}
                        value="optionTwo"
                        onChange={this.handleChange}
                        required
                      />
                    </Form.Group>


                    <div className="d-grid mt-4">
                      <Button
                        variant="success"
                        type="submit"
                        disabled={disabled}
                      >
                        <FontAwesomeIcon icon={faPaperPlane} /> Submit
                      </Button>
                    </div>

                  </Form>

                </Container>

                <Container className='d-flex justify-content-end py-3 px-0' id='backButtonContainer'>
                  <Button
                    className=""
                    variant="outline-secondary"
                    size="sm"
                    onClick={this.handleClick}
                  >
                    <FontAwesomeIcon icon={faChevronLeft} /> Back
                  </Button>
                </Container>

              </Col>
            </Row>
          </Card.Body>
        </Card>
      </Container>
    );
  }
}

function mapStateToProps({ authorizedUser, users, questions }, { match, question_id }) {

  let question, author;
  let hasAnswered = false;
  let questionDoesntExist = false;

  if (question_id !== undefined) {
    question = questions[question_id]
    author = users[question.author];
    // console.log('Question retrieved from props --> ', question)
  }

  else {
    const { question_id } = match.params;
    question = questions[question_id];
    const user = users[authorizedUser];
    // console.log('Question retrieved from URL parameter --> ', question)

    if (question === undefined) {
      questionDoesntExist = true;
    }
    else {
      author = users[question.author];
      if (Object.keys(user.answers).includes(question.id)) {
        console.log('This user has answered this question... redirecting')
        hasAnswered = true;
      }

    }
  }


  return {
    authorizedUser,
    question,
    author,
    hasAnswered,
    questionDoesntExist,
  };

}

export default connect(
  mapStateToProps,
  { handleSaveQuestionAnswer }
)(PollQuestion);
