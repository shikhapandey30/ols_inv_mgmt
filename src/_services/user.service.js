import config from 'config';
import { authHeader } from '../_helpers';

export const userService = {
    login,
    logout,
    register,
    getAllwarehouse,
    getwarehousedetail,
    getAllproduct,
    getById,
    update,
    delete: _delete
};

function login(username, password) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
    };

    return fetch(`${config.apiUrlLogin}/login`, requestOptions)
      .then(handleResponse)
      .then(user => {
          localStorage.setItem('user', JSON.stringify(user));
          return user;

      });
}

function logout() {
    localStorage.removeItem('user');
}

function getAllwarehouse() {
  const requestOptions = {
    method: 'GET',
    headers: authHeader()
    // headers: {'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json', 'Token': JSON.parse(localStorage.getItem('user')).data.token }
    // headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem('user')).data.token }
  };
    return fetch(`${config.apiUrl}/warehouses`, requestOptions)
    .then(handleResponse)
    .then(allwarehouses => {
      console.log("Response",allwarehouses)
        return allwarehouses.data;
    });
}

function getwarehousedetail(warehouse) {
  const requestOptions = {
    method: 'GET',
    headers: authHeader()
  };
   console.log("warehouse")
    return fetch(`${config.apiUrl}/warehouses/${warehouse.id}`, requestOptions)
    .then(handleResponse)
    .then(warehouse => {
      console.log("warehouse_Response$$$$$$$$$$$$",warehouse)
       return [warehouse.data];
    });
}


function getAllproduct() {
  const requestOptions = {
    method: 'GET',
    headers: { 'Content-Type': 'application/json', 'Token': JSON.parse(localStorage.getItem('user')).data.token }
  };
    return fetch(`${config.apiUrl}/warehouses`, requestOptions)
    .then(handleResponse)
    .then(allproducts => {
      console.log("Response",allproducts)
        return JSON.parse(allproducts);
    });
}


// function getAllwarehouse() {
//   const requestOptions = {
//     method: 'POST',
//     headers: authHeader()
//   };
//     return fetch("http://localhost:3000/api/v1/users", requestOptions)
//     .then(handleResponse)
//     .then(allwarehouses => {
//       debugger
//       console.log("Response",allwarehouses)
//         return JSON.parse(allwarehouses);
//     });
// }


function getById(id) {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };

    return fetch(`${config.apiUrl}/users/${id}`, requestOptions).then(handleResponse);
}

function register(user) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(user)
    };

    return fetch(`${config.apiUrl}/users/register`, requestOptions).then(handleResponse);
}

function update(user) {
    const requestOptions = {
        method: 'PUT',
        headers: { ...authHeader(), 'Content-Type': 'application/json' },
        body: JSON.stringify(user)
    };

    return fetch(`${config.apiUrl}/users/${user.id}`, requestOptions).then(handleResponse);;
}

function _delete(id) {
    const requestOptions = {
        method: 'DELETE',
        headers: authHeader()
    };
    return fetch(`${config.apiUrl}/users/${id}`, requestOptions).then(handleResponse);
}

function handleResponse(response) {
    return response.text().then(text => {
        const data = text && JSON.parse(text);
        if (!response.ok) {
            if (response.status === 401) {
                logout();
                location.reload(true);
            }
            const error = (data && data.message) || response.statusText;
            return Promise.reject(error);
        }
        return data;
    });
}