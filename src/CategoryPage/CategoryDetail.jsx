import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { Header } from '../Header';
import { userActions } from '../_actions';
import { Footer } from '../Footer';
import axios from 'axios';
import config from 'config';


class CategoryDetail extends React.Component {
    componentDidMount(product) {
      this.props.dispatch(userActions.getcategorydetail(this.props.match.params.id));
    }

    categoryDelete = (id) => {
       const headers = {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem('user')).data.token
        }
        console.log("******************************************", id)
        axios.delete(`${config.apiUrl}/categories/${id}`, {
      headers: headers
      })
        .then(response => {
          this.setState({ locations: response.data });
          window.location = "/categories"
        })
    }

    render() {
      const { user, category } = this.props
      const current_user = JSON.parse(localStorage.getItem('singleUser'))
      return (
        <div>
          <Header />
          <div className="container">
            <div className="">
              <div className="panel panel-primary filterable">
                <div className="panel-heading">
                  { category.items && 
                    <h3 className="panel-title"> 
                     {category.items.name}
                    </h3>
                  }
                  { category.items && 
                    <div className="pull-right btn-style">
                      <button className="btn btn-danger" onClick={() => {if(window.confirm('Delete the item?')){this.categoryDelete(category.items.id)};}}>Delete</button>
                      <button className="btn btn-default">
                      <Link to={"/category/" + category.items.id + "/edit"} onClick={this.forceUpdate}>Edit</Link></button>
                    </div>
                  }
                </div>
                { category.items && 
                  <table className="table table-bordered table table-border">
                    <tbody>
                      <tr>
                        <td>Category ID</td>
                        <td>{category.items.id}</td>
                      </tr>
                      <tr>
                        <td>Category Name</td>
                        <td>{category.items.name}</td>
                      </tr>
                      
                    </tbody>
                  </table>
                }
              </div>
            </div>
          </div>
        </div>  
      );
    }
}

function mapStateToProps(state) {
  const { categoryid, category, authentication } = state;
  const { user } = authentication;
  return {
    user,
    category
  };
}

const connectedCategoryDetail = connect(mapStateToProps)(CategoryDetail);
export { connectedCategoryDetail as CategoryDetail };