import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { Header } from '../Header';
import { userActions } from '../_actions';
import { Footer } from '../Footer';
import axios from 'axios';
import config from 'config';


class WareHouseDetail extends React.Component {
    componentDidMount(warehouse) {
      this.props.dispatch(userActions.getwarehousedetail(this.props.match.params.id));
    }

    warehouseDelete = (id) => {
        const headers = {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem('user')).data.token
        }
        console.log("******************************************", id)
        axios.delete(`${config.apiUrl}/warehouses/${id}`, {
      headers: headers
      })
        .then(response => {
          this.setState({ locations: response.data });
          window.location = "/warehouses"
        })
    }

    render() {
      const { user, warehouse } = this.props
      const current_user = JSON.parse(localStorage.getItem('singleUser'))
      return (
        <div>
          <Header />
          <div className="container">
            <div className="">
              <div className="panel panel-primary filterable">
                <div className="panel-heading">
                  { warehouse.items && 
                    <h3 className="panel-title"> 
                     {warehouse.items.name}
                    
                    </h3>
                  }
                  { warehouse.items && 
                    <div className="pull-right btn-style">
                      <button className="btn btn-danger" onClick={() => {if(window.confirm('Delete the item?')){this.warehouseDelete(warehouse.items.id)};}}>Delete</button>
                      <button className="btn btn-default">
                      <Link to={"/warehouse/" + warehouse.items.id + "/edit"} onClick={this.forceUpdate}>Edit</Link></button>
                    </div>
                  }
                </div>
                { warehouse.items && 
                  <table className="table table-bordered table table-border">
                    
                    <tbody>
                      <tr>
                        <td>Warehouse ID</td>
                        <td>{warehouse.items.id}
                        </td>
                      </tr>
                      <tr>
                        <td>Warehouse Name</td>
                        <td>{warehouse.items.name}</td>
                      </tr>
                      <tr>
                        <td>Warehouse Address</td>
                        <td>{warehouse.items.address}</td>
                      </tr>
                      <tr>
                        <td>Warehouse City</td>
                        <td>{warehouse.items.city}</td>
                      </tr>
                      <tr>
                        <td>Warehouse State</td>
                        <td>{warehouse.items.state}</td>
                      </tr>
                      <tr>
                        <td>Warehouse Country</td>
                        <td>{warehouse.items.country}</td>
                      </tr>
                      <tr>
                        <td>Warehouse Landmark</td>
                        <td>{warehouse.items.landmark}</td>
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
  const { warehouseid, warehouse, authentication } = state;
  const { user } = authentication;
  return {
    user,
    warehouse
  };
}

const connectedWareHouseDetail = connect(mapStateToProps)(WareHouseDetail);
export { connectedWareHouseDetail as WareHouseDetail };