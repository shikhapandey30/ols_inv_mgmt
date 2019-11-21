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
import { Inventory } from '../InventoryPage';
import { InventoryDetail } from '../InventoryPage';
import { NewInventory } from '../InventoryPage';
import { Vendor } from '../VendorPage';
import { VendorDetail } from '../VendorPage';
import { NewVendor } from '../VendorPage';
import { PurchaseOrderListing } from '../PurchaseOrderPage';
import { PurchaseOrderDetail } from '../PurchaseOrderPage';
import { NewPurchaseOrder } from '../PurchaseOrderPage';
import { LoginPage } from '../LoginPage';
import { RegisterPage } from '../RegisterPage';

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
                <Route path="/Header" component={Header} />
                <Route path="/Footer" component={Footer} />
                <Route path="/products" component={Product} />
                <Route path="/new-product" component={NewProduct} />
                <Route path="/new-category" component={NewCategory} />   
                <Route path="/categories" component={Category} />
                <Route path="/category/:id" component={CategoryDetail} />
                <Route path="/inventories" component={Inventory} />
                <Route path="/inventory/:id" component={InventoryDetail} />
                <Route path="/new-inventory" component={NewInventory} />
                <Route path="/login" component={LoginPage} />
                <Route path="/register" component={RegisterPage} />
                <Route exact path="/warehouses" component={WareHouse} />
                <Route path="/product/:id" component={ProductDetail} />
                <Route path="/warehouse/:id/user" component={WareHouseAllUser} />
                <Route path="/warehouse/:id/edit" component={WareHouseEdit} />
                <Route path="/warehouse/:id" component={WareHouseDetail} />

                <Route path="/new-warehouse" component={NewWareHouse} />

                <Route path="/vendors" component={Vendor} />
                <Route path="/vendor/:id" component={VendorDetail} />
                <Route path="/new-vendor" component={NewVendor} />
                <Route path="/purchase-orders" component={PurchaseOrderListing} />
                <Route path="/purchase-order/:id" component={PurchaseOrderDetail} />
                <Route path="/new-purchase-order" component={NewPurchaseOrder} />

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