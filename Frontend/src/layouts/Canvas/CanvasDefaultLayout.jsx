import React from "react";
// react plugin for creating CanvasDefaultLayout over the dashboard
import { connect } from 'react-redux';

// reactstrap components
import {
  Card, CardHeader, CardBody, CardTitle, Row, Col,
  Button, ButtonGroup, ButtonDropdown, DropdownToggle,
  DropdownMenu, DropdownItem, Modal, ModalHeader, ModalBody, ModalFooter,
  Input, FormGroup, Label
} from "reactstrap";
import { lmc_design, bmc_design } from "../../featured";
import { history } from "../../redux/_helpers";
import { CANVAS_ID_LENGHT, _canvas_preview_route, _canvas_preview_path, APP_URL, _quickstart_route } from "../../constants";
import { multipleActionsMapDispatchToProps, who_am_i } from "../../utils";
import { canvasActions, testerActions, alertActions } from "../../redux/_actions";
import { notesActions } from "../../redux/_actions/notes.canvas.actions";
import { NoteVerdict, NotePartialView } from "../../components/Canvas";
//dnd
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import { GenerateDraggable } from "../../_components";
import { LoaderGif } from "../../_components/LoaderGif";

import TimeAgo from 'timeago-react';
import { find_exact_index_by_property } from "../../utils/dnd_utils";
import _ from 'lodash'
class CanvasDefaultLayout extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      detailed_note: true,
      new_team_mate: "",
      is_share: this.props.match.path === _canvas_preview_route,
      open_delete_modal: false,
      open_share_modal: false,
      _canvas_team: [],
      i_want_to_delete_a_commit: true,
      this_is_not_a_joke: false
    }
    this.toggle_detailed_note = this.toggle_detailed_note.bind(this);
    this.toggle_share_dropdown_open = this.toggle_share_dropdown_open.bind(this);
    this.copy_canvas_link = this.copy_canvas_link.bind(this);
    this.add_note_to_category = this.add_note_to_category.bind(this);
    this.handle_undo = this.handle_undo.bind(this);
    this.handle_redo = this.handle_redo.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.onDragEnd = this.onDragEnd.bind(this);
    this.onDragStart = this.onDragStart.bind(this);
    this.commit_canvas_schema = this.commit_canvas_schema.bind(this);
    this.handleClearDefaultNotes = this.handleClearDefaultNotes.bind(this);
  }
  smooth_column = (canvas_notes, column, index, collapse, is_share) => {

    return <Col key={index} xs={column.column_width}>

      <Row>
        {column.composition.map(
          (exact_column, key_c) => {
            const payload = {
              maker: who_am_i(),
              note_category: exact_column.category,
              position: canvas_notes[exact_column.category].length
            };
            return <Col key={key_c} xs="12" >
              <Card >
                <CardHeader>
                  <CardTitle tag="h4">
                    {exact_column.name}
                    <Button onClick={() => this.add_note_to_category(payload)} close aria-label="Cancel">
                      <span aria-hidden>+</span>
                    </Button>
                  </CardTitle>
                </CardHeader>
                <Droppable droppableId={exact_column.category} direction={exact_column.direction}>
                  {(provided, snapshot) => (
                    <div
                      ref={provided.innerRef}
                      className={snapshot.isDraggingOver ? "bg-info" : ""}
                      // style={getDroppableStyle(snapshot.isDraggingOver)}
                      {...provided.droppableProps}
                    >
                      <CardBody style={{ minHeight: "50px" }}>
                        <Row>

                          {canvas_notes[exact_column.category].map((note, ind) => {
                            return <Col key={ind} xs={column.note_width}>
                              {<GenerateDraggable index={ind} draggableId={note.note_id}
                                detailed_note={collapse}
                                is_share={is_share} note={note}
                                component={NotePartialView} />}
                            </Col>

                          })}
                          {provided.placeholder}


                        </Row>
                      </CardBody>
                    </div>)}
                </Droppable>
              </Card>
            </Col>
          }
        )}
      </Row>
    </Col >
  }
  commit_canvas_schema = () => {
    this.props.commit_canvas_schema_action(this.props.canvas.canvas_schema);
  }
  onDragStart = result => {
    // console.log("onDragStart>>", result);
    let { draggableId } = result;
    if (draggableId === "default_note")
      return

  }
  onDragEnd = result => {
    // console.log(result);

    let { destination, source } = result;
    if (!destination || (_.isEqual(source, destination) && source.index === destination.index)) {
      return;
    }
    this.props.drag_note_action({
      source_category: source.droppableId,
      source_index: source.index,
      target_category: destination.droppableId,
      target_index: destination.index,
    })

  }
  add_note_to_category = (payload) => {
    this.props.init_note_action(payload);
  }
  componentDidMount() {
    let { canvas_id, stamp } = this.props.match.params
    const { canvas } = this.props
    const { is_share } = this.state

    if (canvas_id.length === CANVAS_ID_LENGHT) {
      if (!(canvas && canvas.load_canvas_success)) {
        this.props.load_canvas_schema(canvas_id, !is_share, stamp);
      }
    }
  }
  componentWillReceiveProps(nextProps) {
    let { canvas_id, stamp } = this.props.match.params,
      n_canvas_id = nextProps.match.params.canvas_id,
      n_stamp = nextProps.match.params.stamp;
    if ((canvas_id !== n_canvas_id) || ((stamp !== n_stamp)))
      this.props.load_canvas_schema(n_canvas_id, false, n_stamp);
  }
  componentWillUnmount() {
    this.props.clear_canvas_schema_action();
  }
  copy_canvas_link = () => {
    // window.copy(BASE_URL + _canvas_preview_path + this.props.match.params.canvas_id)
    var textField = document.createElement("textarea");
    textField.innerText = APP_URL + _canvas_preview_path + this.props.match.params.canvas_id;
    document.body.appendChild(textField);
    textField.select();
    this.setState({
      copied: true
    });
    document.execCommand("copy");
    textField.remove();
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
  toggle_delete_dropdown_open = () => {
    this.setState({
      delete_dropdown_open: !this.state.delete_dropdown_open
    })
  }
  delete_this_canvas = (ask_user, i_want_to_delete_a_commit = true) => {
    if (ask_user)
      this.setState({
        open_delete_modal: !this.state.open_delete_modal,
        i_want_to_delete_a_commit
      })
    else {
      let { canvas_id, canvas_version_stamp } = this.props.canvas.canvas_schema;
      if (i_want_to_delete_a_commit) {
        // console.log("canvas_version_stamp_from history", canvas_version_stamp);
        this.props.delete_my_canvas(canvas_id, i_want_to_delete_a_commit, canvas_version_stamp);
      }
      else {
        // Delete/canvas_id
        // console.log("canvas to delete", canvas_id);
        this.props.delete_my_canvas(canvas_id, i_want_to_delete_a_commit, -1);

      }
      this.props.clear_canvas_schema_action();
      // this.props.delete_my_canvas(this.props.canvas.canvas_schema.canvas_id, i_want_to_delete_a_commit, canvas_version_stamp)
    }

  }
  fetch_new_maker = () => {
    this.props.fetch_team_mate(this.state.new_team_mate);
  }
  approve_new_maker = () => {
    let { _canvas_team } = this.state;
    if ((_canvas_team.findIndex(e => e.email === this.props.canvas.new_team_mate.email) >= 0) || find_exact_index_by_property(this.props.canvas.canvas_schema.canvas_team, this.props.canvas.new_team_mate.email, "email") > 0) {
      this.props.error("Already part of team!")
    }
    else {
      _canvas_team.push(this.props.canvas.new_team_mate);
      this.setState({
        new_team_mate: ""
      })
      // this.props.share_my_canvas_action()
      this.props.approve_team_mate();
    }
  }
  share_this_canvas = (ask_user = true) => {
    if (!ask_user) {
      let canvas_team = [...this.props.canvas.canvas_schema.canvas_team, ...this.state._canvas_team]
      // console.log(canvas_team);

      this.props.update_canvas_schema({ canvas_team })
      // this.commit_canvas_schema()
      // this.props.share_my_canvas_action(this.state._canvas_team, true)
      this.share_this_canvas()
    }
    this.setState({
      open_share_modal: !this.state.open_share_modal,
      _canvas_team: []
    })
  }
  handle_undo = () => {
    const { canvas_undo_list } = this.props.canvas;
    this.props.undo_note_changes(canvas_undo_list[0]);
  }
  handle_redo = () => {
    const { canvas_redo_list } = this.props.canvas;
    this.props.redo_note_changes(canvas_redo_list[0]);
  }
  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    })
  }
  handleClearDefaultNotes = () => {
    this.props.clear_default_notes()
  }
  render() {

    const { detailed_note, share_dropdown_open, is_share, _canvas_team, delete_dropdown_open } = this.state
    // const {canvas} = this.props;
    const { canvas_schema, load_canvas_success, load_canvas_request } = this.props.canvas;
    let get_canvas_design = [];
    let render_canvas_team = [];
    if (canvas_schema && canvas_schema.canvas_type) {
      switch (canvas_schema.canvas_type) {
        case "lmc":
          get_canvas_design = lmc_design;
          break;

        default:
          get_canvas_design = bmc_design;
          break;
      }
      render_canvas_team = canvas_schema.canvas_team;
    }

    return (
      <>
        <div className="content">
          <NoteVerdict />

          {load_canvas_success && <>
            <h4 className="py-0 my-0"> {`Canvas: ${canvas_schema.canvas_name} `}</h4>
            <span className="text-muted px-3" >
              {`Changes made by ${canvas_schema.canvas_version_provider.email} `}
              <TimeAgo datetime={canvas_schema.canvas_version_stamp} />
            </span>
          </>}
          {load_canvas_success ?
            <Row>
              <ButtonGroup className="px-3 ">
                {(this.props.location.pathname === _quickstart_route) && <Button onClick={() => history.push("/welcome")}>Home</Button>
                }
                {this.props.canvas.contains_default_notes ? <Button onClick={this.handleClearDefaultNotes} size="sm">Delete Default Notes</Button> : null}
                <Button onClick={this.handle_undo} disabled={this.props.canvas.canvas_undo_list.length === 0} size="sm">&#9668;</Button>
                <Button onClick={this.handle_redo} disabled={this.props.canvas.canvas_redo_list.length === 0} size="sm">&#9658;</Button>&nbsp;
                <Button onClick={this.commit_canvas_schema} disabled={!(this.props.canvas.update_canvas_schema_success) || (this.props.canvas.upload_canvas_request) || _.isEmpty(this.props.canvas.canvas_undo_list)} size="sm">&#10004;</Button>

              </ButtonGroup>
              {(!is_share) && <ButtonGroup className="px-3 ml-auto">
                <Button onClick={this.toggle_detailed_note}>Toggle Note Details</Button>
                <ButtonDropdown isOpen={share_dropdown_open} toggle={this.toggle_share_dropdown_open}>
                  <DropdownToggle caret>
                    Share Canvas
                  </DropdownToggle>
                  <DropdownMenu>
                    {<DropdownItem onClick={() => this.share_this_canvas(true)} >Share Canvas</DropdownItem>}
                    <DropdownItem onClick={this.copy_canvas_link}  >Copy Canvas Link</DropdownItem>
                    {<DropdownItem divider />}
                    {<DropdownItem>Share it via Email </DropdownItem>}
                  </DropdownMenu>
                </ButtonDropdown>
                {<>

                  <ButtonDropdown isOpen={delete_dropdown_open} toggle={this.toggle_delete_dropdown_open}>
                    <DropdownToggle caret>
                      Delete
                  </DropdownToggle>
                    <DropdownMenu>
                      <DropdownItem onClick={() => this.delete_this_canvas(true, true)} >Delete This Version</DropdownItem>
                      <DropdownItem onClick={() => this.delete_this_canvas(true, false)}  >Delete Canvas</DropdownItem>
                    </DropdownMenu>
                  </ButtonDropdown>
                </>

                }
              </ButtonGroup>}
            </Row> :
            "Loading Canvas..."}
          <DragDropContext onDragStart={this.onDragStart} onDragEnd={this.onDragEnd}>
            {load_canvas_success ? <Row>
              {get_canvas_design.map((e, index) => {
                return this.smooth_column(canvas_schema.canvas_notes, e, index, detailed_note, is_share)
              })}
            </Row> : null}
          </DragDropContext>
          {LoaderGif(load_canvas_request, "Canvas")}

        </div>
        <Modal isOpen={this.state.open_delete_modal} fade={false} backdrop={false} toggle={() => this.delete_this_canvas(true, true)}  >
          <ModalHeader toggle={this.toggle}>Canvas Delete Options</ModalHeader>
          <ModalBody>
            Deleting this {this.state.i_want_to_delete_a_commit ? "Commit" : "Canvas"} means deleting its entire record! Forever!
            {this.state.i_want_to_delete_a_commit ?
              null :
              <>
                <FormGroup check>
                  <Label check>
                    <Input type="checkbox" value={this.state.this_is_not_a_joke} onChange={() => this.setState({ this_is_not_a_joke: !this.state.this_is_not_a_joke })} />{' '}
                    I agree to delete my Canvas! Forever!
                  </Label>
                </FormGroup>
              </>
            }
          </ModalBody>
          <ModalFooter>
            <Button color="primary" disabled={(!this.state.i_want_to_delete_a_commit && !this.state.this_is_not_a_joke)} onClick={() => this.delete_this_canvas(false, this.state.i_want_to_delete_a_commit)}>I agree</Button>{' '}
            <Button color="secondary" onClick={() => this.delete_this_canvas(true, true)}>Cancel</Button>
          </ModalFooter>
        </Modal>
        <Modal isOpen={this.state.open_share_modal} fade={false} toggle={() => this.share_this_canvas(true)}  >
          <ModalHeader toggle={this.toggle}>Canvas Sharing</ModalHeader>
          <ModalBody >
            <Card>
              {render_canvas_team.map((_t_mate, ind) => {
                return (<CardHeader key={ind}
                  className="py-1 justify-content-between">
                  {_t_mate.email}
                </CardHeader>)
              })}
              {_canvas_team.map((_t_mate, ind) => {
                return (<CardHeader key={ind}
                  className="py-1 justify-content-between bg-success">
                  {_t_mate.email}
                </CardHeader>)
              })}
              <Input className="mt-2 " name="new_team_mate" value={this.state.new_team_mate} onChange={this.handleChange} placeholder="Add another team mate" />

            </Card>

          </ModalBody>
          <ModalFooter>
            <Button className="px-auto" color="fetch" disabled={this.props.canvas.fetch_canvas_team_mate_request || this.state.new_team_mate === ""}
              onClick={() => this.fetch_new_maker()}>Fetch User</Button>{this.props.canvas.fetch_canvas_team_mate_failure && 'No such user exists ... '}
            <Button className="px-auto" color="success" disabled={!(this.props.canvas.fetch_canvas_team_mate_success && (this.props.canvas.new_team_mate.email.toUpperCase() === this.state.new_team_mate.toUpperCase()))} onClick={() => this.approve_new_maker()}>Add To This Team</Button>
          </ModalFooter>
          <ModalFooter>
            <Button className="px-auto" color="primary" disabled={(this.props.canvas.share_my_canvas_request) || (this.state._canvas_team.length === 0)} onClick={() => this.share_this_canvas(false)}>Expand your Team!</Button>{' '}
            <Button className="px-auto" color="info" onClick={() => this.share_this_canvas(true)}>Cancel</Button>
          </ModalFooter>
        </Modal>
      </>
    );
  }
}

function mapStateToProps(state) {
  const { canvas } = state;
  return {
    canvas
  };
}

const connectedCanvasDefaultLayout = connect(mapStateToProps, multipleActionsMapDispatchToProps([canvasActions, testerActions, notesActions, alertActions]))(CanvasDefaultLayout);
export { connectedCanvasDefaultLayout as CanvasDefaultLayout }; 
