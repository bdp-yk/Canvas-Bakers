import React, { Component } from 'react'
import { Row, Col, Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { notesVerdictActions } from '../../redux/_actions';
import { multipleActionsMapDispatchToProps } from '../../utils';
import { connect } from 'react-redux'
import { notesActions } from '../../redux/_actions/notes.canvas.actions';
// import { system_comment_text_constants } from '../../redux/_constants';
import _ from 'lodash'
import {
    //  status_default_text, comment_default_text,
    verdict_status_constants
} from '../../redux/_constants';



// export const sliced = (_arr) => {
//     try {
//         return _arr.slice(_arr.length - 5, _arr.length - 1)
//     } catch (error) {
//         return []
//     }
// }

/**
 * <NOTE SCHEMA>
 * note_id
 * note_headline
 * note_description
 * note_maker
 * note_category
 * note_current_verdict
 *     note_encoded_content
 *     note_current_verdict. note_verdict_value
 *     note_current_verdict. note_verdict_status
 *     note_current_verdict. note_verdict_message
 *     note_current_verdict. note_verdict_comment
 *  
 */

class NoteVerdict extends Component {
    constructor(props) {
        super(props)
        this.ask_for_verdict_request = this.ask_for_verdict_request.bind(this)
    }
    componentDidMount() {
        // this.props.routine_verdict_check_action()
    }
    pretty_modal_title = () => {
        let { concerned_note } = this.props.canvas;
        if (!_.isEmpty(concerned_note))
            return `A ${concerned_note["note_category"]} note made by ${concerned_note["note_maker"] ? concerned_note["note_maker"]["email"] ? concerned_note["note_maker"]["email"] : concerned_note["note_maker"] : "email"}`
        return "Note Verdict"
    }
    ask_for_verdict_request = () => {
        let { concerned_note, canvas_schema } = this.props.canvas;
        if (!_.isEmpty(concerned_note.note_headline))
            this.props.ask_for_verdict_request_action(concerned_note, canvas_schema.canvas_id);
    }
    render() {
        const { readonly } = this.props
        const { concerned_note,
            toggle_verdict_modal } = this.props.canvas;
        // console.log(concerned_note);

        return (
            _.isEmpty(concerned_note) ? null : <>
                <Modal isOpen={toggle_verdict_modal} toggle={this.props.unselect_note_for_verdict_action} className={this.props.className}>
                    <ModalHeader toggle={this.toggle}>{this.pretty_modal_title()}</ModalHeader>
                    <ModalBody>
                        <blockquote className="col-xs-12">
                            <p className="blockquote blockquote-primary">
                                <small style={{ wordWrap: "break-word" }}>{concerned_note["note_headline"]}</small>
                                <br />
                                {concerned_note["note_description"]}
                            </p>
                        </blockquote>

                        <br />
                        {_.isEmpty(concerned_note["note_current_verdict"]) ? null : <Row className="mx-3">
                            <Col
                                className="my-auto"
                                sm="4"
                            >
                                <h1 className="d-inline text-success">{isNaN(concerned_note["note_current_verdict"]["note_verdict_value"]) ? concerned_note["note_current_verdict"]["note_verdict_value"] : concerned_note["note_current_verdict"]["note_verdict_value"].toFixed(2)}</h1><small className="text-muted">/100</small>
                                <h2 className="col-xs-12 text-success">{concerned_note["note_current_verdict"]["note_verdict_status"]}</h2>

                            </Col>
                            <Col
                            >
                                {/* <p className="text-success">{(concerned_note["note_current_verdict"]["note_verdict_message"])}</p>
                                <p className="text-success">{(concerned_note["note_current_verdict"]["note_verdict_comment"])}</p> */}
                                {/* {_.isEmpty(concerned_note["current_verdict"]["note_verdict_history"]) ? <p className="text-success">{system_comment_text_constants.first_validation}</p> : null} */}
                                {/* <p className="text-success">{status_default_text(concerned_note["note_current_verdict"]["note_verdict_message"])}</p> */}

                                {/* <p className="text-success">{comment_default_text(concerned_note["note_current_verdict"]["note_verdict_comment"])}</p> */}
                            </Col>
                        </Row>}
                        {/* {_.isEmpty(concerned_note["current_verdict"]["note_verdict_history"]) ? null : <> <Row className="mx-3">
                            Your Recent Scores
                        </Row>

                            <Row className="mx-3">
                                {
                                    sliced(concerned_note["current_verdict"]["note_verdict_history"]).map((e, p) => {
                                        return <Col xs={2} key={p}><h1 className="text-success">{e["current_verdict"]["note_verdict_value"]}</h1></Col>
                                    })
                                }
                            </Row></>} */}
                    </ModalBody>
                    <ModalFooter>
                        {readonly ? null : <Button color="primary" disabled={concerned_note.note_id === "default_note" || concerned_note.note_current_verdict.note_verdict_status === verdict_status_constants.request} onClick={this.ask_for_verdict_request}>Validate My Note</Button>}
                        <Button color="secondary" onClick={this.props.unselect_note_for_verdict_action}>Close</Button>
                    </ModalFooter>
                </Modal>
            </>
        )
    }
}
function mapStateToProps(state) {
    const { canvas,
        //  notesVerdict 
    } = state;
    return {
        canvas,
        // notesVerdict
    };
}

const connectedNoteVerdict = connect(mapStateToProps, multipleActionsMapDispatchToProps([notesActions
    , notesVerdictActions
]))(NoteVerdict);
export { connectedNoteVerdict as NoteVerdict }; 
