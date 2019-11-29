import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { Header } from '../Header';
import { userActions } from '../_actions';
import { Footer } from '../Footer';
import axios from 'axios';
import config from 'config';


class PurchaseOrderDetail extends React.Component {

     constructor(props){
    super(props);
    this.state = {
      id:'',
      warehouse:'',
      status:'',
      items:'',
      vendor:'',
    }

    this.handleInputChange = this.handleInputChange.bind(this);
  }

  componentWillMount(){
    this.getPurchaseOrderDetails();
  }
  getPurchaseOrderDetails(){
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem('user')).data.token
    }
    let purchaseorderId = this.props.match.params.id;
    axios.get(`${config.apiUrl}/purchase_orders/${purchaseorderId}`, {
    headers: headers
  })
    .then(response => {
      this.setState({
        id: response.data.data.id,
        warehouse: response.data.data.warehouse,
        status: response.data.data.status,
        items: response.data.data.items,
        vendor: response.data.data.vendor
      }, () => {
        console.log(this.state);
      });
    })
    .catch(err => console.log(err));
    }

  editPurchaseOrder(purchaseorder){
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem('user')).data.token
    }
    var purchaseorders = {id: purchaseorder.id, status: purchaseorder.status, items: [{id: purchaseorder.items}], vendor: {id: purchaseorder.vendor}, warehouse: {id: purchaseorder.warehouse}}
    axios.put(`${config.apiUrl}/purchase_orders`, purchaseorders, {
    headers: headers
  })
      .then(response => {
        this.setState({ locations: response.data });
        window.location = "/purchase_orders"
      })
  }

  onSubmit(e){

    const purchaseorder = {
      id: this.refs.id.value,
      warehouse: this.refs.warehouse.value,
      status: this.refs.status.value,
      items: this.refs.items.value,
      vendor: this.refs.vendor.value
    }
    this.editPurchaseOrder(purchaseorder);
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
      const { purchaseorder } = this.state;
      this.setState({purchaseorder: event.target.value});
      this.setState({
          purchaseorder: { ...purchaseorder, [name]: value }
      });
    }

    componentDidMount(purchaseorder) {
      this.props.dispatch(userActions.getpurchaseorderdetail(this.props.match.params.id));
    }

    purchaseorderDelete = (id) => {
    const headers = {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem('user')).data.token
        }
        console.log("******************************************", id)
        axios.delete(`${config.apiUrl}/purchase_orders/${id}`, {
      headers: headers
      })
        .then(response => {
          this.setState({ locations: response.data });
          window.location = "/purchase-orders"
        })
    }

    render() {
      const { user, purchaseorder, loggingIn } = this.props;
      const { submitted } = this.state;
      const current_user = JSON.parse(localStorage.getItem('singleUser'))
      return (
        <div>
          <Header />
          <div className="container">
            <div className="">
              { purchaseorder.items && 
                <h3 className="panel-title"> 
                  Purchase Order Number: {purchaseorder.items.number}<br/><br/>
                  Purchase Order Date: {purchaseorder.items.create_date}<br/><br/>
                  Payment Mode: COD<br/><br/>
                  Tax Type: GST<br/><br/>
                  Ammendment Number: 12345678<br/><br/>
                  Company State CD: 27<br/><br/>
                  Supplier Name: {purchaseorder.items.suppliername}<br/><br/>
                </h3> 
              }   
              <div className="panel panel-primary filterable">
                <div className="panel-heading">
                  { purchaseorder.items && 
                    <h3 className="panel-title"> 
                     {purchaseorder.items.id}
                    </h3>
                  }
                  { purchaseorder.items && 
                    <div className="pull-right btn-style">
                      <button className="btn btn-danger" onClick={() => {if(window.confirm('Delete the item?')){this.purchaseorderDelete(purchaseorder.items.id)};}}>Delete</button>
                      <button type="button" className="btn btn-primary" data-toggle="modal" data-target="#exampleModal">
                        Edit
                      </button>
                      <div className="modal fade" id="exampleModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                          <div className="modal-box" role="document">
                            <div className="modal-content">
                              <div className="modal-header textdesign">
                                <p style={{ fontWeight: 'bold' }}>Purchase Order: {purchaseorder.items.id}</p>
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                  <span aria-hidden="true">&times;</span>
                                </button>
                              </div>
                              <div className="modal-body">
                               <form className="form-horizontal" onSubmit={this.onSubmit.bind(this)}>
                                  <div className="row">
                                    <div className="col-md-6">
                                      <label htmlFor="warehouse" className="label">Warehouse</label>
                                      <div>
                                        <input className="form-control" type="text" name="warehouse" ref="warehouse" value={this.state.warehouse.id} onChange={this.handleInputChange} />
                                      </div>
                                    </div>
                                    <div className="col-md-6">
                                      <label htmlFor="status" className="label">Status</label>
                                      <div>
                                        <input className="form-control" type="text" name="status" ref="status" value={this.state.status} onChange={this.handleInputChange} />
                                      </div>
                                    </div>
                                  </div><br/>  
                                  <div className="row model-warehouse">
                                    <div className="col-md-6">
                                      <label htmlFor="items" className="label">Items</label>
                                      <div>
                                        <input className="form-control" type="text" name="items" ref="items" value={this.state.items.id} onChange={this.handleInputChange} />
                                      </div>
                                    </div>
                                    <div className="col-md-6">
                                      <label htmlFor="vendor" className="label">Vendor</label>
                                      <div>
                                        <input className="form-control" type="text" name="vendor" ref="vendor" value={this.state.vendor.id} onChange={this.handleInputChange} />
                                      </div><br/>
                                    </div>
                                  </div><br/>  
                                  <input className="form-control" type="hidden" name="id" ref="id" value={this.state.id} onChange={this.handleInputChange} />
                                  <div className="form-group">
                                    <div className="pull-right">
                                      <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>&nbsp;&nbsp;
                                      <button className="btn btn-primary">Submit</button>
                                    </div>
                                  </div>
                                </form> 
                              </div>
                            </div>
                          </div>
                      </div>
                    </div>
                  }
                </div>
                { purchaseorder.items && 
                  <table className="table table-bordered table table-border">
                    <tbody>
                      <tr>
                        <td>Purchase Order ID</td>
                        <td>{purchaseorder.items.id}</td>
                      </tr>
                      <tr>
                        <td>Purchase Order Warehouse ID </td>
                        <td>{purchaseorder.items.warehouse.id}</td>
                      </tr>
                      <tr>
                        <td>Purchase Order Warehouse Name</td>
                        <td>{purchaseorder.items.warehouse.name}</td>
                      </tr>
                      <tr>
                        <td>Purchase Order Warehouse Address</td>
                        <td>{purchaseorder.items.warehouse.address}</td>
                      </tr>
                      <tr>
                        <td>Purchase Order Warehouse Landmark</td>
                        <td>{purchaseorder.items.warehouse.landmark}</td>
                      </tr>
                      <tr>
                        <td>Purchase Order Warehouse Zipcode</td>
                        <td>{purchaseorder.items.warehouse.zipcode}</td>
                      </tr>
                      <tr>
                        <td>Purchase Order Warehouse City</td>
                        <td>{purchaseorder.items.warehouse.city}</td>
                      </tr>
                      <tr>
                        <td>Purchase Order Warehouse State</td>
                        <td>{purchaseorder.items.warehouse.state}</td>
                      </tr>
                      <tr>
                        <td>Purchase Order Warehouse Country</td>
                        <td>{purchaseorder.items.warehouse.country}</td>
                      </tr>
                      <tr>
                        <td>Purchase Order Vendor ID</td>
                        <td>{purchaseorder.items.vendor.id}</td>
                      </tr>
                      <tr>
                        <td>Purchase Order Vendor Name</td>
                        <td>{purchaseorder.items.vendor.name}</td>
                      </tr>
                      <tr>
                        <td>Purchase Order Vendor Address</td>
                        <td>{purchaseorder.items.vendor.address}</td>
                      </tr>
                      <tr>
                        <td>Purchase Order Vendor Landmark</td>
                        <td>{purchaseorder.items.vendor.landmark}</td>
                      </tr>
                      <tr>
                        <td>Purchase Order Vendor Zipcode</td>
                        <td>{purchaseorder.items.vendor.zipcode}</td>
                      </tr>
                      <tr>
                        <td>Purchase Order Vendor City</td>
                        <td>{purchaseorder.items.vendor.city}</td>
                      </tr>
                      <tr>
                        <td>Purchase Order Vendor State</td>
                        <td>{purchaseorder.items.vendor.state}</td>
                      </tr>
                      <tr>
                        <td>Purchase Order Vendor Country</td>
                        <td>{purchaseorder.items.vendor.country}</td>
                      </tr>
                    </tbody>
                  </table>
                }
                <center><h3>Items</h3></center>
                { purchaseorder.items && 
                  <table className="table table-bordered table table-border">
                    <thead>
                      <tr className="filters">
                        <th>S.No</th>
                        <th>ID</th>
                        <th>Product ID</th>
                        <th>Quantity</th>
                      </tr>  
                    </thead>
                    { purchaseorder.items.items && purchaseorder.items.items.length > 0 &&
                      <tbody>
                        {purchaseorder.items.items.map((purchase_order, index) =>
                          <tr key={purchase_order.id} >
                            <td>{index + 1}</td>
                            <td>{purchase_order.id}</td>
                            <td>{purchase_order.product.id}</td>
                            <td>{purchase_order.quantity}</td>
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
  const { purchaseorderid, purchaseorder, authentication } = state;
  const { user } = authentication;
  return {
    user,
    purchaseorder
  };
}

const connectedPurchaseOrderDetail = connect(mapStateToProps)(PurchaseOrderDetail);
export { connectedPurchaseOrderDetail as PurchaseOrderDetail };