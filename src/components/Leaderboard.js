import React, { Component, Fragment } from 'react';
import PropType from 'prop-types';
import { connect } from 'react-redux';


/* Boostrap Components & Styles */
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Image, Card, Button, Row, Col, Table } from 'react-bootstrap'

/* Font Awesome and its Awesomeness */
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronLeft, faTrophy } from '@fortawesome/free-solid-svg-icons';


const podiumStyle = ['warning', 'primary', 'danger'];


export class Leaderboard extends Component {

  static propType = {
    leaderboardData: PropType.array.isRequired
  };


  handleClick = () => {
    this.props.history.push('/');
  };


  render() {
    const { leaderboardData } = this.props;

    return (

      <Container id='leaderboardContainer' className='p-1'>

        <Card className='shadow-sm'>

          <Card.Header className='bg-light p-3'>
            <h4 className='fw-bold text-center'><FontAwesomeIcon icon={faTrophy} />
              &nbsp; Leaderboard
            </h4>
          </Card.Header>

          <Card.Body>
            <Fragment>

              {leaderboardData.map((user, position) => (

                <Card
                  className='shadow-sm mb-4'
                  key={position}
                  border={position < 3 ? podiumStyle[position] : "light"}
                >
                  <span
                    className={`position-absolute p-2 top-0 start-0 translate-middle badge bg-${position < 3 ? podiumStyle[position] : "secondary"}`}>
                    <FontAwesomeIcon icon={faTrophy} />
                    <span className="visually-hidden">Position #{position}</span>
                  </span>
                  <Card.Body>
                    <Row>
                      <Col className="m-auto text-center" sm={3}>
                        <Image className="img-fluid" roundedCircle thumbnail src={user.avatarURL} width={125} draggable='false' />
                      </Col>
                      <Col className="py-3 left-border-col" sm={6}>
                        <h6 className="fw-bold eight-bit-font">{user.name}</h6>

                        <Table className="mt-2" striped bordered size="lg" responsive>
                          <tbody>
                            <tr>
                              <td>Answered questions</td>
                              <td>{user.answerCount}</td>
                            </tr>
                            <tr>
                              <td>Created questions</td>
                              <td>{user.questionCount}</td>
                            </tr>
                          </tbody>
                        </Table>
                      </Col>
                      <Col className="m-auto text-center left-border-col" sm={3}>
                        <Card className='shadow-sm mb-3'>
                          <Card.Header className="fw-bold">Score</Card.Header>
                          <Card.Body>
                            <span
                              className={`badge rounded-pill bg-${position < 3 ? podiumStyle[position] : "secondary"} p-3 fs-6`}>
                              {user.questionCount + user.answerCount}
                            </span>
                          </Card.Body>
                        </Card>
                      </Col>
                    </Row>
                  </Card.Body>
                </Card>
              ))}

            </Fragment>

          </Card.Body>
        </Card>

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

      </Container>



    );
  }
}

function mapStateToProps({ users }) {

  const leaderboardData = Object.values(users)
    .map(user => ({
      id: user.id,
      name: user.name,
      avatarURL: user.avatarURL,
      answerCount: Object.values(user.answers).length,
      questionCount: user.questions.length,
      total: Object.values(user.answers).length + user.questions.length
    }))
    .sort((a, b) => a.total - b.total)
    .reverse();

  return {
    leaderboardData
  };

}

export default connect(mapStateToProps)(Leaderboard);