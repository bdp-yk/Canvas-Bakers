import { notesConstants } from '../_constants';

// INIT_NOTE_REQUEST
// UPDATE_NOTE_REQUEST
// DELETE_NOTE_REQUEST
// REDO_NOTE_ACTION
// UNDO_NOTE_ACTION
// DRAG_NOTE_END

export const notesActions = {
    init_note_action,
    update_note_action,
    delete_note_action,
    redo_note_changes,
    undo_note_changes,
    drag_note_action
};
function init_note_action(payload) {
    return dispatch => {
        dispatch({
            type: notesConstants.INIT_NOTE_REQUEST,
            payload
        })
    }

}
function update_note_action(payload) {
    return dispatch => {
        dispatch({
            type: notesConstants.UPDATE_NOTE_REQUEST,
            payload
        })
    }

}
function delete_note_action(payload) {
    return dispatch => {
        dispatch({
            type: notesConstants.DELETE_NOTE_REQUEST,
            payload
        })
    }

}
function redo_note_changes(payload) {
    return dispatch => {
        payload["payload"]["no_clear_redo"] = true;
        dispatch(payload)
        dispatch({
            type: notesConstants.REDO_NOTE_ACTION
        })
    }

}
function undo_note_changes(payload) {
    return dispatch => {
        payload["payload"]["no_clear_redo"] = true;
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