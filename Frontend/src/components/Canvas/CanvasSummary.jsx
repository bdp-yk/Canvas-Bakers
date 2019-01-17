import React from 'react';
import {
    Table,
    Button,
    Modal, ModalHeader, ModalBody, ModalFooter
} from 'reactstrap';
import { multipleActionsMapDispatchToProps } from '../../utils';
import { notesActions } from '../../redux/_actions/notes.canvas.actions';
import { notesVerdictActions } from '../../redux/_actions';
import { connect } from 'react-redux'
import { LoaderGif } from '../../_components/LoaderGif';
import { short_lmc_view, short_bmc_view } from '../../featured';
import _ from "lodash";


const get_bg_color = (ind) => ["light",
    "primary",
    "success",
    "info",
    "warning",
    "danger"][ind % 8];
class CanvasSummary extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            modal: false,
            get_canvas_design: [],
            get_sum: 0
        };

        this.toggle = this.toggle.bind(this);
    }
    start_summary = () => {
        let get_canvas_design = [], get_sum = 0;
        const { canvas_schema, load_canvas_success } = this.props.canvas;
        if (load_canvas_success) {
            if (canvas_schema && canvas_schema.canvas_type) {
                switch (canvas_schema.canvas_type) {
                    case "lmc":
                        get_canvas_design = short_lmc_view;
                        break;

                    default:
                        get_canvas_design = short_bmc_view;
                        break;
                }
            }
            for (let i = 0; i < get_canvas_design.length; i++) {
                if (canvas_schema.canvas_notes[get_canvas_design[i].category].length)
                    get_canvas_design[i]["meanBy"] = _.meanBy(canvas_schema.canvas_notes[get_canvas_design[i].category], function (o) {
                        return isNaN(o.note_current_verdict.note_verdict_value) ? 0 : o.note_current_verdict.note_verdict_value.toFixed(2)
                    });
                else
                    get_canvas_design[i]["meanBy"]= 0
                get_sum += get_canvas_design[i]["meanBy"]
            }
            get_sum /= get_canvas_design.length;
            get_sum=get_sum.toFixed(2)
        }
        this.setState({
            get_canvas_design,
            get_sum
        })
    }
    toggle() {
        this.setState({
            modal: !this.state.modal
        });
        this.start_summary();
    }

    render() {
        const { canvas_schema, load_canvas_success, load_canvas_request } = this.props.canvas;
        const { get_canvas_design, get_sum } = this.state

        return (
            <div>
                <Button color="info" onClick={this.toggle}>Get Canvas Summary</Button>
                <Modal size={"lg"} isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
                    <ModalHeader toggle={this.toggle}>Canvas Summary <span className="text-muted">Make sure to make evaluations for your notes</span></ModalHeader>
                    <ModalBody>
                        {load_canvas_request ?
                            LoaderGif(load_canvas_request, "Canvas Summary") :
                            load_canvas_success ? < Table size="sm">

                                <thead>
                                    <tr>
                                        <th colSpan={3}><h2>Total Score</h2></th>
                                        <th ><h2>{get_sum}<span className="text-muted">/100</span> </h2></th>
                                    </tr>
                                </thead>

                                <thead>
                                    <tr>
                                        <th>Note Headline</th>
                                        <th>Note Description</th>
                                        <th>Note Verdict Status</th>
                                        <th>Note Verdict Value</th>
                                    </tr>
                                </thead>
                                {
                                    get_canvas_design.map((e, index) => {
                                        return <React.Fragment key={index}>
                                            <thead className={`bg-${get_bg_color(index)} `}>
                                                <tr>
                                                    <th colSpan={3}>{e.name}</th>
                                                    <th>{e.meanBy}</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {canvas_schema.canvas_notes[e.category].map((note, i) => {
                                                    return <tr key={i}>
                                                        <th style={{ "width": "35%" }}>{note["note_headline"]}</th>
                                                        <th style={{ "width": "35%" }}>{note["note_description"]}</th>
                                                        <th className={`text-${note["note_current_verdict"]["note_verdict_status"] === "success" ? "success" : "danger"}`} style={{ "width": "15%" }}>{note["note_current_verdict"]["note_verdict_status"]}</th>
                                                        <th style={{ "width": "15%" }}>{isNaN(note["note_current_verdict"]["note_verdict_value"]) ? note["note_current_verdict"]["note_verdict_value"] : note["note_current_verdict"]["note_verdict_value"].toFixed(2)}</th>
                                                    </tr>
                                                })}
                                            </tbody>
                                        </React.Fragment>
                                    })
                                }

                            </Table> : null
                        }
                    </ModalBody>
                    <ModalFooter>
                        <Button color="primary" onClick={this.toggle}>Do Something</Button>{' '}
                        <Button color="secondary" onClick={this.toggle}>Cancel</Button>
                    </ModalFooter>
                </Modal>
            </div>
        );
    }
}

function mapStateToProps(state) {
    const { canvas } = state;
    return {
        canvas
    };
}

const connectedCanvasSummary = connect(mapStateToProps, multipleActionsMapDispatchToProps([notesActions, notesVerdictActions]))(CanvasSummary);
export { connectedCanvasSummary as CanvasSummary }; 
