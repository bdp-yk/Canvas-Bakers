class _url():
    USER_AUTH_URL = "/user/"
    USER_LOGIN_URL = USER_AUTH_URL + "login/"
    USER_GET_BY_ID_URL = USER_AUTH_URL + "get_by_id/"
    USER_REGISTER_URL = USER_AUTH_URL + "register/"
    USER_UPDATE_URL = USER_AUTH_URL + "update/"
    USER_DELETE_URL = USER_AUTH_URL + "delete/"
    USER_LOGOUT_URL = USER_AUTH_URL + "logout/"

    TESTER_AUTH_URL = "/tester/"
    CHECK_TEST_SEASON_URL = TESTER_AUTH_URL + "check_test_season/"
    TESTER_LOGIN_URL = TESTER_AUTH_URL + "login/"
    TESTER_GET_BY_ID_URL = TESTER_AUTH_URL + "get_by_id/"
    TESTER_REGISTER_URL = TESTER_AUTH_URL + "register/"
    TESTER_UPDATE_URL = TESTER_AUTH_URL + "update/"
    TESTER_DELETE_URL = TESTER_AUTH_URL + "delete/"
    TESTER_LOGOUT_URL = TESTER_AUTH_URL + "logout/"

    GET_ALL_USERS = USER_AUTH_URL + "get_all/"
    GET_ALL_TESTERS = TESTER_AUTH_URL + "get_all/"

    CANVAS_ENTRY_URL = "/canvas/"
    LOAD_CANVAS_URL = CANVAS_ENTRY_URL + "load"
    UPDATE_CANVAS_URL = CANVAS_ENTRY_URL + "update"
    DELETE_CANVAS_URL = CANVAS_ENTRY_URL + "delete"
    
    LIST_OF_USER_CANVAS_URL = CANVAS_ENTRY_URL + "list_canvas"
    CANVAS_HISTOR_URL = CANVAS_ENTRY_URL + "canvas_history"
