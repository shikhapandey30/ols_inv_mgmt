import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { Header } from '../Header';
import { userActions } from '../_actions';
import { Footer } from '../Footer';

class Inventory extends React.Component {
    componentDidMount() {
      this.props.dispatch(userActions.getAllinventory());
    }

    render() {
      const { user, allinventories } = this.props;
      const current_user = JSON.parse(localStorage.getItem('singleUser'))
      console.log("allinventories*******************************", allinventories)
      return (
        <div>
          <Header />
          <div className="container">
            <div className="">
              <div className="panel panel-primary filterable">
                <div className="panel-heading">
                  <h3 className="panel-title"> 
                   Inventories
                    </h3>
                  <div className="pull-right">
                    <a href="/new-inventory" className="btn btn-primary btn-xs pull-right"><b>+</b> Add New Inventroy
                    </a>
                  </div>
                </div>
                <h5 className="loading-msg">{allinventories.loading && <em>Loading All Inventory .....</em>}</h5>
                <table className="table table-bordered table table-border">
                  <thead>
                    <tr className="filters">
                      <th>S.No</th>
                      <th>ID</th>
                      <th>Product ID</th>
                      <th>Product Name</th>
                      <th>Warehouse Name</th>
                      <th>Warehouse ID</th>
                      <th>Qty</th>
                      
                    </tr>  
                  </thead>
                  
                  { allinventories.items && allinventories.items.length > 0 &&
                    <tbody>
                    {allinventories.items.map((inventory, index) =>
                      <tr key={inventory.id} >
                        <td>{index + 1}</td>
                        <td><Link to={"/inventory/" + inventory.id}>{inventory.id}</Link></td>
                        <td>{inventory.product.id}</td>
                        <td>{inventory.product.name}</td>
                        <td>{inventory.warehouse.name}</td>
                        <td>{inventory.warehouse.id}</td>
                        <td>{inventory.quantity}</td>
                        
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
  const { allinventories, authentication } = state;
  const { user } = authentication;
  return {
    user,
    allinventories
  };
}

const connectedInventory = connect(mapStateToProps)(Inventory);
export { connectedInventory as Inventory };