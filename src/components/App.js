import React, { Fragment } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';
import { handleInitialData } from '../actions/shared';
import { connect } from 'react-redux';

import Login from './Login';
import MainNav from './MainNav';
import Home from './Home';
import PollQuestion from './PollQuestion';
import PollResults from './PollResults';
import NewPoll from './NewPoll';
import Leaderboard from './Leaderboard';
import Error404Page from './Error404Page';


/* Boostrap Components & Styles */
import 'bootstrap/dist/css/bootstrap.min.css';
import { } from 'react-bootstrap';


import '../custom-styles.css';


class App extends React.Component {

  componentDidMount() {
    this.props.handleInitialData();
  }

  render() {
    const { authorizedUser } = this.props;
    return (
      <Router>
        <div className="app">

          {authorizedUser === null ? (
            <Route render={() => (
              <Login />
            )}
            />
          ) : (
            // IF LOGGED IN - Show Body Content 
            <Fragment>
              <MainNav />
                <Switch>
                  <Route exact path="/" component={Home} />
                  <Route path="/questions/not-found" component={Error404Page} />
                  <Route exact path="/questions/:question_id" component={PollQuestion} />
                  <Route exact path="/questions/:question_id/results" component={PollResults} />
                  <Route path="/add" component={NewPoll} />
                  <Route path="/leaderboard" component={Leaderboard} />
                  <Route component={Error404Page} />
                </Switch>
            </Fragment>
          )}

        </div>
      </Router>

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
  { handleInitialData }
)(App);
