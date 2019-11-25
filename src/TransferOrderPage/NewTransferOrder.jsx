import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { Header } from '../Header';
import { userActions } from '../_actions';
import { Footer } from '../Footer';
import axios from 'axios';
import config from 'config';
import { Route, Redirect } from 'react-router-dom';


class NewTransferOrder extends React.Component {
    
    constructor(props) {
        super(props);
        this.state = {
          transferorders: {
              destinationWarehouse: '',
              itemid: '',
              sourceWarehouse: '',
              status: '',
              loaded: 0
          },
          submitted: false
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
      const { name, value } = event.target;
      const { transferorders } = this.state;
      this.setState({
          transferorders: { ...transferorders, [name]: value }
      });
    }

    handleSubmit(event) {
      const headers = {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem('user')).data.token
      }
      event.preventDefault();
      this.setState({ submitted: true });
      const { transferorders } = this.state;
      const { dispatch } = this.props;
      var transferorder = { items: [{id: transferorders.itemid }],status: transferorders.status, destinationWarehouse: {id: transferorders.destinationWarehouse}, sourceWarehouse: {id: transferorders.sourceWarehouse}}
      axios.post(`${config.apiUrl}/transfer_orders`, transferorder, {
      headers: headers
      })
      .then(response => {
        this.setState({ locations: response.data });
        window.location = "/transfer-orders"
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
      const { transferorders, category, submitted } = this.state;
      const current_user = JSON.parse(localStorage.getItem('singleUser'))
      console.log("allproducts*******************************", allproducts)
      console.log("allwarehouses*******************************", allwarehouses)
      return (
        <div>
          <Header />
          <div className="container">
          <form name="form" className="form-horizontal" role="form" onSubmit={this.handleSubmit}>
              <center><h2>Add New Transfer Order</h2></center><br/>

               <div className="form-group">
                <label htmlFor="destinationWarehouse" className="col-sm-2 control-label">Destination Warehouse</label>
                <div className="col-sm-9">
                  { allwarehouses.items && allwarehouses.items.length > 0 &&
                    <select value={transferorders.destinationWarehouse} onChange={this.handleChange} name="destinationWarehouse" className="form-control select-field" >
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
                <label htmlFor="productitemid" className="col-sm-2 control-label">Item</label>
                <div className="col-sm-9">
                  {submitted && !transferorders.itemid && 
                    <div className="help-block required-msg"> Item is required</div>
                  }
                  <input type="text" id="purchaseorderitemid" className="form-control" placeholder="Item" name="itemid" value={transferorders.itemid} onChange={this.handleChange}  autoFocus />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="productstatus" className="col-sm-2 control-label">Status</label>
                <div className="col-sm-9">
                  {submitted && !transferorders.status && 
                    <div className="help-block required-msg"> status is required</div>
                  }
                  <input type="text" id="transferorderstatus" className="form-control" placeholder="Status" name="status" value={transferorders.status} onChange={this.handleChange}  autoFocus />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="sourceWarehouse" className="col-sm-2 control-label">Source Warehouse</label>
                <div className="col-sm-9">
                  { allwarehouses.items && allwarehouses.items.length > 0 &&
                    <select value={transferorders.sourceWarehouse} onChange={this.handleChange} name="sourceWarehouse" className="form-control select-field" >
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
  const { transferorders,allproducts,allwarehouses, allvendors, users, authentication } = state;
  const { user } = authentication;
  return {
    user,
    allproducts,
    allwarehouses,
    transferorders,
    allvendors,
    users,
  };
}

const connectedNewTransferOrder = connect(mapStateToProps)(NewTransferOrder);
export { connectedNewTransferOrder as NewTransferOrder };