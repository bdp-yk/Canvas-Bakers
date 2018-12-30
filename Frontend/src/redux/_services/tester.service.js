// import config from 'config';
import { authHeader } from '../_helpers';
import { TESTER_LOGOUT_URL, GET_ALL_USERS, TESTER_REGISTER_URL, TESTER_DELETE_URL, TESTER_UPDATE_URL, TESTER_GET_BY_ID_URL, CHECK_TEST_SEASON_URL } from './url_strings';

export const testerServices = {
    register_tester,
    logout,
    getAll,
    getById,
    update,
    checktestseason,
    delete: _delete
};

function register_tester(tester) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(tester)
    };

    return fetch(TESTER_REGISTER_URL, requestOptions)
        .then(handleResponse).then(
            response => localStorage.setItem('tester', JSON.stringify(tester))
        );
}

function checktestseason() {
    const requestOptions = {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
    };
    return fetch(CHECK_TEST_SEASON_URL, requestOptions).then(handleResponse);
}

function logout() {

    const requestOptions = {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: localStorage.getItem('tester')
    };
    // remove user from local storage to log user out
    return fetch(TESTER_LOGOUT_URL, requestOptions).then(handleResponse).then(localStorage.removeItem('tester')).catch(
        (error) => {
            alert("Something bad happened, but we will log you out" + error);
            localStorage.removeItem('tester');
        }
    );
}

function getAll() {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };

    return fetch(GET_ALL_USERS, requestOptions).then(handleResponse);
}

function getById(id) {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };

    return fetch(TESTER_GET_BY_ID_URL + id, requestOptions).then(handleResponse);
}


function update(user) {
    const requestOptions = {
        method: 'PUT',
        headers: { ...authHeader(), 'Content-Type': 'application/json' },
        body: JSON.stringify(user)
    };

    return fetch(TESTER_UPDATE_URL + user.id, requestOptions).then(handleResponse);
}

// prefixed function name with underscore because delete is a reserved word in javascript
function _delete(id) {
    const requestOptions = {
        method: 'DELETE',
        headers: authHeader()
    };

    return fetch(TESTER_DELETE_URL + id, requestOptions).then(handleResponse);
}

function handleResponse(response) {
    return response.text().then(text => {
        const data = text && JSON.parse(text);
        if (!response.ok) {
            if (response.status === 401) {
                // auto logout if 401 response returned from api
                logout();
                window.location.reload(true);
            }

            const error = (data && data.message) || response.statusText;
            return Promise.reject(error);
        }

        return data;
    });
}