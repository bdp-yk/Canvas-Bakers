// import config from 'config';
// import { authHeader } from '../_helpers';
import {
    UPLOAD_CANVAS_URL,
    LIST_OF_USER_CANVAS_URL,
    LOAD_CANVAS_URL,
    DELETE_CANVAS_URL,
    TESTER_GET_BY_EMAIL,
    SHARE_CANVAS_URL,
    JOIN_WORKSPACE
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
    share_my_canvas_service,
    join_canvas_team_service
};

function join_canvas_team_service(canvas_id) {
    const requestOptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            user: who_am_i(),
            canvas_id: canvas_id,
            join_date: Date.now()
        })
    };
    return fetch(JOIN_WORKSPACE, requestOptions).then(handleResponse);
}

function fetch_team_mate_service(email) {

    const requestOptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            email
        })
    };
    return fetch(TESTER_GET_BY_EMAIL, requestOptions).then(handleResponse);
}

function share_my_canvas_service(canvas_team_new_members, by_email) {
    const requestOptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            canvas_team_new_members,
            by_email
        })
    };
    return fetch(SHARE_CANVAS_URL, requestOptions).then(handleResponse);

}


function delete_canvas_by_id(canvas_id, canvas_version_stamp) {
    const requestOptions = {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            canvas_id,
            canvas_version_stamp
        })
    };
    return fetch(DELETE_CANVAS_URL, requestOptions)
        .then(handleResponse);
}

function load_canvas_with_id(canvas_id, stamp) {
    const requestOptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            canvas_id,
            email: Boolean(who_am_i()) && who_am_i()["email"],
            stamp
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

async function upload_canvas_service(canvas_schema) {
    // console.log("upload_canvas_service>>", canvas_schema.canvas_version_stamp);

    const requestOptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(canvas_schema)
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