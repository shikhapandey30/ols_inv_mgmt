import { combineReducers } from 'redux';

import { authentication } from './authentication.reducer';
import { registration } from './registration.reducer';
import { users } from './users.reducer';
import { warehouse } from './warehouse.reducer';
import { allwarehouses } from './allwarehouses.reducer';
import { product } from './product.reducer';
import { category } from './category.reducer';
import { allproducts } from './allproducts.reducer';
import { allcategories } from './allcategories.reducer';
import { alert } from './alert.reducer';

const rootReducer = combineReducers({
  authentication,
  registration,
  users,
  allwarehouses,
  warehouse,
  product,
  category,
  allproducts,
  allcategories,
  alert
});

export default rootReducer;
