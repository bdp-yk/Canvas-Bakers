class _url:
    # API_URL = "http://localhost:5000/"
    API_URL = "/"

    # sign in/out/up urls
    USER_AUTH_URL = API_URL + "user/"
    USER_LOGIN_URL = USER_AUTH_URL + "login/"
    USER_GET_BY_ID_URL = USER_AUTH_URL + "get_by_id/"
    USER_REGISTER_URL = USER_AUTH_URL + "register/"
    USER_UPDATE_URL = USER_AUTH_URL + "update/"
    USER_DELETE_URL = USER_AUTH_URL + "delete/"
    USER_LOGOUT_URL = USER_AUTH_URL + "logout/"

    # tester in/out/up urls
    TESTER_AUTH_URL = API_URL + "tester/"
    CHECK_TEST_SEASON_URL = TESTER_AUTH_URL + "check_test_season/"

    TESTER_LOGIN_URL = TESTER_AUTH_URL + "login/"
    TESTER_REGISTER_URL = TESTER_AUTH_URL + "register/"

    TESTER_UPDATE_URL = TESTER_AUTH_URL + "update/"
    TESTER_DELETE_URL = TESTER_AUTH_URL + "delete/"
    TESTER_LOGOUT_URL = TESTER_AUTH_URL + "logout/"

    TESTER_GET_BY_ID_URL = TESTER_AUTH_URL + "get_by_id/"
    TESTER_GET_BY_EMAIL = TESTER_AUTH_URL + "get_by_email/"

    # get all url
    GET_ALL_USERS = USER_AUTH_URL + "get_all/"
    GET_ALL_TESTERS = TESTER_AUTH_URL + "get_all/"

    # canvas urls
    CANVAS_ENTRY_URL = API_URL + "canvas/"
    LOAD_CANVAS_URL = CANVAS_ENTRY_URL + "load"
    DELETE_CANVAS_URL = CANVAS_ENTRY_URL + "delete"
    SHARE_CANVAS_URL = CANVAS_ENTRY_URL + "share"
    # update_one with upsert
    UPLOAD_CANVAS_URL = CANVAS_ENTRY_URL + "update"

    # listing urls
    LIST_OF_USER_CANVAS_URL = CANVAS_ENTRY_URL + "list_canvas"
    CANVAS_HISTOR_URL = CANVAS_ENTRY_URL + "canvas_history"

    # verdict
    VERDICT_ENTRY_URL = API_URL + "verdict/"
    POST_NOTE_FOR_VERDICT = VERDICT_ENTRY_URL + "post_verdict/"
    GET_NOTE_VERDICT = VERDICT_ENTRY_URL + "get_verdict/"
    GET_NOTE_VERDICT_HISTORY = VERDICT_ENTRY_URL + "get_verdict_history/"
    LOAD_CANVAS_REQUESTED_VERDICTS = (
        VERDICT_ENTRY_URL + "get_canvas_requested_verdicts/"
    )

    # DL MODULE
    AI_SERVER_URL = "http://localhost:8000/"
    AI_VALIDATION_URL = AI_SERVER_URL + "ai_validation"

