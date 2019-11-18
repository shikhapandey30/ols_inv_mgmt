import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { userActions } from '../_actions';

class Header extends React.Component {
    // componentDidMount() {
    //   console.log("mount")
    //     this.props.dispatch(userActions.getAll());
    // }

    handleDeleteUser(id) {
        return (e) => this.props.dispatch(userActions.delete(id));
    }

    render() {
      const { user, users} = this.props;
      const current_user = JSON.parse(localStorage.getItem('singleUser'))
      console.log("users", users)
      return (

        <div id="main">
            <nav>
              <div className="nav-xbootstrap">
                <ul>
                  <li><a href="/home">Dashboard</a></li>
                  <li><a href="javascript:void(0)">Master<span className="glyphicon glyphicon-chevron-down iconsize"></span></a>
                    <ul className="dropdown">
                    <li><a href="/categories">Categories</a></li>
                      <li><a href="">Inventory</a></li>
                      <li><a href="/products">Set Up</a></li>
                    </ul>
                  </li>
                  <li><a href="javascript:void(0)" >Transaction<span className="glyphicon"></span></a>
                  </li>
                  <li><a href="javascript:void(0)" >Report<span className=""></span></a>
                  </li>
                  <li><a href="javascript:void(0)" >Warehouse<span className="glyphicon glyphicon-chevron-down iconsize"></span></a>
                    <ul className="dropdown">
                      <li><a href="https://xbootstrap.com">Tools</a></li>
                      <li><a href="https://xbootstrap.com">Backlink</a></li>
                    </ul>
                  </li>
                 <li><a href="javascript:void(0)" >Clinic<span className="glyphicon glyphicon-chevron-down iconsize"></span></a>
                    <ul className="dropdown">
                      <li><a href="https://xbootstrap.com">Tools</a></li>
                      <li><a href="https://xbootstrap.com">Backlink</a></li>
                    </ul>
                  </li>

                  <li className="nav-item dropdown pull-right">
                    <a className="nav-link " id="navbarDropdownMenuLink-333" data-toggle="dropdown"
                      aria-haspopup="true" aria-expanded="false">
                      <i className="glyphicon glyphicon-th-list"></i>
                    </a>
                    <div className="dropdown-menu dropdown-menu-right dropdown-default dropdown-d-color"
                      aria-labelledby="navbarDropdownMenuLink-333">
                      <a className="dropdown-item" href="/login">Logout</a>
                     
                    </div>
                  </li>
                </ul>
              </div>
            </nav>
            <div className='content'>
            </div>
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

const connectedHeader = connect(mapStateToProps)(Header);
export { connectedHeader as Header };