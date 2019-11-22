import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { Header } from '../Header';
import { userActions } from '../_actions';
import { Footer } from '../Footer';
import axios from 'axios';
import config from 'config';


class InventoryDetail extends React.Component {
    componentDidMount(inventory) {
      this.props.dispatch(userActions.getinventorydetail(this.props.match.params.id));
    }

    inventoryDelete = (id) => {
        console.log("******************************************", id)
        axios.delete(`${config.apiUrl}/inventories/${id}`)
        .then(response => {
          this.setState({ locations: response.data });
          window.location = "/inventories"
        })
    }

    render() {
      const { user, inventory } = this.props
      const current_user = JSON.parse(localStorage.getItem('singleUser'))
      return (
        <div>
          <Header />
          <div className="container">
            <div className="">
              <div className="panel panel-primary filterable">
                <div className="panel-heading">
                  { inventory.items && 
                    <h3 className="panel-title"> 
                     {inventory.items.id}
                    </h3>
                  }
                  { inventory.items && 
                    <div className="pull-right btn-style">
                      <button className="btn btn-danger" onClick={() => {if(window.confirm('Delete the item?')){this.inventoryDelete(inventory.items.id)};}}>Delete</button>
                    </div>
                  }
                </div>
                { inventory.items && 
                  <table className="table table-bordered table table-border">
                    
                    <tbody>
                      <tr>
                        <td>inventory ID</td>
                        <td>{inventory.items.id}</td>
                      </tr>
                      <tr>
                        <td>Warehouse ID</td>
                        <td>{inventory.items.warehouse.id}</td>
                      </tr>
                      <tr>
                        <td>Warehouse Name</td>
                        <td>{inventory.items.warehouse.name}</td>
                      </tr>
                      <tr>
                        <td>Product ID</td>
                        <td>{inventory.items.product.id}</td>
                      </tr>
                      <tr>
                        <td>Product Name</td>
                        <td>{inventory.items.product.name}</td>
                      </tr>
                      <tr>
                        <td>Bar Code</td>
                        <td>{inventory.items.barcode}</td>
                      </tr>
                      <tr>
                        <td>Batch</td>
                        <td>{inventory.items.batch}</td>
                      </tr>
                      <tr>
                        <td>Purchase Cost</td>
                        <td>{inventory.items.purchaseCost}</td>
                      </tr>
                      <tr>
                        <td>Sales Cost</td>
                        <td>{inventory.items.salesCost}</td>
                      </tr>
                      <tr>
                        <td>MRP Cost</td>
                        <td>{inventory.items.mrpCost}</td>
                      </tr>
                      <tr>
                        <td>Special Cost</td>
                        <td>{inventory.items.specialCost}</td>
                      </tr>
                      <tr>
                        <td>Quantity</td>
                        <td>{inventory.items.quantity}</td>
                      </tr>
                      <tr>
                        <td>Batch</td>
                        <td>{inventory.items.batch}</td>
                      </tr>
                      <tr>
                        <td>Reference Number</td>
                        <td>{inventory.items.referenceNumber}</td>
                      </tr>
                      <tr>
                        <td>Remark</td>
                        <td>{inventory.items.remark}</td>
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
  const { inventoryid, inventory, authentication } = state;
  const { user } = authentication;
  return {
    user,
    inventory
  };
}

const connectedInventoryDetail = connect(mapStateToProps)(InventoryDetail);
export { connectedInventoryDetail as InventoryDetail };