import React, { Component } from 'react'
import { Row, Col, Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { notesVerdictActions } from '../../redux/_actions';
import { multipleActionsMapDispatchToProps } from '../../utils';
import { connect } from 'react-redux'
import { notesActions } from '../../redux/_actions/notes.canvas.actions';
// import { system_comment_text_constants } from '../../redux/_constants';
import _ from 'lodash'



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
                    <ModalHeader toggle={this.toggle}>{`A ${concerned_note["note_category"]}note made by ${concerned_note["note_maker"] ? concerned_note["note_maker"]["email"] : "email"}`}</ModalHeader>
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
                                {/* {_.isEmpty(concerned_note["note_verdict_history"]) ? <p className="text-success">{system_comment_text_constants.first_validation}</p> : null} */}

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
