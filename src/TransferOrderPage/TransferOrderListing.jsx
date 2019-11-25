import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { Header } from '../Header';
import { userActions } from '../_actions';
import { Footer } from '../Footer';
import MUIDataTable from "mui-datatables";
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';

class TransferOrderListing extends React.Component {
    componentDidMount() {
      this.props.dispatch(userActions.getAlltranferorderslist());
    }

    render() {
      const { user, alltransferorders } = this.props;
      const current_user = JSON.parse(localStorage.getItem('singleUser'))
      console.log("alltransferorders*******************************", alltransferorders)
      return (
        <div>
          <Header />
          <div className="container">
            <div className="">
              <div className="panel panel-primary filterable">
                <div className="panel-heading">
                  <h3 className="panel-title"> 
                   Transfer Order Listing</h3>

                  <div className="pull-right">
                    <a href="/new-transfer-order" className="btn btn-primary btn-xs pull-right"><b>+</b> Add New Transfer Order
                    </a>
                  </div>
                </div>
                <h5 className="loading-msg">{alltransferorders.loading && <em>Loading All Transfer Order .....</em>}</h5>
                <table className="table table-bordered table table-border">
                  <thead>
                    <tr className="filters">
                      <th>S.No</th>
                      <th>Transfer Order ID</th>
                      <th>From Warehouse</th>
                      <th>To Warehouse</th>
                      <th>Status</th>
                      <th>View</th>
                    </tr>  
                  </thead>
                  
                  { alltransferorders.items && alltransferorders.items.length > 0 &&
                    <tbody>
                    {alltransferorders.items.map((transfer_order, index) =>
                      <tr key={transfer_order.id} >
                        <td>{index + 1}</td>
                        <td>{transfer_order.id}</td>
                        <td>{transfer_order.sourceWarehouse.name}</td>
                        <td>{transfer_order.destinationWarehouse.name}</td>
                        <td>{transfer_order.status}</td>
                        <td><Link to={"/transfer-order/" + transfer_order.id}>View</Link></td>
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
  const { alltransferorders, authentication } = state;
  const { user } = authentication;
  return {
    user,
    alltransferorders
  };
}

const connectedTransferOrderListing = connect(mapStateToProps)(TransferOrderListing);
export { connectedTransferOrderListing as TransferOrderListing };