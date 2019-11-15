import { userConstants } from '../_constants';
import { userService } from '../_services';
import { alertActions } from './';
import { history } from '../_helpers';

export const userActions = {
    login,
    logout,
    register,
    getAllwarehouse,
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
          },
          error => {
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