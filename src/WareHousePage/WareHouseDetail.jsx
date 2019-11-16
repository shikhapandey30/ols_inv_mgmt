import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { Header } from '../Header';
import { userActions } from '../_actions';
import { Footer } from '../Footer';

class WareHouseDetail extends React.Component {
    componentDidMount() {
      console.log("mount")
        this.props.dispatch(userActions.getAllwarehouse());
    }

    handleDeleteUser(id) {
        return (e) => this.props.dispatch(userActions.delete(id));
    }

    fShow(warehouse) {
      const { dispatch } = this.props;
      dispatch(userActions.getwarehousedetail(warehouse));
    } 

    render() {
      const { user, warehouse, allwarehouses } = this.props;
      const current_user = JSON.parse(localStorage.getItem('singleUser'))
      console.log("warehouse#####****", warehouse)
      console.log("allwarehouses#####****", allwarehouses)
      return (
        <div>
          <Header />
          <div className="container">
            <div className="">
              <div className="panel panel-primary filterable">
                <div className="panel-heading">
                  <h3 className="panel-title"> 
                   
                   <a href="/products"><button type="button" className="btn btn-default">Product</button></a>
                    <a href="/warehouse"><button type="button" className="btn btn-default active">Warehouse</button></a></h3>

                  <div className="pull-right">
                    <a href="/new-warehouse" className="btn btn-primary btn-xs pull-right"><b>+</b> Add new Warehouse
                    </a>
                  </div>
                </div>
                <h5 className="loading-msg">{warehouse.loading && <em>Loading All Warehouses .....</em>}</h5>
                <table className="table table-bordered table table-border">
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
                  
                  { warehouse.items && warehouse.items.length > 0 &&
                    <tbody>
                    {warehouse.items.map((warehouse, index) =>
                      <tr key={warehouse.id} >
                        <td>{index + 1}</td>
                        <td onClick={() => { this.fShow(warehouse) }} >{warehouse.name }</td>
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
              <center><button type="button" className="btn btn-default active">Submit</button></center>
            </div>
          </div>
        </div>  
      );
    }
}

function mapStateToProps(state) {
  const { warehouse, allwarehouses, authentication } = state;
  const { user } = authentication;
  return {
    user,
    allwarehouses,
    warehouse
  };
}

const connectedWareHouseDetail = connect(mapStateToProps)(WareHouseDetail);
export { connectedWareHouseDetail as WareHouseDetail };