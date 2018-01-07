import React from 'react';
import {BrowserRouter as Router, Route, Link, Switch, browserHistory} from 'react-router-dom';
import {Home} from './home';
import {Login} from './login';
import {Register} from './register';
export const Header = () => {
    return (
      <Router history="browserHistory">
          <div className="container">
              <div className="header clearfix">
                <nav>
                  <ul className="nav nav-pills pull-right">
                        <li role="presentation"><a href="/">Home</a></li>
                        <li role="presentation"><a href="/login">Login</a></li>
                        <li role="presentation"><a href="/register">Register</a></li>
                        <li role="presentation"><a href="/users/auth/facebook" className="btn btn-primary"><span className="fa fa-facebook">Facebook</span></a></li>
                        <li role="presentation"><a href="/users/auth/Google" className="btn btn-danger"><span className="fa fa-google-plus">Google</span></a></li>
                  </ul>
                </nav>
                <h3 className="text-muted">Login App</h3>
              </div>

                <Route exact path="/" component={Home}/>
                <Route path="/login" component={Login}/>
                <Route path="/register" component={Register}/>
          </div>
      </Router>
    );
}
