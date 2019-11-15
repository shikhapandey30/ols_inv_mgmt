import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { Header } from '../Header';
import { userActions } from '../_actions';
import { Footer } from '../Footer';

class HomePage extends React.Component {
    // componentDidMount() {
    //   console.log("mount")
    //     this.props.dispatch(userActions.getAll());
    // }

    handleDeleteUser(id) {
        return (e) => this.props.dispatch(userActions.delete(id));
    }

    fProfile(user) {
        const { dispatch } = this.props;
        dispatch(userActions.getAllprofile(user.id));
    }

    render() {
      const { user, users } = this.props;
      const current_user = JSON.parse(localStorage.getItem('singleUser'))
      console.log("users", users)
      return (
        <div>
          <div className="">
          <Header />
          <div className="vc_row-full-width vc_clearfix"></div>
            <center><h1>Welcome</h1></center>
          </div>
          <Footer />
        </div>  
      );
    }
}

function mapStateToProps(state) {
  const { users, authentication } = state;
  const { user } = authentication;
  return {
    user,
    users
  };
}

const connectedHomePage = connect(mapStateToProps)(HomePage);
export { connectedHomePage as HomePage };