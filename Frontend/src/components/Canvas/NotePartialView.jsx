import React from "react";
// react plugin for creating NotePartialView over the dashboard
import { connect } from 'react-redux';

// reactstrap components
import {
    Card,
    CardTitle,
    CardText,
    Button,
    Input,
    UncontrolledDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem,
    Row,
    Col
} from "reactstrap";
import { multipleActionsMapDispatchToProps } from "../../utils";
import { notesActions } from "../../redux/_actions/notes.canvas.actions";

class NotePartialView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            toggle_note_headline: Boolean(props.note.note_headline),
            toggle_note_description: Boolean(props.note.note_description),
            _note: Object.assign({}, props.note)
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleToggle = this.handleToggle.bind(this);
    }
    handleChange = (event) => {
        let { name, value } = event.target;
        this.setState({
            _note: {
                ...this.state._note,
                [name]: value
            }
        })
    }
    handleToggle = (event) => {
        let { name, className } = event.target; 

        if (className.indexOf("togglers") >= 0)
            this.setState({
                toggle_note_headline: !this.state["toggle_note_headline"] && Boolean(this.state._note["note_headline"]),
                toggle_note_description: !this.state["toggle_note_description"] && Boolean(this.state._note["note_description"])
            })
        else {
            this.setState({ ["toggle_" + name]: !this.state["toggle_" + name] && Boolean(this.state._note[name]) })
            this.props.update_note_action(this.state._note);
        }
    }

    render() {
        const { _note, toggle_note_headline, toggle_note_description } = this.state
        const { detailed_note, note } = this.props;
        console.log(this.state.toggle_note_headline,toggle_note_headline, toggle_note_description);

        return (
            <Card body inverse color="light" className="mb-1">
                <CardTitle>
                    <Row>
                        <Col xs={10} className="pr-0 mx-0">
                            {this.state.toggle_note_headline ? note.note_headline : <Input placeholder="Headline" name="note_headline" value={_note.note_headline} onChange={this.handleChange} onBlur={this.handleToggle} />}
                        </Col>
                        <Col xs={2} className="pl-1 pr-3 ml-auto">
                            <UncontrolledDropdown direction="right" >
                                <DropdownToggle tag="i">
                                    <i className="tim-icons icon-pencil" />
                                </DropdownToggle>
                                <DropdownMenu>
                                    <DropdownItem className="togglers" onClick={this.handleToggle}>Edit Note</DropdownItem>
                                    <DropdownItem divider />
                                    <DropdownItem onClick={() => this.props.delete_note_action(note)}>Delete Note</DropdownItem>
                                </DropdownMenu>
                            </UncontrolledDropdown>
                        </Col>


                    </Row>
                </CardTitle>
                {detailed_note && <>
                    <CardText className="font-italic" >
                        {toggle_note_description ? note.note_description : <Input placeholder="Description" name="note_description" value={_note.note_description} onChange={this.handleChange} onBlur={this.handleToggle} />}
                    </CardText>
                    <CardText>
                        <Button block onClick={this.handleToggle} size="small" className="togglers px-0 d-lg-none" >+</Button>
                        <Button block onClick={this.handleToggle} className="togglers px-0 d-none d-lg-block" >Options  </Button>
                    </CardText>
                </>}
            </Card>
        );
    }
}

function mapStateToProps(state) {
    const { canvas } = state;
    return {
        canvas
    };
}

const connectedNotePartialView = connect(mapStateToProps, multipleActionsMapDispatchToProps([notesActions]))(NotePartialView);
export { connectedNotePartialView as NotePartialView }; 
