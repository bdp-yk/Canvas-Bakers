import {
    canvasConstants,
    alertConstants
} from '../_constants';
import {
    canvasServices
} from '../_services';
import {
    alertActions
} from '.';
import {
    history
} from '../_helpers';
import {
    who_am_i
} from '../../utils';
import {
    _workspace_link,
    _welcome_route,
    _dashboard_route
} from '../../constants';

export const canvasActions = {
    init_canvas_action,
    upload_canvas_action,
    clear_canvas_schema_action,
    list_all_canvases,
    load_canvas_schema,
    delete_my_canvas,
    fetch_team_mate,
    share_my_canvas
};

const nanoid = require('nanoid');

const canvas_initial_schema = new_canvas => {
    return {
        canvas_id: nanoid(),
        canvas_is_shared: false,
        // canvas_description: "",
        // canvas_name: "",
        // canvas_notes: [],
        // canvas_team: [],
        canvas_base_version: "head",
        canvas_version_provider: who_am_i(),
        canvas_version_stamp: Date.now(),
        ...new_canvas,
    }
}

function fetch_team_mate(email) {
    return dispatch => {
        dispatch({
            type: canvasConstants.FETCH_CANVAS_TEAM_MATE_REQUEST
        });
        let response = fetch_team_mate_service(email);
        if (response["ok"])
            dispatch({
                type: canvasConstants.FETCH_CANVAS_TEAM_MATE_SUCCESS,
                payload: response["user"]
            });
        else
            dispatch({
                type: canvasConstants.FETCH_CANVAS_TEAM_MATE_FAILURE
            });
    }
}


function share_my_canvas(canvas_team_new_membres, by_email) {
    return dispatch => {
        dispatch({
            type: canvasConstants.SHARE_MY_CANVAS_REQUEST
        });
        let response = share_my_canvas_service(canvas_team_new_membres, by_email);
        if (response["ok"]) {
            dispatch({
                type: canvasConstants.SHARE_MY_CANVAS_SUCCESS
            });
            dispatch({
                type: alertConstants.SUCCESS,
                message: `${canvas_team_new_membres} joined this Workspace team successfully.`
            });
        } else {
            dispatch({
                type: canvasConstants.SHARE_MY_CANVAS_FAILURE
            });
            dispatch({
                type: alertConstants.ERROR,
                message: `Sorry, we couldn't invite ${canvas_team_new_membres}.`
            });
        }

    }
}


function delete_my_canvas(canvas_id, push = true) {
    return dispatch => {
        dispatch(request());
        canvasServices.delete_canvas_by_id(canvas_id).then(
            resp => {
                dispatch(success());
                dispatch({
                    type: alertConstants.SUCCESS,
                    message: "Successfully deleted the Canvas"
                });
                if (push) history.push(_dashboard_route());
            }
        ).catch(err => {
            dispatch(failure())
        })

    }

    function request() {
        return {
            type: canvasConstants.DELETE_CANVAS_REQUEST
        }
    }

    function success() {
        return {
            type: canvasConstants.DELETE_CANVAS_SUCCESS
        }
    }

    function failure() {
        return {
            type: canvasConstants.DELETE_CANVAS_FAILURE
        }
    }

}

function list_all_canvases() {
    const user = who_am_i()
    return dispatch => {
        dispatch(request());
        canvasServices.list_all_canvases_for_user(user).then(
            response => {
                dispatch(success(response["user_canvas"]));
            }
        ).catch(error => {
            dispatch({
                type: alertConstants.ERROR,
                message: "Couldn't Load The Dashboard Canvases" + JSON.stringify(error)
            });
            dispatch(failure());
        })
    }

    function request() {
        return {
            type: canvasConstants.LOAD_USER_CANVAS_REQUEST
        }
    }

    function success(user_canvas) {
        return {
            type: canvasConstants.LOAD_USER_CANVAS_SUCCESS,
            user_canvas
        }
    }

    function failure() {
        return {
            type: canvasConstants.LOAD_USER_CANVAS_FAILURE
        }
    }

}


function init_canvas_action(schema) {
    const init_version = canvas_initial_schema(schema);
    return dispatch => {
        try {
            dispatch(request(init_version));
            upload_canvas_action(init_version);
            let response = canvasServices.upload_canvas_service(init_version);
            dispatch(success(response["data"]));
            dispatch({
                type: alertConstants.SUCCESS,
                message: "Successfully created new Canvas"
            });
            history.push(_workspace_link(init_version["canvas_id"]));
        } catch (error) {
            history.push(_welcome_route);
            dispatch(alertActions.error(error.toString()));
            dispatch(failure());
        }
        /** */

        try {} catch (error) {
            dispatch(failure());
        }
    }

    function request(schema) {
        return {
            type: canvasConstants.INIT_CANVAS_REQUEST,
            schema
        }
    }

    function success(payload) {
        return {
            type: canvasConstants.INIT_CANVAS_SUCCESS,
            payload
        }
    }

    function failure() {
        return {
            type: canvasConstants.INIT_CANVAS_FAILURE
        }
    }
}
/*
canvas payload :{
    canvas_base_version
    canvas_field
}
 */


function upload_canvas_action(canvas_payload) {
    return dispatch => {
        dispatch(request(canvas_payload));
        canvasServices.upload_canvas_service(canvas_payload).then(
            response => {

                dispatch(success(response["data"]));
                dispatch({
                    type: alertConstants.SUCCESS,
                    message: "Your Changes Have been Applied"
                });
            }

        ).catch(
            error => {
                dispatch(alertActions.error(error.toString()));
                dispatch(failure());
                history.push('/');
            }
        )
    }

    function request(canvas) {
        return {
            type: canvasConstants.UPLOAD_CANVAS_REQUEST,
            canvas
        }
    }

    function success() {
        return {
            type: canvasConstants.UPLOAD_CANVAS_SUCCESS
        }
    }

    function failure() {
        return {
            type: canvasConstants.UPLOAD_CANVAS_FAILURE
        }
    }
}

function load_canvas_schema(canvas_id, redirect = true) {

    return dispatch => {
        dispatch({
            type: canvasConstants.LOAD_CANVAS_REQUEST
        });
        canvasServices.load_canvas_with_id(canvas_id)
            .then(response => {
                dispatch(success(response));
                console.log(">>Load Canvas Schema", response);
                if (redirect)
                    history.push(_workspace_link(canvas_id))
            })
            .catch(error => {
                dispatch({
                    type: alertConstants.ERROR,
                    message: `Could not load Canvas.`
                })
                dispatch(failure())
            })
    }

    function success(response) {
        return ({
            type: canvasConstants.LOAD_CANVAS_SUCCESS,
            payload: response
        })
    }

    function failure() {
        return ({
            type: canvasConstants.LOAD_CANVAS_FAILURE
        })
    }
}

function clear_canvas_schema_action() {
    return dispatch => {
        dispatch({
            type: canvasConstants.CLEAR_CANVAS_SCHEMA
        })
    }
}