import React, { Component } from 'react'
import { Row, Col, Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { notesVerdictActions } from '../../redux/_actions';
import { multipleActionsMapDispatchToProps } from '../../utils';
import { connect } from 'react-redux'
import { notesActions } from '../../redux/_actions/notes.canvas.actions';
import { verdict_result_message } from '../../redux/_constants';
import _ from 'lodash'
/**
 * const verdictState = {
 *      concerned_note: {},
 *      toggle_verdict_modal: false,
 *      already_satisfied_verdict_index_in_note_verdict_history: -1,
 *      currenct_canvas_verdict_requests_status: [
 *      ],
 *  }
 */
/**
 * Possible Actions
    * init_canvas_verdict_requests_action
    * select_note_for_verdict_action
    * unselect_note_for_verdict_action
    * ask_for_verdict_request_action
    * ask_for_verdict_success_action
    * ask_for_verdict_failure_action
 */
/**
 * Reminder of Note Schema
 *  "note_id": "",
    "note_headline": "",
    "note_description": "",
    "note_maker": "",
    "note_verdict_value":"",
    "note_verdict_message": "",
    "note_verdict_request": "",
    "note_verdict_success": "",
    "note_equivalent_verdict": "",
    "note_verdict_failure": "",
    "note_category": "",
    "note_verdict_history": [{
                "note_encoded_content": "",
                    // means we serialize the categorie
                    // the headline and the description for 
                    // giving old note version
                "note_verdict_value": "",
                "note_verdict_message": "",
            }],
 */
const sliced = (_arr) => {
    try {
        return _arr.slice(_arr.length - 5, _arr.length - 1)
    } catch (error) {
        return []
    }
}
class NoteVerdict extends Component {
    constructor(props) {
        super(props)
        this.ask_for_verdict_request = this.ask_for_verdict_request.bind(this)
    }
    ask_for_verdict_request = () => {
        this.props.ask_for_verdict_request_action();
        this.props.update_note_action(this.props.notesVerdict.concerned_note);
        this.props.unselect_note_for_verdict_action();
    }
    render() {
        const { concerned_note,
            toggle_verdict_modal } = this.props.notesVerdict;
        return (
            <>
                <Modal isOpen={toggle_verdict_modal} toggle={this.props.unselect_note_for_verdict_action} className={this.props.className}>
                    <ModalHeader toggle={this.toggle}>Note Verdict</ModalHeader>
                    <ModalBody>
                        <blockquote>
                            <p className="blockquote blockquote-primary">
                                <small>{concerned_note["note_headline"]}</small>
                                <br />
                                {concerned_note["note_description"]}
                            </p>
                        </blockquote>

                        <br />
                        <Row className="mx-3">
                            <Col
                                className="my-auto"
                                lg="3"
                                md="3"
                                sm="4"
                            >
                                <h1 className="text-success">{concerned_note["note_verdict_value"]}</h1>

                            </Col>
                            <Col
                            >
                                <p className="text-success">{concerned_note["note_verdict_message"]}</p>
                                {_.isEmpty(concerned_note["note_verdict_history"]) ? <p className="text-success">{verdict_result_message.first_validation}</p> : null}

                            </Col>
                        </Row>
                        {_.isEmpty(concerned_note["note_verdict_history"]) ? null : <> <Row className="mx-3">
                            Your Recent Scores
                        </Row>

                            <Row className="mx-3">
                                {
                                    sliced(concerned_note["note_verdict_history"]).map((e, p) => {
                                        return <Col xs={2} key={p}><h1 className="text-success">{e["note_verdict_value"]}</h1></Col>
                                    })
                                }
                            </Row></>}
                    </ModalBody>
                    <ModalFooter>
                        <Button color="primary" onClick={this.ask_for_verdict_request}>Validate My Note</Button>{' '}
                        <Button color="secondary" onClick={this.props.unselect_note_for_verdict_action}>Close</Button>
                    </ModalFooter>
                </Modal>
            </>
        )
    }
}
function mapStateToProps(state) {
    const { canvas, notesVerdict } = state;
    return {
        canvas,
        notesVerdict
    };
}

const connectedNoteVerdict = connect(mapStateToProps, multipleActionsMapDispatchToProps([notesActions, notesVerdictActions]))(NoteVerdict);
export { connectedNoteVerdict as NoteVerdict }; 
