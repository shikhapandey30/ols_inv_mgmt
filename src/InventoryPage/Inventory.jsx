import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { Header } from '../Header';
import { userActions } from '../_actions';
import { Footer } from '../Footer';
import { NewInventory } from '../InventoryPage';


class Inventory extends React.Component {
    componentDidMount() {
      this.props.dispatch(userActions.getAllinventory());
    }

    render() {
      const { user, allinventories } = this.props;
      const current_user = JSON.parse(localStorage.getItem('singleUser'))
      console.log("allinventories*******************************", allinventories)
      return (
          <div>
            <Header />
            <div className="container">
              <div>
                <div className="page-header">
                  <h1 className="page-title">
                    Inventories
                    <div className="pull-right">
                      <button type="button" className="btn btn-primary" data-toggle="modal" data-target="#exampleModal">
                        <i className="fa fa-plus" aria-hidden="true"></i> Add New Inventory
                      </button>
                    </div>
                  </h1>
                </div>
                <div className="panel filterable">
                  {allinventories.loading && <h5 className="loading-msg"><em>Loading All Inventory .....</em></h5>}
                  <table className="table table-hover table-responsive">
                    <thead>
                      <tr className="filters">
                        <th>S.No</th>
                        <th>ID</th>
                        <th>Wh id</th>
                        <th>Product Name</th>
                        <th>Batch No</th>
                        <th>Qty</th>
                        <th>Purchase Cost</th>
                        <th>Sales Cost</th>
                        <th>MRP Cost</th>
                        <th>Special Cost</th>
                        <th>Barcode</th>
                        <th>Reference Number</th>
                        <th>Remark</th>
                      </tr>  
                    </thead>
                    
                    { allinventories.items && allinventories.items.length > 0 &&
                      <tbody>
                      {allinventories.items.map((inventory, index) =>
                        <tr key={inventory.id} >
                          <td>{index + 1}</td>
                          <td><Link to={"/inventory/" + inventory.id} onClick={this.forceUpdate}>{inventory.id}</Link></td>
                          <td>{inventory.warehouse.id}</td>
                          <td>{inventory.product.name}</td>
                          <td>{inventory.batch}</td>
                          <td>{inventory.quantity}</td>
                          <td>{inventory.purchaseCost}</td>
                          <td>{inventory.salesCost}</td>
                          <td>{inventory.mrpCost}</td>
                          <td>{inventory.specialCost}</td>
                          <td>{inventory.barcode}</td>
                          <td>{inventory.referenceNumber}</td>
                          <td>{inventory.remark}</td>
                        </tr>
                        
                      )}  
                      </tbody>
                    }  
                  </table>
                </div>
              </div>
            </div>
            <div className="modal fade" id="exampleModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
              <div className="modal-box" role="document">
                <div className="modal-content">
                  <div className="modal-header textdesign">
                    <p style={{ fontWeight: 'bold' }}>Add New Inventory</p>
                    <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                      <span aria-hidden="true">&times;</span>
                    </button>
                  </div>
                  <div className="modal-body">
                    <NewInventory/>
                  </div>
                </div>
              </div>
            </div>
          </div>
      );
    }
}

function mapStateToProps(state) {
  const { allinventories, authentication } = state;
  const { user } = authentication;
  return {
    user,
    allinventories
  };
}

const connectedInventory = connect(mapStateToProps)(Inventory);
export { connectedInventory as Inventory };