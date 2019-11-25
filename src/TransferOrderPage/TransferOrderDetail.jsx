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
      const headers = {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem('user')).data.token
        }
        console.log("******************************************", id)
        axios.delete(`${config.apiUrl}/transfer_orders/${id}`, {
      headers: headers
      })
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
                    <div className="pull-right btn-style">
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
                        <td>From Warehouse ID</td>
                        <td>{transferorder.items.sourceWarehouse.id}</td>
                      </tr>
                      <tr>
                        <td>From Warehouse Name</td>
                        <td>{transferorder.items.sourceWarehouse.name}</td>
                      </tr>
                      <tr>
                        <td>From Warehouse Address</td>
                        <td>{transferorder.items.sourceWarehouse.address}</td>
                      </tr>
                      <tr>
                        <td>From Warehouse City</td>
                        <td>{transferorder.items.sourceWarehouse.city}</td>
                      </tr>
                      <tr>
                        <td>To Warehouse ID</td>
                        <td>{transferorder.items.destinationWarehouse.id}</td>
                      </tr>
                      <tr>
                        <td>To Warehouse Name</td>
                        <td>{transferorder.items.destinationWarehouse.name}</td>
                      </tr>
                      <tr>
                        <td>To Warehouse Address</td>
                        <td>{transferorder.items.destinationWarehouse.address}</td>
                      </tr>
                      <tr>
                        <td>To Warehouse City</td>
                        <td>{transferorder.items.destinationWarehouse.city}</td>
                      </tr>
                      <tr>
                        <td>To Warehouse State</td>
                        <td>{transferorder.items.destinationWarehouse.state}</td>
                      </tr>
                      <tr>
                        <td>To Warehouse Country</td>
                        <td>{transferorder.items.destinationWarehouse.country}</td>
                      </tr>
                      <tr>
                        <td>To Warehouse Landmark</td>
                        <td>{transferorder.items.destinationWarehouse.landmark}</td>
                      </tr>
                      <tr>
                        <td>To Warehouse Zipcode</td>
                        <td>{transferorder.items.destinationWarehouse.zipcode}</td>
                      </tr>

                    </tbody>
                  </table>

                }
                <center><h3>Items</h3></center>
                { transferorder.items && 
                  <table className="table table-bordered table table-border">
                    <thead>
                      <tr className="filters">
                        <th>S.No</th>
                        <th>ID</th>
                        <th>Product ID</th>
                        <th>Quantity</th>
                      </tr>  
                    </thead>
                    { transferorder.items.items && transferorder.items.items.length > 0 &&
                      <tbody>
                        {transferorder.items.items.map((transfer_order, index) =>
                          <tr key={transfer_order.id} >
                            <td>{index + 1}</td>
                            <td>{transfer_order.id}</td>
                            <td>{transfer_order.product.id}</td>
                            <td>{transfer_order.quantity}</td>
                          </tr>
                        )}  
                      </tbody>
                    }
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