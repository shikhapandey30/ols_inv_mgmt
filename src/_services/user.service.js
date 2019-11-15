import config from 'config';
import { authHeader } from '../_helpers';

export const userService = {
    login,
    logout,
    register,
    getAllwarehouse,
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

    return fetch(`${config.apiUrl}/login`, requestOptions)
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
    headers: { 'Content-Type': 'application/json', 'Token': JSON.parse(localStorage.getItem('user')).data.token }
  };
    return fetch("http://18.217.112.188:8084/api/v1/inventory/warehouses", requestOptions)
    .then(handleResponse)
    .then(allwarehouses => {
      console.log("Response",allwarehouses)
        return JSON.parse(allwarehouses);
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