import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { Header } from '../Header';
import { userActions } from '../_actions';
import { Footer } from '../Footer';
import Popup from "reactjs-popup";
import { NewCategory } from '../CategoryPage';

class Category extends React.Component {
    componentDidMount() {
      this.props.dispatch(userActions.getAllcategory());
    }

    render() {
      const { user, allcategories } = this.props;
      const current_user = JSON.parse(localStorage.getItem('singleUser'))
      console.log("allcategories*******************************", allcategories)
      return (
        <div>
          <Header />
          <div className="container">
            <div className="">
              <div className="panel panel-primary filterable">
                <div className="panel-heading">
                  <h3 className="panel-title">
                    Categories
                  </h3>
                  <div className="pull-right category-position">
                    <button type="button" className="btn btn-primary" data-toggle="modal" data-target="#exampleModal">
                        <b>+</b>Add New Category
                    </button>
                    <div className="modal fade" id="exampleModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                        <div className="modal-box" role="document">
                          <div className="modal-content">
                            <div className="modal-header textdesign">
                              <p style={{ fontWeight: 'bold' }}>Add New Category</p>
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
                </div>
                <h5 className="loading-msg">{allcategories.loading && <em>Loading All Categories .....</em>}</h5>
                <table className="table table-bordered table table-border">
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
                        <td><Link to={"/category/" + category.id}>{category.id}</Link></td>
                        <td>{category.name}</td>
                      </tr>
                    )}  
                    </tbody>
                  }  
                </table>
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