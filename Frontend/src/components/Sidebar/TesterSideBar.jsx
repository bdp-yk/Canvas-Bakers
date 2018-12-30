/*eslint-disable*/
import React from "react";
import { NavLink, Link } from "react-router-dom";
// nodejs library to set properties for components
import { PropTypes } from "prop-types";
import { connect } from 'react-redux'

// javascript plugin used to create scrollbars on windows
import PerfectScrollbar from "perfect-scrollbar";

// reactstrap components
import { Nav, UncontrolledCollapse, NavItem } from "reactstrap";

var ps;

class TesterSideBar extends React.Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    if (navigator.platform.indexOf("Win") > -1) {
      ps = new PerfectScrollbar(this.refs.sidebar, {
        suppressScrollX: true,
        suppressScrollY: false
      });
    }
  }
  componentWillUnmount() {
    if (navigator.platform.indexOf("Win") > -1) {
      ps.destroy();
    }
  }
  linkOnClick = () => {
    document.documentElement.classList.remove("nav-open");
  };
  render() {
    const { bgColor, routes, logo } = this.props;
    let logoImg = null;
    let logoText = null;
    if (logo !== undefined) {
      if (logo.outterLink !== undefined) {
        logoImg = (
          <a
            href={logo.outterLink}
            className="simple-text logo-mini"
            target="_blank"
            onClick={this.props.toggleSidebar}
          >
            <div className="logo-img">
              <img src={logo.imgSrc} alt="brand-logo" />
            </div>
          </a>
        );
        logoText = (
          <a
            href={logo.outterLink}
            className="simple-text logo-normal"
            onClick={this.props.toggleSidebar}
          >
            {logo.text}
          </a>
        );
      } else {
        logoImg = (
          <Link
            to={logo.innerLink}
            className="simple-text logo-mini"
            onClick={this.props.toggleSidebar}
          >
            <div className="logo-img">
              <img src={logo.imgSrc} alt="brand-logo" />
            </div>
          </Link>
        );
        logoText = (
          <Link
            to={logo.innerLink}
            className="simple-text logo-normal"
            onClick={this.props.toggleSidebar}
          >
            {logo.text}
          </Link>
        );
      }
    }
    return (
      <div className="sidebar" data={bgColor}>
        <div className="sidebar-wrapper" ref="sidebar">
          <Nav>
            <NavLink
              to={"/quicktest/make"}
              className="nav-link"
              tag="a"
            >
              <i className={"tim-icons icon-settings"} />
              <p>Workshop</p>
            </NavLink>
          </Nav>
          <Nav>
            <NavLink
              to="#"
              className="nav-link"
              onClick={this.props.toggleSidebar}
              id="nav_link_toggler"
            >
              <i className={"tim-icons icon-components"} />
              <p>Team Members</p>
            </NavLink>
            <UncontrolledCollapse toggler="#nav_link_toggler">
              <NavItem
                tag="a"
                className="nav-link "
                onClick={this.props.toggleSidebar}
              >
                <i className={"tim-icons icon-single-02"} />
                <p>Member_1</p>
              </NavItem>
            </UncontrolledCollapse>
          </Nav>
          <Nav>
            <NavLink
              to="#"
              className="nav-link"
              onClick={this.props.toggleSidebar}
              id="canvas_history_toggler"
            >
              <i className={"tim-icons icon-bullet-list-67"} />
              <p>Canvas History</p>
            </NavLink>
            <UncontrolledCollapse toggler="#canvas_history_toggler">
              <NavLink
                to="/vesion"
                tag="a"
                className="nav-link "
                onClick={this.props.toggleSidebar}
              >
                <i className={"tim-icons icon-single-02"} />
                <p>Changes by SOMEBOIZ</p>
              </NavLink>
            </UncontrolledCollapse>
          </Nav>


        </div>
      </div>
    );
  }
}

TesterSideBar.defaultProps = {
  bgColor: "primary",
  routes: [{}]
};

TesterSideBar.propTypes = {
  // insde the links of this component
  bgColor: PropTypes.oneOf(["primary", "blue", "green"]),
  routes: PropTypes.arrayOf(PropTypes.object),
  logo: PropTypes.shape({
    // innerLink is for links that will direct the user within the app
    // it will be rendered as <Link to="...">...</Link> tag
    innerLink: PropTypes.string,
    // outterLink is for links that will direct the user outside the app
    // it will be rendered as simple <a href="...">...</a> tag
    outterLink: PropTypes.string,
    // the text of the logo
    text: PropTypes.node,
    // the image src of the logo
    imgSrc: PropTypes.string
  })
};

function mapStateToProps(state) {
  const { tester } = state;
  return {
    tester
  };
}

const connectedTesterSideBar = connect(mapStateToProps)(TesterSideBar);
export { connectedTesterSideBar as TesterSideBar };


