/*eslint-disable*/
import React from "react";
import { NavLink, Link } from "react-router-dom";
// nodejs library to set properties for components
import { PropTypes } from "prop-types";
import { connect } from 'react-redux'

// javascript plugin used to create scrollbars on windows
import PerfectScrollbar from "perfect-scrollbar";

// reactstrap components
import { Nav, UncontrolledCollapse, NavItem, Button } from "reactstrap";
import { _dashboard_route } from "../../constants";

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
    let { bgColor, canvas } = this.props;
    let { canvas_schema, load_canvas_success, canvas_history } = canvas;
    return (
      <div className="sidebar" data={bgColor}>
        <div className="sidebar-wrapper" ref="sidebar">

          <div className="logo">
            <Link
              to="#"
              className="simple-text logo-mini"
              onClick={this.props.toggleSidebar}
            >
              <div className="logo-img">
                <img src={require('assets/img/brand-logo.png')} alt="brand-logo" />
              </div>
            </Link>
            <Button
              color="link"
              className="simple-text logo-normal"
              onClick={this.props.toggleSidebar}
            >
              Menu
            </Button>
          </div>

          <Nav>
            <NavLink
              to={_dashboard_route()}
              className="nav-link"
              tag="a"
            >
              <i className={"tim-icons icon-settings"} />
              <p>Dashboard</p>
            </NavLink>
            {load_canvas_success && <>
              <NavLink
                to="#"
                className="nav-link"
                id="nav_link_toggler"
              >
                <i className={"tim-icons icon-components"} />
                <p>Team Members</p>
              </NavLink>
              <UncontrolledCollapse toggler="#nav_link_toggler">
                {canvas_schema.canvas_team ? canvas_schema.canvas_team.map(e => <NavItem
                  tag="a"
                  className="nav-link "
                  key={e}
                >
                  <i className={"tim-icons icon-single-02"} />
                  <small>{e["email"]}</small>
                </NavItem>) : null}
              </UncontrolledCollapse>
              <NavLink
                to="#"
                className="nav-link"
                id="canvas_history_toggler"
              >
                <i className={"tim-icons icon-bullet-list-67"} />
                <p>Canvas History</p>
              </NavLink>
              <UncontrolledCollapse toggler="#canvas_history_toggler">
                {canvas_history ? canvas.canvas_history.map((e, key) => <NavItem
                  tag="a"
                  className="nav-link "
                  key={key}
                >
                  <i className={"tim-icons icon-single-02"} />
                  <small>{`${(e["canvas_version_stamp"])}`}</small>
                </NavItem>
                ) : null}
              </UncontrolledCollapse>

            </>}
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
  const { tester, canvas } = state;
  return {
    tester,
    canvas
  };
}

const connectedTesterSideBar = connect(mapStateToProps)(TesterSideBar);
export { connectedTesterSideBar as TesterSideBar };


