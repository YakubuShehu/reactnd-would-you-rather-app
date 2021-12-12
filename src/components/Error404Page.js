import React, { Component } from 'react';


/* Boostrap Components & Styles */
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Card, Button } from 'react-bootstrap'


/* Font Awesome and its Awesomeness */
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronLeft, faSkullCrossbones } from '@fortawesome/free-solid-svg-icons';


export class Error404Page extends Component {


    handleClick = () => {
        this.props.history.push('/');
    };

    render() {

        return (
            <Container id='error404Container' className='p-1'>
                <Card className='shadow-sm'>
                    <Card.Header className='bg-light p-3'>
                        <h4 className='fw-bold text-center'><FontAwesomeIcon icon={faSkullCrossbones} />
                            &nbsp; Uh-Oh. Page Not Found
                            <br/><br/>
                            Looks like there was a glitch in the matrix
                        </h4>
                    </Card.Header>
                    <Card.Body>

                        <p className="text-center py-5">Sorry, we can't seem to find the page/content you are looking for...</p>

                        <Container className='d-flex justify-content-center py-3 px-0' id='backButtonContainer'>
                            <Button
                                className=""
                                variant="outline-secondary"
                                size="lg"
                                onClick={this.handleClick}
                            >
                                <FontAwesomeIcon icon={faChevronLeft} /> Back to Home
                            </Button>
                        </Container>
                    </Card.Body>
                </Card>
            </Container>
        );
    }
}


export default Error404Page;
