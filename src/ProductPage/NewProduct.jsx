import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { Header } from '../Header';
import { userActions } from '../_actions';
import { Footer } from '../Footer';

class NewProduct extends React.Component {
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
          <Header />
          <div className="container">
            <form className="form-horizontal" role="form">
              <center><h2>Add New Product</h2></center><br/>
              <div className="form-group">
                <label for="productname" className="col-sm-2 control-label">Product Name</label>
                <div className="col-sm-9">
                  <input type="text" id="productname" placeholder="Product Name" className="form-control" autofocus />
                </div>
              </div>
              <div className="form-group">
                <label for="productid" className="col-sm-2 control-label">Product ID</label>
                <div className="col-sm-9">
                  <input type="text" id="productid" placeholder="Product ID" className="form-control" autofocus />
                </div>
              </div>
              <div className="form-group">
                <label for="description" className="col-sm-2 control-label">Description</label>
                <div className="col-sm-9">
                  <input type="text" id="description" placeholder="Description" className="form-control" />
                </div>
              </div>
              <div className="form-group">
                <label for="uploadeddate" className="col-sm-2 control-label">Date Uploaded</label>
                <div className="col-sm-9">
                  <input type="date" id="uploadeddate" className="form-control" />
                </div>
              </div>
            
              <div className="form-group">
                <div className="col-sm-9 col-sm-offset-2">
                    <button type="submit" className="btn btn-primary btn-block">Create Product</button>
                </div>
              </div>
            </form>
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

const connectedNewProduct = connect(mapStateToProps)(NewProduct);
export { connectedNewProduct as NewProduct };