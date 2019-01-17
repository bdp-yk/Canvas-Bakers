import React from "react";
import FixedPlugin from "components/FixedPlugin/FixedPlugin.jsx";
import {
  // UncontrolledCarousel,
  Modal,
  Jumbotron,
  Button,
  Col,
  Row,
  Card,
  CardTitle,
  CardText
} from 'reactstrap';
import { connect } from 'react-redux';

// import brandfull_1 from "assets/img/brand-semi-1.png";
// import brandfull_2 from "assets/img/brand-semi-2.png";
// import brandfull_3 from "assets/img/brand-semi-3.png";
import { LoginPage } from "../../views/welcome/LoginPage";
import { RegisterPage } from "../../views/welcome/RegisterPage";
import { modalConstants } from "../../redux/_constants";
import { WelcomeNavBar } from "../../components/Navbars";
import { modalActions } from "../../redux/_actions/modal.actions";
import { who_am_i, multipleActionsMapDispatchToProps } from "../../utils";
import { history } from "../../redux/_helpers";
import { _dashboard_route } from "../../constants";
import { testerActions } from "../../redux/_actions";

// const items = [
//   {
//     src: brandfull_1,
//     altText: 'Se',
//     header: ' ',
//     className:"ea",
//     caption: " "
//   },
//   {
//     src: brandfull_2,
//     altText: 'brandfull_2',
//     header: ' ',
//     className:"ea",
//     caption: ' '
//   },
//   {
//     src: brandfull_3,
//     altText: 'brandfull_3',
//     header: ' ',
//     className:"ea",
//     caption: ' '
//   }
// ];


class Welcome extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      backgroundColor: "blue",
      sidebarOpened: false,
    };
  }

  toggleSidebar = () => {
    document.documentElement.classList.toggle("nav-open");
    this.setState({ sidebarOpened: !this.state.sidebarOpened });
  };
  componentDidMount = () => {
    if (who_am_i())
      history.push(_dashboard_route())
  }
  renderModal = () => {
    const { modal } = this.props
    switch (modal.target_modal) {
      case modalConstants.LOGIN_MODAL_NAME:
        return <LoginPage />;
      case modalConstants.REGISTER_MODAL_NAME:
        return <RegisterPage />;
      default:
        return null;
    }
  }
  handleBgClick = color => {
    this.setState({ backgroundColor: color });
  };
  render() {
    const { modal } = this.props;
    // if(localStorage.getItem('tester')) history.push('/tester');

    return (
      <>
        <WelcomeNavBar
          {...this.props}
          brandText="Smart Canvas"
          toggleSidebar={this.toggleSidebar}
          sidebarOpened={this.state.sidebarOpened}
        />
        <div className="m-5 p-5">
          <Jumbotron>
            <h1 className="display-3">Welcome to Smart Canvas!</h1>
            <p className="lead">
              Smart Canvas is a modern Canvas Making App, Create your own canvas and manage them .
            </p>

            <Row>
              <p className="mx-auto lead">
                <Button className="mr-auto"
                  onClick={this.props.toggle_tester_register_modal}
                  color="primary">Maker your own Canvas</Button>
              </p>
            </Row>
            <hr className="my-2" />
            <Row>
              <Col xs="4">
                <Card body>
                  <CardTitle>Your new Working Space</CardTitle>
                  <CardText>Featuring smooth Drag and Drop .</CardText>
                  {/* <Button>Go somewhere</Button> */}
                </Card>
              </Col>
              <Col xs="4">
                <Card body>
                  <CardTitle>Work as a Team</CardTitle>
                  <CardText>With sharing and version control utilities.</CardText>
                  {/* <Button>Go somewhere</Button> */}
                </Card>
              </Col>
              <Col xs="4">
                <Card body>
                  <CardTitle>AI evaluation</CardTitle>
                  <CardText>Introducing AI based helpers.</CardText>
                  {/* <Button>Go somewhere</Button> */}
                </Card>
              </Col>
            </Row>
          </Jumbotron>
        </div>

        {/* LOGIN AND SIGNUP MODALS */}
        <Modal isOpen={this.props.modal.open} toggle={() => this.props.toggle()}>
          <Card className="mb-0">

            {modal && this.renderModal()}
          </Card>

        </Modal>
        <FixedPlugin
          bgColor={this.state.backgroundColor}
          handleBgClick={this.handleBgClick}
        />
      </>
    );
  }
}
function mapStateToProps(state) {
  const { modal } = state;
  return {
    modal
  };
}

const connectedWelcome = connect(mapStateToProps, multipleActionsMapDispatchToProps([modalActions, testerActions]))(Welcome);
export { connectedWelcome as WelcomeLayout };
