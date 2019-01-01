import React from "react";
// react plugin for creating CanvasDefaultLayout over the dashboard
import { connect } from 'react-redux'

// reactstrap components
import {
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  Row,
  Col,
  Button,
  ButtonGroup,
  ButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem
} from "reactstrap";
import { lmc_design } from "../../featured";
import { history } from "../../redux/_helpers";
import NotePartialView from "../../components/Canvas/NotePartialView";
import { CANVAS_ID_LENGHT } from "../../constants";
import { multipleActionsMapDispatchToProps } from "../../utils";
import { canvasActions, testerActions } from "../../redux/_actions";
const smooth_column = (column, index, collapse) => {
  return <Col key={index} xs={column.column_width}>
    <Row>
      {column.composition.map(
        (exact_column, key_c) => {
          return <Col key={key_c} xs="12" >
            <Card  >
              <CardHeader>
                <CardTitle tag="h4"> {exact_column.name}</CardTitle>
              </CardHeader>
              <CardBody style={{ minHeight: "50px" }}>
                <Row>
                  <Col xs={column.note_width}>
                    {[{ "note_headline": `some ${exact_column.name} note`, "note_description": `some ${exact_column.name} description` }].map((note, ind) => {

                      return <NotePartialView detailed_note={collapse} key={ind} note={note} />
                    })}
                  </Col>
                </Row>
              </CardBody>

            </Card>
          </Col>
        }
      )}
    </Row>
  </Col>
}
class CanvasDefaultLayout extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      detailed_note: true
    }
    this.toggle_detailed_note = this.toggle_detailed_note.bind(this)
    this.toggle_share_dropdown_open = this.toggle_share_dropdown_open.bind(this)
  }
  componentDidMount() {
    const { canvas_id } = this.props.match.params
    const { canvas } = this.props

    if (canvas_id.length === CANVAS_ID_LENGHT) {
      if (!(canvas && canvas.load_canvas_success)) {
        this.props.load_canvas_schema(canvas_id);
      }

    }
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
    const { detailed_note, share_dropdown_open } = this.state
    // const { canvas } = this.props;
    const { canvas_schema, load_canvas_success, load_canvas_request } = this.props.canvas;

    return (
      <>
        {load_canvas_request ? <div>Requesting the Canvas ...</div> : <div className="content">
          {load_canvas_success ?
            <Row>
              <span className="px-3" >
                {`Canvas: ${canvas_schema.canvas_name} -version: ${canvas_schema.canvas_version_provider}/${canvas_schema.canvas_version_provider}`}
              </span>
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
                    <DropdownItem >{true && "Un-"}Share Canvas</DropdownItem>
                    <DropdownItem >Copy Canvas Link</DropdownItem>
                    <DropdownItem divider />
                    <DropdownItem>Share it via Email </DropdownItem>
                  </DropdownMenu>
                </ButtonDropdown>
                <Button color="danger">Delete</Button>
              </ButtonGroup>
            </Row> :
            "eee"}
          <Row>
            {lmc_design.map((e, index) => {
              return smooth_column(e, index, detailed_note)
            })}
            <Col xs="12">
              <Card>
                <CardHeader>
                  <CardTitle tag="h4"> Brain Storm</CardTitle>
                </CardHeader>
                <CardBody>
                  <Row>
                  </Row>
                </CardBody>

              </Card>
            </Col>
          </Row>
        </div>}
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
