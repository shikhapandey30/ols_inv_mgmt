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
      var purchaseorder = { items: [{id: purchaseorders.itemid }],status: purchaseorders.status, vendor: {id: purchaseorders.vendorid}, warehouse: {id: purchaseorders.warehouseid}}
      axios.post(`${config.apiUrl}/purchase_orders`, purchaseorder, {
      headers: headers
      })
      window.location = "/purchase-orders"
      // .then(response => {
      //   this.setState({ locations: response.data });
      //   window.location = "/purchase-orders"
      // })
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
          <Header />
          <div className="container">
          <form name="form" className="form-horizontal" role="form" onSubmit={this.handleSubmit}>
              <center><h2>Add New Purchase Order</h2></center><br/>
              <div className="form-group">
                <label htmlFor="productitemid" className="col-sm-2 control-label">Item</label>
                <div className="col-sm-9">
                  {submitted && !purchaseorders.itemid && 
                    <div className="help-block required-msg"> Item is required</div>
                  }
                  <input type="text" id="purchaseorderitemid" className="form-control" placeholder="Item" name="itemid" value={purchaseorders.itemid} onChange={this.handleChange}  autoFocus />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="productstatus" className="col-sm-2 control-label">Status</label>
                <div className="col-sm-9">
                  {submitted && !purchaseorders.status && 
                    <div className="help-block required-msg"> status is required</div>
                  }
                  <input type="text" id="purchaseorderstatus" className="form-control" placeholder="Status" name="status" value={purchaseorders.status} onChange={this.handleChange}  autoFocus />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="productvendorid" className="col-sm-2 control-label">Vendor</label>
                <div className="col-sm-9">
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

              <div className="form-group">
                <label htmlFor="producttotalwarehouseid" className="col-sm-2 control-label">Warehouse</label>
                <div className="col-sm-9">
                  { allwarehouses.items && allwarehouses.items.length > 0 &&
                    <select value={purchaseorders.warehouseid} onChange={this.handleChange} name="warehouseid" className="form-control select-field" >
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