import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { Header } from '../Header';
import { userActions } from '../_actions';
import { Footer } from '../Footer';
import axios from 'axios';
import config from 'config';
import { Route, Redirect } from 'react-router-dom';


class PurchaseOrderEdit extends React.Component {

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

    render() {
      const { loggingIn} = this.props;
      const { submitted } = this.state;
      const current_user = JSON.parse(localStorage.getItem('singleUser'))

      return (
        <div>
          <div>
            <Header />
            <div className="container">
              <form className="form-horizontal" onSubmit={this.onSubmit.bind(this)}>
                  <center><h2>Edit Purchase Order</h2></center><br/>
                  <div className="form-group">
                    <label htmlFor="warehouse" className="col-sm-2 control-label">Warehouse</label>
                    <div className="col-sm-3">
                      <input className="form-control" type="text" name="warehouse" ref="warehouse" value={this.state.warehouse.id} onChange={this.handleInputChange} />
                    </div>
                  </div>

                  <div className="form-group">
                    <label htmlFor="status" className="col-sm-2 control-label">Status</label>
                    <div className="col-sm-3">
                      <input className="form-control" type="text" name="status" ref="status" value={this.state.status} onChange={this.handleInputChange} />
                    </div>
                  </div>

                  <div className="form-group">
                    <label htmlFor="items" className="col-sm-2 control-label">Items</label>
                    <div className="col-sm-3">
                      <input className="form-control" type="text" name="items" ref="items" value={this.state.items} onChange={this.handleInputChange} />
                    </div>
                  </div>

                  <div className="form-group">
                    <label htmlFor="vendor" className="col-sm-2 control-label">Vendor</label>
                    <div className="col-sm-3">
                      <input className="form-control" type="text" name="vendor" ref="vendor" value={this.state.vendor.id} onChange={this.handleInputChange} />
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
  const {purchaseorderid, authentication } = state;
  const { user } = authentication;
  return {
    user
  };
}

const connectedPurchaseOrderEdit = connect(mapStateToProps)(PurchaseOrderEdit);
export { connectedPurchaseOrderEdit as PurchaseOrderEdit };