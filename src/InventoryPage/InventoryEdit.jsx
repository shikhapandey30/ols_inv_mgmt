import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { Header } from '../Header';
import { userActions } from '../_actions';
import { Footer } from '../Footer';
import axios from 'axios';
import config from 'config';
import { Route, Redirect } from 'react-router-dom';


class InventoryEdit extends React.Component {

    constructor(props){
    super(props);
    this.state = {
      id:'',
      barcode:'',
      expiryDate:'',
      mrpCost:'',
      product:'',
      purchaseCost:'',
      quantity:'',
      referenceNumber:'',
      remark:'',
      salesCost:'',
      specialCost:'',
      warehouse:'',
    }

    this.handleInputChange = this.handleInputChange.bind(this);
  }

  componentWillMount(){
    this.getInventoryDetails();
    this.props.dispatch(userActions.getAllwarehouse());
    this.props.dispatch(userActions.getAllproduct());
  }
  getInventoryDetails(){
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem('user')).data.token
    }
    let inventoryId = this.props.match.params.id;
    axios.get(`${config.apiUrl}/inventories/${inventoryId}`, {
    headers: headers
  })
    .then(response => {
      this.setState({
        id: response.data.data.id,
        barcode: response.data.data.barcode,
        batch: response.data.data.batch,
        expiryDate: response.data.data.expiryDate,
        mrpCost: response.data.data.mrpCost,
        product: response.data.data.product,
        purchaseCost: response.data.data.purchaseCost,
        quantity: response.data.data.quantity,
        referenceNumber: response.data.data.referenceNumber,
        remark: response.data.data.remark,
        salesCost: response.data.data.salesCost,
        specialCost: response.data.data.specialCost,
        warehouse: response.data.data.warehouse
      }, () => {
        console.log(this.state);
      });
    })
    .catch(err => console.log(err));
    }

  editInventory(inventory){
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem('user')).data.token
    }
    var inventorydata = {barcode: inventory.barcode, batch: inventory.batch, expiryDate: inventory.expiryDate, id: inventory.id, mrpCost: inventory.mrpCost, product: {id: inventory.product}, purchaseCost: inventory.purchaseCost, quantity: inventory.quantity, referenceNumber: inventory.referenceNumber, remark: inventory.remark, salesCost: inventory.salesCost, specialCost: inventory.specialCost, warehouse: {id: inventory.warehouse}}
    axios.put(`${config.apiUrl}/inventories`, inventorydata, {
    headers: headers
  })
      .then(response => {
        this.setState({ locations: response.data });
        window.location = "/inventories"
      })
  }

  onSubmit(e){

    const inventory = {
      barcode: this.refs.barcode.value,
      id: this.refs.id.value,
      batch: this.refs.batch.value,
      expiryDate: this.refs.expiryDate.value,
      mrpCost: this.refs.mrpCost.value,
      product: this.refs.product.value,
      purchaseCost: this.refs.purchaseCost.value,
      quantity: this.refs.quantity.value,
      referenceNumber: this.refs.referenceNumber.value,
      remark: this.refs.remark.value,
      salesCost: this.refs.salesCost.value,
      specialCost: this.refs.specialCost.value,
      warehouse: this.refs.warehouse.value
    }
    this.editInventory(inventory);
    e.preventDefault();

  }

  handleInputChange(e){
    const target = e.target;
    const value = target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }

    handleChange(event) {
      const { name, value } = event.target;
      const { inventory } = this.state;
      this.setState({inventory: event.target.value});
      this.setState({
          inventory: { ...inventory, [name]: value }
      });
    }

    render() {
      const { loggingIn, allwarehouses, allproducts} = this.props;
      const { submitted } = this.state;
      const current_user = JSON.parse(localStorage.getItem('singleUser'))

      return (
        <div>
          <div>
            <Header />
            <div className="container">
              <form className="form-horizontal" onSubmit={this.onSubmit.bind(this)}>
                  <center><h2>Edit Inventory</h2></center><br/>
                  <div className="form-group">
                    <label htmlFor="inventorybarcode" className="col-sm-2 control-label">Inventory Barcode</label>
                    <div className="col-sm-3">
                      <input className="form-control" type="text" name="barcode" ref="barcode" value={this.state.barcode} onChange={this.handleInputChange} />
                    </div>
                  </div>

                  <div className="form-group">
                    <label htmlFor="inventorybatch" className="col-sm-2 control-label">Inventory Batch</label>
                    <div className="col-sm-3">
                      <input className="form-control" type="text" name="batch" ref="batch" value={this.state.batch} onChange={this.handleInputChange} />
                    </div>
                  </div>

                  <div className="form-group">
                    <label htmlFor="inventoryexpiryDate" className="col-sm-2 control-label">Inventory Expiry Date</label>
                    <div className="col-sm-3">
                      <input className="form-control" type="text" name="expiryDate" ref="expiryDate" value={this.state.expiryDate} onChange={this.handleInputChange} />
                    </div>
                  </div>

                  <div className="form-group">
                    <label htmlFor="inventorymrpCost" className="col-sm-2 control-label">Inventory MRP Cost</label>
                    <div className="col-sm-3">
                      <input className="form-control" type="text" name="mrpCost" ref="mrpCost" value={this.state.mrpCost} onChange={this.handleInputChange} />
                    </div>
                  </div>

                  <div className="form-group">
                    <label htmlFor="inventoryproduct" className="col-sm-2 control-label">Inventory Product</label>
                    <div className="col-sm-3">
                      { allproducts.items && allproducts.items.length > 0 &&
                        <select name="product" ref="product" value={this.state.product.id} onChange={this.handleInputChange} className="form-control select-field" >
                          {allproducts.items.map((product, index) =>
                            <option key={index} value={this.state.product.id} >
                              {product.name}
                            </option>
                           
                          )}
                        </select>
                      }
                    </div>
                  </div>

                  <div className="form-group">
                    <label htmlFor="inventorypurchaseCost" className="col-sm-2 control-label">Inventory Purchase Cost</label>
                    <div className="col-sm-3">
                      <input className="form-control" type="text" name="purchaseCost" ref="purchaseCost" value={this.state.purchaseCost} onChange={this.handleInputChange} />
                    </div>
                  </div>

                  <div className="form-group">
                    <label htmlFor="inventoryquantity" className="col-sm-2 control-label">Inventory Quantity</label>
                    <div className="col-sm-3">
                      <input className="form-control" type="text" name="quantity" ref="quantity" value={this.state.quantity} onChange={this.handleInputChange} />
                    </div>
                  </div>

                  <div className="form-group">
                    <label htmlFor="inventoryreferenceNumber" className="col-sm-2 control-label">Inventory Reference Number</label>
                    <div className="col-sm-3">
                      <input className="form-control" type="text" name="referenceNumber" ref="referenceNumber" value={this.state.referenceNumber} onChange={this.handleInputChange} />
                    </div>
                  </div>

                  <div className="form-group">
                    <label htmlFor="inventoryremark" className="col-sm-2 control-label">Inventory Remark</label>
                    <div className="col-sm-3">
                      <input className="form-control" type="text" name="remark" ref="remark" value={this.state.remark} onChange={this.handleInputChange} />
                    </div>
                  </div>

                  <div className="form-group">
                    <label htmlFor="inventorysalesCost" className="col-sm-2 control-label">Inventory Sales Cost</label>
                    <div className="col-sm-3">
                      <input className="form-control" type="text" name="salesCost" ref="salesCost" value={this.state.salesCost} onChange={this.handleInputChange} />
                    </div>
                  </div>

                  <div className="form-group">
                    <label htmlFor="inventoryspecialCost" className="col-sm-2 control-label">Inventory Special Cost</label>
                    <div className="col-sm-3">
                      <input className="form-control" type="text" name="specialCost" ref="specialCost" value={this.state.specialCost} onChange={this.handleInputChange} />
                    </div>
                  </div>

                  <div className="form-group">
                    <label htmlFor="inventorywarehouse" className="col-sm-2 control-label">Inventory Warehouse</label>
                    <div className="col-sm-3">
                      { allwarehouses.items && allwarehouses.items.length > 0 &&
                        <select name="warehouse" ref="warehouse" value={this.state.warehouse.id} onChange={this.handleInputChange} className="form-control select-field" >
                          {allwarehouses.items.map((warehouse, index) =>
                            <option key={index} value={this.state.warehouse.id} >
                              {warehouse.name}
                            </option>
                          )}
                        </select>
                      }

                    </div>
                  </div>


                  <div className="form-group">
                    <div className="col-sm-3">
                      <input className="form-control" type="hidden" name="id" ref="id" value={this.state.id} onChange={this.handleInputChange} />
                    </div>
                  </div>

                  <div className="form-group">
                    <div className="col-sm-1 col-sm-offset-2">
                      <button className="btn btn-primary btn-block">Submit</button>
                    </div>
                  </div>
              
              </form>
            </div>
          </div> 
        </div>
      );
    }
}

function mapStateToProps(state) {
  const {inventoryid,allwarehouses, allproducts, authentication } = state;
  const { user } = authentication;
  return {
    user,
    allwarehouses,
    allproducts
  };
}

const connectedInventoryEdit = connect(mapStateToProps)(InventoryEdit);
export { connectedInventoryEdit as InventoryEdit };