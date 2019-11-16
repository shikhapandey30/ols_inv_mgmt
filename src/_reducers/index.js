import { combineReducers } from 'redux';

import { authentication } from './authentication.reducer';
import { registration } from './registration.reducer';
import { users } from './users.reducer';
import { allwarehouses } from './allwarehouses.reducer';
import { warehouse } from './warehouse.reducer';
import { allproducts } from './allproducts.reducer';
import { alert } from './alert.reducer';

const rootReducer = combineReducers({
  authentication,
  registration,
  users,
  allwarehouses,
  warehouse,
  allproducts,
  alert
});

export default rootReducer;
