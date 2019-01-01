// import config from 'config';
// import { authHeader } from '../_helpers';
import { UPDATE_CANVAS_URL, LIST_OF_USER_CANVAS_URL, LOAD_CANVAS_URL } from './url_strings';
import { who_am_i } from '../../utils';

export const canvasServices = {
    update_canvas,
    list_all_canvases_for_user,
    load_canvas_with_id

};

function load_canvas_with_id(canvas_id) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            canvas_id,
            email: who_am_i()["email"]
        })
    };
    return fetch(LOAD_CANVAS_URL, requestOptions)
        .then(handleResponse);
}

function list_all_canvases_for_user(user) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(user)
    };
    return fetch(LIST_OF_USER_CANVAS_URL, requestOptions)
        .then(handleResponse);
}

function update_canvas(canvas) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(canvas)
    };

    return fetch(UPDATE_CANVAS_URL, requestOptions)
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