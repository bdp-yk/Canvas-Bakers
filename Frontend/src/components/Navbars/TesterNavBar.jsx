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
import { notesActions } from "../../redux/_actions/notes.canvas.actions";
// var interval;
var pusher = initPusher("dev"), channel;

class TesterNavBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      collapseOpen: false,
      modalSearch: false,
      color: "navbar-transparent",
      notification_elements: []
    };
  }
  componentDidMount() {
    window.addEventListener("resize", this.updateColor);
  }
  componentDidUpdate(prevProps) {
    if (!_.isEmpty(this.props.canvas.canvas_schema) && (this.props.canvas.canvas_schema !== prevProps.canvas.canvas_schema)) {
      console.log('subscribed!');
      channel = pusher.subscribe(this.props.canvas.canvas_schema.canvas_id);
      channel.bind('verdict_notification', (data) => {
        console.log('verdict_notification', (data));
        this.props.update_note_action(data);
        let { notification_elements } = this.state;
        notification_elements.unshift(data);
        notification_elements = _.uniqBy(notification_elements, e => e.note_id)
        this.setState({
          notification_elements
        })
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
  displayNote = (e) => {
    this.props.select_note_for_verdict_action(e);
    this.props.update_note_action(e);
    let { notification_elements } = this.state;
    _.remove(notification_elements, x => x.note_id === e.note_id)
    this.setState({
      notification_elements
    })
  }

  getTesterInfo = () => {
    let name = "";
    if (Boolean(who_am_i()))
      name = who_am_i()["email"];
    return name.split(/[^a-z]+/ig)[0]
  }
  render() {
    const { notification_elements } = this.state
    let empty_verdicts = _.isEmpty(notification_elements);
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
              <NavbarBrand href="#" onClick={e => e.preventDefault()}>
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
                    {empty_verdicts ? null : <div className="notification d-none d-lg-block d-xl-block" />}
                    <i className="tim-icons icon-sound-wave" />
                    <p className="d-lg-none">Notifications</p>
                  </DropdownToggle>
                  <DropdownMenu className="dropdown-navbar" right tag="ul">
                    {notification_elements.map((e, ind) => <NavLink
                      key={ind}
                      onClick={() => this.displayNote(e)}
                      tag="li">
                      <DropdownItem className="nav-item">
                        {`Your Request for ${e.note_headline.slice(0, 10)}.. Judgement is ready`}
                      </DropdownItem>
                    </NavLink>)}
                    {(_.isEmpty(notification_elements)) && <DropdownItem className="nav-item">
                      No requested Verdict
                      </DropdownItem>}
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
                      <img alt="..." src={require("assets/img/default-avatar.png")} />
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

const connectedTesterNavBar = connect(mapStateToProps, multipleActionsMapDispatchToProps([testerActions, notesActions, notesVerdictActions]))(TesterNavBar);
export { connectedTesterNavBar as TesterNavBar };
