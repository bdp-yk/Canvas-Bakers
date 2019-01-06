import React from "react";
import { connect } from 'react-redux'

// reactstrap components
import {
  Card, Button, CardImg, CardTitle, CardText, Row, CardFooter, Input,
  CardBody, Fade
} from "reactstrap";
// import { Link } from "react-router-dom";
import { mapDispatchToProps, who_am_i } from "../../utils";
import { canvasActions } from "../../redux/_actions";
import { bmc_schema, lmc_schema } from "../../featured";
// import { API_URL } from "../../redux/_services";
// const axios = require("axios");
const _bmc = bmc_schema, _lmc = lmc_schema;

const loadingthumbnail = require("assets/img/loading.gif");
class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      canvas_name_error: false,
      canvas_description_error: false,
      canvas_description: "",
      canvas_name: "",
      canvas_type: "bmc",
      canvas_notes: {},
      canvas_team: [who_am_i()],
    };
    // Block Recursive Change
    this.handleInputChange = this.handleInputChange.bind(this);

  }
  async selectCanvasSchema(schema) {
    let t = false;
    ["canvas_name", "canvas_description"].forEach(e => {
      if (this.state[e] === "") {
        this.setState({
          [e + "_error"]: true
        })
        t = true;
      }
    });
    if (t) return;

    if (schema === "lmc")
      await this.setState({ canvas_notes: _lmc, canvas_type: schema }, function () {
      });
    else
      await this.setState({ canvas_notes: _bmc, canvas_type: schema });

    const {
      canvas_description,
      canvas_name,
      canvas_type,
      canvas_notes,
      canvas_team
    } = this.state;
    this.props.init_canvas_action({
      canvas_description,
      canvas_name,
      canvas_type,
      canvas_notes,
      canvas_team
    });


  }
  componentDidMount = () => {
    this.props.list_all_canvases();
    this.props.clear_canvas_schema_action();


  }
  handleInputChange = (event) => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    })
  }
  render() {

    const { canvas } = this.props
    return (
      <>
        {/* <div className={expand_side_bar ? "content" : "content px-3"}> */}
        <div className="content">
          <h3>
            Dashboard <br /><small className="text-muted">Manage your existing WorkSpaces or </small><a href="#new_one" className="link text-muted"> create a new one</a>
          </h3>
          <Row className="justify-content-center">
            {canvas.load_user_canvas_request && <div style={{ width: "5rem" }} className="mx-auto text-center" ><CardImg top alt="loader" src={loadingthumbnail} /> Loading Dashboard </div>}
            {canvas.user_canvas ? canvas.user_canvas.map((e) =>
              <Fade className=" mx-auto" style={{ width: "18rem" }} key={e.canvas_id}>
                <Card >
                  <CardBody>
                    <CardTitle>{e.canvas_name}&nbsp;</CardTitle>
                    <CardText>{e.canvas_description}&nbsp;</CardText>
                  </CardBody>
                  <CardFooter> <Button block onClick={() => this.props.load_canvas_schema(e.canvas_id)}>  Load it in WorkSpace</Button></CardFooter>
                </Card>
              </Fade>
            ) : null}
          </Row>
          <hr />
          <Row id="new_one">
            <Card className="mx-auto" style={{ width: "18rem" }}  >
              <CardBody>
                <CardBody>
                  <CardTitle><Input invalid={this.state.canvas_name_error} name="canvas_name" placeholder="New Canvas Title" onChange={this.handleInputChange} /> </CardTitle>
                  <CardText><Input invalid={this.state.canvas_description_error} name="canvas_description" placeholder="New Canvas Description" onChange={this.handleInputChange} /></CardText>
                </CardBody>
                <CardFooter>
                  <Button block className="ml-0 text-center" disabled={canvas.init_canvas_request} color="light" onClick={() => this.selectCanvasSchema("bmc")} >Make BMC</Button>
                  <Button block className="ml-0 text-center" disabled={canvas.init_canvas_request} color="light" onClick={() => this.selectCanvasSchema("lmc")} >Make LMC</Button>
                </CardFooter>
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
