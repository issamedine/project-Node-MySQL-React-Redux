import React, { useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import './App.css';

// Redux
import { Provider } from "react-redux";
import store from "./Redux/store";
import { getAllUser, loadUser } from "./Redux/actions/user"

import Navbar from './components/Navbar/Navbar'
import Login from './components/Login/Login'
import Signup from './components/Signup/Signup'
import ListUser from './components/ListUser/ListUser'


const App = () => {

  useEffect(() => {
    store.dispatch(getAllUser());
    const token = window.localStorage.getItem('token')
    console.log('token', token)
    if (token) {
      store.dispatch(loadUser())
    }
  }, []);

  return (
    <Provider store={store}>
      <Router>
        <Navbar />
        <div className="App">
          <p className="text-center">Welcome</p>
          <Switch>
            <Route
              exact
              path="/login"
              render={(props) => <Login {...props} />}
            />
            <Route
              exact
              path="/signup"
              render={(props) => <Signup {...props} />}
            />
            <Route
              exact
              path="/list-user"
              render={(props) => <ListUser {...props} />}
            />
          </Switch>
        </div>

      </Router>
    </Provider>
  );
}


export default App;
