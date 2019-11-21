import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { Header } from '../Header';
import { userActions } from '../_actions';
import { Footer } from '../Footer';
import MUIDataTable from "mui-datatables";
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';

class PurchaseOrderListing extends React.Component {
    componentDidMount() {
      this.props.dispatch(userActions.getAllpuchaseorderslist());
    }

    render() {
      const { user, allpuchaseorders } = this.props;
      const current_user = JSON.parse(localStorage.getItem('singleUser'))
      console.log("allpuchaseorders*******************************", allpuchaseorders)
      return (
        <div>
          <Header />
          <div className="container">
            <div className="">
              <div className="panel panel-primary filterable">
                <div className="panel-heading">
                  <h3 className="panel-title"> 
                   Purchase Order Listing</h3>

                  <div className="pull-right">
                    <a href="/new-purchase-order" className="btn btn-primary btn-xs pull-right"><b>+</b> Add new PO
                    </a>
                  </div>
                </div>
                <h5 className="loading-msg">{allpuchaseorders.loading && <em>Loading All Puchase Order .....</em>}</h5>
                <table className="table table-bordered table table-border">
                  <thead>
                    <tr className="filters">
                      <th>S.No</th>
                      <th>PO ID</th>
                      <th>PO Number</th>
                      <th>PO Amt</th>
                      <th>Supplier Name</th>
                      <th>Create Date</th>
                      <th>Delivery Date</th>
                      <th>Status</th>
                      <th>Info</th>
                      <th>View</th>
                      
                    </tr>  
                  </thead>
                  
                  { allpuchaseorders.items && allpuchaseorders.items.length > 0 &&
                    <tbody>
                    {allpuchaseorders.items.map((po, index) =>
                      <tr key={po.id} >
                        <td>{index + 1}</td>
                        <td>{po.id}</td>
                        <td>{po.number}</td>
                        <td>{po.amt}</td>
                        <td>{po.supplier_name}</td>
                        <td>{po.created_date}</td>
                        <td>{po.delivery_date}</td>
                        <td>{po.status}</td>
                        <td>{po.info}</td>
                        <td><Link to={"/purchase-order/" + po.id}>View</Link></td>
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
  const { allpuchaseorders, authentication } = state;
  const { user } = authentication;
  return {
    user,
    allpuchaseorders
  };
}

const connectedPurchaseOrderListing = connect(mapStateToProps)(PurchaseOrderListing);
export { connectedPurchaseOrderListing as PurchaseOrderListing };