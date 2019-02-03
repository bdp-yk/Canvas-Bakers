import React from "react";
import { Route} from "react-router-dom";
import { connect } from 'react-redux'

// javascript plugin used to create scrollbars on windows
// import PerfectScrollbar from "perfect-scrollbar";

// core components
// import Footer from "components/Footer/Footer.jsx";
// import Sidebar from "components/Sidebar";
import FixedPlugin from "components/FixedPlugin/FixedPlugin.jsx";

import { TesterNavBar } from "../../components/Navbars";
import { TesterSideBar } from "../../components/Sidebar";
import { mapDispatchToProps } from "../../utils";
import { testerActions } from "../../redux/_actions";
import { Dashboard } from "../../views/canvas";
import { _workspace_route, _dashboard_route, _settings_route } from "../../constants";
import { CanvasDefaultLayout } from "../Canvas/CanvasDefaultLayout";
import { UserProfile } from "../../views/canvas";

// import logo from "assets/img/brand-logo.png";

// var ps;

class Tester extends React.Component {
  constructor(props) {
    super(props);
    props.assert_tester(JSON.parse(localStorage.getItem("tester")));
    
    this.state = {
      backgroundColor: "blue",
      sidebarOpened:
        document.documentElement.className.indexOf("nav-open") !== -1
    };
  }
  // componentDidMount() {
  //   if (navigator.platform.indexOf("Win") > -1) {
  //     document.documentElement.className += " perfect-scrollbar-on";
  //     document.documentElement.classList.remove("perfect-scrollbar-off");
  //     ps = new PerfectScrollbar(this.refs.mainPanel, { suppressScrollX: true });
  //     let tables = document.querySelectorAll(".table-responsive");
  //     for (let i = 0; i < tables.length; i++) {
  //       ps = new PerfectScrollbar(tables[i]);
  //     }
  //   }
  // }
  // componentWillUnmount() {
  //   if (navigator.platform.indexOf("Win") > -1) {
  //     ps.destroy();
  //     document.documentElement.className += " perfect-scrollbar-off";
  //     document.documentElement.classList.remove("perfect-scrollbar-on");
  //   }
  // }
  // componentDidUpdate(e) {
  //   if (e.history.action === "PUSH") {
  //     if (navigator.platform.indexOf("Win") > -1) {
  //       let tables = document.querySelectorAll(".table-responsive");
  //       for (let i = 0; i < tables.length; i++) {
  //         ps = new PerfectScrollbar(tables[i]);
  //       }
  //     }
  //     document.documentElement.scrollTop = 0;
  //     document.scrollingElement.scrollTop = 0;
  //     this.refs.mainPanel.scrollTop = 0;
  //   }
  // }
  // this function opens and closes the sidebar on small devices
  toggleSidebar = () => {
    document.documentElement.classList.toggle("nav-open");
    this.setState({ sidebarOpened: !this.state.sidebarOpened });
  };
  handleBgClick = color => {
    this.setState({ backgroundColor: color });
  };
  render() {
    return (
      <>
        {/* <div className="wrapper">
          <div
            className="main-panel"
            ref="mainPanel"
            data={this.state.backgroundColor}
          > */}
            <TesterNavBar
              {...this.props}
              brandText={this.props.tester.email}
              toggleSidebar={this.toggleSidebar}
              sidebarOpened={this.state.sidebarOpened}
            />

            <TesterSideBar bgColor={this.state.backgroundColor} />

            <Route path={_dashboard_route()} component={Dashboard} />
            <Route path={_workspace_route()} component={CanvasDefaultLayout} />
            <Route path={_settings_route()} component={UserProfile} />
            <Route path="/" exact component={Dashboard} />
            {/* <Redirect from="/" exact to={_dashboard_route()} /> */}
          {/* </div>
        </div> */}
        <FixedPlugin
          bgColor={this.state.backgroundColor}
          handleBgClick={this.handleBgClick}
        />
      </>
    );
  }
}
function mapStateToProps(state) {
  const { tester } = state;
  return {
    tester
  };
}

const connectedTester = connect(mapStateToProps, mapDispatchToProps(testerActions))(Tester);
export { connectedTester as TesterLayout }; 
