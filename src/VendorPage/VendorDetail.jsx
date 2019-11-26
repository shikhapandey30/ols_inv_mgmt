import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { Header } from '../Header';
import { userActions } from '../_actions';
import { Footer } from '../Footer';
import axios from 'axios';
import config from 'config';

class VendorDetail extends React.Component {
    componentDidMount(vendor) {
      this.props.dispatch(userActions.getvendordetail(this.props.match.params.id));
    }

    vendorDelete = (id) => {
      const headers = {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem('user')).data.token
        }
        console.log("******************************************", id)
        axios.delete(`${config.apiUrl}/vendors/${id}`, {
      headers: headers
      })
        .then(response => {
          this.setState({ locations: response.data });
          window.location = "/vendors"
        })
    }

    render() {
      const { user, vendor } = this.props
      const current_user = JSON.parse(localStorage.getItem('singleUser'))
      return (
        <div>
          <Header />
          <div className="container">
            <div className="">
              <div className="panel panel-primary filterable">
                <div className="panel-heading">
                  { vendor.items && 
                    <h3 className="panel-title"> 
                     {vendor.items.name}
                    </h3>
                  }
                  { vendor.items && 
                    <div className="pull-right btn-style">
                      <button className="btn btn-danger" onClick={() => {if(window.confirm('Delete the item?')){this.vendorDelete(vendor.items.id)};}}>Delete</button>
                      <button className="btn btn-default">
                      <Link to={"/vendor/" + vendor.items.id + "/edit"} onClick={this.forceUpdate}>Edit</Link></button>
                    </div>
                  }
                </div>
                { vendor.items && 
                  <table className="table table-bordered table table-border">
                    <tbody>
                      <tr>
                        <td>Vendor ID</td>
                        <td>{vendor.items.id}</td>
                      </tr>
                      <tr>
                        <td>Vendor Name</td>
                        <td>{vendor.items.name}</td>
                      </tr>
                      <tr>
                        <td>Vendor Address</td>
                        <td>{vendor.items.address}</td>
                      </tr>
                      <tr>
                        <td>Vendor Landmark</td>
                        <td>{vendor.items.landmark}</td>
                      </tr>
                      <tr>
                        <td>Vendor Zipcode</td>
                        <td>{vendor.items.zipcode}</td>
                      </tr>
                      <tr>
                        <td>Vendor City</td>
                        <td>{vendor.items.city}</td>
                      </tr>
                      <tr>
                        <td>Vendor State</td>
                        <td>{vendor.items.state}</td>
                      </tr>
                      <tr>
                        <td>Vendor Country</td>
                        <td>{vendor.items.country}</td>
                      </tr>
                    </tbody>
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
  const { vendorid, vendor, authentication } = state;
  const { user } = authentication;
  return {
    user,
    vendor
  };
}

const connectedVendorDetail = connect(mapStateToProps)(VendorDetail);
export { connectedVendorDetail as VendorDetail };