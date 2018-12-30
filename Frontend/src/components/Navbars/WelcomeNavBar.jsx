import React from "react";
import { connect } from 'react-redux';
// reactstrap components
import {
  Collapse,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
  NavbarBrand,
  Navbar,
  Modal,
  NavLink,
  NavItem,
  Nav,
  Container,
} from "reactstrap";
import { modalActions } from "../../redux/_actions/modal.actions";
import { TesterSignInView } from "../../views/welcome";
import { multipleActionsMapDispatchToProps } from "../../utils";
import { testerActions } from "../../redux/_actions";

class WelcomeNavBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      collapseOpen: true,
      modalSearch: false,
      color: "navbar-transparent"
    };
  }
  componentDidMount() {
    this.props.check_test_season()
  }
  render() {
    return (
      <>
        <Navbar
          className="navbar-relative navbar-transparent"
          expand="xs"
        >
          <Container fluid>
            <div className="navbar-wrapper">
              <NavbarBrand href="#pablo" onClick={e => e.preventDefault()}>
                {this.props.brandText}
              </NavbarBrand>
            </div>

            <Collapse navbar isOpen={this.state.collapseOpen}>

              <Nav className="ml-auto" navbar>
                <UncontrolledDropdown nav >
                  <DropdownToggle nav caret>
                    Quick Start
                  </DropdownToggle>
                  <DropdownMenu right className="bg-white">
                    <DropdownItem
                      data-target="#searchModal"
                      data-toggle="modal"
                      id="search-button"
                      onClick={this.props.toggle_tester_register_modal}
                      disabled={!this.props.tester.testing_season_ok}
                    >
                      {this.props.tester.testing_season_ok ? "Quick App Test " : "Not a Testing Season"}
                    </DropdownItem>
                    <DropdownItem >
                      Quick Canvas
                    </DropdownItem>
                  </DropdownMenu>
                </UncontrolledDropdown>
                <UncontrolledDropdown nav inNavbar>
                  <DropdownToggle nav caret>
                    Join Canvas Bakers
                  </DropdownToggle>
                  <DropdownMenu right className="bg-white">
                    <DropdownItem onClick={() => this.props.toggleLoginModal()}>
                      Sign-in
                    </DropdownItem>
                    <DropdownItem onClick={() => this.props.toggleRegisterModal()}>
                      Sign-up
                    </DropdownItem>
                  </DropdownMenu>
                </UncontrolledDropdown>

                <NavItem>
                  <NavLink href="/documentation/">Documentation</NavLink>
                </NavItem>
              </Nav>
            </Collapse>
          </Container>
        </Navbar>
        <Modal
          modalClassName="modal "
          isOpen={this.props.tester.tester_register_request}
          toggle={this.props.toggle_tester_register_modal}
        >
          {<TesterSignInView />}
        </Modal>
      </>
    );
  }
}
function mapStateToProps(state) {
  const { modal, tester } = state;
  return {
    modal,
    tester
  };
}

const connectedWelcomeNavBar = connect(mapStateToProps, multipleActionsMapDispatchToProps([modalActions, testerActions]))(WelcomeNavBar);
export { connectedWelcomeNavBar as WelcomeNavBar };
