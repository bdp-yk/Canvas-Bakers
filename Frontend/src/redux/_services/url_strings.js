// export const API_URL = "http://localhost:5000/";
// export const API_URL="http://h2793844.stratoserver.net:5000/";
export const API_URL="https://trysmartcanvas.de:5000/";

// sign in/out/up urls
export const USER_AUTH_URL = API_URL + "user/";
export const USER_LOGIN_URL = USER_AUTH_URL + "login/";
export const USER_GET_BY_ID_URL = USER_AUTH_URL + "get_by_id/";
export const USER_REGISTER_URL = USER_AUTH_URL + "register/";
export const USER_UPDATE_URL = USER_AUTH_URL + "update/";
export const USER_DELETE_URL = USER_AUTH_URL + "delete/";
export const USER_LOGOUT_URL = USER_AUTH_URL + "logout/"

// tester in/out/up urls
export const TESTER_AUTH_URL = API_URL + "tester/";
export const CHECK_TEST_SEASON_URL = TESTER_AUTH_URL + "check_test_season/";

export const TESTER_LOGIN_URL = TESTER_AUTH_URL + "login/";
export const TESTER_REGISTER_URL = TESTER_AUTH_URL + "register/";

export const TESTER_UPDATE_URL = TESTER_AUTH_URL + "update/";
export const TESTER_DELETE_URL = TESTER_AUTH_URL + "delete/";
export const TESTER_LOGOUT_URL = TESTER_AUTH_URL + "logout/";

export const TESTER_GET_BY_ID_URL = TESTER_AUTH_URL + "get_by_id/";
export const TESTER_GET_BY_EMAIL = TESTER_AUTH_URL + "get_by_email/";


// get all url
export const GET_ALL_USERS = USER_AUTH_URL + "get_all/"; 
export const GET_ALL_TESTERS = TESTER_AUTH_URL + "get_all/";

export const GET_All_GROUPS = TESTER_AUTH_URL + "get_groups/";
export const DELETE_GROUP = TESTER_AUTH_URL + "delete_group/";
export const ADD_GROUP = TESTER_AUTH_URL + "add_group/";


// canvas urls
export const CANVAS_ENTRY_URL = API_URL + "canvas/";
// update_one with upsert
export const UPLOAD_CANVAS_URL = CANVAS_ENTRY_URL + "update";
export const LOAD_CANVAS_URL = CANVAS_ENTRY_URL + "load";
export const DELETE_CANVAS_URL = CANVAS_ENTRY_URL + "delete";
export const SHARE_CANVAS_URL = CANVAS_ENTRY_URL + "share";
// listing urls

export const LIST_OF_USER_CANVAS_URL = CANVAS_ENTRY_URL + "list_canvas";
export const CANVAS_HISTOR_URL = CANVAS_ENTRY_URL + "canvas_history";

//
export const VERDICT_ENTRY_URL = API_URL + "verdict/";
export const POST_NOTE_FOR_VERDICT = VERDICT_ENTRY_URL + "post_verdict/";
export const GET_NOTE_VERDICT = VERDICT_ENTRY_URL + "get_verdict/";
export const GET_NOTE_VERDICT_HISTORY = VERDICT_ENTRY_URL + "get_verdict_history/";
export const LOAD_CANVAS_REQUESTED_VERDICTS = VERDICT_ENTRY_URL + "get_canvas_requested_verdicts/";

export const ADMIN_LOAD_ALL_REQUESTED_VERDICTS_URL = VERDICT_ENTRY_URL + "admin_load_all_verdict/";
export const ADMIN_SUBMIT_VERDICT = VERDICT_ENTRY_URL + "admin_submit_verdict/";

export const GET_SUGGESTIONS = VERDICT_ENTRY_URL + "get_suggestion/";

// join Canvas url
export const JOIN_WORKSPACE = CANVAS_ENTRY_URL + "join_workspace/";