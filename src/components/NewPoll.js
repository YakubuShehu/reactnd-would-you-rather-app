import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { handleSaveQuestion } from '../actions/questions';


/* Semantic UI for the spinner */
import { Divider } from 'semantic-ui-react';

/* Boostrap Components & Styles */
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Spinner, Form, Card, Button, FloatingLabel } from 'react-bootstrap'

/* Font Awesome and its Awesomeness */
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronLeft, faPlus, faPlusSquare } from '@fortawesome/free-solid-svg-icons';





export class NewPoll extends Component {

    static propTypes = {
        authorizedUser: PropTypes.string.isRequired,
        handleSaveQuestion: PropTypes.func.isRequired
    };

    state = {
        validSubmit: false,
        isLoading: false,
        option1: '',
        option2: ''
    };

    handleChange = e => {
        this.setState({ [e.target.id]: e.target.value });
    };

    handleClick = () => {
        this.props.history.push('/');
    };

    handleSubmit = e => {
        e.preventDefault();
        const { authorizedUser, handleSaveQuestion } = this.props;
        const { option1, option2 } = this.state;

        new Promise((res, rej) => {
            this.setState({ isLoading: true });
            handleSaveQuestion(option1, option2, authorizedUser);
            setTimeout(() => res('success'), 2000);
        }).then(() => {
            this.setState({
                option1: '',
                option2: ''
            });
            this.setState({ validSubmit: true });
        });
    };

    render() {

        const disabled = this.state.option1 === '' || this.state.option2 === '';

        if (this.state.validSubmit === true) {
            return <Redirect to="/" />;
        }
        return (

            <Container id='newPollContainer' className='p-1'>
                <Card className='shadow-sm'>

                    <Card.Header className='bg-light p-3'>
                        <h4 className='fw-bold text-center'><FontAwesomeIcon icon={faPlusSquare} />
                            &nbsp; Create a New Poll Question
                        </h4>
                    </Card.Header>

                    <Card.Body>

                        <p>Complete the question:</p>
                        <hr />
                        <p className='fw-bold'>Would you rather...</p>

                        <div id='newFormContainer'>
                            {this.state.isLoading && (
                                <div className="loader-overlay">
                                    <Spinner animation="border" variant="success">
                                        <span className="visually-hidden">Adding new question...</span>
                                    </Spinner>
                                </div>
                            )}

                            <Form onSubmit={this.handleSubmit}>

                                <FloatingLabel
                                    className="mb-3"
                                    label="Enter option one..."
                                    onChange={this.handleChange}
                                    required>
                                    <Form.Control
                                        id="option1"
                                        onChange={this.handleChange}
                                        type="text"
                                        value={this.state.option1}
                                        placeholder="Enter option one..."
                                        required />
                                </FloatingLabel>

                                {/* Semantic UI to the rescue for the divider */}
                                <Divider horizontal>Or</Divider>

                                <FloatingLabel
                                    className="mb-3"
                                    label="Enter option two..."
                                    required>
                                    <Form.Control
                                        id="option2"
                                        onChange={this.handleChange}
                                        type="text"
                                        value={this.state.option2}
                                        placeholder="Enter option two..."
                                        required />
                                </FloatingLabel>

                                <div className="d-grid mt-4">
                                    <Button
                                        variant="success"
                                        type="submit"
                                        disabled={disabled}
                                    >
                                        <FontAwesomeIcon icon={faPlus} /> Submit
                                    </Button>
                                </div>

                            </Form>

                        </div>

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

function mapStateToProps({ authorizedUser }) {
    return {
        authorizedUser
    };
}

export default connect(
    mapStateToProps,
    { handleSaveQuestion }
)(NewPoll);