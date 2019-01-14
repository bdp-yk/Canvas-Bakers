import {
    notesVerdictConstants,
    verdict_status_constants,
    // system_comment_text_constants,
    // verdict_request_status_constants
} from "../_constants";
import _ from 'lodash'
import {
    encode_note_content
} from "../_actions/notes.canvas.actions";
import {
    canvas_init_store
} from "./canvas.reducer";
const verdictState = {
    ...canvas_init_store,
    // concerned_note: {},
    // toggle_verdict_modal: false,
    // already_satisfied_verdict_index_in_note_verdict_history: -1,
    // canvas_requested_verdicts: [],
}
/**
 * <NOTE SCHEMA>
 * note_id
 * note_headline
 * note_description
 * note_maker
 * note_category
 * note_current_verdict
 *     note_encoded_content
 *     note_verdict_value
 *     note_verdict_status
 *     note_verdict_message
 *     note_verdict_comment
 *  
 */
export function notesVerdict(state = verdictState, action) {
    let {
        canvas_requested_verdicts,
        concerned_note,
        toggle_verdict_modal
    } = state;
    // _enc,
    //     note_schema,
    //     history_index,
    //     requesting_index,
    //     note_verdict_status,
    //     status,
    let
        crv,
        cn,
        note_encoded_content;
    switch (action.type) {
        case notesVerdictConstants.INIT_CANVAS_VERDICT_REQUESTS:
            return {
                ...state,
                canvas_requested_verdicts: action.payload
            }
        case notesVerdictConstants.SELECT_NOTE_FOR_VERDICT:
            note_encoded_content = encode_note_content(action.payload);
            _.remove(canvas_requested_verdicts, ["note_encoded_content", note_encoded_content])
            return {
                ...state,
                toggle_verdict_modal: !toggle_verdict_modal,
                concerned_note: action.payload,
                canvas_requested_verdicts
            }

        case notesVerdictConstants.UNSELECT_NOTE_FOR_VERDICT:
            return {
                ...state,
                toggle_verdict_modal: !toggle_verdict_modal,
                concerned_note: {}
            }

        case notesVerdictConstants.ASK_FOR_VERDICT_REQUEST:
            concerned_note = state.concerned_note;
            canvas_requested_verdicts = state.canvas_requested_verdicts;
            concerned_note["note_current_verdict"]["note_verdict_status"] = verdict_status_constants.request
            canvas_requested_verdicts.push(concerned_note);
            cn = state.canvas_schema.canvas_notes[concerned_note["note_category"]];
            cn[_.indexOf(cn, ["note_id", concerned_note["note_id"]])] = concerned_note;
            return {
                ...state,
                concerned_note,
                canvas_requested_verdicts
            }
        case notesVerdictConstants.RECEIVE_VERDICT_REQUEST:
            concerned_note = action.payload
            crv = state.canvas_requested_verdicts;
            crv[_.indexOf(crv, ["note_id", action.payload["note_id"]])] = action.payload;
            return {
                ...state,
                concerned_note,
                canvas_requested_verdicts: crv,
            }
        default:
            return state
    }
}