import { userConstants } from '../_constants';
import { userService } from '../_services';
import { alertActions } from './';
import { history } from '../_helpers';

export const userActions = {
    login,
    logout,
    register,
    getAllwarehouse,
    getwarehousedetail,
    getAllproduct,
    getproductdetail,
    getAllcategory,
    getcategorydetail,
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

function register(user) {
    return dispatch => {
        dispatch(request(user));

        userService.register(user)
          .then(
            user => { 
                dispatch(success());
                history.push('/login');
                dispatch(alertActions.success('Registration successful'));
            },
            error => {
                dispatch(failure(error.toString()));
                dispatch(alertActions.error(error.toString()));
            }
          );
    };

    function request(user) { return { type: userConstants.REGISTER_REQUEST, user } }
    function success(user) { return { type: userConstants.REGISTER_SUCCESS, user } }
    function failure(error) { return { type: userConstants.REGISTER_FAILURE, error } }
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