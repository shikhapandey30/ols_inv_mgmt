import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { userActions } from '../_actions';

class RegisterPage extends React.Component {
  constructor(props) {
      super(props);

      this.state = {
          user: {
              first_name: '',
              second_name: '',
              email: '',
              password: ''
          },
          submitted: false
      };

      this.handleChange = this.handleChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
      this.responseFacebook = this.responseFacebook.bind(this);
      this.onSuccess = this.onSuccess.bind(this);
  }

  handleChange(event) {
      const { name, value } = event.target;
      const { user } = this.state;
      this.setState({ user: { ...user, [name]: value } });
  }

  handleSubmit(event) {
      event.preventDefault();

      this.setState({ submitted: true });
      const { user } = this.state;
      const { dispatch } = this.props;
     
      if (user.first_name && user.second_name && user.email && user.password) {
          dispatch(userActions.register(user));
      }
  }

  onSuccess(response) {
    const token = response.headers.get('x-auth-token');
    response.json().then(user => {
      if (token) {
        this.setState({isAuthenticated: true, user: user, token: token});
      }
    });
  };

  onFailed(error){
    alert(error);
  };

  responseFacebook(responseuser) {
    console.log("Fbreponse", responseuser)
    const { dispatch } = this.props;
    if (responseuser && responseuser.email) {
      dispatch(userActions.fblogin(responseuser.email, responseuser.accessToken, responseuser.userID, "Facebook"));
    }

  }

    render() {
      const { registering  } = this.props;
      const { user, submitted } = this.state;
      return (
        <div id="login">
          <div className="container">
            <div id="login-row" className="row justify-content-center align-items-center">
              <div id="login-column" className="col-md-6">
                <div className="col-md-12 regis">
                 <form name="form" onSubmit={this.handleSubmit} id="signupform" className="auth-form" role="form">
                    <input id="ReturnUrl" name="ReturnUrl" type="hidden" />
                    <h3 className="text-center text-info">Register</h3><hr/>
                    <div className={'row-input-field' + (submitted && !user.email ? ' has-error' : '')}>
                     
                      <label htmlFor="Email" className="text-info">Email:</label>
                      {submitted && !user.email &&
                      <div className="help-block">Email Address is required</div>
                      }

                      <input type="email" className="text-box single-line email form-control" name="email" value={user.email} onChange={this.handleChange} placeholder="Email Address" />
                    </div>

                    <div className={'row-input-field' + (submitted && !user.first_name ? ' has-error' : '')}>
                      <label htmlFor="first_name" className="text-info">First Name:</label>
                      {submitted && !user.first_name &&
                      <div className="help-block">First Name is required</div>
                      }

                      <input type="text" className="text-box single-line email form-control" name="first_name" value={user.first_name} onChange={this.handleChange} placeholder="First Name" />
                    </div>

                    <div className={'row-input-field' + (submitted && !user.second_name ? ' has-error' : '')}>
                      <label htmlFor="second_name" className="text-info">Last Name:</label>
                      
                      {submitted && !user.second_name &&
                      <div className="help-block">Last Name is required</div>
                      }
                      <input type="text" className="text-box single-line email form-control" name="second_name" value={user.second_name} onChange={this.handleChange} placeholder="Last Name" />
                    </div>

                    <div className={'text-box single-line password' + 'form-control' + (submitted && !user.password ? ' has-error' : '')}>
                      <label htmlFor="Password" className="text-info">Password:</label>
                      {submitted && !user.password &&
                      <div className="help-block">Password is required</div>
                      }
                      <input type="password" id="login-password" className="text-box form-control" name="password" value={user.password} onChange={this.handleChange} placeholder="Password" />
                    </div>

                    <div className="mb-30">
                    </div><br/>

                    <div className="form-group">
                    <button className="btn btn-info btn-md">Register</button>
                      {registering &&
                        <img />
                      }<hr/>
                    </div> 
                    <div className="center">
                       Already have an account? Click <a className="text-underline" href="/login">here</a>.
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

function mapStateToProps(state) {
    const { registering } = state.registration;
    return {
        registering
    };
}

const connectedRegisterPage = connect(mapStateToProps)(RegisterPage);
export { connectedRegisterPage as RegisterPage };