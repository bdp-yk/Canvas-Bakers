/*eslint-disable*/
import React from "react";
// used for making the prop types of this component

// reactstrap components
import { Container, Nav, NavItem, NavLink } from "reactstrap";

class Footer extends React.Component {
  render() {
    return (
      <footer className="footer">
        <Container fluid>
          <Nav>
            <NavItem>
              <NavLink href="javascript:void(0)"><i className="fab fa-facebook-f"></i></NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="javascript:void(0)"><i className="fab fa-twitter"></i></NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="javascript:void(0)"><i className="fab fa-github"></i></NavLink>
            </NavItem>
          </Nav>
          <div className="copyright">
            © {new Date().getFullYear()} made with{" "}
            <i className="tim-icons icon-heart-2" /> by{" "}
           Canvas Maker Team
          </div>
        </Container>
      </footer>
    );
  }
}

export default Footer;
