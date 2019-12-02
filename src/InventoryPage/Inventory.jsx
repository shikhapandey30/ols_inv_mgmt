import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { Header } from '../Header';
import { userActions } from '../_actions';
import { Footer } from '../Footer';
import { NewInventory } from '../InventoryPage';
import axios from 'axios';
import config from 'config';


class Inventory extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
          filterinventory: {
              product: '',
              warehouse: '',
              loaded: 0
          },
          inventoryfilterdata: [],
          submitted: false
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
      const { name, value } = event.target;
      const { filterinventory } = this.state;
      this.setState({
          filterinventory: { ...filterinventory, [name]: value }
      });
    }

    handleSubmit(event) {
      const headers = {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem('user')).data.token
      }
      event.preventDefault();
      this.setState({ submitted: true });
      const { filterinventory } = this.state;
      const { dispatch } = this.props;
      var productID = this.state.filterinventory.product;
      var warehouseID = this.state.filterinventory.warehouse;

      axios.get(`http://18.217.112.188:8084/api/v1/inventory/inventories?product_id=${productID}&warehouse_id=${warehouseID}`, {
      headers: headers
      })
      .then(response => {
        this.setState({ inventoryfilterdata: response.data.data });
      })
    }

     switchVisible() {
      if (document.getElementById('Div1')) {
        if (document.getElementById('Div1').style.display == 'none') {
            document.getElementById('Div1').style.display = 'block';
            document.getElementById('Div2').style.display = 'none';
        }
        else {
            document.getElementById('Div1').style.display = 'none';
            document.getElementById('Div2').style.display = 'block';
        }
      }
}

    componentDidMount() {
      this.props.dispatch(userActions.getAllinventory());
      this.props.dispatch(userActions.getAllproduct());
      this.props.dispatch(userActions.getAllwarehouse());
    }

    render() {
      const { user, allinventories, allproducts, allwarehouses } = this.props;
      const { filterinventory, submitted, inventoryfilterdata } = this.state;
      const current_user = JSON.parse(localStorage.getItem('singleUser'))
      console.log("allinventories*******************************", allinventories)
      return (
          <div>
            <Header />
            <div className="container">
              <div className="filterinventory">
                <form name="form" className="form-horizontal" role="form" onSubmit={this.handleSubmit} > 
                  <div className="row">
                    <div className="col-md-3">
                      <label htmlFor="filterinventoryproduct" className="label">Product</label>
                      <div>
                        { allproducts.items && allproducts.items.length > 0 &&
                          <select value={filterinventory.product} onChange={this.handleChange} name="product" className="form-control select-field" >
                            {allproducts.items.map((product, index) =>
                              <option key={index} value={product.id} >
                                {product.name}
                              </option>
                             
                            )}
                          </select>
                         }
                      </div>
                    </div>
                    <div className="col-md-3">
                      <label htmlFor="filterinventorywarehouse" className="label">warehouse</label>
                      <div>
                        { allwarehouses.items && allwarehouses.items.length > 0 &&
                          <select value={filterinventory.warehouse} onChange={this.handleChange} name="warehouse" className="form-control select-field" >
                            {allwarehouses.items.map((warehouse, index) =>
                              <option key={index} value={warehouse.id} >
                                {warehouse.name}
                              </option>
                            )}
                          </select>
                         }
                      </div>
                    </div>
                    <div className="col-md-3">
                       <button className="btn btn-primary filtersubmit" onClick={this.switchVisible}>Filter</button>
                    </div>
                  </div>  
                </form>
              </div><br/>
              <div id="Div2" >
              { inventoryfilterdata &&
                <div>
                <h1> Inventories</h1>
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
                      <tbody>
                      {inventoryfilterdata.map((inventory_filter_data, index) =>
                        <tr key={inventory_filter_data.id} >
                          <td>{index + 1}</td>
                          <td>{inventory_filter_data.id}</td>
                          <td>{inventory_filter_data.warehouse.id}</td>
                          <td>{inventory_filter_data.product.name}</td>
                          <td>{inventory_filter_data.batch}</td>
                          <td>{inventory_filter_data.quantity}</td>
                          <td>{inventory_filter_data.purchaseCost}</td>
                          <td>{inventory_filter_data.salesCost}</td>
                          <td>{inventory_filter_data.mrpCost}</td>
                          <td>{inventory_filter_data.specialCost}</td>
                          <td>{inventory_filter_data.barcode}</td>
                          <td>{inventory_filter_data.referenceNumber}</td>
                          <td>{inventory_filter_data.remark}</td>
                        </tr>
                      )}  
                      </tbody>
                  </table>
                </div>  
              }
              </div>  
              <p>
                <div id="Div1">
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
              </p>  
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
  const { allinventories, allproducts, allwarehouses, authentication } = state;
  const { user } = authentication;
  return {
    user,
    allinventories,
    allproducts,
    allwarehouses
  };
}

const connectedInventory = connect(mapStateToProps)(Inventory);
export { connectedInventory as Inventory };
