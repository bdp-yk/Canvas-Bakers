import React from "react";
// react plugin for creating NotePartialView over the dashboard
import { connect } from 'react-redux'

// reactstrap components
import {
    Card,
    CardTitle,
    CardText,
    Button
} from "reactstrap";

class NotePartialView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            detailed_note: true
        }
        this.toggle_detailed_note = this.toggle_detailed_note.bind(this)
    }
    toggle_detailed_note = () => {
        this.setState({
            detailed_note: !this.state.detailed_note
        })
    }
    toggle_share_dropdown_open = () => {
        this.setState({
            share_dropdown_open: !this.state.share_dropdown_open
        })
    }

    render() {
        const { detailed_note, note } = this.props

        return (
            <Card body className="bg-light mb-0">
                <CardTitle>{note.note_headline}</CardTitle>
                {detailed_note && <>
                    <CardText>{note.note_description}</CardText>
                    <CardText>

                        <Button block size="small" className="d-lg-none" >+</Button>
                        <Button block className="d-none d-lg-block" >Options</Button>
                    </CardText>
                </>}
            </Card>
        );
    }
}

export default NotePartialView;
function mapStateToProps(state) {
    const { canvas } = state;
    return {
        canvas
    };
}

const connectedNotePartialView = connect(mapStateToProps)(NotePartialView);
export { connectedNotePartialView as NotePartialView }; 
