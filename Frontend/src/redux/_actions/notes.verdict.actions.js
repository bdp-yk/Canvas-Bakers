import {
    notesVerdictConstants, notesConstants
} from '../_constants';

export const notesVerdictActions = {
    init_canvas_verdict_requests_action,
    select_note_for_verdict_action,
    unselect_note_for_verdict_action,
    ask_for_verdict_request_action,
    ask_for_verdict_success_action,
    ask_for_verdict_failure_action,
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

function ask_for_verdict_request_action() {
    return dispatch => {
        dispatch({
            type: notesVerdictConstants.ASK_FOR_VERDICT_REQUEST
        })
    }
}

function ask_for_verdict_success_action(payload) {
    return dispatch => {
        dispatch({
            type: notesConstants.UPDATE_NOTE_ACTION,
            payload
        })
    }
}

function ask_for_verdict_failure_action() {
    return dispatch => {
        dispatch({
            type: notesVerdictConstants.ASK_FOR_VERDICT_FAILURE
        })
    }
}