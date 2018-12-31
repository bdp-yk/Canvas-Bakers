import { canvasConstants, alertConstants } from '../_constants';
import { canvasServices } from '../_services';
import { alertActions } from '.';
import { history } from '../_helpers';
import { who_am_i } from '../../utils';

export const canvasActions = {
    init_canvas_action,
    update_canvas_action,
    clear_canvas_schema_action,
    list_all_canvases,
    load_canvas_schema
};
function init_canvas_action(schema) {
    return dispatch => {
        try {
            dispatch(request(schema));
            dispatch(success());

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
    return dispatch => {
        dispatch({ type: canvasConstants.LOAD_CANVAS_REQUEST });
        canvasServices.load_canvas_with_id(canvas_id)
            .then(response => {
                dispatch(success(response));
            })
            .catch(error => {
                dispatch({type:alertConstants.ERROR,message:`Could not load Canvas.`})
                dispatch(failure())
            })
    }
    function success(response) { return ({ type: canvasConstants.LOAD_USER_CANVAS_SUCCESS, response }) }
    function failure() { return ({ type: canvasConstants.LOAD_USER_CANVAS_FAILURE }) }
}

function clear_canvas_schema_action() {
    return dispatch => {
        dispatch({ type: canvasConstants.CLEAR_CANVAS_SCHEMA })
    }
}