import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { Header } from '../Header';
import { userActions } from '../_actions';
import { Footer } from '../Footer';
import axios from 'axios';
import config from 'config';
import { Route, Redirect } from 'react-router-dom';

class NewInventory extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          inventories: {
              barcode: '',
              batch: '',
              mrpCost: '',
              product: '',
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
      event.preventDefault();
      this.setState({ submitted: true });
      const { inventories } = this.state;
      const { dispatch } = this.props;
      var inventory = { barcode: inventories.barcode, batch: inventories.batch, mrpCost: inventories.mrpCost, purchaseCost: inventories.purchaseCost, quantity: inventories.quantity, referenceNumber: inventories.referenceNumber, remark: inventories.remark, salesCost: inventories.salesCost, specialCost: inventories.specialCost, product: { id: inventories.product}, warehouse: { id: inventories.warehouse} }
      axios.post(`${config.apiUrl}/inventories`, inventory)
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
                <div className="col-sm-9">
                  {submitted && !inventories.barcode && 
                    <div className="help-block required-msg"> Inventory barcode is required</div>
                  }
                  <input type="text" id="inventorybarcode" className="form-control" placeholder="Inventory barcode" name="barcode" value={inventories.barcode} onChange={this.handleChange}  autoFocus />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="inventorybatch" className="col-sm-2 control-label">Batch</label>
                <div className="col-sm-9">
                  {submitted && !inventories.batch && 
                    <div className="help-block required-msg"> Inventory batch is required</div>
                  }
                  <input type="text" id="inveventorybatch" className="form-control" placeholder="Inventory batch" name="batch" value={inventories.batch} onChange={this.handleChange}  autoFocus />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="inventorymrpCost" className="col-sm-2 control-label">MRP Cost</label>
                <div className="col-sm-9">
                  {submitted && !inventories.mrpCost && 
                    <div className="help-block required-msg"> Inventory mrpCost is required</div>
                  }
                  <input type="text" id="inventorymrpCost" className="form-control" placeholder="Inventory mrpCost" name="mrpCost" value={inventories.mrpCost} onChange={this.handleChange}  autoFocus />
                </div>
              </div>
              <div className="form-group">
                <label htmlFor="inventoryproductid" className="col-sm-2 control-label">Product </label>
                <div className="col-sm-9">
                  {submitted && !inventories.product && 
                    <div className="help-block required-msg"> Inventory product is required</div>
                  }
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
                <div className="col-sm-9">
                  {submitted && !inventories.warehouse && 
                    <div className="help-block required-msg"> Inventory Warehouse is required</div>
                  }
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
                <div className="col-sm-9">
                  {submitted && !inventories.purchaseCost && 
                    <div className="help-block required-msg"> Inventory purchaseCost is required</div>
                  }
                  <input type="text" id="inventorypurchaseCost" className="form-control" placeholder="Inventory purchaseCost" value={inventories.purchaseCost}  name="purchaseCost"  onChange={this.handleChange}  autoFocus />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="inventoryquantity" className="col-sm-2 control-label">Quantity</label>
                <div className="col-sm-9">
                  {submitted && !inventories.quantity && 
                    <div className="help-block required-msg"> Inventory Quantity is required</div>
                  }
                  <input type="text" id="inventoryquantity" className="form-control" placeholder="Inventory Quantity" value={inventories.quantity}  name="quantity"  onChange={this.handleChange}  autoFocus />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="inventoryreferenceNumber" className="col-sm-2 control-label">Reference Number</label>
                <div className="col-sm-9">
                  {submitted && !inventories.referenceNumber && 
                    <div className="help-block required-msg"> Inventory Reference Number is required</div>
                  }

                   <input type="text" id="inventoryreferenceNumber" className="form-control" placeholder="Inventory Reference Number" value={inventories.referenceNumber}  name="referenceNumber"  onChange={this.handleChange}  autoFocus />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="inventoryremark" className="col-sm-2 control-label">Remark </label>
                <div className="col-sm-9">
                  {submitted && !inventories.remark && 
                    <div className="help-block required-msg"> Inventory remark is required</div>
                  }
                  <input type="text" id="inventoryremark" className="form-control" placeholder="Inventory Remark" value={inventories.remark}  name="remark"  onChange={this.handleChange}  autoFocus />
                  
                </div>   
              </div>

              <div className="form-group">
                <label htmlFor="inventorysalesCost" className="col-sm-2 control-label">salesCost </label>
                <div className="col-sm-9">
                  {submitted && !inventories.salesCost && 
                    <div className="help-block required-msg"> Inventory Sales Cost is required</div>
                  }
                  <input type="text" id="inventorysalesCost" className="form-control" placeholder="Inventory Sales Cost" value={inventories.salesCost}  name="salesCost"  onChange={this.handleChange}  autoFocus />
                  
                </div>   
              </div>

              <div className="form-group">
                <label htmlFor="inventoryspecialCost" className="col-sm-2 control-label">specialCost </label>
                <div className="col-sm-9">
                  {submitted && !inventories.specialCost && 
                    <div className="help-block required-msg"> Inventory Special Cost is required</div>
                  }
                  <input type="text" id="inventoryspecialCost" className="form-control" placeholder="Inventory Special Cost" value={inventories.specialCost}  name="specialCost"  onChange={this.handleChange}  autoFocus />
                  
                </div>   
              </div>

              <div className="form-group">
                <div className="col-sm-9 col-sm-offset-2">
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