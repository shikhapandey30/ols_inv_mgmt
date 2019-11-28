import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { Header } from '../Header';
import { userActions } from '../_actions';
import { Footer } from '../Footer';
import axios from 'axios';
import config from 'config';
import { Route, Redirect } from 'react-router-dom';


class NewPurchaseOrder extends React.Component {
    
    constructor(props) {
        super(props);
        this.state = {
          purchaseorders: {
              itemid: '',
              status: '',
              product: '',
              quantity: '',
              vendorid: '',
              warehouseid: '',
              loaded: 0
          },
          submitted: false
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
      const { name, value } = event.target;
      const { purchaseorders } = this.state;
      this.setState({
          purchaseorders: { ...purchaseorders, [name]: value }
      });
    }

    handleSubmit(event) {
      const headers = {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem('user')).data.token
      }
      event.preventDefault();
      this.setState({ submitted: true });
      const { purchaseorders } = this.state;
      const { dispatch } = this.props;
      var purchaseorder = { items: [{id: purchaseorders.itemid, product: {id: purchaseorders.product}, quantity: purchaseorders.quantity }],status: purchaseorders.status, vendor: {id: purchaseorders.vendorid}, warehouse: {id: purchaseorders.warehouseid}}
      axios.post(`${config.apiUrl}/purchase_orders`, purchaseorder, {
      headers: headers
      })
      .then(response => {
        this.setState({ locations: response.data });
        window.location = "/purchase-orders"
      })
    }

    handleDeleteUser(id) {
      return (e) => this.props.dispatch(userActions.delete(id));
    }

    componentDidMount() {
      this.props.dispatch(userActions.getAllproduct());
      this.props.dispatch(userActions.getAllwarehouse());
      this.props.dispatch(userActions.getAllvendor());
    }

    render() {
      const { loggingIn, user, allproducts,allvendors, allwarehouses,allcategories } = this.props;
      const { purchaseorders, category, submitted } = this.state;
      const current_user = JSON.parse(localStorage.getItem('singleUser'))
      console.log("allproducts*******************************", allproducts)
      console.log("allwarehouses*******************************", allwarehouses)
      return (
        <div>
          <div className="container">
            <form name="form" className="form-horizontal" role="form" onSubmit={this.handleSubmit}>
                <div className="row">
                  <div className="col-md-6">
                    <label htmlFor="productitemid" className="label">Item</label>
                    <div>
                      {submitted && !purchaseorders.itemid && 
                        <div className="help-block required-msg"> Item is required</div>
                      }
                      <input type="text" id="purchaseorderitemid" className="form-control" placeholder="Item" name="itemid" value={purchaseorders.itemid} onChange={this.handleChange}  autoFocus />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <label htmlFor="productstatus" className="label">Status</label>
                    <div>
                      {submitted && !purchaseorders.status && 
                        <div className="help-block required-msg"> status is required</div>
                      }
                      <input type="text" id="purchaseorderstatus" className="form-control" placeholder="Status" name="status" value={purchaseorders.status} onChange={this.handleChange}  autoFocus />
                    </div>
                  </div>
                </div><br/>  

                <div className="row">
                  <div className="col-md-6">
                    <label htmlFor="product" className="label">Product</label>
                    <div>
                      { allproducts.items && allproducts.items.length > 0 &&
                        <select value={purchaseorders.product} onChange={this.handleChange} name="product" className="form-control select-field" >
                          {allproducts.items.map((product, index) =>
                            <option key={index} value={product.id} >
                              {product.name}
                            </option>
                          )}
                        </select>
                       }
                    </div>
                  </div>
                  <div className="col-md-6">
                    <label htmlFor="productquantity" className="label">Quantity</label>
                    <div>
                      {submitted && !purchaseorders.quantity && 
                        <div className="help-block required-msg"> quantity is required</div>
                      }
                      <input type="text" id="transferorderquantity" className="form-control" placeholder="Quantity" name="quantity" value={purchaseorders.quantity} onChange={this.handleChange}  autoFocus />
                    </div>
                  </div>
                </div><br/>

                <div className="row model-warehouse">
                  <div className="col-md-6">
                    <label htmlFor="productvendorid" className="label">Vendor</label>
                    <div>
                      { allvendors.items && allvendors.items.length > 0 &&
                        <select value={purchaseorders.vendorid} onChange={this.handleChange} name="vendorid" className="form-control select-field" >
                          {allvendors.items.map((vendor, index) =>
                            <option key={index} value={vendor.id} >
                              {vendor.name}
                            </option>
                          )}
                        </select>
                       }
                    </div>
                  </div>
                  <div className="col-md-6">
                    <label htmlFor="producttotalwarehouseid" className="label">Warehouse</label>
                    <div>
                      { allwarehouses.items && allwarehouses.items.length > 0 &&
                        <select value={purchaseorders.warehouseid} onChange={this.handleChange} name="warehouseid" className="form-control select-field" >
                          {allwarehouses.items.map((warehouse, index) =>
                            <option key={index} value={warehouse.id} >
                              {warehouse.name}
                            </option>
                          )}
                        </select>
                       }
                    </div><br/>
                  </div>
                </div><br/>  
                
                <div className="form-group">
                  <div className="pull-right">
                    <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>&nbsp;&nbsp;
                    <button className="btn btn-primary">Submit</button>
                  </div>
                </div>
            </form>
          </div>
        </div>  
      );
    }
}

function mapStateToProps(state) {
  const { purchaseorders,allproducts,allwarehouses, allvendors, users, authentication } = state;
  const { user } = authentication;
  return {
    user,
    allproducts,
    allwarehouses,
    purchaseorders,
    allvendors,
    users,
  };
}

const connectedNewPurchaseOrder = connect(mapStateToProps)(NewPurchaseOrder);
export { connectedNewPurchaseOrder as NewPurchaseOrder };