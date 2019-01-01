import { canvasConstants, alertConstants } from '../_constants';
import { canvasServices } from '../_services';
import { alertActions } from '.';
import { history } from '../_helpers';
import { who_am_i } from '../../utils';
import { _workspace_link } from '../../constants';

export const canvasActions = {
    init_canvas_action,
    update_canvas_action,
    clear_canvas_schema_action,
    list_all_canvases,
    load_canvas_schema
};

const nanoid = require('nanoid');

const canvas_initial_schema = new_canvas => {
    return {
        canvas_id: nanoid(),
        // canvas_description: "",
        // canvas_name: "",
        // canvas_notes: [],
        // canvas_team: [],
        canvas_base_version: null,
        canvas_version_provider: "",
        canvas_version_stamp: 0,
        ...new_canvas,
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
            dispatch({ type: alertConstants.ERROR, message: "Couldn't Load The Dashboard Canvases" + JSON.stringify(error) });
            dispatch(failure());
        })
    }
    function request() { return { type: canvasConstants.LOAD_USER_CANVAS_REQUEST } }
    function success(user_canvas) { return { type: canvasConstants.LOAD_USER_CANVAS_SUCCESS, user_canvas } }
    function failure() { return { type: canvasConstants.LOAD_USER_CANVAS_FAILURE } }

}


function init_canvas_action(schema) {
    const init_version = canvas_initial_schema(schema);
    return dispatch => {
        try {
            dispatch(request(init_version));
            update_canvas_action(init_version);
            history.push(_workspace_link(init_version["canvas_id"]));

            dispatch(success());
            dispatch({ type: alertConstants.SUCCESS, message: "Successfully created new Canvas" });

        } catch (error) {
            dispatch(failure());
        }
    }
    function request(schema) { return { type: canvasConstants.INIT_CANVAS_REQUEST, schema } }
    function success() { return { type: canvasConstants.INIT_CANVAS_SUCCESS } }
    function failure() { return { type: canvasConstants.INIT_CANVAS_FAILURE } }
}
/*
canvas payload :{
    canvas_base_version
    canvas_field
}
 */


function update_canvas_action(canvas_payload) {
    return dispatch => {
        dispatch(request(canvas_payload));
        canvasServices.update_canvas(canvas_payload).then(
            response => {

                dispatch(success(response["data"]));
                dispatch({ type: alertConstants.SUCCESS, message: "Your Changes Have been Applied" });
            }

        ).catch(
            error => {
                dispatch(alertActions.error(error.toString()));
                dispatch(failure());
                history.push('/');
            }
        )
    }
    function request(canvas) { return { type: canvasConstants.UPDATE_CANVAS_REQUEST, canvas } }
    function success() { return { type: canvasConstants.UPDATE_CANVAS_SUCCESS } }
    function failure() { return { type: canvasConstants.UPDATE_CANVAS_FAILURE } }
}
function load_canvas_schema(canvas_id) {
    console.log(">>>>Loading");
    
    return dispatch => {
        dispatch({ type: canvasConstants.LOAD_CANVAS_REQUEST });
        canvasServices.load_canvas_with_id(canvas_id)
            .then(response => {
                dispatch(success(response));
                console.log(response);
                
                history.push(_workspace_link(canvas_id))
            })
            .catch(error => {
                dispatch({ type: alertConstants.ERROR, message: `Could not load Canvas.` })
                dispatch(failure())
            })
    }
    function success(response) { return ({ type: canvasConstants.LOAD_CANVAS_SUCCESS, payload:response }) }
    function failure() { return ({ type: canvasConstants.LOAD_CANVAS_FAILURE }) }
}

function clear_canvas_schema_action() {
    return dispatch => {
        dispatch({ type: canvasConstants.CLEAR_CANVAS_SCHEMA })
    }
}