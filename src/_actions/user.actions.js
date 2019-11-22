import { userConstants } from '../_constants';
import { userService } from '../_services';
import { alertActions } from './';
import { history } from '../_helpers';

export const userActions = {
    login,
    logout,
    getwarehouseuser,
    getAllwarehouse,
    getwarehousedetail,
    getAllproduct,
    getproductdetail,
    getAllcategory,
    getcategorydetail,
    getAllinventory,
    getinventorydetail,
    getAllvendor,
    getvendordetail,
    getAllpuchaseorderslist,
    getpurchaseorderdetail,
    getAlltranferorderslist,
    gettransferorderdetail,
    delete: _delete
};

function login(username, password) {
    return dispatch => {
      dispatch(request({ username }));
      userService.login(username, password)
        .then(
          user => { 
              dispatch(success(user));
              history.push('/');
              // dispatch(alertActions.success('Successful Login'));
          },
          error => {
              alert('Invalid Username Or Password')
              dispatch(failure(error.toString()));
              dispatch(alertActions.error(error.toString()));
          }
        );
    };

    function request(user) { return { type: userConstants.LOGIN_REQUEST, user } }
    function success(user) { return { type: userConstants.LOGIN_SUCCESS, user } }
    function failure(error) { return { type: userConstants.LOGIN_FAILURE, error } }
}

function logout() {
    userService.logout();
    return { type: userConstants.LOGOUT };
}


function getwarehouseuser(warehouseID) {
  return dispatch => {
      dispatch(request());
      userService.getwarehouseuser(warehouseID)
        .then(
          warehousealluser => dispatch(success(warehousealluser)),
          error => dispatch(failure(error.toString()))
        );
  };

  function request() { return { type: userConstants.GETWAREHOUSET_REQUEST } }
  function success(warehousealluser) { return { type: userConstants.GETWAREHOUSET_SUCCESS, warehousealluser } }
  function failure(error) { return { type: userConstants.GETWAREHOUSET, error } }
}

function getAllwarehouse() {
  return dispatch => {
    dispatch(request());
    userService.getAllwarehouse()
    .then(
      allwarehouses => dispatch(success(allwarehouses)),
      error => dispatch(failure(error.toString()))
    );
  };

  function request() { return { type: userConstants.GETALLWAREHOUSE_REQUEST } }
  function success(allwarehouses) { return { type: userConstants.GETALLWAREHOUSE_SUCCESS, allwarehouses } }
  function failure(error) { return { type: userConstants.GETALLWAREHOUSE, error } }
}


function getwarehousedetail(warehouseID) {
  return dispatch => {
      dispatch(request());
      userService.getwarehousedetail(warehouseID)
          .then(
              warehouse => dispatch(success(warehouse)),
              error => dispatch(failure(error.toString()))
          );
  };

  function request() { return { type: userConstants.GETWAREHOUSEDETAIL_REQUEST } }
  function success(warehouse) { return { type: userConstants.GETWAREHOUSEDETAIL_SUCCESS, warehouse } }
  function failure(error) { return { type: userConstants.GETWAREHOUSEDETAIL, error } }
}

function getcategorydetail(categoryID) {
  return dispatch => {
      dispatch(request());
      userService.getcategorydetail(categoryID)
          .then(
              category => dispatch(success(category)),
              error => dispatch(failure(error.toString()))
          );
  };

  function request() { return { type: userConstants.GETCATEGORYDETAIL_REQUEST } }
  function success(category) { return { type: userConstants.GETCATEGORYDETAIL_SUCCESS, category } }
  function failure(error) { return { type: userConstants.GETCATEGORYDETAIL, error } }
}

function getproductdetail(productID) {
  return dispatch => {
      dispatch(request());
      userService.getproductdetail(productID)
          .then(
              product => dispatch(success(product)),
              error => dispatch(failure(error.toString()))
          );
  };

  function request() { return { type: userConstants.GETPRODUCTDETAIL_REQUEST } }
  function success(product) { return { type: userConstants.GETPRODUCTDETAIL_SUCCESS, product } }
  function failure(error) { return { type: userConstants.GETPRODUCTDETAIL, error } }
}

function getAllproduct() {
    return dispatch => {
        dispatch(request());
        userService.getAllproduct()
            .then(
                allproducts => dispatch(success(allproducts)),
                error => dispatch(failure(error.toString()))
            );
    };

    function request() { return { type: userConstants.GETALLPRODUCT_REQUEST } }
    function success(allproducts) { return { type: userConstants.GETALLPRODUCT_SUCCESS, allproducts } }
    function failure(error) { return { type: userConstants.GETALLPRODUCT, error } }
}

function getAllcategory() {
  return dispatch => {
    dispatch(request());
    userService.getAllcategory()
    .then(
      allcategories => dispatch(success(allcategories)),
      error => dispatch(failure(error.toString()))
    );
  };

  function request() { return { type: userConstants.GETALLCATEGORY_REQUEST } }
  function success(allcategories) { return { type: userConstants.GETALLCATEGORY_SUCCESS, allcategories } }
  function failure(error) { return { type: userConstants.GETALLCATEGORY, error } }
}

function getAllinventory() {
  return dispatch => {
    dispatch(request());
    userService.getAllinventory()
    .then(
      allinventories => dispatch(success(allinventories)),
      error => dispatch(failure(error.toString()))
    );
  };

  function request() { return { type: userConstants.GETALLINVENTORY_REQUEST } }
  function success(allinventories) { return { type: userConstants.GETALLINVENTORY_SUCCESS, allinventories} }
  function failure(error) { return { type: userConstants.GETALLINVENTORY, error } }
}

function getinventorydetail(inventoryID) {
  return dispatch => {
      dispatch(request());
      userService.getinventorydetail(inventoryID)
          .then(
              inventory => dispatch(success(inventory)),
              error => dispatch(failure(error.toString()))
          );
  };

  function request() { return { type: userConstants.GETINVENTORYDETAIL_REQUEST } }
  function success(inventory) { return { type: userConstants.GETINVENTORYDETAIL_SUCCESS, inventory } }
  function failure(error) { return { type: userConstants.GETINVENTORYDETAIL, error } }
}

function getAllvendor() {
    return dispatch => {
        dispatch(request());
        userService.getAllvendor()
            .then(
                allvendors => dispatch(success(allvendors)),
                error => dispatch(failure(error.toString()))
            );
    };

    function request() { return { type: userConstants.GETALLVENDOR_REQUEST } }
    function success(allvendors) { return { type: userConstants.GETALLVENDOR_SUCCESS, allvendors } }
    function failure(error) { return { type: userConstants.GETALLVENDOR, error } }
}

function getvendordetail(vendorID) {
  return dispatch => {
      dispatch(request());
      userService.getvendordetail(vendorID)
          .then(
              vendor => dispatch(success(vendor)),
              error => dispatch(failure(error.toString()))
          );
  };

  function request() { return { type: userConstants.GETVANDORDETAIL_REQUEST } }
  function success(vendor) { return { type: userConstants.GETVANDORDETAIL_SUCCESS, vendor } }
  function failure(error) { return { type: userConstants.GETVANDORDETAIL, error } }
}

function getAllpuchaseorderslist() {
    return dispatch => {
        dispatch(request());
        userService.getAllpuchaseorderslist()
            .then(
                allpuchaseorders => dispatch(success(allpuchaseorders)),
                error => dispatch(failure(error.toString()))
            );
    };

    function request() { return { type: userConstants.GETALLPURCHASEORDER_REQUEST } }
    function success(allpuchaseorders) { return { type: userConstants.GETALLPURCHASEORDER_SUCCESS, allpuchaseorders } }
    function failure(error) { return { type: userConstants.GETALLPURCHASEORDER, error } }
}

function getpurchaseorderdetail(purchaseorderID) {
  return dispatch => {
      dispatch(request());
      userService.getpurchaseorderdetail(purchaseorderID)
          .then(
              purchaseorder => dispatch(success(purchaseorder)),
              error => dispatch(failure(error.toString()))
          );
  };

  function request() { return { type: userConstants.GETPURCHASEORDERDETAILDETAIL_REQUEST } }
  function success(purchaseorder) { return { type: userConstants.GETPURCHASEORDERDETAILDETAIL_SUCCESS, purchaseorder } }
  function failure(error) { return { type: userConstants.GETPURCHASEORDERDETAILDETAIL, error } }
}

function gettransferorderdetail(transferorderID) {
  return dispatch => {
      dispatch(request());
      userService.gettransferorderdetail(transferorderID)
          .then(
              transferorder => dispatch(success(transferorder)),
              error => dispatch(failure(error.toString()))
          );
  };

  function request() { return { type: userConstants.GETTRANSFERORDERDETAILDETAIL_REQUEST } }
  function success(transferorder) { return { type: userConstants.GETTRANSFERORDERDETAILDETAIL_SUCCESS, transferorder } }
  function failure(error) { return { type: userConstants.GETTRANSFERORDERDETAILDETAIL, error } }
}

function getAlltranferorderslist() {
    return dispatch => {
        dispatch(request());
        userService.getAlltranferorderslist()
            .then(
                alltransferorders => dispatch(success(alltransferorders)),
                error => dispatch(failure(error.toString()))
            );
    };

    function request() { return { type: userConstants.GETALLTRANSFERORDER_REQUEST } }
    function success(alltransferorders) { return { type: userConstants.GETALLTRANSFERORDER_SUCCESS, alltransferorders } }
    function failure(error) { return { type: userConstants.GETALLTRANSFERORDER, error } }
}


function _delete(id) {
  return dispatch => {
    dispatch(request(id));
    userService.delete(id)
      .then(
          user => dispatch(success(id)),
          error => dispatch(failure(id, error.toString()))
      );
  };
  function request(id) { return { type: userConstants.DELETE_REQUEST, id } }
  function success(id) { return { type: userConstants.DELETE_SUCCESS, id } }
  function failure(id, error) { return { type: userConstants.DELETE_FAILURE, id, error } }
}