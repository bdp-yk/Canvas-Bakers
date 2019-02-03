import {
    handleResponse
} from ".";
import {
    POST_NOTE_FOR_VERDICT,
    GET_NOTE_VERDICT_HISTORY,
    GET_NOTE_VERDICT,
    LOAD_CANVAS_REQUESTED_VERDICTS,
    GET_SUGGESTIONS
} from "./url_strings";
import {
    who_am_i
} from "../../utils";

export const verdictServices = {
    get_active_canvas_verdicts,
    post_note_for_verdict,
    get_note_verdict_history,
    get_note_verdict,
    suggest_description
}

function suggest_description(canvas_field) {
    const requestOptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ 
            canvas_field
        })
    };
    return fetch(GET_SUGGESTIONS, requestOptions).then(handleResponse)
}

/**
 * 
 * POST_NOTE_FOR_VERDICT
 * GET_NOTE_VERDICT_HISTORY
 */

function get_active_canvas_verdicts(canvas_requested_verdicts) {
    const requestOptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            user: who_am_i(),
            canvas_requested_verdicts
        })
    };
    return fetch(LOAD_CANVAS_REQUESTED_VERDICTS, requestOptions).then(handleResponse)

}

function post_note_for_verdict(note, canvas_id) {
    const requestOptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            user: who_am_i(),
            note_schema: note,
            canvas_id
        })
    };

    return fetch(POST_NOTE_FOR_VERDICT, requestOptions).then(handleResponse);
}

function get_note_verdict_history(note_id) {
    const requestOptions = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    };
    return fetch(GET_NOTE_VERDICT_HISTORY + note_id, requestOptions).then(handleResponse);
}

function get_note_verdict(note_id) {
    const requestOptions = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    };
    return fetch(GET_NOTE_VERDICT + note_id, requestOptions).then(handleResponse);
}