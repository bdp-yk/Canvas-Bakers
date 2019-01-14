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
export const notesVerdictConstants = {
    //first we select a note => open that modal => we change "session"
    SELECT_NOTE_FOR_VERDICT: "SELECT_NOTE_FOR_VERDICT",
    //or we close that modal    
    UNSELECT_NOTE_FOR_VERDICT: "UNSELECT_NOTE_FOR_VERDICT",
    // we ask for evaluation
    ASK_FOR_VERDICT_REQUEST: "ASK_FOR_VERDICT_REQUEST",
    // then we make necessary things with the 
    RECEIVE_VERDICT_REQUEST: "RECEIVE_VERDICT_REQUEST",
    // set state with 
    INIT_CANVAS_VERDICT_REQUESTS: "INIT_CANVAS_VERDICT_REQUESTS",
};
export const default_verdict_value = "N/A";
export const default_verdict_status = "N/A";
export const default_verdict_message = "new_validation";
export const default_verdict_comment = "already_validated";
export const verdict_status_constants = {
    request: "request",
    success: "success",
    failure: "failure",
    existed: "existed",
};

export const system_comment_types = {
    first_validation: "first_validation",
    new_validation: "new_validation",
    already_validated: "already_validated"

};
export const status_default_text = (verdict_status) => {
    switch (verdict_status) {
        case verdict_status_constants.request:
            return "We are requesting the verdict, this may take a while";
        case verdict_status_constants.success:
            return "Successfully validated this note!";
        case verdict_status_constants.failure:
            return "Something went wrong with this note!"
        case verdict_status_constants.existed:
            return "We already judged a similar Note!"
        default:
            return "N/A";
    }
};

export const comment_default_text = (comment_type) => {
    switch (comment_type) {
        case system_comment_types.first_validation:
            return `Your note will be qualified by the AI prototype.
        Press the validate Button to start your validation process.
        You can freely keep making changes for your canvas notes (excluding this one), 
        as you will be notified when the verdict will be ready.`;
        case system_comment_types.new_validation:
            return `Your note as qualified by the AI prototype. 
        This verdict will be considered for your future inputs, try to enhance your Note.`;
        case system_comment_types.already_validated:
            return `We found an equivalent stamp in your recent changes of this canvas. 
        Please note that the AI does not take into consideration punctuations`;
        default:
            return `N/A`;
    }
};