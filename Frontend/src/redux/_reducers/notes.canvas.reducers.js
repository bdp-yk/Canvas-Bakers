import {
    notesConstants
} from '../_constants';
import {
    canvas_init_store
} from './canvas.reducer';
import {
    find_index_by_property
} from '../../utils/dnd_utils';
import {
    notesVerdict
} from './notes.verdict.reducer';

const complementary_action = action => {
    let c_type, c_payload, {
        type,
        payload
    } = action;
    switch (type) {
        case notesConstants.CREATE_NOTE_ACTION:
            c_type = notesConstants.DELETE_NOTE_ACTION
            break;
        case notesConstants.DELETE_NOTE_ACTION:
            c_type = notesConstants.CREATE_NOTE_ACTION
            break;
        default:
            c_type = type
            break;
    };
    if (Boolean(payload.target_category))
        c_payload = {
            source_category: payload.target_category,
            source_index: payload.target_index,
            target_category: payload.source_category,
            target_index: payload.source_index
        }
    else c_payload = payload

    return {
        type: c_type,
        payload: c_payload
    }
}

export function notes(state = canvas_init_store, action) {
    let {
        canvas_redo_list,
        canvas_schema
    } = state, old_note;
    let _index = 0;
    switch (action.type) {
        case notesConstants.CREATE_NOTE_ACTION:
            if (!action.no_clear_redo) {
                canvas_redo_list = [];
                state.canvas_undo_list.unshift(complementary_action(action))
            }
            canvas_schema.canvas_notes[action.payload.note_category].push(action.payload);
            return {
                ...state,
                canvas_redo_list,
                update_canvas_schema_success: true
            };
        case notesConstants.DRAG_NOTE_END:
            if (!action.no_clear_redo) {
                canvas_redo_list = [];
                state.canvas_undo_list.unshift(complementary_action(action))
            }
            let [new_note_schema] = state.canvas_schema.canvas_notes[action.payload.source_category].splice(action.payload.source_index, 1)
            new_note_schema.note_category = action.payload.target_category
            canvas_schema.canvas_notes[action.payload.target_category].splice(action.payload.target_index, 0, new_note_schema)
            return {
                ...state,
                canvas_schema,
                canvas_redo_list,
                update_canvas_schema_success: true
            };
        case notesConstants.UPDATE_NOTE_ACTION:
            _index = find_index_by_property(canvas_schema.canvas_notes[action.payload.note_category], action.payload.note_id);
            old_note = Object.assign({}, state.canvas_schema.canvas_notes[action.payload.note_category][_index]);

            canvas_schema.canvas_notes[action.payload.note_category][_index] = action.payload;
            if (!action.no_clear_redo) {
                canvas_redo_list = [];
                state.canvas_undo_list.unshift(complementary_action({
                    type: notesConstants.UPDATE_NOTE_ACTION,
                    payload: old_note
                }))
            }
            return {
                ...state,
                canvas_schema,
                canvas_redo_list,
                update_canvas_schema_success: true

            }
        case notesConstants.DELETE_NOTE_ACTION:
            _index = find_index_by_property(canvas_schema.canvas_notes[action.payload.note_category], action.payload.note_id);
            [old_note] = canvas_schema.canvas_notes[action.payload.note_category].splice(_index, 1);
            if (!action.no_clear_redo) {
                canvas_redo_list = [];
                state.canvas_undo_list.unshift(complementary_action(action))
            }
            return {
                ...state,
                canvas_schema,
                canvas_redo_list,
                update_canvas_schema_success: true
            }
        case notesConstants.UNDO_NOTE_ACTION:
            return {
                ...state,
                canvas_redo_list: [
                    complementary_action(state.canvas_undo_list.shift()),
                    ...state.canvas_redo_list,
                ],
                update_canvas_schema_success: (state.canvas_undo_list.length > 0)
            }

        case notesConstants.REDO_NOTE_ACTION:
            return {
                ...state,
                canvas_undo_list: [
                    complementary_action(state.canvas_redo_list.shift()),
                    ...state.canvas_undo_list,
                ],
            }

        default:
            return notesVerdict(state, action)
    }
}