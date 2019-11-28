import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { Header } from '../Header';
import { userActions } from '../_actions';
import { Footer } from '../Footer';
import axios from 'axios';
import config from 'config';
import { Route, Redirect } from 'react-router-dom';


class NewVendor extends React.Component {
    
    constructor(props) {
        super(props);
        this.state = {
          vendors: {
              name: '',
              address: '',
              city: '',
              state: '',
              country: '',
              landmark: '',
              zipcode: '',
              product: '',
              loaded: 0
          },
          submitted: false
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
      const { name, value } = event.target;
      const { vendors } = this.state;
      this.setState({
          vendors: { ...vendors, [name]: value }
      });
    }

    handleSubmit(event) {
      const headers = {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem('user')).data.token
      }
      event.preventDefault();
      this.setState({ submitted: true });
      const { vendors } = this.state;
      const { dispatch } = this.props;
      var vendor = { name: vendors.name, address: vendors.address, city: vendors.city, state: vendors.state, country: vendors.country,landmark: vendors.landmark, zipcode: vendors.zipcode,products: [{ id: vendors.product}] }
      axios.post(`${config.apiUrl}/vendors`, vendor, {
      headers: headers
      })
      .then(response => {
        this.setState({ locations: response.data });
        window.location = "/vendors"
      })
    }

    handleDeleteUser(id) {
      return (e) => this.props.dispatch(userActions.delete(id));
    }

    componentDidMount() {
      this.props.dispatch(userActions.getAllproduct());
    }

    render() {
      const { loggingIn, user, allproducts } = this.props;
      const { vendors, category, submitted } = this.state;
      const current_user = JSON.parse(localStorage.getItem('singleUser'))
      console.log("allproducts*******************************", allproducts)
      return (
        <div>
          <div className="container">
          <form name="form" className="form-horizontal" role="form" onSubmit={this.handleSubmit}>
              <div className="row">
                <div className="col-md-6">
                  <label htmlFor="vendorname" className="label">Name</label>
                  <div>
                    {submitted && !vendors.name && 
                      <div className="help-block required-msg"> Vendor Name is required</div>
                    }
                    <input type="text" id="vendorname" className="form-control" placeholder="Vendor Name" name="name" value={vendors.name} onChange={this.handleChange}  autoFocus />
                  </div>
                </div>
                <div className="col-md-6">
                  <label htmlFor="vendoraddress" className="label">Address</label>
                  <div>
                    {submitted && !vendors.address && 
                      <div className="help-block required-msg"> Vendor Address is required</div>
                    }
                    <input type="text" id="vendoraddress" className="form-control" placeholder="Vendor Address" name="address" value={vendors.address} onChange={this.handleChange}  autoFocus />
                  </div>
                </div>  
              </div><br/>
              <div className="row">
                <div className="col-md-6">
                  <label htmlFor="vendorcity" className="label">City</label>
                  <div>
                    {submitted && !vendors.city && 
                      <div className="help-block required-msg"> Product Brand Name is required</div>
                    }
                    <input type="text" id="vendorcity" className="form-control" placeholder="City" name="city" value={vendors.city} onChange={this.handleChange}  autoFocus />
                  </div>
                </div>
                <div className="col-md-6">
                  <label htmlFor="vendorstate" className="label">State</label>
                  <div>
                    {submitted && !vendors.state && 
                      <div className="help-block required-msg"> Product Brand Name is required</div>
                    }
                    <input type="text" id="vendorstate" className="form-control" placeholder="State" name="state" value={vendors.state} onChange={this.handleChange}  autoFocus />
                  </div>
                </div>  
              </div><br/>
              <div className="row">
                <div className="col-md-6">
                  <label htmlFor="vendorcountry" className="label">Country</label>
                  <div>
                    {submitted && !vendors.country && 
                      <div className="help-block required-msg"> Product Brand Name is required</div>
                    }
                    <input type="text" id="vendorcountry" className="form-control" placeholder="Country" name="country" value={vendors.country} onChange={this.handleChange}  autoFocus />
                  </div>
                </div>
                <div className="col-md-6">
                  <label htmlFor="vendorlandmark" className="label">Landmark</label>
                  <div>
                    {submitted && !vendors.landmark && 
                      <div className="help-block required-msg"> Product Brand Name is required</div>
                    }
                    <input type="text" id="vendorlandmark" className="form-control" placeholder="Landmark" name="landmark" value={vendors.landmark} onChange={this.handleChange}  autoFocus />
                  </div>
                </div>  
              </div><br/>
              <div className="row model-warehouse">
                <div className="col-md-6">
                  <label htmlFor="vendorzipcode" className="label">Zipcode</label>
                  <div>
                    {submitted && !vendors.zipcode && 
                      <div className="help-block required-msg"> Product Brand Name is required</div>
                    }
                    <input type="text" id="vendorzipcode" className="form-control" placeholder="Zipcode" name="zipcode" value={vendors.zipcode} onChange={this.handleChange}  autoFocus />
                  </div>
                </div>
                <div className="col-md-6">
                  <label htmlFor="vendorproductid" className="label">Product </label>
                  <div>
                    {submitted && !vendors.product && 
                      <div className="help-block required-msg"> Inventory product is required</div>
                    }
                     { allproducts.items && allproducts.items.length > 0 &&
                      <select value={vendors.product} onChange={this.handleChange} name="product" className="form-control select-field" >
                        {allproducts.items.map((product, index) =>
                          <option key={index} value={product.id} >
                            {product.name}
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
  const { vendors,allproducts, users, authentication } = state;
  const { user } = authentication;
  return {
    user,
    allproducts,
    vendors,
    users,
  };
}

const connectedNewVendor = connect(mapStateToProps)(NewVendor);
export { connectedNewVendor as NewVendor };