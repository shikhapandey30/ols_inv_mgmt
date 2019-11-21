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
        console.log("******************************************", id)
        axios.delete(`${config.apiUrl}/products/${id}`)
        .then(response => {
          this.setState({ locations: response.data });
          window.location = "/products"
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
                     {purchaseorder.items.name}
                    </h3>
                  }
                  { purchaseorder.items && 
                    <div className="pull-right">
                      <button className="btn btn-danger" onClick={() => {if(window.confirm('Delete the item?')){this.purchaseorderDelete(purchaseorder.items.id)};}}>Delete</button>
                    </div>
                  }
                </div>
                { purchaseorder.items && 
                  <table className="table table-bordered table table-border">
                    <tbody>
                      <tr>
                        <td>purchaseorder ID</td>
                        <td>{purchaseorder.items.id}</td>
                      </tr>
                      <tr>
                        <td>purchaseorder Number</td>
                        <td>{purchaseorder.items.number}</td>
                      </tr>
                      <tr>
                        <td>purchaseorder Amt</td>
                        <td>{purchaseorder.items.amt}</td>
                      </tr>
                      <tr>
                        <td>purchaseorder Supplier Name</td>
                        <td>{purchaseorder.items.supplier_name}</td>
                      </tr>
                      <tr>
                        <td>purchaseorder Create Date</td>
                        <td>{purchaseorder.items.create_date}</td>
                      </tr>
                      <tr>
                        <td>purchaseorder DeliveryDate</td>
                        <td>{purchaseorder.items.delivery_date}</td>
                      </tr>
                      <tr>
                        <td>purchaseorder Status</td>
                        <td>{purchaseorder.items.status}</td>
                      </tr>
                      <tr>
                        <td>purchaseorder info</td>
                        <td>{purchaseorder.items.info}</td>
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