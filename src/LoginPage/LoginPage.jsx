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
              <div className="container ">
              <h3 className="text-center">Login</h3>
                <div className="row  align-items-center justify-content-center login-form ">
                  <div className="col-md-6  p-3 mb-5 bg-white rounded ">

                      <form onSubmit={this.handleSubmit} id="loginform">
                        <div className="form-group className={'row-input-field'+ 'form-group' + (submitted && !username ? ' has-error' : '')}">
                          <label htmlFor="exampleInputEmail1">Email Address</label>
                            {submitted && !username &&
                             <div className="help-block">username is required</div>
                            }
                          <input type="email" name="username" className="form-control" value={username} onChange={this.handleChange} id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" />
                          <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
                        </div>
                        <div className="form-group {'text-box single-line password'+ 'form-group' + (submitted && !password ? ' has-error' : '')}">
                          <label htmlFor="exampleInputPassword1">Password</label>
                          {submitted && !password &&
                              <div className="help-block">Password is required</div>
                            }
                          <input type="password" name="password" value={password} onChange={this.handleChange} className="form-control" id="exampleInputPassword1" placeholder="Password" />
                        </div>
                        <div className="form-group form-check check-box">
                          <input type="checkbox" className="form-check-input" id="exampleCheck1" />&nbsp;&nbsp;&nbsp;&nbsp;
                          <label className="form-check-label" htmlFor="exampleCheck1">Remeber me</label>
                        </div>
                        <button type="submit" className="btn btn-primary">Submit</button>
                          {loggingIn &&
                              <img />
                            }
                      </form>
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