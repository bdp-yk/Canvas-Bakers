import {
    notesVerdictConstants,
    notesConstants,
    alertConstants
} from '../_constants';
import {
    verdictServices, handleError
} from '../_services';

export const notesVerdictActions = {
    init_canvas_verdict_requests_action,
    select_note_for_verdict_action,
    unselect_note_for_verdict_action,
    ask_for_verdict_request_action,
    receive_verdict_request_action,
    routine_verdict_check_action
};

function init_canvas_verdict_requests_action(payload = []) {
    return dispatch => {
        dispatch({
            type: notesVerdictConstants.INIT_CANVAS_VERDICT_REQUESTS,
            payload
        })
    }
}

function select_note_for_verdict_action(payload) {
    return dispatch => {
        dispatch({
            type: notesVerdictConstants.SELECT_NOTE_FOR_VERDICT,
            payload
        })
    }
}

function unselect_note_for_verdict_action() {
    return dispatch => {
        dispatch({
            type: notesVerdictConstants.UNSELECT_NOTE_FOR_VERDICT
        })
    }
}

function ask_for_verdict_request_action(payload) {
    return dispatch => {
        dispatch({
            type: notesVerdictConstants.ASK_FOR_VERDICT_REQUEST
        });
        verdictServices.post_note_for_verdict(payload).then(
            response => {
                if (response["ok"]) {
                    let pl = response["note_schema"]
                    dispatch({
                        type: notesVerdictConstants.RECEIVE_VERDICT_REQUEST,
                        payload: pl
                    });

                    dispatch({
                        type: notesConstants.UPDATE_NOTE_ACTION,
                        payload: pl
                    });
                } else {
                    dispatch({
                        type: alertConstants.ERROR,
                        message: `Could not Judge ${payload["note_headline"]} Note!`
                    })
                }
            }
        ).catch(handleError)
    }
}

function receive_verdict_request_action(payload) {
    return dispatch => {
        dispatch({
            type: notesVerdictConstants.RECEIVE_VERDICT_REQUEST,
            payload
        });

        dispatch({
            type: notesConstants.UPDATE_NOTE_ACTION,
            payload
        });
    }
}

function routine_verdict_check_action(payload_c_req_ver) {
    return dispatch => {
        verdictServices.get_active_canvas_verdicts(payload_c_req_ver).then(
            response => {
                if (response["ok"]) {
                    let pl = response["canvas_requested_verdicts"]
                    dispatch({
                        type: notesVerdictConstants.INIT_CANVAS_VERDICT_REQUESTS,
                        payload: pl
                    })

                } else {
                    // dispatch({
                    //     type: alertConstants.ERROR,
                    //     message: `Could not Load Note!`
                    // })
                    // console.log("No verdicts to check");
                    
                }
            }
        ).catch(handleError)
    }
}