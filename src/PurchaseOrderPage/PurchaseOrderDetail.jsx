import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { Header } from '../Header';
import { userActions } from '../_actions';
import { Footer } from '../Footer';
import axios from 'axios';
import config from 'config';


class PurchaseOrderDetail extends React.Component {
    componentDidMount(purchaseorder) {
      this.props.dispatch(userActions.getpurchaseorderdetail(this.props.match.params.id));
    }

    purchaseorderDelete = (id) => {
    const headers = {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem('user')).data.token
        }
        console.log("******************************************", id)
        axios.delete(`${config.apiUrl}/purchase_orders/${id}`, {
      headers: headers
      })
        .then(response => {
          this.setState({ locations: response.data });
          window.location = "/purchase-orders"
        })
    }

    render() {
      const { user, purchaseorder } = this.props
      const current_user = JSON.parse(localStorage.getItem('singleUser'))
      return (
        <div>
          <Header />
          <div className="container">
            <div className="">
              { purchaseorder.items && 
                <h3 className="panel-title"> 
                  Purchase Order Number: {purchaseorder.items.number}<br/><br/>
                  Purchase Order Date: {purchaseorder.items.create_date}<br/><br/>
                  Payment Mode: COD<br/><br/>
                  Tax Type: GST<br/><br/>
                  Ammendment Number: 12345678<br/><br/>
                  Company State CD: 27<br/><br/>
                  Supplier Name: {purchaseorder.items.suppliername}<br/><br/>
                </h3> 
              }   
              <div className="panel panel-primary filterable">
                <div className="panel-heading">
                  { purchaseorder.items && 
                    <h3 className="panel-title"> 
                     {purchaseorder.items.id}
                    </h3>
                  }
                  { purchaseorder.items && 
                    <div className="pull-right btn-style">
                      <button className="btn btn-danger" onClick={() => {if(window.confirm('Delete the item?')){this.purchaseorderDelete(purchaseorder.items.id)};}}>Delete</button>
                    </div>
                  }
                </div>
                { purchaseorder.items && 
                  <table className="table table-bordered table table-border">
                    <tbody>
                      <tr>
                        <td>Purchase Order ID</td>
                        <td>{purchaseorder.items.id}</td>
                      </tr>
                      <tr>
                        <td>Purchase Order Warehouse ID </td>
                        <td>{purchaseorder.items.warehouse.id}</td>
                      </tr>
                      <tr>
                        <td>Purchase Order Warehouse Name</td>
                        <td>{purchaseorder.items.warehouse.name}</td>
                      </tr>
                      <tr>
                        <td>Purchase Order Warehouse Address</td>
                        <td>{purchaseorder.items.warehouse.address}</td>
                      </tr>
                      <tr>
                        <td>Purchase Order Warehouse Landmark</td>
                        <td>{purchaseorder.items.warehouse.landmark}</td>
                      </tr>
                      <tr>
                        <td>Purchase Order Warehouse Zipcode</td>
                        <td>{purchaseorder.items.warehouse.zipcode}</td>
                      </tr>
                      <tr>
                        <td>Purchase Order Warehouse City</td>
                        <td>{purchaseorder.items.warehouse.city}</td>
                      </tr>
                      <tr>
                        <td>Purchase Order Warehouse State</td>
                        <td>{purchaseorder.items.warehouse.state}</td>
                      </tr>
                      <tr>
                        <td>Purchase Order Warehouse Country</td>
                        <td>{purchaseorder.items.warehouse.country}</td>
                      </tr>
                      <tr>
                        <td>Purchase Order Vendor ID</td>
                        <td>{purchaseorder.items.vendor.id}</td>
                      </tr>
                      <tr>
                        <td>Purchase Order Vendor Name</td>
                        <td>{purchaseorder.items.vendor.name}</td>
                      </tr>
                      <tr>
                        <td>Purchase Order Vendor Address</td>
                        <td>{purchaseorder.items.vendor.address}</td>
                      </tr>
                      <tr>
                        <td>Purchase Order Vendor Landmark</td>
                        <td>{purchaseorder.items.vendor.landmark}</td>
                      </tr>
                      <tr>
                        <td>Purchase Order Vendor Zipcode</td>
                        <td>{purchaseorder.items.vendor.zipcode}</td>
                      </tr>
                      <tr>
                        <td>Purchase Order Vendor City</td>
                        <td>{purchaseorder.items.vendor.city}</td>
                      </tr>
                      <tr>
                        <td>Purchase Order Vendor State</td>
                        <td>{purchaseorder.items.vendor.state}</td>
                      </tr>
                      <tr>
                        <td>Purchase Order Vendor Country</td>
                        <td>{purchaseorder.items.vendor.country}</td>
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
  const { purchaseorderid, purchaseorder, authentication } = state;
  const { user } = authentication;
  return {
    user,
    purchaseorder
  };
}

const connectedPurchaseOrderDetail = connect(mapStateToProps)(PurchaseOrderDetail);
export { connectedPurchaseOrderDetail as PurchaseOrderDetail };