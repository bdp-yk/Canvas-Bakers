import React from "react";
// nodejs library that concatenates classes
import classNames from "classnames";
import _ from "lodash";
// reactstrap components
import {
  Collapse,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
  NavbarBrand,
  Navbar,
  NavLink,
  Nav,
  Container

} from "reactstrap";
import { connect } from 'react-redux'
import { testerActions, notesVerdictActions } from "../../redux/_actions";
import { who_am_i, multipleActionsMapDispatchToProps } from "../../utils";
import { initPusher } from "../../featured/pusher.conf";
// var interval;
var pusher = initPusher(), channel;

class TesterNavBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      collapseOpen: false,
      modalSearch: false,
      color: "navbar-transparent"
    };
  }
  componentDidMount() {
    window.addEventListener("resize", this.updateColor);
  }
  componentDidUpdate() {
    if (!_.isEmpty(this.props.canvas.canvas_schema)) {
      channel = pusher.subscribe(this.props.canvas.canvas_schema.canvas_id);
      channel.bind('verdict_notification', function (data) {
        alert(JSON.stringify(data));
      });
    }
  }
  componentWillUnmount() {
    // clearInterval(interval);
    window.removeEventListener("resize", this.updateColor);
  }
  // function that adds color white/transparent to the navbar on resize (this is for the collapse)
  updateColor = () => {
    if (window.innerWidth < 993 && this.state.collapseOpen) {
      this.setState({
        color: "bg-white"
      });
    } else {
      this.setState({
        color: "navbar-transparent"
      });
    }
  };

  getTesterInfo = () => {
    let name = "";
    if (Boolean(who_am_i()))
      name = who_am_i()["email"];
    return name.split(/[^a-z]+/ig)[0]
  }
  render() {
    return (
      <>
        <Navbar
          className={classNames("navbar-absolute", this.state.color)}
          expand="md"
        >
          <Container fluid>
            <div className="navbar-wrapper">
              <div
                className={classNames("navbar-toggle d-inline", {
                  toggled: this.props.sidebarOpened
                })}
              >
                <button
                  className="navbar-toggler"
                  type="button"
                  onClick={this.props.toggleSidebar}
                >
                  <span className="navbar-toggler-bar bar1" />
                  <span className="navbar-toggler-bar bar2" />
                  <span className="navbar-toggler-bar bar3" />
                </button>
              </div>
              <NavbarBrand href="#pablo" onClick={e => e.preventDefault()}>
                Hello, {this.getTesterInfo()}
              </NavbarBrand>
            </div>
            <Collapse navbar isOpen={this.state.collapseOpen}>
              <Nav className="ml-auto" navbar>
                <UncontrolledDropdown nav>
                  <DropdownToggle
                    caret
                    color="default"
                    data-toggle="dropdown"
                    nav
                  >
                    <div className="notification d-none d-lg-block d-xl-block" />
                    <i className="tim-icons icon-sound-wave" />
                    <p className="d-lg-none">Notifications</p>
                  </DropdownToggle>
                  <DropdownMenu className="dropdown-navbar" right tag="ul">
                    <NavLink tag="li">
                      <DropdownItem className="nav-item">
                        Another one
                      </DropdownItem>
                    </NavLink>
                  </DropdownMenu>
                </UncontrolledDropdown>
                <UncontrolledDropdown nav>
                  <DropdownToggle
                    caret
                    color="default"
                    data-toggle="dropdown"
                    nav
                    onClick={e => e.preventDefault()}
                  >
                    <div className="photo">
                      <img alt="..." src={require("assets/img/anime3.png")} />
                    </div>
                    <b className="caret d-none d-lg-block d-xl-block" />
                  </DropdownToggle>
                  <DropdownMenu className="dropdown-navbar" right tag="ul">

                    {/* <DropdownItem divider tag="li" /> */}
                    <NavLink tag="li">
                      <DropdownItem onClick={this.props.logout_tester} className="nav-item">Log out</DropdownItem>
                    </NavLink>
                  </DropdownMenu>
                </UncontrolledDropdown>
              </Nav>
            </Collapse>
          </Container>
        </Navbar>

      </>
    );
  }
}

function mapStateToProps(state) {
  const { tester, canvas } = state;
  return {
    tester,
    canvas
  };
}

const connectedTesterNavBar = connect(mapStateToProps, multipleActionsMapDispatchToProps([testerActions, notesVerdictActions]))(TesterNavBar);
export { connectedTesterNavBar as TesterNavBar };
