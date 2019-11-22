import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { Header } from '../Header';
import { userActions } from '../_actions';
import { Footer } from '../Footer';
import axios from 'axios';
import config from 'config';


class TransferOrderDetail extends React.Component {
    componentDidMount(transferorder) {
      this.props.dispatch(userActions.gettransferorderdetail(this.props.match.params.id));
    }

    transferorderDelete = (id) => {
        console.log("******************************************", id)
        axios.delete(`${config.apiUrl}/transfer_orders/${id}`)
        .then(response => {
          this.setState({ locations: response.data });
          window.location = "/transfer-orders"
        })
    }

    render() {
      const { user, transferorder } = this.props
      const current_user = JSON.parse(localStorage.getItem('singleUser'))
      console.log("transferorder*******************************", transferorder)
      return (
        <div>
          <Header />
          <div className="container">
            <div className="">
              <div className="panel panel-primary filterable">
                <div className="panel-heading">
                  { transferorder.items && 
                    <h3 className="panel-title"> 
                     {transferorder.items.id}
                    </h3>
                  }
                  { transferorder.items && 
                    <div className="pull-right">
                      <button className="btn btn-danger" onClick={() => {if(window.confirm('Delete the item?')){this.transferorderDelete(transferorder.items.id)};}}>Delete</button>
                    </div>
                  }
                </div>
                { transferorder.items && 
                  <table className="table table-bordered table table-border">
                    <tbody>
                      <tr>
                        <td>transferorder ID</td>
                        <td>{transferorder.items.id}</td>
                      </tr>
                      <tr>
                        <td>transferorder Warehouse ID </td>
                        <td>{transferorder.items.warehouse.id}</td>
                      </tr>
                      <tr>
                        <td>transferorder Warehouse Name</td>
                        <td>{transferorder.items.warehouse.name}</td>
                      </tr>
                      <tr>
                        <td>transferorder Warehouse Address</td>
                        <td>{transferorder.items.warehouse.address}</td>
                      </tr>
                      <tr>
                        <td>transferorder Warehouse Landmark</td>
                        <td>{transferorder.items.warehouse.landmark}</td>
                      </tr>
                      <tr>
                        <td>transferorder Warehouse Zipcode</td>
                        <td>{transferorder.items.warehouse.zipcode}</td>
                      </tr>
                      <tr>
                        <td>transferorder Warehouse City</td>
                        <td>{transferorder.items.warehouse.city}</td>
                      </tr>
                      <tr>
                        <td>transferorder Warehouse State</td>
                        <td>{transferorder.items.warehouse.state}</td>
                      </tr>
                      <tr>
                        <td>transferorder Warehouse Country</td>
                        <td>{transferorder.items.warehouse.country}</td>
                      </tr>
                      <tr>
                        <td>transferorder Vendor ID</td>
                        <td>{transferorder.items.vendor.id}</td>
                      </tr>
                      <tr>
                        <td>transferorder Vendor Name</td>
                        <td>{transferorder.items.vendor.name}</td>
                      </tr>
                      <tr>
                        <td>transferorder Vendor Address</td>
                        <td>{transferorder.items.vendor.address}</td>
                      </tr>
                      <tr>
                        <td>transferorder Vendor Landmark</td>
                        <td>{transferorder.items.vendor.landmark}</td>
                      </tr>
                      <tr>
                        <td>transferorder Vendor Zipcode</td>
                        <td>{transferorder.items.vendor.zipcode}</td>
                      </tr>
                      <tr>
                        <td>transferorder Vendor City</td>
                        <td>{transferorder.items.vendor.city}</td>
                      </tr>
                      <tr>
                        <td>transferorder Vendor State</td>
                        <td>{transferorder.items.vendor.state}</td>
                      </tr>
                      <tr>
                        <td>transferorder Vendor Country</td>
                        <td>{transferorder.items.vendor.country}</td>
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
  const { transferorderid, transferorder, authentication } = state;
  const { user } = authentication;
  return {
    user,
    transferorder
  };
}

const connectedTransferOrderDetail = connect(mapStateToProps)(TransferOrderDetail);
export { connectedTransferOrderDetail as TransferOrderDetail };