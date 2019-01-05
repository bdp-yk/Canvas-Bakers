import {
    canvasConstants
} from '../_constants';
import {
    notes
} from './notes.canvas.reducers';

export const canvas_init_store = {
    init_canvas_request: false,
    init_canvas_success: false,
    init_canvas_failure: false,

    upload_canvas_request: false,
    upload_canvas_success: false,
    upload_canvas_failure: false,

    load_canvas_request: false,
    load_canvas_success: false,
    load_canvas_failure: false,

    delete_canvas_request: false,
    delete_canvas_success: false,
    delete_canvas_failure: false,

    load_user_canvas_request: true,
    load_user_canvas_success: false,
    load_user_canvas_failure: false,


    fetch_canvas_team_mate_request: false,
    fetch_canvas_team_mate_success: false,
    fetch_canvas_team_mate_failure: false,

    share_my_canvas_request: false,
    share_my_canvas_success: false,
    share_my_canvas_failure: false,

    canvas_undo_list: [],
    canvas_redo_list: [],

    new_team_mate: {},

    user_canvas: [],

    canvas_history: [],

    canvas_schema: {},
}
export function canvas(state = canvas_init_store, action) {
    switch (action.type) {
        case canvasConstants.INIT_CANVAS_REQUEST:
            return {
                ...state,
                init_canvas_request: true,
                init_canvas_success: false,
                init_canvas_failure: false,
                canvas_schema: action.schema
            }
        case canvasConstants.INIT_CANVAS_SUCCESS:
            return {
                ...state,
                init_canvas_request: false,
                init_canvas_success: true,
                init_canvas_failure: false,
            };
        case canvasConstants.INIT_CANVAS_FAILURE:
            return {
                ...state,
                init_canvas_request: false,
                init_canvas_success: false,
                init_canvas_failure: true,

            };
        case canvasConstants.UPLOAD_CANVAS_REQUEST:
            return {
                ...state,
                upload_canvas_request: true,
                upload_canvas_success: false,
                upload_canvas_failure: false,
                canvas_schema: {
                    ...state.canvas_schema,
                    ...action.payload,
                }

            };
        case canvasConstants.UPLOAD_CANVAS_SUCCESS:
            return {
                ...state,
                upload_canvas_request: false,
                upload_canvas_success: true,
                upload_canvas_failure: false,

            };
        case canvasConstants.UPLOAD_CANVAS_FAILURE:
            return {
                ...state,
                upload_canvas_request: false,
                upload_canvas_success: false,
                upload_canvas_failure: true,

            };
        case canvasConstants.LOAD_CANVAS_REQUEST:
            return {
                ...state,
                load_canvas_request: true,
                load_canvas_success: false,
                load_canvas_failure: false,

            };
        case canvasConstants.LOAD_CANVAS_SUCCESS:
            return {
                ...state,
                ...action.payload,
                load_canvas_request: false,
                load_canvas_success: true,
                load_canvas_failure: false,

            };
        case canvasConstants.LOAD_CANVAS_FAILURE:
            return {
                ...state,
                load_canvas_request: false,
                load_canvas_success: false,
                load_canvas_failure: true,

            };
        case canvasConstants.DELETE_CANVAS_REQUEST:
            return {
                ...state,
                canvas_schema: {},
                delete_canvas_request: true,
                delete_canvas_success: false,
                delete_canvas_failure: false,

            };
        case canvasConstants.DELETE_CANVAS_SUCCESS:
            return {
                ...state,
                canvas_schema: {},
                delete_canvas_request: false,
                delete_canvas_success: true,
                delete_canvas_failure: false,

            };
        case canvasConstants.DELETE_CANVAS_FAILURE:
            return {
                ...state,
                canvas_schema: {},
                delete_canvas_request: false,
                delete_canvas_success: false,
                delete_canvas_failure: true,

            };


        case canvasConstants.LOAD_USER_CANVAS_REQUEST:
            return {
                ...state,
                load_user_canvas_request: true,
                load_user_canvas_success: false,
                load_user_canvas_failure: false,
            }
        case canvasConstants.LOAD_USER_CANVAS_SUCCESS:
            return {
                ...state,
                load_user_canvas_request: false,
                load_user_canvas_success: true,
                load_user_canvas_failure: false,
                user_canvas: action.user_canvas,
            }
        case canvasConstants.LOAD_USER_CANVAS_FAILURE:
            return {
                ...state,
                user_canvas: [],
                load_user_canvas_request: false,
                load_user_canvas_success: false,
                load_user_canvas_failure: true,

            }
        case canvasConstants.CLEAR_CANVAS_SCHEMA:
            return {
                ...state,
                load_user_canvas_request: false,
                load_user_canvas_success: false,
                load_user_canvas_failure: false,
                canvas_schema: {}

            }
        case canvasConstants.FETCH_CANVAS_TEAM_MATE_REQUEST:
            return {
                ...state,
                fetch_canvas_team_mate_request: true,
                fetch_canvas_team_mate_success: false,
                fetch_canvas_team_mate_request: false,
            }
        case canvasConstants.FETCH_CANVAS_TEAM_MATE_SUCCESS:
            return {
                ...state,
                fetch_canvas_team_mate_request: false,
                fetch_canvas_team_mate_success: true,
                fetch_canvas_team_mate_failure: false,
                new_team_mate: action.payload
            }
        case canvasConstants.FREE_CANVAS_TEAM_MATE:
            return {
                ...state,
                fetch_canvas_team_mate_request: false,
                fetch_canvas_team_mate_success: false,
                fetch_canvas_team_mate_failure: false,
                new_team_mate: {}
            }
        case canvasConstants.FETCH_CANVAS_TEAM_MATE_FAILURE:
            return {
                ...state,
                fetch_canvas_team_mate_request: false,
                fetch_canvas_team_mate_success: false,
                fetch_canvas_team_mate_failure: true,
            }
        case canvasConstants.SHARE_MY_CANVAS_REQUEST:
            return {
                ...state,
                share_my_canvas_request: true,
                share_my_canvas_success: false,
                share_my_canvas_failure: false,
            }
        case canvasConstants.SHARE_MY_CANVAS_SUCCESS:
            return {
                ...state,
                share_my_canvas_request: false,
                share_my_canvas_success: true,
                share_my_canvas_failure: false,
            }
        case canvasConstants.SHARE_MY_CANVAS_FAILURE:
            return {
                ...state,
                share_my_canvas_request: false,
                share_my_canvas_success: false,
                share_my_canvas_failure: true,
            }

          /**
           * UPLOAD CANVAS
           * 
           *  */  


        default:
            return notes(state, action);
    }
}