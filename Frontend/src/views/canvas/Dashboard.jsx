import React from "react";
import { connect } from 'react-redux'

// reactstrap components
import {
  Card, Button, CardImg, CardTitle, CardText, Row, CardFooter, Input,
  CardBody
} from "reactstrap";
// import { Link } from "react-router-dom";
import { mapDispatchToProps, get_init_schema, who_am_i } from "../../utils";
import { canvasActions } from "../../redux/_actions";
// import { API_URL } from "../../redux/_services";
// const axios = require("axios");
const loadingthumbnail = require("assets/img/loading.gif");
class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      canvas_description: "",
      canvas_name: "",
      canvas_notes: [],
      canvas_team: [who_am_i()],
    };
    // Block Recursive Change
    this.handleInputChange = this.handleInputChange.bind(this);

  }
  selectCanvasSchema(schema) {
    this.setState({ canvas_notes: get_init_schema(schema) });
    // console.log(get_init_schema(schema));

    const { canvas_description,
      canvas_name,
      canvas_notes,
      canvas_team } = this.state;
    this.props.init_canvas_action({
      canvas_description,
      canvas_name,
      canvas_notes,
      canvas_team
    })

  }
  componentDidMount = () => {
    this.props.list_all_canvases();
    this.props.clear_canvas_schema_action();

  }
  handleInputChange = (event) => {
    const { name, value } = event.target;
    console.log(name, value);

    this.setState({
      [name]: value
    })
  }
  render() {

    const { canvas } = this.props
    return (
      <>
        <div className="content">
          <h3>
            Dashboard <br /><small className="text-muted">Manage your existing WorkSpaces or create a new one</small>
          </h3>
          <Row className="justify-content-center">
            {canvas.load_user_canvas_request && <div style={{ width: "18rem" }} className="mx-auto text-center" ><CardImg top alt="loader" src={loadingthumbnail} /> Loading Dashboard </div>}
            {canvas.user_canvas ? canvas.user_canvas.map((e) =>
              <Card className="mx-auto" style={{ width: "18rem" }} key={e.canvas_id}>
                <CardBody>
                  <CardTitle>{e.canvas_name}</CardTitle>
                  <CardText>{e.canvas_description}</CardText>
                  {/* <Link to={`${this.props.match.url}/make`}> */}

                  {/* </Link> */}
                </CardBody>
                <CardFooter> <Button block onClick={() => this.props.load_canvas_schema(e.canvas_id)}>  Load it in WorkSpace</Button></CardFooter>
              </Card>
            ) : null}
          </Row>
          <hr />
          <Row>
            <Card className="mx-auto" style={{ width: "18rem" }}  >
              <CardBody>
                <CardBody>
                  <CardTitle><Input name="canvas_name" placeholder="New Canvas Title" onChange={this.handleInputChange} /> </CardTitle>
                  <CardText><Input name="canvas_description" placeholder="New Canvas Description" onChange={this.handleInputChange} /></CardText>
                </CardBody>
                <CardFooter>
                  <Button block className="ml-0 text-center" color="light" onClick={() => this.selectCanvasSchema("bmc")} active={this.state.schema === "bmc"}>Make BMC</Button>
                  <Button block className="ml-0 text-center" color="light" onClick={() => this.selectCanvasSchema("lmc")} active={this.state.schema === "bmc"}>Make LMC</Button>

                </CardFooter>

                {/* <Link to={`/quicktest/make`}><Button>  Create New Canvas</Button></Link> */}
              </CardBody>
            </Card>
          </Row>
        </div>
      </>
    );
  }
}
function mapStateToProps(state) {
  const { canvas, tester } = state;
  return {
    canvas,
    tester
  };
}

const connectedDashboard = connect(mapStateToProps, mapDispatchToProps(canvasActions))(Dashboard);
export { connectedDashboard as Dashboard };
