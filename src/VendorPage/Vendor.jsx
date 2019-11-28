import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { Header } from '../Header';
import { userActions } from '../_actions';
import { Footer } from '../Footer';
import { NewVendor } from '../VendorPage';


class Vendor extends React.Component {
    componentDidMount() {
      this.props.dispatch(userActions.getAllvendor());
    }

    render() {
      const { user, allvendors } = this.props;
      const current_user = JSON.parse(localStorage.getItem('singleUser'))
      console.log("allvendors*******************************", allvendors)
      return (
        <div>
          <Header />
          <div className="container">
            <div className="">
              <div className="panel panel-primary filterable">
                <div className="panel-heading">
                  <h3 className="panel-title">
                    Vendors 
                  </h3>
                  <div className="pull-right category-position">
                    <button type="button" className="btn btn-primary" data-toggle="modal" data-target="#exampleModal">
                        <b>+</b>Add New Vendor
                    </button>
                    <div className="modal fade" id="exampleModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                        <div className="modal-box" role="document">
                          <div className="modal-content">
                            <div className="modal-header textdesign">
                              <p style={{ fontWeight: 'bold' }}>Add New Vendor</p>
                              <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                              </button>
                            </div>
                            <div className="modal-body">
                              <NewVendor/>
                            </div>
                          </div>
                        </div>
                      </div>
                  </div>
                </div>
                <h5 className="loading-msg">{allvendors.loading && <em>Loading All Vendors .....</em>}</h5>
                <table className="table table-bordered table table-border">
                  <thead>
                    <tr className="filters">
                      <th>S.No</th>
                      <th>ID</th>
                      <th>Name</th>
                      <th>Address</th>
                      
                    </tr>  
                  </thead>
                  
                  { allvendors.items && allvendors.items.length > 0 &&
                    <tbody>
                    {allvendors.items.map((vendor, index) =>
                      <tr key={vendor.id} >
                        <td>{index + 1}</td>
                        <td><Link to={"/vendor/" + vendor.id}>{vendor.id}</Link></td>
                        <td>{vendor.name}</td>
                        <td>{vendor.address}</td>
                        
                      </tr>
                      
                    )}  
                    </tbody>
                  }  
                </table>
              </div>
            </div>
          </div>
        </div>  
      );
    }
}

function mapStateToProps(state) {
  const { allvendors, authentication } = state;
  const { user } = authentication;
  return {
    user,
    allvendors
  };
}

const connectedVendor = connect(mapStateToProps)(Vendor);
export { connectedVendor as Vendor };