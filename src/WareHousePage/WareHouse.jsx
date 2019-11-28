import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { Header } from '../Header';
import { userActions } from '../_actions';
import { Footer } from '../Footer';
import { NewWareHouse } from '../WareHousePage';

class WareHouse extends React.Component {
    componentDidMount() {
      this.props.dispatch(userActions.getAllwarehouse());
    }

    render() {
      const { user, allwarehouses } = this.props;
      const current_user = JSON.parse(localStorage.getItem('singleUser'))
      console.log("allwarehouses", allwarehouses)
      return (
        <div>
          <Header />
          <div className="container">
            <div className="">
              <div className="panel panel-primary filterable">
                <div className="panel-heading">
                  <h3 className="panel-title"> 
                    Warehouses 
                  </h3>
                  <div className="pull-right category-position">
                    <button type="button" className="btn btn-primary" data-toggle="modal" data-target="#exampleModal">
                        <b>+</b>Add New Warehouse
                    </button>
                    <div className="modal fade" id="exampleModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                        <div className="modal-box" role="document">
                          <div className="modal-content">
                            <div className="modal-header textdesign">
                              <p style={{ fontWeight: 'bold' }}>Add New WareHouse</p>
                              <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                              </button>
                            </div>
                            <div className="modal-body">
                              <NewWareHouse/>
                            </div>
                          </div>
                        </div>
                      </div>
                  </div>
                </div>
                <h5 className="loading-msg">{allwarehouses.loading && <em>Loading All Warehouses .....</em>}</h5>
                <table className="table table-bordered table table-border responsive">
                  <thead>
                    <tr className="filters">
                      <th>S.No</th>
                      <th>Warehouse Name</th>
                      <th>Warehouse ID</th>
                      <th>Warehouse Address</th>
                      <th>Warehouse City</th>
                      <th>Warehouse State</th>
                      <th>Warehouse Country</th>
                      <th>Warehouse Landmark</th>
                    </tr>  
                  </thead>
                  
                  { allwarehouses.items && allwarehouses.items.length > 0 &&
                    <tbody>
                    {allwarehouses.items.map((warehouse, index) =>
                      <tr key={warehouse.id} >
                        <td>{index + 1}</td>
                        <td><Link to={"/warehouse/" + warehouse.id}>{warehouse.name}</Link></td>
                        <td>{warehouse.id}</td>
                        <td>{warehouse.address}</td>
                        <td>{warehouse.city}</td>
                        <td>{warehouse.state}</td>
                        <td>{warehouse.country}</td>
                        <td>{warehouse.landmark}</td>
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
  const { allwarehouses, authentication } = state;
  const { user } = authentication;
  return {
    user,
    allwarehouses
  };
}

const connectedWareHouse = connect(mapStateToProps)(WareHouse);
export { connectedWareHouse as WareHouse };