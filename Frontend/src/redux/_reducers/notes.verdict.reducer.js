import {
    notesVerdictConstants,
    // system_comment_text_constants,
    // verdict_request_status_constants
} from "../_constants";
import _ from 'lodash'
import {
    encode_note_content
} from "../_actions/notes.canvas.actions";
const verdictState = {
    concerned_note: {},
    toggle_verdict_modal: false,
    already_satisfied_verdict_index_in_note_verdict_history: -1,
    currenct_canvas_verdict_requests_status: [],
}
export function notesVerdict(state = verdictState, action) {
    let {
        currenct_canvas_verdict_requests_status,
        concerned_note,
        toggle_verdict_modal
    } = state;
    let _enc,
        history_index,
        requesting_index,
        note_verdict_status,
        status,
        note_encoded_content,
        note_schema;
    switch (action.type) {
        case notesVerdictConstants.INIT_CANVAS_VERDICT_REQUESTS:
            return {
                ...state,
                currenct_canvas_verdict_requests_status: []
            }
        case notesVerdictConstants.SELECT_NOTE_FOR_VERDICT:
            note_encoded_content = encode_note_content(action.payload);
            _.remove(currenct_canvas_verdict_requests_status, ["note_encoded_content", note_encoded_content])

            return {
                ...state,
                toggle_verdict_modal: !toggle_verdict_modal,
                concerned_note: action.payload,
                currenct_canvas_verdict_requests_status
            }

        case notesVerdictConstants.UNSELECT_NOTE_FOR_VERDICT:
            return {
                ...state,
                toggle_verdict_modal: !toggle_verdict_modal,
                concerned_note: {}
            }

        case notesVerdictConstants.ASK_FOR_VERDICT_REQUEST:
            _enc = encode_note_content(concerned_note);
            history_index = _.findIndex(concerned_note["note_verdict_history"], ["note_encoded_content", _enc]);
            history_index = _.findIndex(concerned_note["note_verdict_history"], ["note_encoded_content", _enc]);
            requesting_index = _.findIndex(currenct_canvas_verdict_requests_status, ["note_encoded_content", _enc]);
            // note_verdict_request = true;
            // note_verdict_success = false;
            // note_verdict_failure = false;
            if (requesting_index >= 0) {

            }




            if (history_index < 0) {
                concerned_note["note_verdict_history"].push({
                    ...concerned_note["note_verdict_history"][history_index],
                    // note_verdict_message: system_comment_text_constants.new_validation
                });
                // note_verdict_request = false;
                // note_verdict_success = true;
                // note_verdict_failure = false;
            } else {
                if (requesting_index < 0) {
                    currenct_canvas_verdict_requests_status.push({
                        "note_id": concerned_note["note_id"],
                        "note_encoded_content": _enc,
                        // "verdict_request_result": verdict_request_status_constants.request
                    });
                    // note_verdict_request = true;
                    // note_verdict_success = false;
                    // note_verdict_failure = false;
                }
            }

            // // concerned_note["note_verdict_request"] = note_verdict_request;
            // // concerned_note["note_verdict_success"] = note_verdict_success;
            // // concerned_note["note_verdict_failure"] = note_verdict_failure;
            return {
                ...state,
                concerned_note,
                currenct_canvas_verdict_requests_status
            }

        case notesVerdictConstants.RECEIVE_VERDICT_REQUEST:
            status = action.payload.status
            note_encoded_content = action.payload.note_encoded_content
            note_schema = action.payload.note_schema

            requesting_index = _.findIndex(currenct_canvas_verdict_requests_status, ["note_encoded_content", note_encoded_content]);
            // currenct_canvas_verdict_requests_status[requesting_index]["verdict_request_result"] = verdict_request_status_constants[status] //success/failure
            concerned_note = Object.assign({}, note_schema)

            // note_verdict_request = false;
            // note_verdict_success = false;
            // note_verdict_failure = true;

            return {
                ...state,
                currenct_canvas_verdict_requests_status,
                concerned_note,
                // note_verdict_request,
                // note_verdict_success,
                // note_verdict_failure,
            }



        default:
            return state
    }
}