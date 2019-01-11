import {
    notesVerdictConstants,
    verdict_result_message,
    verdict_request_result_constants
} from "../_constants";
import _ from 'lodash'
import {
    encode_note_content
} from "../_actions/notes.canvas.actions";
const verdictState = {
    concerned_note: {},
    toggle_verdict_modal: false,
    already_satisfied_verdict_index_in_note_verdict_history: -1,
    currenct_canvas_verdict_requests_status: [
    ],
}
export function notesVerdict(state = verdictState, action) {
    let {
        currenct_canvas_verdict_requests_status,
        concerned_note,
        toggle_verdict_modal
    } = state;
    let _enc,
        already_index,
        requesting_index,
        note_verdict_request,
        note_verdict_success,
        note_verdict_failure,
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
            _.remove(currenct_canvas_verdict_requests_status, ["note_id", action.payload.note_id])

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
            already_index = _.findIndex(concerned_note["note_verdict_history"], ["note_encoded_content", _enc]);
            requesting_index = _.findIndex(currenct_canvas_verdict_requests_status, ["note_encoded_content", _enc]);
            note_verdict_request = true;
            note_verdict_success = true;
            note_verdict_failure = false;
            if (already_index < 0) {
                concerned_note["note_verdict_history"].push({
                    ...concerned_note["note_verdict_history"][already_index],
                    note_verdict_message: verdict_result_message.new_validation
                });
                note_verdict_request = false;
                note_verdict_success = true;
                note_verdict_failure = false;
            } else {
                if (requesting_index < 0) {
                    currenct_canvas_verdict_requests_status.push({
                        "note_id": concerned_note["note_id"],
                        "note_encoded_content": _enc,
                        "verdict_request_result": verdict_request_result_constants.request
                    });
                    note_verdict_request = true;
                    note_verdict_success = false;
                    note_verdict_failure = false;
                }
            }

            concerned_note["note_verdict_request"] = note_verdict_request;
            concerned_note["note_verdict_success"] = note_verdict_success;
            concerned_note["note_verdict_failure"] = note_verdict_failure;
            return {
                ...state,
                concerned_note,
                currenct_canvas_verdict_requests_status
            }

        case notesVerdictConstants.ASK_FOR_VERDICT_SUCCESS:
            // let {

            // } = action.payload;
            // concerned_note = {
            //     ...concerned_note,
            //     ...verdict
            // }
            /**
             * Payload will be the verdict itself
             * payload ={
             *      status:"success",
             *      note_encoded_content: ()     
             *      note_schema:{
             *       ...
             *          note_verdict_value: 89
                        note_verdict_message: "Good Content"
                        note_equivalent_verdict
             *      }     
             * }
             */

            status = action.payload.status
            note_encoded_content = action.payload.note_encoded_content
            note_schema = action.payload.note_schema

            requesting_index = _.findIndex(currenct_canvas_verdict_requests_status, ["note_encoded_content", note_encoded_content]);
            currenct_canvas_verdict_requests_status[requesting_index]["verdict_request_result"] = verdict_request_result_constants[status] //success/failure
            concerned_note = Object.assign({}, note_schema)

            note_verdict_request = false;
            note_verdict_success = true;
            note_verdict_failure = false;

            return {
                ...state,
                currenct_canvas_verdict_requests_status,
                concerned_note,
                note_verdict_request,
                note_verdict_success,
                note_verdict_failure,
            }

        case notesVerdictConstants.ASK_FOR_VERDICT_FAILURE:
            status = action.payload.status
            note_encoded_content = action.payload.note_encoded_content
            note_schema = action.payload.note_schema

            requesting_index = _.findIndex(currenct_canvas_verdict_requests_status, ["note_encoded_content", note_encoded_content]);
            currenct_canvas_verdict_requests_status[requesting_index]["verdict_request_result"] = verdict_request_result_constants[status] //success/failure
            concerned_note = Object.assign({}, note_schema)

            note_verdict_request = false;
            note_verdict_success = false;
            note_verdict_failure = true;

            return {
                ...state,
                currenct_canvas_verdict_requests_status,
                concerned_note,
                note_verdict_request,
                note_verdict_success,
                note_verdict_failure,
            }



        default:
            return state
    }
}