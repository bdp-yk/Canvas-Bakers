// import config from 'config';
import {
    authHeader
} from '../_helpers';
import {
    TESTER_LOGOUT_URL,
    GET_ALL_USERS,
    TESTER_REGISTER_URL,
    TESTER_DELETE_URL,
    TESTER_UPDATE_URL,
    TESTER_GET_BY_ID_URL,
    CHECK_TEST_SEASON_URL,
    GET_All_GROUPS,
    ADD_GROUP
} from './url_strings';
import {
    who_am_i
} from '../../utils';

export const testerServices = {
    register_tester,
    logout,
    getAll,
    getById,
    update,
    checktestseason,
    get_all_groups,
    delete: _delete,
    add_new_group
};

function register_tester(tester) {
    const requestOptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
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
        headers: {
            'Content-Type': 'application/json'
        }
    };
    return fetch(CHECK_TEST_SEASON_URL, requestOptions).then(handleResponse);
}

function add_new_group(group_name) {
    const requestOptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            "group_name": group_name
        })
    };
    return fetch(ADD_GROUP, requestOptions).then(handleResponse);
}

function logout(remove_storage = true) {

    const requestOptions = {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            "user": who_am_i()
        })
    };
    // remove user from local storage to log user out
    return fetch(TESTER_LOGOUT_URL, requestOptions).then(() => {
        if (remove_storage)
            localStorage.removeItem('tester')
        localStorage.removeItem('user')
    }).catch(
        (error) => {
            alert("Something bad happened, but we will log you out" + error);
            localStorage.removeItem('user');
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
        headers: {
            ...authHeader(),
            'Content-Type': 'application/json'
        },
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

function get_all_groups() {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };

    return fetch(GET_All_GROUPS, requestOptions).then(handleResponse);
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