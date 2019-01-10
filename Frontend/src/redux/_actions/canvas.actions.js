import {
    canvasConstants,
    alertConstants
} from '../_constants';
import {
    canvasServices,
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
    commit_canvas_schema_action,
    clear_canvas_schema_action,
    list_all_canvases,
    check_default_notes,
    load_canvas_schema,
    delete_my_canvas,
    fetch_team_mate,
    approve_team_mate,
    update_canvas_schema,
    share_my_canvas_action,
    clear_default_notes
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

function check_default_notes (){
    return dispatch => {
        dispatch({
            type: canvasConstants.CHECK_DEFAULT_NOTES
        })
    }
}
function clear_default_notes (){
    return dispatch => {
        dispatch({
            type: canvasConstants.CLEAR_DEFAULT_NOTES_ACTION
        })
    }
}

function fetch_team_mate(email) {
    return dispatch => {
        dispatch({
            type: canvasConstants.FETCH_CANVAS_TEAM_MATE_REQUEST
        });
        canvasServices.fetch_team_mate_service(email).then(
            response => {
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
        )


    }
}

function approve_team_mate() {
    return dispatch => {
        dispatch({
            type: canvasConstants.FREE_CANVAS_TEAM_MATE
        });
    }
}


function share_my_canvas_action(canvas_team_new_members, by_email) {
    return dispatch => {
        dispatch({
            type: canvasConstants.SHARE_MY_CANVAS_REQUEST
        });
        canvasServices.share_my_canvas_service(canvas_team_new_members, by_email).then(response => {
            if (response["ok"]) {
                dispatch({
                    type: canvasConstants.SHARE_MY_CANVAS_SUCCESS
                });
                dispatch({
                    type: alertConstants.SUCCESS,
                    message: `${canvas_team_new_members.reduce((a,v)=>{return a+v.email},"")} joined this Workspace team successfully.`
                });
            } else {
                dispatch({
                    type: canvasConstants.SHARE_MY_CANVAS_FAILURE
                });

            }
        }).catch(err => {
            dispatch({
                type: alertConstants.ERROR,
                message: `${err}Sorry, we couldn't invite ${canvas_team_new_members.map(element => {
                return element.email+" "
            })}.`
            });
        })

    }
}

function delete_my_canvas(canvas_id, push = true,stamp) {
    return dispatch => {
        dispatch(request());
        canvasServices.delete_canvas_by_id(canvas_id,stamp).then(
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
            commit_canvas_schema_action(init_version);
            let response = canvasServices.upload_canvas_service(init_version);
            dispatch(success(response["data"]));
            dispatch({
                type: alertConstants.SUCCESS,
                message: "Successfully created new Canvas"
            });
            dispatch({
                type: canvasConstants.CHECK_DEFAULT_NOTES
            })
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

function update_canvas_schema(payload) {

    return dispatch => {
        try {
            dispatch({
                type: canvasConstants.UPDATE_CANVAS_SCHEMA_REQUEST,
                payload
            })
            dispatch({
                type: canvasConstants.UPDATE_CANVAS_SCHEMA_SUCCESS
            })
            dispatch({
                type: alertConstants.SUCCESS,
                message: "update local copy"
            })
            dispatch({
                type: canvasConstants.CHECK_DEFAULT_NOTES
            })
        } catch (err) {
            dispatch({
                type: canvasConstants.UPDATE_CANVAS_SCHEMA_FAILURE
            })
            dispatch({
                type: alertConstants.ERROR,
                message: `Oups! something went wrong${err}`
            })
        }
    }

}

function commit_canvas_schema_action(payload) {
    return dispatch => {
        dispatch(request());
        let canvas_schema = Object.assign({}, payload);
        // console.log(">commit_canvas_schema_action bf", canvas_schema.canvas_version_stamp);
        canvas_schema.canvas_base_version = canvas_schema.canvas_version_stamp ;
        canvas_schema.canvas_version_stamp = Date.now();
        canvas_schema.canvas_version_provider = who_am_i();
        canvasServices.upload_canvas_service(canvas_schema).then(
            response => {
                dispatch(success());
                dispatch({
                    type: alertConstants.SUCCESS,
                    message: response.message
                });
                history.push(_workspace_link(canvas_schema["canvas_id"], canvas_schema.canvas_version_stamp));
            }

        ).catch(
            error => {
                dispatch(alertActions.error(error.toString()));
                dispatch(failure());
            }
        )
    }

    function request() {
        return {
            type: canvasConstants.UPLOAD_CANVAS_REQUEST
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

function load_canvas_schema(canvas_id, redirect = true, stamp = "") {

    return dispatch => {
        dispatch({
            type: canvasConstants.LOAD_CANVAS_REQUEST
        });
        canvasServices.load_canvas_with_id(canvas_id, stamp)
            .then(response => {
                let {
                    ok,
                    ...rest
                } = response
                dispatch(success(rest));
                dispatch({
                    type: canvasConstants.CHECK_DEFAULT_NOTES
                })
                if (ok && redirect)
                    history.replace(_workspace_link(canvas_id, stamp))
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
        history.replace(_dashboard_route())
        dispatch({
            type: canvasConstants.CLEAR_CANVAS_SCHEMA
        })
    }
}