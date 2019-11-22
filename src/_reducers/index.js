import { combineReducers } from 'redux';

import { authentication } from './authentication.reducer';
import { users } from './users.reducer';
import { warehouse } from './warehouse.reducer';
import { allwarehouses } from './allwarehouses.reducer';
import { product } from './product.reducer';
import { category } from './category.reducer';  
import { allproducts } from './allproducts.reducer';
import { allcategories } from './allcategories.reducer';
import { allinventories } from './allinventories.reducer';
import { warehousealluser } from './warehousealluser.reducer';
import { inventory } from './inventory.reducer';
import { allvendors } from './allvendors.reducer';
import { vendor } from './vendor.reducer';
import { allpuchaseorders } from './allpuchaseorders.reducer';
import { alltransferorders } from './alltransferorders.reducer';
import { purchaseorder } from './purchaseorder.reducer';
import { transferorder } from './transferorder.reducer';
import { alert } from './alert.reducer';

const rootReducer = combineReducers({
  authentication,
  users,
  allwarehouses,
  warehousealluser,
  warehouse,
  product,
  category,
  allproducts,
  allcategories,
  allinventories,
  inventory,
  allvendors,
  vendor,
  allpuchaseorders,
  purchaseorder,
  alltransferorders,
  transferorder,
  alert
});

export default rootReducer;
