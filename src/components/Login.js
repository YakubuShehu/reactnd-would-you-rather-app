import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { setLoggedInUser } from '../actions/user-auth';

/* Semantic UI for the Form */
import { Form } from 'semantic-ui-react';
import 'semantic-ui-css/semantic.min.css'

/* Boostrap Components & Styles */
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Card, Image } from 'react-bootstrap'



export class Login extends Component {
  state = {
    loading: false
  };
  handleLoading = () => {
    this.setState({ loading: true });
  };

  render() {
    return (
      <Container className='p-5' id='loginContainer'>

        <Card>
          <Card.Header className='text-center'>
            <h6 className='fw-bold'>Welcome to the "WOULD YOU RATHER" app.</h6>
            <small className='eight-bit-font'><i>- EXCEPT IT'S THE MATRIX VERSION -</i></small>
          </Card.Header>
          <Card.Body className='text-center pb-0' bg='white'>
            <Image className='img-fluid' src="../../images/blue-pill-red-pill.png" width={200} draggable='false' />
          </Card.Body>
          <Card.Footer className='text-center py-5 bg-light'>

            <h3 className='fw-bold text-success'>SIGN IN</h3>
            <small>Please select a user to login and continue.</small>
            <hr />
            <ConnectedLoginForm onLoading={this.handleLoading} />

          </Card.Footer>
        </Card>

      </Container>
    );
  }
}





class UserLoginForm extends Component {

  static propTypes = {
    onLoading: PropTypes.func.isRequired
  };

  state = {
    value: ''
  };

  onChange = (e, { value }) => {
    this.setState({ value });
  };

  handleSubmit = e => {
    e.preventDefault();
    const { onLoading, setLoggedInUser } = this.props;
    const authorizedUser = this.state.value;

    new Promise((res, rej) => {
      onLoading();
      setTimeout(() => res(), 500);
    }).then(() => setLoggedInUser(authorizedUser));
  };

  getUserListForDropdown = () => {
    const { users } = this.props;

    return users.map(user => ({
      key: user.id,
      text: user.name,
      value: user.id,
      image: { avatar: true, src: user.avatarURL }
    }));
  };


  render() {
    const { value } = this.state;
    const disabled = value === '' ? true : false;

    return (
      <Form onSubmit={this.handleSubmit}>
        <Form.Dropdown
          placeholder="Select a Friend"
          fluid
          selection
          scrolling
          options={this.getUserListForDropdown()}
          value={value}
          onChange={this.onChange}
          required
        />
        <Form.Button content="Proceed" positive disabled={disabled} fluid />
      </Form>
    );
  }

}

const ConnectedLoginForm = connect(
  mapStateToProps,
  { setLoggedInUser }
)(UserLoginForm);

function mapStateToProps({ users }) {
  return {
    users: Object.values(users)
  };
}

export default Login;