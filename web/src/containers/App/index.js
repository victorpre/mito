// @flow
import React, { Component } from 'react';
import { BrowserRouter as Router,
  Route,
  Link,
  Switch
} from 'react-router-dom';
import { connect } from 'react-redux';
import { authenticate } from '../../actions/session';
import '../../styles/css/App.css';
import Home from '../Home';
import NotFound from '../../components/NotFound';
import Signup from '../Signup';

type Props = {
  authenticate: () => void,
}

class App extends Component {
  componentWillMount(){
    const primaryColor = "#f06292";
      document.body.style.backgroundColor = primaryColor;
  }
  componentWillUnmount(){
      document.body.style.backgroundColor = null;
  }

  componentDidMount() {
    const token = localStorage.getItem('token');

    if (token) {
      this.props.authenticate();
    }
  }

  props: Props

  render() {
    return (
      <Router>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/signup" component={Signup} />
          <Route component={NotFound} />
        </Switch>
      </Router>
    );
  }
}

export default connect(
  null,
  { authenticate }
)(App);
