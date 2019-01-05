import React from "react";
// react plugin for creating CanvasDefaultLayout over the dashboard
import { connect } from 'react-redux';

// reactstrap components
import {
  Card, CardHeader, CardBody, CardTitle, Row, Col,
  Button, ButtonGroup, ButtonDropdown, DropdownToggle,
  DropdownMenu, DropdownItem, Modal, ModalHeader, ModalBody, ModalFooter,
  ListGroup, ListGroupItem, Badge, InputGroup, InputGroupAddon, Input
} from "reactstrap";
import { lmc_design, bmc_design } from "../../featured";
import { history } from "../../redux/_helpers";
import { CANVAS_ID_LENGHT, _canvas_preview_route, _canvas_preview_path, APP_URL } from "../../constants";
import { multipleActionsMapDispatchToProps, who_am_i } from "../../utils";
import { canvasActions, testerActions } from "../../redux/_actions";
import { notesActions } from "../../redux/_actions/notes.canvas.actions";
import { NotePartialView } from "../../components/Canvas";
//dnd
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import { GenerateDraggable } from "../../_components";

var timeago = require("timeago.js");

class CanvasDefaultLayout extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      detailed_note: true,
      is_share: this.props.match.path === _canvas_preview_route,
      open_delete_modal: false,
      open_share_modal: true,
      _canvas_team: []
    }
    this.toggle_detailed_note = this.toggle_detailed_note.bind(this);
    this.toggle_share_dropdown_open = this.toggle_share_dropdown_open.bind(this);
    this.copy_canvas_link = this.copy_canvas_link.bind(this);
    this.add_note_to_category = this.add_note_to_category.bind(this);
    this.handle_undo = this.handle_undo.bind(this);
    this.handle_redo = this.handle_redo.bind(this);
    this.onDragEnd = this.onDragEnd.bind(this);
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


  onDragEnd = result => {
    console.log(result);

    let { destination, source } = result;
    if (!destination || (source === destination && source.index === destination.index)) {
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
    const { canvas_id } = this.props.match.params
    const { canvas } = this.props
    const { is_share } = this.state

    if (canvas_id.length === CANVAS_ID_LENGHT) {
      if (!(canvas && canvas.load_canvas_success)) {
        this.props.load_canvas_schema(canvas_id, !is_share);
      }
    }
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.canvas.canvas_schema.canvas_team) {
      this.setState({
        _canvas_team: nextProps.canvas.canvas_schema.canvas_team
      })
    }

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

  delete_this_canvas = (ask_user) => {
    if (ask_user)
      this.setState({
        open_delete_modal: !this.state.open_delete_modal
      })
    else
      this.props.delete_my_canvas(this.props.canvas.canvas_schema.canvas_id)

  }
  share_this_canvas = (ask_user) => {
    if (ask_user)
      this.setState({
        open_share_modal: !this.state.open_share_modal
      })
    else
      this.props.share_my_canvas(this.state._canvas_team)

  }
  handle_undo = () => {
    const { canvas_undo_list } = this.props.canvas;
    this.props.undo_note_changes(canvas_undo_list[0]);
  }
  handle_redo = () => {
    const { canvas_redo_list } = this.props.canvas;
    this.props.redo_note_changes(canvas_redo_list[0]);
  }
  render() {
    console.log(this.props.canvas.canvas_schema.canvas_team);

    const { detailed_note, share_dropdown_open, is_share, _canvas_team } = this.state
    // const {canvas} = this.props;
    const { canvas_schema, load_canvas_success, load_canvas_request } = this.props.canvas;
    let get_canvas_design = [];
    if (canvas_schema && canvas_schema.canvas_type) {
      switch (canvas_schema.canvas_type) {
        case "lmc":
          get_canvas_design = lmc_design;
          break;

        default:
          get_canvas_design = bmc_design;
          break;
      }
    }
    return (
      <>
        {load_canvas_request ? <div>Requesting the Canvas ...</div> : <div className="content">

          {load_canvas_success && <>
            <h4 className="py-0 my-0"> {`Canvas: ${canvas_schema.canvas_name} `}</h4>
            <span className="text-muted px-3" >
              {`Changes made by ${canvas_schema.canvas_version_provider.email} ${timeago.format(canvas_schema.canvas_version_stamp)}`}
            </span>
          </>}
          {load_canvas_success ?
            <Row>
              <ButtonGroup className="px-3 ">
                {(this.props.location.pathname === "/quickstart") && <Button onClick={() => history.push("/welcome")}>Home</Button>
                }
                <Button onClick={this.handle_undo} disabled={this.props.canvas.canvas_undo_list.length === 0} size="sm">&#9668;</Button>
                <Button onClick={this.handle_redo} disabled={this.props.canvas.canvas_redo_list.length === 0} size="sm">&#9658;</Button>&nbsp;
                <Button onClick={this.toggle_detailed_note} size="sm">&#10004;</Button>

              </ButtonGroup>
              <ButtonGroup className="px-3 ml-auto">
                <Button onClick={this.toggle_detailed_note}>Toggle Note Details</Button>
                <ButtonDropdown isOpen={share_dropdown_open} toggle={this.toggle_share_dropdown_open}>
                  <DropdownToggle caret>
                    Share Canvas
                  </DropdownToggle>
                  <DropdownMenu>
                    {(!is_share) && <DropdownItem onClick={() => this.share_this_canvas(true)} >{true && "Un-"}Share Canvas</DropdownItem>}
                    <DropdownItem onClick={this.copy_canvas_link}  >Copy Canvas Link</DropdownItem>
                    {(!is_share) && <DropdownItem divider />}
                    {(!is_share) && <DropdownItem>Share it via Email </DropdownItem>}
                  </DropdownMenu>
                </ButtonDropdown>
                {(!is_share) && <Button color="danger" onClick={() => this.delete_this_canvas(true)}>Delete</Button>}
              </ButtonGroup>
            </Row> :
            "Loading Canvas..."}
          <DragDropContext onDragEnd={this.onDragEnd}>
            {load_canvas_success ? <Row>
              {get_canvas_design.map((e, index) => {
                return this.smooth_column(canvas_schema.canvas_notes, e, index, detailed_note, is_share)
              })}
            </Row> : null}
          </DragDropContext>
        </div>}
        <Modal isOpen={this.state.open_delete_modal} fade={false} toggle={() => this.delete_this_canvas(true)}  >
          <ModalHeader toggle={this.toggle}>Modal title</ModalHeader>
          <ModalBody>
            Deleting this modal means deleting its entire record! Forever!
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={() => this.delete_this_canvas(false)}>I agree</Button>{' '}
            <Button color="secondary" onClick={() => this.delete_this_canvas(true)}>Cancel</Button>
          </ModalFooter>
        </Modal>
        <Modal isOpen={this.state.open_share_modal} fade={false} toggle={() => this.share_this_canvas(true)}  >
          <ModalHeader toggle={this.toggle}>Modal title</ModalHeader>
          <ModalBody >
            <ListGroup>
              {_canvas_team.map((_t_mate, ind) => {
                return (<ListGroupItem
                  key={ind}
                  className="bg-primary justify-content-between">
                  {_t_mate.email}
                  <Badge pill>1</Badge>
                </ListGroupItem>)
              })}
            </ListGroup>
            <Input className="mt-2" placeholder="Add another team mate" />
          </ModalBody>
          <ModalFooter>
            <Button className="px-auto" color="primary" onClick={() => this.share_this_canvas(false)}>Expand your Team!</Button>{' '}
            <Button className="px-auto" color="secondary" onClick={() => this.share_this_canvas(true)}>Cancel</Button>
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

const connectedCanvasDefaultLayout = connect(mapStateToProps, multipleActionsMapDispatchToProps([canvasActions, testerActions, notesActions]))(CanvasDefaultLayout);
export { connectedCanvasDefaultLayout as CanvasDefaultLayout }; 
