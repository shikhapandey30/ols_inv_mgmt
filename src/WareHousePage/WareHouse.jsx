import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { Header } from '../Header';
import { userActions } from '../_actions';
import { Footer } from '../Footer';

class WareHouse extends React.Component {
    componentDidMount() {
      console.log("mount")
        this.props.dispatch(userActions.getAllwarehouse());
    }

    handleDeleteUser(id) {
        return (e) => this.props.dispatch(userActions.delete(id));
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
                   <a href="/products"><button type="button" className="btn btn-default">Product</button></a>
                    <a href="/products"><button type="button" className="btn btn-default active">Warehouse</button></a></h3>

                  <div className="pull-right">
                    <a href="/new-warehouse" className="btn btn-primary btn-xs pull-right"><b>+</b> Add new Warehouse
                    </a>
                  </div>
                </div>
                <table className="table table-bordered table table-border">
                  <thead>
                    <tr className="filters">
                      <th>S.No</th>
                      <th>Warehouse Name</th>
                      <th>Warehouse ID</th>
                    </tr>  
                  </thead>
                  <tbody>
                    <tr>
                      <td>1</td>
                      <td>Mumbai</td>
                      <td>Warehouse ID 1</td>
                    </tr>
                    <tr>
                      <td>2</td>
                      <td>Delhi</td>
                      <td>Warehouse ID 2</td>
                    </tr>
                    <tr>
                      <td>3</td>
                      <td>Noida</td>
                      <td>Warehouse ID 3</td>
                    </tr>
                    <tr>
                      <td>4</td>
                      <td>Warehouse 4</td>
                      <td>Warehouse ID 4</td>
                    </tr>
                    <tr>
                      <td>5</td>
                      <td>Warehouse 5</td>
                      <td>Warehouse ID 5</td>
                    </tr>
                    <tr>
                      <td>6</td>
                      <td>Warehouse 6</td>
                      <td>Warehouse ID 6</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <center><button type="button" className="btn btn-default active">Submit</button></center>
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

const connectedWareHouse = connect(mapStateToProps)(WareHouse);
export { connectedWareHouse as WareHouse };