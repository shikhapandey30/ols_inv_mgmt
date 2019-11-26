import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { Header } from '../Header';
import { userActions } from '../_actions';
import { Footer } from '../Footer';
import axios from 'axios';
import config from 'config';
import { Route, Redirect } from 'react-router-dom';
import DatePicker from "react-datepicker";
import ModernDatepicker from 'react-modern-datepicker';

class NewInventory extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          inventories: {
              barcode: '',
              batch: '',
              mrpCost: '',
              product: '',
              expiryDate: '',
              purchaseCost: '',
              quantity: '',
              referenceNumber: '',
              remark: '',
              salesCost: '',
              specialCost: '',
              warehouse: '',
              loaded: 0
          },
          submitted: false
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
      const { name, value } = event.target;
      const { inventories } = this.state;
      this.setState({
          inventories: { ...inventories, [name]: value }
      });
    }

    handleSubmit(event) {
      const headers = {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem('user')).data.token
      }
      event.preventDefault();
      this.setState({ submitted: true });
      const { inventories } = this.state;
      const { dispatch } = this.props;
      var inventory = { barcode: inventories.barcode, expiryDate: inventories.expiryDate, batch: inventories.batch, mrpCost: inventories.mrpCost, purchaseCost: inventories.purchaseCost, quantity: inventories.quantity, referenceNumber: inventories.referenceNumber, remark: inventories.remark, salesCost: inventories.salesCost, specialCost: inventories.specialCost, product: { id: inventories.product}, warehouse: { id: inventories.warehouse} }
      axios.post(`${config.apiUrl}/inventories`, inventory, {
      headers: headers
      })
      .then(response => {
        this.setState({ locations: response.data });
        window.location = "/inventories"
      })
    }

    handleDeleteUser(id) {
      return (e) => this.props.dispatch(userActions.delete(id));
    }

    componentDidMount() {
      this.props.dispatch(userActions.getAllproduct());
      this.props.dispatch(userActions.getAllwarehouse());
    }

    render() {
      const { loggingIn, user, allproducts, allwarehouses } = this.props;
      const { inventories, submitted } = this.state;
      const current_user = JSON.parse(localStorage.getItem('singleUser'))
      console.log("allproducts*******************************", allproducts)
      console.log("allwarehouses*******************************", allwarehouses)
      return (
        <div>
          <Header />
          <div className="container">
          <form name="form" className="form-horizontal" role="form" onSubmit={this.handleSubmit}>
              <center><h2>Add New Inventory</h2></center><br/>
              <div className="form-group">
                <label htmlFor="inventorybarcode" className="col-sm-2 control-label">Barcode</label>
                <div className="col-sm-3">
                  {submitted && !inventories.barcode && 
                    <div className="help-block required-msg"> Inventory barcode is required</div>
                  }
                  <input type="text" id="inventorybarcode" className="form-control" placeholder="Barcode" name="barcode" value={inventories.barcode} onChange={this.handleChange}  autoFocus />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="inventoryexpiryDate" className="col-sm-2 control-label">Expiry Date</label>
                <div className="col-sm-3">
                  {submitted && !inventories.expiryDate && 
                    <div className="help-block required-msg"> Inventory expiryDate is required</div>
                  }
                  
                  <input type="date" id="inventoryexpiryDate" className="form-control" placeholder="expiryDate" name="expiryDate" value={inventories.expiryDate} onChange={this.handleChange}  autoFocus />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="inventorybatch" className="col-sm-2 control-label">Batch</label>
                <div className="col-sm-3">
                  {submitted && !inventories.batch && 
                    <div className="help-block required-msg"> Inventory batch is required</div>
                  }
                  <input type="text" id="inveventorybatch" className="form-control" placeholder="Batch" name="batch" value={inventories.batch} onChange={this.handleChange}  autoFocus />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="inventorymrpCost" className="col-sm-2 control-label">MRP Cost</label>
                <div className="col-sm-3">
                  {submitted && !inventories.mrpCost && 
                    <div className="help-block required-msg"> Inventory mrpCost is required</div>
                  }
                  <input type="text" id="inventorymrpCost" className="form-control" placeholder="MRP Cost" name="mrpCost" value={inventories.mrpCost} onChange={this.handleChange}  autoFocus />
                </div>
              </div>
              <div className="form-group">
                <label htmlFor="inventoryproductid" className="col-sm-2 control-label">Product </label>
                <div className="col-sm-3">
                   { allproducts.items && allproducts.items.length > 0 &&
                    <select value={inventories.product} onChange={this.handleChange} name="product" className="form-control select-field" >
                      {allproducts.items.map((product, index) =>
                        <option key={index} value={product.id} >
                          {product.name}
                        </option>
                       
                      )}
                    </select>
                   }
                </div>   
              </div>

              <div className="form-group">
                <label htmlFor="inventorywarehouseid" className="col-sm-2 control-label">Warehouse </label>
                <div className="col-sm-3">
                   { allwarehouses.items && allwarehouses.items.length > 0 &&
                    <select value={inventories.warehouse} onChange={this.handleChange} name="warehouse" className="form-control select-field" >
                      {allwarehouses.items.map((warehouse, index) =>
                        <option key={index} value={warehouse.id} >
                          {warehouse.name}
                        </option>
                      )}
                    </select>
                   }
                </div>   
              </div>

              <div className="form-group">
                <label htmlFor="inventorypurchaseCost" className="col-sm-2 control-label">Purchase Cost</label>
                <div className="col-sm-3">
                  {submitted && !inventories.purchaseCost && 
                    <div className="help-block required-msg"> Inventory PurchaseCost is required</div>
                  }
                  <input type="text" id="inventorypurchaseCost" className="form-control" placeholder="Purchase Cost" value={inventories.purchaseCost}  name="purchaseCost"  onChange={this.handleChange}  autoFocus />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="inventoryquantity" className="col-sm-2 control-label">Quantity</label>
                <div className="col-sm-3">
                  {submitted && !inventories.quantity && 
                    <div className="help-block required-msg"> Inventory Quantity is required</div>
                  }
                  <input type="text" id="inventoryquantity" className="form-control" placeholder="Quantity" value={inventories.quantity}  name="quantity"  onChange={this.handleChange}  autoFocus />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="inventoryreferenceNumber" className="col-sm-2 control-label">Reference Number</label>
                <div className="col-sm-3">
                  {submitted && !inventories.referenceNumber && 
                    <div className="help-block required-msg"> Inventory Reference Number is required</div>
                  }

                   <input type="text" id="inventoryreferenceNumber" className="form-control" placeholder="Reference Number" value={inventories.referenceNumber}  name="referenceNumber"  onChange={this.handleChange}  autoFocus />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="inventoryremark" className="col-sm-2 control-label">Remark </label>
                <div className="col-sm-3">
                  {submitted && !inventories.remark && 
                    <div className="help-block required-msg"> Inventory remark is required</div>
                  }
                  <input type="text" id="inventoryremark" className="form-control" placeholder="Remark" value={inventories.remark}  name="remark"  onChange={this.handleChange}  autoFocus />
                  
                </div>   
              </div>

              <div className="form-group">
                <label htmlFor="inventorysalesCost" className="col-sm-2 control-label">Sales Cost </label>
                <div className="col-sm-3">
                  {submitted && !inventories.salesCost && 
                    <div className="help-block required-msg"> Inventory Sales Cost is required</div>
                  }
                  <input type="text" id="inventorysalesCost" className="form-control" placeholder="Sales Cost" value={inventories.salesCost}  name="salesCost"  onChange={this.handleChange}  autoFocus />
                  
                </div>   
              </div>

              <div className="form-group">
                <label htmlFor="inventoryspecialCost" className="col-sm-2 control-label">Special Cost </label>
                <div className="col-sm-3">
                  {submitted && !inventories.specialCost && 
                    <div className="help-block required-msg"> Inventory Special Cost is required</div>
                  }
                  <input type="text" id="inventoryspecialCost" className="form-control" placeholder="Special Cost" value={inventories.specialCost}  name="specialCost"  onChange={this.handleChange}  autoFocus />
                  
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
      );
    }
}

function mapStateToProps(state) {
  const { inventories,allproducts, allwarehouses, users, authentication } = state;
  const { user } = authentication;
  return {
    user,
    allproducts,
    inventories,
    allwarehouses,
    users,
  };
}

const connectedNewInventory = connect(mapStateToProps)(NewInventory);
export { connectedNewInventory as NewInventory };