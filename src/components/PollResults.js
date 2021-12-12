import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { withRouter, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';


/* Boostrap Components & Styles */
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Col, Image, Card, Button, ProgressBar } from 'react-bootstrap'

/* Font Awesome and its Awesomeness */
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheckCircle, faChevronLeft } from '@fortawesome/free-solid-svg-icons';



const ChosenVoteLabel = () => (
  <div>
    <span className="position-absolute top-0 start-100 translate-middle badge bg-warning text-dark">
      <FontAwesomeIcon icon={faCheckCircle} />
      <br />
      Your
      <br />
      Chosen
      <br />
      Answer
      <span className="visually-hidden">to the question</span>
    </span>
  </div>
);



export class PollResults extends Component {

  static propTypes = {
    history: PropTypes.object.isRequired,
    question: PropTypes.object.isRequired,
    user: PropTypes.object.isRequired
  };

  handleClick = () => {
    this.props.history.push('/');
  };

  render() {
    const { question, user, author, hasAnswered } = this.props;

    // Redirect to Results Page if already answered
    if (!hasAnswered) {
      return <Redirect to={`/`} />
    }


    const optionOneVotes = question.optionOne.votes.length;
    const optionTwoVotes = question.optionTwo.votes.length;
    const totalVotes = optionOneVotes + optionTwoVotes;
    const userVote = user.answers[question.id];
    const optionOnePercentage = ((optionOneVotes / totalVotes) * 100).toFixed();
    const optionTwoPercentage = ((optionTwoVotes / totalVotes) * 100).toFixed();


    let option1Style = 'secondary', option2Style = 'secondary';
    if (optionOneVotes > optionTwoVotes) {
      option1Style = 'success';
    } else if (optionTwoVotes > optionOneVotes) {
      option2Style = 'success';
    }

    return (
      <Container id='questionResultsContainer' className='p-1'>
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
              <Col className="my-3" sm={8}>
                <h4 className="fw-bold eight-bit-font text-center text-sm-start">RESULTS</h4>
                <hr />
                <h6 className="fw-bold text-center text-sm-start">Would you rather...</h6>

                <Container className='p-4 bg-light border rounded text-left' id='questionsContainer'>
                  
                  <Card className="my-3" border={option1Style}>

                    {userVote === 'optionOne' && <ChosenVoteLabel />}

                    <Card.Body>
                      <p className='fw-bold text-center'>{question.optionOne.text}</p>
                      <ProgressBar
                        now={optionOnePercentage}
                        label={`${optionOnePercentage}%`}
                        variant={option1Style} />
                      <hr />
                      <p className="text-muted text-center small fw-bolder">
                        {optionOneVotes} out of {totalVotes} votes
                      </p>
                    </Card.Body>
                    {/* <Card.Footer className="text-center fw-light small">OPTION 1</Card.Footer> */}

                  </Card>


                  <Card className="my-5" border={option2Style}>

                    {userVote === 'optionTwo' && <ChosenVoteLabel />}

                    <Card.Body>
                      <p className='fw-bold text-center'>{question.optionTwo.text}</p>
                      <ProgressBar
                        now={optionTwoPercentage}
                        label={`${optionTwoPercentage}%`}
                        variant={option2Style} />
                      <hr />
                      <p className="text-muted text-center small fw-bolder">
                        {optionTwoVotes} out of {totalVotes} votes
                      </p>
                    </Card.Body>
                    {/* <Card.Footer className="text-center fw-light small">OPTION 2</Card.Footer> */}

                  </Card>

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

  let question;
  let hasAnswered = true;

  if (question_id !== undefined) {
    question = questions[question_id]
    // console.log('Question retrieved from props --> ', question)
  }

  else {
    const { question_id } = match.params;
    question = questions[question_id];
    // console.log('Question ID retrieved from URL parameter --> ', question)
  }

  const user = users[authorizedUser];
  if (!Object.keys(user.answers).includes(question.id)) {
    hasAnswered = false;
    console.log('This user has not answered this question and should not be able to view results... redirecting')
  }

  const author = users[question.author];

  return {
    user,
    question,
    author,
    hasAnswered
  };

}

export default withRouter(connect(mapStateToProps)(PollResults));
