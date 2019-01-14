import {
    notesConstants,
    default_verdict_value,
    default_verdict_status,
    default_verdict_message,
    default_verdict_comment
} from '../_constants';
import _ from "lodash"
// CREATE_NOTE_ACTION
// UPDATE_NOTE_ACTION
// DELETE_NOTE_ACTION
// REDO_NOTE_ACTION
// UNDO_NOTE_ACTION
// DRAG_NOTE_END
const nanoid = require("nanoid");
export const notesActions = {
    init_note_action,
    update_note_action,
    delete_note_action,
    redo_note_changes,
    undo_note_changes,
    drag_note_action
};

/**
 * note_id
 * note_headline
 * note_description
 * note_maker
 * note_category
 * note_current_verdict
 * note_encoded_content
 * note_verdict_value
 * note_verdict_status
 * note_verdict_message
 * note_verdict_comment
 * 
 */
//
export const encode_note_content = (note) => {
    // remove all what is not alphanumeric
    let _string = "";
    ["note_category", "note_headline", "note_description"].map(e => _string += `|${note[e]}`)
    return _.deburr(_string).replace(/[^a-z0-9-|]/ig, "").toLowerCase()
    // return _.deburr(_string).toLowerCase();
}


const get_note_init_schema = (payload) => {
    return {
        "note_id": nanoid(25),
        "note_headline": "",
        "note_description": "",
        "note_maker": payload.maker,
        "note_category": payload.note_category,
        "note_current_verdict": {
            "note_encoded_content": "",
            "note_verdict_value": default_verdict_value,
            "note_verdict_status": default_verdict_status,
            "note_verdict_message": default_verdict_message,
            "note_verdict_comment": default_verdict_comment,
        }
    };
};


function init_note_action(payload) {
    payload = get_note_init_schema(payload);
    return dispatch => {
        dispatch({
            type: notesConstants.CREATE_NOTE_ACTION,
            payload
        })
    }

}
/**
 * 
 * @param {Object} payload 
 */
function update_note_action(payload) {
    payload["note_current_verdict"]["note_encoded_content"] = encode_note_content(payload)
    return dispatch => {
        dispatch({
            type: notesConstants.UPDATE_NOTE_ACTION,
            payload
        })
    }
}

function delete_note_action(payload) {

    return dispatch => {
        dispatch({
            type: notesConstants.DELETE_NOTE_ACTION,
            payload
        })
    }

}

function redo_note_changes(payload) {
    return dispatch => {
        payload["no_clear_redo"] = true;
        dispatch(payload)
        dispatch({
            type: notesConstants.REDO_NOTE_ACTION
        })
    }

}

function undo_note_changes(payload) {
    return dispatch => {

        payload["no_clear_redo"] = true;
        dispatch(payload)
        dispatch({
            type: notesConstants.UNDO_NOTE_ACTION
        })
    }

}

function drag_note_action(payload) {
    return dispatch => {
        dispatch({
            type: notesConstants.DRAG_NOTE_END,
            payload
        })
    }

}