export const notesVerdictConstants = {
    SELECT_NOTE_FOR_VERDICT: "SELECT_NOTE_FOR_VERDICT",
    //first we select a note => open that modal => we change "session"
    UNSELECT_NOTE_FOR_VERDICT: "UNSELECT_NOTE_FOR_VERDICT",
    //or we close that modal    
    ASK_FOR_VERDICT_REQUEST: "ASK_FOR_VERDICT_REQUEST",
    // we ask for evaluation
    ASK_FOR_VERDICT_SUCCESS: "ASK_FOR_VERDICT_SUCCESS",
    // on evaluation success we trumble the note
    ASK_FOR_VERDICT_FAILURE: "ASK_FOR_VERDICT_FAILURE",
    // on evaluation success we make the note    
    INIT_CANVAS_VERDICT_REQUESTS: "INIT_CANVAS_VERDICT_REQUESTS",
};

export const verdict_request_result_constants = {
    request: "request",
    success: "success",
    failure: "failure",
    already_validated: "already_validated",
};

export const verdict_result_message = {
    first_validation: `Your note will be qualified by the AI prototype.
    Press the validate Button to start your validation process.
    You can freely keep making changes for your canvas notes (excluding this one), 
    as you will be notified when the verdict will be ready.`,
    new_validation: `Your note as qualified by the AI prototype. 
    This verdict will be considered for your future inputs, try to enhance your Note.`,
    already_validated: `We found an equivalent stamp in your recent changes of this canvas. 
    Please note that the AI does not take into consideration punctuations`,
};