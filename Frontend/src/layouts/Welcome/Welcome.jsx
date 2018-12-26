import React from "react";
import FixedPlugin from "components/FixedPlugin/FixedPlugin.jsx";
import WelcomeNavBar from "components/Navbars/WelcomeNavBar.jsx";
import {
  UncontrolledCarousel,
} from 'reactstrap';

import brandfull_1 from "assets/img/brand-semi-1.png";
import brandfull_2 from "assets/img/brand-semi-2.png";
import brandfull_3 from "assets/img/brand-semi-3.png";

const items = [
  {
    src: brandfull_1,
    altText: 'Se',
    header:' ',
    caption: <i>Canvas Bakers</i>
  },
  {
    src: brandfull_2,
    altText: 'Slide 2',
    caption: 'Slide 2'
  },
  {
    src: brandfull_3,
    altText: 'Slide 3',
    caption: 'Slide 3'
  }
];


class Admin extends React.Component {
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

  handleBgClick = color => {
    this.setState({ backgroundColor: color });
  };
  render() {
    return (
      <>
        <WelcomeNavBar
          {...this.props}
          brandText="Canvas Bakers"
          toggleSidebar={this.toggleSidebar}
          sidebarOpened={this.state.sidebarOpened}
        />
        <UncontrolledCarousel items={items} />
        <FixedPlugin
          bgColor={this.state.backgroundColor}
          handleBgClick={this.handleBgClick}
        />
      </>
    );
  }
}

export default Admin;
