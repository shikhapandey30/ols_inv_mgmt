import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { Header } from '../Header';
import { userActions } from '../_actions';
import { Footer } from '../Footer';
import axios from 'axios';
import config from 'config';
import { RSAA } from 'redux-api-middleware'


class WareHouseAllUser extends React.Component {
    componentDidMount(warehouse) {
      this.props.dispatch(userActions.getwarehouseuser(this.props.match.params.id));
    }

  //   componentDidMount() {
  //   // const apiUrl = 'http://18.217.112.188:8084/api/v1/inventory/warehouses/1201/users';

  //   const options = {
  //     method: 'GET'
  //   }
  //   fetch("http://18.217.112.188:8084/api/v1/inventory/warehouses/1201/users", options)
  //     .then(res => res.json())
  //     .then(
  //       (result) => {
  //         this.setState({
  //           response: result,
  //         });
  //       },
  //       (error) => {
  //         this.setState({ error });
  //       }
  //     )
  // }
    
    render() {
      const { user, warehouse, warehousealluser } = this.props
      const current_user = JSON.parse(localStorage.getItem('singleUser'))
      console.log("warehousealluser", warehousealluser)
      return (
        <div>
          <Header />
          <div className="container">
            <div className="">
              <div className="panel panel-primary filterable">
                <div className="panel-heading">
                  { warehousealluser.items && 
                    <h3 className="panel-title"> 
                     {warehousealluser.items.name}
                    </h3>
                  }
                  
                </div>
                { warehousealluser.items && 
                  <table className="table table-bordered table table-border">
                    <tbody>
                      <tr>
                        <td>warehousealluser ID</td>
                        <td>{warehousealluser.items.id}</td>
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
  const { warehouseid,warehousealluser, warehouse, authentication } = state;
  const { user } = authentication;
  return {
    user,
    warehousealluser,
    warehouse
  };
}

const connectedWareHouseAllUser = connect(mapStateToProps)(WareHouseAllUser);
export { connectedWareHouseAllUser as WareHouseAllUser };