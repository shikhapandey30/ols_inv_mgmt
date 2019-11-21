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
              product: '',
              suppliername: '',
              qty: '',
              sku: '',
              totalqty: '',
              deliverydate: '',
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
      event.preventDefault();
      this.setState({ submitted: true });
      const { purchaseorders } = this.state;
      const { dispatch } = this.props;
      var purchaseorder = { product: purchaseorders.product, suppliername: purchaseorders.suppliername, qty: purchaseorders.qty, sku: purchaseorders.sku, totalqty: purchaseorders.totalqty, deliverydate: purchaseorders.deliverydate}
      axios.post(`${config.apiUrl}/purchaseorders`, purchaseorder)
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
    }

    render() {
      const { loggingIn, user, allproducts, allcategories } = this.props;
      const { purchaseorders, category, submitted } = this.state;
      const current_user = JSON.parse(localStorage.getItem('singleUser'))
      console.log("allproducts*******************************", allproducts)
      return (
        <div>
          <Header />
          <div className="container">
          <form name="form" className="form-horizontal" role="form" onSubmit={this.handleSubmit}>
              <center><h2>Add New Purchase Order</h2></center><br/>
              <div className="form-group">
                <label htmlFor="productname" className="col-sm-2 control-label">Product Name </label>
                <div className="col-sm-9">
                  {submitted && !purchaseorders.product && 
                    <div className="help-block required-msg"> Product Name is required</div>
                  }
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

              <div className="form-group">
                <label htmlFor="productsuppliername" className="col-sm-2 control-label">Supplier Name</label>
                <div className="col-sm-9">
                  {submitted && !purchaseorders.suppliername && 
                    <div className="help-block required-msg"> Purchase Order Supplier Name is required</div>
                  }
                  <input type="text" id="purchaseordersuppliername" className="form-control" placeholder="Purchase Order Supplier Name" name="suppliername" value={purchaseorders.suppliername} onChange={this.handleChange}  autoFocus />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="productqty" className="col-sm-2 control-label">QTY</label>
                <div className="col-sm-9">
                  {submitted && !purchaseorders.qty && 
                    <div className="help-block required-msg"> Purchase Order QTY is required</div>
                  }
                  <input type="text" id="purchaseorderqty" className="form-control" placeholder="Purchase Order QTY" name="qty" value={purchaseorders.qty} onChange={this.handleChange}  autoFocus />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="productsku" className="col-sm-2 control-label">SKU</label>
                <div className="col-sm-9">
                  {submitted && !purchaseorders.sku && 
                    <div className="help-block required-msg"> Purchase Order sku is required</div>
                  }
                  <input type="text" id="purchaseordersku" className="form-control" placeholder="Purchase Order sku" name="sku" value={purchaseorders.sku} onChange={this.handleChange}  autoFocus />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="producttotalqty" className="col-sm-2 control-label">Total Qty</label>
                <div className="col-sm-9">
                  {submitted && !purchaseorders.totalqty && 
                    <div className="help-block required-msg"> Purchase Order totalqty is required</div>
                  }
                  <input type="text" id="purchaseordertotalqty" className="form-control" placeholder="Purchase Order totalqty" name="totalqty" value={purchaseorders.totalqty} onChange={this.handleChange}  autoFocus />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="productdeliverydate" className="col-sm-2 control-label">Delivery Date</label>
                <div className="col-sm-9">
                  {submitted && !purchaseorders.deliverydate && 
                    <div className="help-block required-msg"> Purchase Order deliverydate is required</div>
                  }
                  <input type="text" id="purchaseorderdeliverydate" className="form-control" placeholder="Purchase Order deliverydate" name="deliverydate" value={purchaseorders.deliverydate} onChange={this.handleChange}  autoFocus />
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
  const { purchaseorders,allproducts, users, authentication } = state;
  const { user } = authentication;
  return {
    user,
    allproducts,
    purchaseorders,
    users,
  };
}

const connectedNewPurchaseOrder = connect(mapStateToProps)(NewPurchaseOrder);
export { connectedNewPurchaseOrder as NewPurchaseOrder };