// import config from 'config';
// import { authHeader } from '../_helpers';
import {
    UPLOAD_CANVAS_URL,
    LIST_OF_USER_CANVAS_URL,
    LOAD_CANVAS_URL,
    DELETE_CANVAS_URL,
    TESTER_GET_BY_EMAIL,
    SHARE_CANVAS_URL
} from './url_strings';
import {
    who_am_i
} from '../../utils';

export const canvasServices = {
    upload_canvas_service,
    list_all_canvases_for_user,
    load_canvas_with_id,
    delete_canvas_by_id,
    fetch_team_mate_service,
    share_my_canvas
};

async function fetch_team_mate_service(email) {

    const requestOptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            email
        })
    };
    let resp = await fetch(TESTER_GET_BY_EMAIL, requestOptions).then(handleResponse);
    return resp;
}

async function share_my_canvas(new_member) {
    const requestOptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            user: new_member
        })
    };
    let resp = await fetch(SHARE_CANVAS_URL, requestOptions).then(handleResponse);
    return resp;

}


function delete_canvas_by_id(canvas_id) {
    const requestOptions = {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            canvas_id
        })
    };
    return fetch(DELETE_CANVAS_URL, requestOptions)
        .then(handleResponse);
}

function load_canvas_with_id(canvas_id) {
    const requestOptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            canvas_id,
            email: who_am_i() && who_am_i()["email"]
        })
    };
    return fetch(LOAD_CANVAS_URL, requestOptions)
        .then(handleResponse);
}

function list_all_canvases_for_user(user) {
    const requestOptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
    };
    return fetch(LIST_OF_USER_CANVAS_URL, requestOptions)
        .then(handleResponse);
}

async function upload_canvas_service(canvas) {
    const requestOptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(canvas)
    };

    return await fetch(UPLOAD_CANVAS_URL, requestOptions)
        .then(handleResponse);
}

function handleResponse(response) {
    return response.text().then(text => {
        const data = text && JSON.parse(text);
        if (!response.ok) {
            if (response.status === 401) {
                // auto logout if 401 response returned from api
                window.location.reload(true);
            }

            const error = (data && data.message) || response.statusText;
            return Promise.reject(error);
        }

        return data;
    });
}