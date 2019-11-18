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
import { WareHouseDetail } from '../WareHousePage';
import { ProductDetail } from '../ProductPage';
import { WareHouseDelete } from '../WareHousePage';
import { Category } from '../CategoryPage';
import { NewCategory } from '../CategoryPage';
import { CategoryDetail } from '../CategoryPage';
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
                <Route path="/login" component={LoginPage} />
                <Route path="/register" component={RegisterPage} />
                <Route exact path="/warehouses" component={WareHouse} />
                <Route path="/product/:id" component={ProductDetail} />
                <Route path="/warehouse/:id" component={WareHouseDetail} />

                <Route path="/new-warehouse" component={NewWareHouse} />
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