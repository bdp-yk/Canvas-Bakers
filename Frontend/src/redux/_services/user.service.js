// import config from 'config';
import {
    authHeader
} from '../_helpers';
import {
    USER_AUTH_URL,
    USER_LOGIN_URL,
    USER_GET_BY_ID_URL,
    USER_REGISTER_URL,
    USER_UPDATE_URL,
    USER_DELETE_URL,
    USER_LOGOUT_URL,
    GET_ALL_TESTERS
} from './url_strings';
// import {
//     handleError
// } from '.';

export const userService = {
    user_auth_service,
    user_login_service,
    user_get_by_id_service,
    user_register_service,
    user_update_service,
    user_delete_service,
    user_logout_service,
    get_all_testers_service
};
// USER_AUTH_URL
// USER_AUTH
function user_auth_service(user) {
    return fetch(USER_AUTH_URL, requestOptions(user)).then(handleResponse)
    // .catch(handleError)
}

const requestOptions = (user, auth = false) => {
    if (auth) return {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            ...authHeader()
        },
        body: JSON.stringify({
            user
        })
    }
    else
        return {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                user
            })
        }
};
// USER_LOGIN_URL
// USER_LOGIN
function user_login_service(user) {
    return fetch(USER_LOGIN_URL, requestOptions(user)).then(handleResponse)
    // .catch(handleError)
}

// USER_GET_BY_ID_URL
// USER_GET_BY_ID
function user_get_by_id_service(user) {
    return fetch(USER_GET_BY_ID_URL, requestOptions(user)).then(handleResponse)
    // .catch(handleError)
}

// USER_REGISTER_URL
// USER_REGISTER
function user_register_service(user) {
    return fetch(USER_REGISTER_URL, requestOptions(user)).then(handleResponse)
    // .catch(handleError)
}

// USER_UPDATE_URL
// USER_UPDATE
function user_update_service(user) {
    return fetch(USER_UPDATE_URL, requestOptions(user)).then(handleResponse)
    // .catch(handleError)
}

// USER_DELETE_URL
// USER_DELETE
function user_delete_service(user) {
    return fetch(USER_DELETE_URL, requestOptions(user)).then(handleResponse)
    // .catch(handleError)
}

// USER_LOGOUT_URL
// USER_LOGOUT
function user_logout_service(user) {
    return fetch(USER_LOGOUT_URL, requestOptions(user)).then(handleResponse)
    // .catch(handleError)
}

// GET_ALL_TESTERS
// GET_ALL_TESTERS
function get_all_testers_service() {
    let rO = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        }
    }
    return fetch(GET_ALL_TESTERS, rO).then(handleResponse)
    // .catch(handleError)
}



















// /**
//  * 
//  * @param {*} email 
//  * @param {*} password 
//  */
// function login(email, password) {
//     const requestOptions = {
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/json'
//         },
//         body: JSON.stringify({
//             email,
//             password
//         })
//     };

//     return fetch(`localhost/users/authenticate`, requestOptions)
//         .then(handleResponse)
//         .then(user => {
//             // login successful if there's a jwt token in the response
//             if (user.token) {
//                 // store user details and jwt token in local storage to keep user logged in between page refreshes
//                 localStorage.setItem('user', JSON.stringify(user));
//             }

//             return user;
//         });
// }

// function logout() {
//     // remove user from local storage to log user out
//     localStorage.removeItem('user');
// }

// function getAll() {
//     const requestOptions = {
//         method: 'GET',
//         headers: authHeader()
//     };

//     return fetch(`localhost/users`, requestOptions).then(handleResponse);
// }

// function getById(id) {
//     const requestOptions = {
//         method: 'GET',
//         headers: authHeader()
//     };

//     return fetch(`localhost/users/${id}`, requestOptions).then(handleResponse);
// }

// function register(user) {
//     const requestOptions = {
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/json'
//         },
//         body: JSON.stringify(user)
//     };

//     return fetch(`localhost/users/register`, requestOptions).then(handleResponse);
// }

// function update(user) {
//     const requestOptions = {
//         method: 'PUT',
//         headers: { ...authHeader(),
//             'Content-Type': 'application/json'
//         },
//         body: JSON.stringify(user)
//     };

//     return fetch(`localhost/users/${user.id}`, requestOptions).then(handleResponse);
// }

// // prefixed function name with underscore because delete is a reserved word in javascript
// function _delete(id) {
//     const requestOptions = {
//         method: 'DELETE',
//         headers: authHeader()
//     };

//     return fetch(`localhost/users/${id}`, requestOptions).then(handleResponse);
// }

function handleResponse(response) {
    return response.text().then(text => {
        const data = text && JSON.parse(text);
        if (!response.ok) {
            if (response.status === 401) {
                // auto logout if 401 response returned from api
                // logout();
                window.location.reload(true);
            }

            const error = (data && data.message) || response.statusText;
            return Promise.reject(error);
        }

        return data;
    });
}