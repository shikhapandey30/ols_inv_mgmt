import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { userActions } from '../_actions';

class LoginPage extends React.Component {
    constructor(props) {
        super(props);

        // reset login status
        this.props.logout();

        this.state = {
            username: '',
            password: '',
            submitted: false
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(e) {
        const { name, value } = e.target;
        this.setState({ [name]: value });
    }

    handleSubmit(e) {
        e.preventDefault();

        this.setState({ submitted: true });
        const { username, password } = this.state;
        if (username && password) {
            this.props.login(username, password);
        }
    }

    render() {
        const { loggingIn } = this.props;
        const { username, password, submitted } = this.state;
        return (
            <div id="login">
              <h3 className="text-center text-white pt-5">Welcome Back</h3>
              <div className="container">
                <div id="login-row" className="row justify-content-center align-items-center">
                  <div id="login-column" className="col-md-6">
                    <div id="login-box" className="col-md-12">
                      <form name="form" onSubmit={this.handleSubmit} id="loginform" className="auth-form" role="form">
                        <input id="ReturnUrl" name="ReturnUrl" type="hidden" />
                          <h3 className="text-center text-info">Login</h3>
                          <div className={'row-input-field'+ 'form-group' + (submitted && !username ? ' has-error' : '')}>
                            <label htmlFor="username" className="text-info">username:</label><br />
                            {submitted && !username &&
                             <div className="help-block">username is required</div>
                            }
                            
                            <input type="text" name="username" id="username" className="form-control" name="username" value={username} onChange={this.handleChange} placeholder="username" />
                          </div>
                          <div className={'text-box single-line password'+ 'form-group' + (submitted && !password ? ' has-error' : '')}>
                            <label htmlFor="password" className="text-info">Password:</label><br />
                            {submitted && !password &&
                              <div className="help-block">Password is required</div>
                            }
                            
                            <input type="Password" name="password" id="password" className="form-control" name="password" value={password} onChange={this.handleChange} placeholder="Password" />
                          </div>
                          <div className="form-group">
                            <br />
                            <button className="btn btn-info btn-md">submit</button>
                            {loggingIn &&
                              <img />
                            }<hr/>
                          </div>
                          <div id="register-link" className="text-right">
                              <a href="/register" className="text-info">Register here</a>
                          </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div> 
        );
    }
}

function mapState(state) {
    const { loggingIn } = state.authentication;
    return { loggingIn };
}

const actionCreators = {
    login: userActions.login,
    logout: userActions.logout
};

const connectedLoginPage = connect(mapState, actionCreators)(LoginPage);
export { connectedLoginPage as LoginPage };