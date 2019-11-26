import React from 'react';
import { Router, Route, Switch, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import { history } from '../_helpers';
import { alertActions } from '../_actions';
import { PrivateRoute } from '../_components';
import { HomePage } from '../HomePage';
import { Header } from '../Header';
import { Footer } from '../Footer';
import { Product } from '../ProductPage';
import { NewProduct } from '../ProductPage';
import { ProductEdit } from '../ProductPage';
import { WareHouse } from '../WareHousePage';
import { NewWareHouse } from '../WareHousePage';
import { WareHouseAllUser } from '../WareHousePage';
import { WareHouseDetail } from '../WareHousePage';
import { ProductDetail } from '../ProductPage';
import { WareHouseDelete } from '../WareHousePage';
import { WareHouseEdit } from '../WareHousePage';
import { Category } from '../CategoryPage';
import { NewCategory } from '../CategoryPage';
import { CategoryDetail } from '../CategoryPage';
import { CategoryEdit } from '../CategoryPage';
import { Inventory } from '../InventoryPage';
import { InventoryDetail } from '../InventoryPage';
import { InventoryEdit } from '../InventoryPage';
import { NewInventory } from '../InventoryPage';
import { Vendor } from '../VendorPage';
import { VendorDetail } from '../VendorPage';
import { NewVendor } from '../VendorPage';
import { VendorEdit } from '../VendorPage';
import { PurchaseOrderListing } from '../PurchaseOrderPage';
import { PurchaseOrderDetail } from '../PurchaseOrderPage';
import { NewPurchaseOrder } from '../PurchaseOrderPage';
import { TransferOrderListing } from '../TransferOrderPage';
import { TransferOrderDetail } from '../TransferOrderPage';
import { NewTransferOrder } from '../TransferOrderPage';
import { LoginPage } from '../LoginPage';
// import { RegisterPage } from '../RegisterPage';

class App extends React.Component {
  constructor(props) {
    super(props);
    history.listen((location, action) => {
      this.props.clearAlerts();
    });
  }

  render() {
    const { alert } = this.props;
    return (
      <div className="">
        <div className="">
          <div className="">
            {alert.message &&
              <div className={`alert ${alert.type}`}>{alert.message}</div>
            }
            <Router history={history}>
              <Switch>
                <PrivateRoute exact path="/" component={HomePage} />
                <PrivateRoute path="/Header" component={Header} />
                <PrivateRoute path="/Footer" component={Footer} />
                <PrivateRoute path="/products" component={Product} />
                <PrivateRoute path="/warehouse/:id/user" component={WareHouseAllUser} />
                <PrivateRoute path="/new-product" component={NewProduct} />
                <PrivateRoute path="/product/:id/edit" component={ProductEdit} />
                <PrivateRoute path="/new-category" component={NewCategory} />   
                <PrivateRoute path="/categories" component={Category} />
                <PrivateRoute path="/category/:id/edit" component={CategoryEdit} />
                <PrivateRoute path="/category/:id" component={CategoryDetail} />
                <PrivateRoute path="/inventories" component={Inventory} />
                <PrivateRoute path="/inventory/:id/edit" component={InventoryEdit} />
                <PrivateRoute path="/inventory/:id" component={InventoryDetail} />
                <PrivateRoute path="/new-inventory" component={NewInventory} />
                
                
                <PrivateRoute path="/product/:id" component={ProductDetail} />
                <PrivateRoute path="/warehouses" component={WareHouse} />
                
                <PrivateRoute path="/warehouse/:id/edit" component={WareHouseEdit} />
                <PrivateRoute path="/warehouse/:id" component={WareHouseDetail} />
                <PrivateRoute path="/new-warehouse" component={NewWareHouse} />
                <PrivateRoute path="/vendors" component={Vendor} />
                <PrivateRoute path="/vendor/:id/edit" component={VendorEdit} />
                <PrivateRoute path="/vendor/:id" component={VendorDetail} />
                <PrivateRoute path="/new-vendor" component={NewVendor} />
                <PrivateRoute path="/purchase-orders" component={PurchaseOrderListing} />
                <PrivateRoute path="/purchase-order/:id" component={PurchaseOrderDetail} />
                <PrivateRoute path="/new-purchase-order" component={NewPurchaseOrder} />
                <PrivateRoute path="/transfer-orders" component={TransferOrderListing} />
                <PrivateRoute path="/transfer-order/:id" component={TransferOrderDetail} />
                <PrivateRoute path="/new-transfer-order" component={NewTransferOrder} />
                <Route path="/login" component={LoginPage} />
                <Redirect from="*" to="/" />
              </Switch>
            </Router>
          </div>
        </div>
      </div>
    );
  }
}

function mapState(state) {
  const { alert } = state;
  return { alert };
}

const actionCreators = {
  clearAlerts: alertActions.clear
};

const connectedApp = connect(mapState, actionCreators)(App);
export { connectedApp as App };