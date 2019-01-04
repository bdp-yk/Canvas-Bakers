import { notesConstants } from '../_constants';

export function notes(state = {}, action) {
    let { canvas_redo_list } = state;
    if (action.payload.no_clear_redo)
        canvas_redo_list = [];
    let { canvas_notes } = state.canvas_schema;
    let { source_categorie, source_index, target_categorie, target_index, note_category, note_column_index } = action.payload;
    let old_note = canvas_notes[note_category][note_column_index];
    switch (action.type) {
        case notesConstants.INIT_NOTE_REQUEST:
            canvas_notes[note_category].push(action.payload);
            return {
                ...state,
                canvas_schema: {
                    ...state.canvas_schema,
                    canvas_notes
                },
                canvas_undo_list: [
                    ...state.canvas_undo_list,
                    {
                        action: notesConstants.DELETE_NOTE_REQUEST,
                        payload: action.payload
                    }
                ],
                canvas_redo_list
            };
        case notesConstants.DRAG_NOTE_END:
            canvas_notes[target_categorie].splice(target_index, 0, ...canvas_notes[source_categorie].splice(source_index, 1))
            return {
                ...state,
                dragged_note: {},
                canvas_schema: {
                    ...state.canvas_schema,
                    canvas_notes
                },
                canvas_undo_list: [
                    ...state.canvas_undo_list,
                    {
                        action: notesConstants.DRAG_NOTE_END,
                        payload: { target_categorie, target_index, source_categorie, source_index }
                    }
                ],
                canvas_redo_list
            };
        case notesConstants.UPDATE_NOTE_REQUEST:
            canvas_notes[note_category][note_column_index] = action.payload;

            return {
                ...state,
                canvas_schema: {
                    ...state.canvas_schema,
                    canvas_notes
                },
                canvas_undo_list: [
                    ...state.canvas_undo_list,
                    {
                        action: notesConstants.UPDATE_NOTE_REQUEST,
                        payload: old_note
                    }
                ],
                canvas_redo_list

            }
        case notesConstants.DELETE_NOTE_REQUEST:
            [note_category][note_column_index].splice(note_column_index, 1);
            return {
                ...state,
                canvas_schema: {
                    ...state.canvas_schema,
                    canvas_notes
                },
                canvas_undo_list: [
                    ...state.canvas_undo_list,
                    {
                        action: notesConstants.INIT_NOTE_REQUEST,
                        payload: old_note
                    }
                ],
                canvas_redo_list
            }
        case notesConstants.UNDO_NOTE_ACTION:
            return {
                ...state,
                canvas_redo_list: [
                    ...state.canvas_redo_list,
                    state.canvas_redo_list.pop()
                ]
            }

        case notesConstants.REDO_NOTE_ACTION:
            return {
                ...state,
                canvas_undo_list: [
                    ...state.canvas_undo_list,
                    state.canvas_redo_list.pop()
                ]
            }

        default:
            return state
    }
}