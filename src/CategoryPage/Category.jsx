import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { Header } from '../Header';
import { userActions } from '../_actions';
import { Footer } from '../Footer';
import config from 'config';
import { NewCategory } from '../CategoryPage';
import MUIDataTable from "mui-datatables";
import { Route, Redirect } from 'react-router-dom';
require('react-dom');

class Category extends React.Component {
    componentDidMount() {
      this.props.dispatch(userActions.getAllcategory());
    }

    render() {
      const { user, allcategories } = this.props;
      const current_user = JSON.parse(localStorage.getItem('singleUser'))
      console.log("allcategories*******************************", allcategories)
      var columns = ["Name", "Company", "City", "State"];
      var data = [
       ["Joe James", "Test Corp", "Yonkers", "NY"],
       ["John Walsh", "Test Corp", "Hartford", "CT"],
       ["Bob Herm", "Test Corp", "Tampa", "FL"],
       ["James Houston", "Test Corp", "Dallas", "TX"],
      ];

      var options = {
        filterType: 'checkbox',
      };

      return (
        <div>
          <Header />
          <div className="container">
            <div>
              <div className="page-header">
                <h1 className="page-title">
                  Categories
                  <div className="pull-right">
                    <button type="button" className="btn btn-primary" data-toggle="modal" data-target="#exampleModal">
                      <i className="fa fa-plus" aria-hidden="true"></i> Add New Category
                    </button>
                  </div>
                </h1>
              </div>
              <div className="panel filterable">
                {allcategories.loading && <h5 className="loading-msg"><em>Loading All Categories .....</em></h5>}
                <table className="table table-hover">
                  <thead>
                    <tr className="filters">
                      <th>S.No</th>
                      <th>ID</th>
                      <th>Name</th>
                    </tr>  
                  </thead>
                  { allcategories.items && allcategories.items.length > 0 &&
                    <tbody>
                    {allcategories.items.map((category, index) =>
                      <tr key={category.id} >
                        <td>{index + 1}</td>
                        <td><Link to={"/category/" + category.id} onClick={this.forceUpdate}>{category.id}</Link></td>
                        <td>{category.name}</td>
                      </tr>
                    )}  
                    </tbody>
                  }     
                </table>
              </div>
            </div>
          </div>
          <div className="modal fade" id="exampleModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-box" role="document">
              <div className="modal-content">
                <div className="modal-header textdesign">
                  <p style={{ fontWeight: 'bold' }}>Add New Purchase Order</p>
                  <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                  </button>
                </div>
                <div className="modal-body">
                  <NewCategory/>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    }
}

function mapStateToProps(state) {
  const { allcategories, authentication } = state;
  const { user } = authentication;
  return {
    user,
    allcategories
  };
}

const connectedCategory = connect(mapStateToProps)(Category);
export { connectedCategory as Category };