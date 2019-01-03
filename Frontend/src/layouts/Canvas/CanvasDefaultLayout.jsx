import React from "react";
// react plugin for creating CanvasDefaultLayout over the dashboard
import { connect } from 'react-redux'
import { Container, Draggable } from "react-smooth-dnd";

// reactstrap components
import {
  Card, CardHeader, CardBody, CardTitle, Row, Col,
  Button, ButtonGroup, ButtonDropdown, DropdownToggle,
  DropdownMenu, DropdownItem, Modal, ModalHeader, ModalBody, ModalFooter
} from "reactstrap";
import { lmc_design, bmc_design } from "../../featured";
import { history } from "../../redux/_helpers";
import NotePartialView from "../../components/Canvas/NotePartialView";
import { CANVAS_ID_LENGHT, _canvas_preview_route, _canvas_preview_path, APP_URL } from "../../constants";
import { multipleActionsMapDispatchToProps } from "../../utils";
import { canvasActions, testerActions } from "../../redux/_actions";

class CanvasDefaultLayout extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      detailed_note: true,
      is_share: this.props.match.path === _canvas_preview_route,
      open_delete_modal: false

    }
    this.toggle_detailed_note = this.toggle_detailed_note.bind(this)
    this.toggle_share_dropdown_open = this.toggle_share_dropdown_open.bind(this)
    this.copy_canvas_link = this.copy_canvas_link.bind(this)
  }
  smooth_column = (canvas_notes, column, index, collapse, is_share) => {
    return <Col key={index} xs={column.column_width}>
      <Row>
        {column.composition.map(
          (exact_column, key_c) => {
            return <Col key={key_c} xs="12" >
              <Card >
                <CardHeader>
                  <CardTitle tag="h4">
                    {exact_column.name}
                    <Button onClick={() => this.addNote(exact_column.category)} close aria-label="Cancel">
                      <span aria-hidden>+</span>
                    </Button>
                  </CardTitle>
                </CardHeader>
                <CardBody style={{ minHeight: "50px" }}>
                  <Container groupName={exact_column.category} getChildPayload={i => i} onDrop={e => console.log(e)} type="container">
                    <Row>
                      <Col xs={column.note_width}>

                        {canvas_notes[exact_column.category].map((note, ind) => {
                          return <Draggable key={ind} >
                            <NotePartialView className="draggable-item" detailed_note={collapse} is_share={is_share} key={ind} note={note} />
                          </Draggable>
                        })}

                      </Col>
                    </Row>
                  </Container>
                </CardBody>
              </Card>
            </Col>
          }
        )}
      </Row>
    </Col>
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

  render() {
    const { detailed_note, share_dropdown_open, is_share } = this.state
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
              {`#: ${canvas_schema.canvas_version_stamp}`}
            </span>
          </>}
          {load_canvas_success ?
            <Row>
              <ButtonGroup className="px-3 ml-auto">
                {(this.props.location.pathname === "/quickstart") && <Button onClick={() => history.push("/welcome")}>Home</Button>
                }

              </ButtonGroup>
              <ButtonGroup className="px-3 ml-auto">
                <Button onClick={this.toggle_detailed_note}>Toggle Note Details</Button>
                <ButtonDropdown isOpen={share_dropdown_open} toggle={this.toggle_share_dropdown_open}>
                  <DropdownToggle caret>
                    Share Canvas
                  </DropdownToggle>
                  <DropdownMenu>
                    {(!is_share) && <DropdownItem >{true && "Un-"}Share Canvas</DropdownItem>}
                    <DropdownItem onClick={this.copy_canvas_link}  >Copy Canvas Link</DropdownItem>
                    {(!is_share) && <DropdownItem divider />}
                    {(!is_share) && <DropdownItem>Share it via Email </DropdownItem>}
                  </DropdownMenu>
                </ButtonDropdown>
                {(!is_share) && <Button color="danger" onClick={() => this.delete_this_canvas(true)}>Delete</Button>}
              </ButtonGroup>
            </Row> :
            "Loading Canvas..."}
          {load_canvas_success ? <Row>
            {get_canvas_design.map((e, index) => {
              return this.smooth_column(canvas_schema.canvas_notes, e, index, detailed_note, is_share)
            })}
          </Row> : null}
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

const connectedCanvasDefaultLayout = connect(mapStateToProps, multipleActionsMapDispatchToProps([canvasActions, testerActions]))(CanvasDefaultLayout);
export { connectedCanvasDefaultLayout as CanvasDefaultLayout }; 
