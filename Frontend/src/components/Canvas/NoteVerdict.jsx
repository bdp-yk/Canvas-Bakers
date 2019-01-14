import React, { Component } from 'react'
import { Row, Col, Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { notesVerdictActions } from '../../redux/_actions';
import { multipleActionsMapDispatchToProps } from '../../utils';
import { connect } from 'react-redux'
import { notesActions } from '../../redux/_actions/notes.canvas.actions';
// import { system_comment_text_constants } from '../../redux/_constants';
import _ from 'lodash'
import { status_default_text, comment_default_text } from '../../redux/_constants';



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
            return `A ${concerned_note["note_category"]} note made by ${concerned_note["note_maker"] ? concerned_note["note_maker"]["email"] : "email"}`
        return "Note Verdict"
    }
    ask_for_verdict_request = () => {
        // this.props.update_note_action(this.props.canvas.concerned_note);
        this.props.ask_for_verdict_request_action();
        // this.props.unselect_note_for_verdict_action();
        //     setTimeout(() => {
        //         this.props.receive_verdict_request_action({
        //             note_category: 'key-partners',
        //             note_current_verdict: {
        //                 note_encoded_content: '|key-partners|azeazeaz|wxccwx',
        //                 note_verdict_comment: 'new_validation',
        //                 note_verdict_message: 'Cute AF',
        //                 note_verdict_status: 'N/A',
        //                 note_verdict_value: 99.99
        //             },
        //             note_description: 'wxccwx',
        //             note_headline: 'azeazeaz',
        //             note_id: 'hanQ-62kkvgf421axmxWMe6f6',
        //             note_maker: {
        //                 'class': 'tester',
        //                 email: 'ky94@live.com',
        //                 group: 'A'
        //             }
        //         })
        //     }, 3000);
    }
    render() {
        const { concerned_note,
            toggle_verdict_modal } = this.props.canvas;
        // console.log(concerned_note);

        return (
            _.isEmpty(concerned_note) ? null : <>
                <Modal isOpen={toggle_verdict_modal} toggle={this.props.unselect_note_for_verdict_action} className={this.props.className}>
                    <ModalHeader toggle={this.toggle}>{this.pretty_modal_title()}</ModalHeader>
                    <ModalBody>
                        <blockquote>
                            <p className="blockquote blockquote-primary">
                                <small>{concerned_note["note_headline"]}</small>
                                <br />
                                {concerned_note["note_description"]}
                            </p>
                        </blockquote>

                        <br />
                        {<Row className="mx-3">
                            <Col
                                className="my-auto"
                                lg="3"
                                md="3"
                                sm="4"
                            >
                                <h1 className="text-success">{concerned_note["note_current_verdict"]["note_verdict_value"]}</h1>
                                <h1 className="text-success">{concerned_note["note_current_verdict"]["note_verdict_status"]}</h1>

                            </Col>
                            <Col
                            >
                                <p className="text-success">{status_default_text(concerned_note["note_current_verdict"]["note_verdict_message"])}</p>
                                <p className="text-success">{comment_default_text(concerned_note["note_current_verdict"]["note_verdict_comment"])}</p>
                                {/* {_.isEmpty(concerned_note["current_verdict"]["note_verdict_history"]) ? <p className="text-success">{system_comment_text_constants.first_validation}</p> : null} */}

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
                        <Button color="primary" onClick={this.ask_for_verdict_request}>Validate My Note</Button>{' '}
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
