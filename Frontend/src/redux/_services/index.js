import { alertConstants } from '../_constants';

// urls
export * from './url_strings';
export * from './tester.service';
export * from './user.service';
export * from './canvas.services';
export * from './notes.verdict.services';

export function handleResponse(response) {
    console.log("resp>",response);
    
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

export const handleError = (err) => (dispatch, err) => {
    return dispatch({
        type: alertConstants.ERROR,
        message: "Couldn't Contact Server"
    })
}