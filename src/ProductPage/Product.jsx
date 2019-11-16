import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { Header } from '../Header';
import { userActions } from '../_actions';
import { Footer } from '../Footer';

class Product extends React.Component {
    componentDidMount() {
      console.log("mount")
        this.props.dispatch(userActions.getAllproduct());
    }

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
          <Header />
          <div className="container">
            <div className="">
              <div className="panel panel-primary filterable">
                <div className="panel-heading">
                  <h3 className="panel-title"> 
                   <a href="/products"><button type="button" className="btn btn-default active">Product</button></a>
                    <a href="/warehouse"><button type="button" className="btn btn-default">Warehouse</button></a></h3>

                  <div className="pull-right">
                    <a href="/new-product" className="btn btn-primary btn-xs pull-right"><b>+</b> Add new Product
                    </a>
                  </div>
                </div>
                <table className="table table-bordered table table-border">
                  <thead>
                    <tr className="filters">
                      <th>Check Box</th>
                      <th>S.No</th>
                      <th>Product Name</th>
                      <th>Product ID</th>
                    </tr>  
                  </thead>
                  <tbody>
                    <tr>
                      <td><input type="Checkbox" /></td>
                      <td>1</td>
                      <td>Product 1</td>
                      <td>Product ID 1</td>
                    </tr>
                    <tr>
                      <td><input type="Checkbox" /></td>
                      <td>2</td>
                      <td>Product 2</td>
                      <td>Product ID 2</td>
                    </tr>
                    <tr>
                      <td><input type="Checkbox" /></td>
                      <td>3</td>
                      <td>Product 3</td>
                      <td>Product ID 3</td>
                    </tr>
                    <tr>
                      <td><input type="Checkbox" /></td>
                      <td>4</td>
                      <td>Product 4</td>
                      <td>Product ID 4</td>
                    </tr>
                    <tr>
                      <td><input type="Checkbox" /></td>
                      <td>5</td>
                      <td>Product 5</td>
                      <td>Product ID 5</td>
                    </tr>
                    <tr>
                      <td><input type="Checkbox" /></td>
                      <td>6</td>
                      <td>Product 6</td>
                      <td>Product ID 6</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <button type="button" className="btn btn-default active">Submit</button>
              <button type="button" className="btn btn-default active pull-right">Delete</button>
            </div>
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

const connectedProduct = connect(mapStateToProps)(Product);
export { connectedProduct as Product };