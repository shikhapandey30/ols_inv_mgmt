import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { Header } from '../Header';
import { userActions } from '../_actions';
import { Footer } from '../Footer';
import axios from 'axios';
import config from 'config';
import { Route, Redirect } from 'react-router-dom';


class NewWareHouse extends React.Component {
   
    constructor(props) {
        super(props);
        this.state = {
            warehouse: {
                name: '',
                city: '',
                state: '',
                address: '',
                country: '',
                zipcode: '',
                loaded: 0
            },
            submitted: false
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
      const { name, value } = event.target;
      const { warehouse } = this.state;
      this.setState({
          warehouse: { ...warehouse, [name]: value }
      });
    }

    handleSubmit(event) {
      const headers = {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem('user')).data.token
      }
      event.preventDefault();
      this.setState({ submitted: true });
      const { warehouse } = this.state;
      const { dispatch } = this.props;

      axios.post(`${config.apiUrl}/warehouses`, warehouse, {
      headers: headers
      })
      .then(response => {
        this.setState({ locations: response.data });
        window.location = "/warehouses"
      })
    }

    handleDeleteUser(id) {
      return (e) => this.props.dispatch(userActions.delete(id));
    }

    render() {
      const { loggingIn, user, users } = this.props;
      const { warehouse, submitted } = this.state;
      const current_user = JSON.parse(localStorage.getItem('singleUser'))
      console.log("users", users)
      return (
        <div>
          <Header />
          <div className="container">
              <form name="form" className="form-horizontal" role="form" onSubmit={this.handleSubmit}>
              <center><h2>Add New WareHouse</h2></center><br/>
              <div className="form-group">
                <label htmlFor="warehousename" className="col-sm-2 control-label">WareHouse Name</label>
                <div className="col-sm-3">
                  {submitted && !warehouse.name && 
                    <div className="help-block required-msg"> Warehouse Name is required</div>
                  }
                  <input type="text" id="warehousename" className="form-control" placeholder="WareHouse Name" name="name" value={warehouse.name} onChange={this.handleChange}  autoFocus />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="warehousecity" className="col-sm-2 control-label">City</label>
                <div className="col-sm-3">
                  {submitted && !warehouse.city && 
                    <div className="help-block required-msg"> Warehouse City is required</div>
                  }
                  <input type="text" id="warehousecity" className="form-control" placeholder="City" name="city" value={warehouse.city} onChange={this.handleChange}  autoFocus />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="warehousestate" className="col-sm-2 control-label">State</label>
                <div className="col-sm-3">
                  {submitted && !warehouse.state && 
                    <div className="help-block required-msg"> Warehouse State is required</div>
                  }
                  <input type="text" id="warehousestate" className="form-control" placeholder="State" name="state" value={warehouse.state} onChange={this.handleChange}  autoFocus />
                </div>
              </div>

              
              <div className="form-group">
                <label htmlFor="warehouseaddress" className="col-sm-2 control-label">Address</label>
                <div className="col-sm-3">
                  {submitted && !warehouse.address && 
                    <div className="help-block required-msg"> Warehouse Address is required</div>
                  }
                  <input type="text" id="warehouseaddress" className="form-control" placeholder="Address" name="address" value={warehouse.address} onChange={this.handleChange}  autoFocus />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="warehousecountry" className="col-sm-2 control-label">Country</label>
                <div className="col-sm-3">
                  {submitted && !warehouse.country && 
                    <div className="help-block required-msg"> Warehouse Country is required</div>
                  }
                  <input type="text" id="warehousecountry" className="form-control" placeholder="Country" name="country" value={warehouse.country} onChange={this.handleChange}  autoFocus />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="warehousezipcode" className="col-sm-2 control-label">Zipcode</label>
                <div className="col-sm-3">
                  {submitted && !warehouse.zipcode && 
                    <div className="help-block required-msg"> Warehouse Zipcode is required</div>
                  }
                  <input type="text" id="warehousezipcode" className="form-control" placeholder="Zipcode" name="zipcode" value={warehouse.zipcode} onChange={this.handleChange}  autoFocus />
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
  const { users,warehouse, authentication } = state;
  const { user } = authentication;
  return {
    user,
    warehouse,
    users
  };
}

const connectedNewWareHouse = connect(mapStateToProps)(NewWareHouse);
export { connectedNewWareHouse as NewWareHouse };