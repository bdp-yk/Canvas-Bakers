import React from "react";
import FixedPlugin from "components/FixedPlugin/FixedPlugin.jsx";
import {
  UncontrolledCarousel,
  Modal,
  Card
} from 'reactstrap';
import { connect } from 'react-redux';

import brandfull_1 from "assets/img/brand-semi-1.png";
import brandfull_2 from "assets/img/brand-semi-2.png";
import brandfull_3 from "assets/img/brand-semi-3.png";
import { LoginPage } from "../../views/welcome/LoginPage";
import { RegisterPage } from "../../views/welcome/RegisterPage";
import { modalConstants } from "../../redux/_constants";
import { WelcomeNavBar } from "../../components/Navbars";
import { modalActions } from "../../redux/_actions/modal.actions";

const items = [
  {
    src: brandfull_1,
    altText: 'Se',
    header: ' ',
    caption: " "
  },
  {
    src: brandfull_2,
    altText: 'brandfull_2',
    header: ' ',
    caption: ' '
  },
  {
    src: brandfull_3,
    altText: 'brandfull_3',
    header: ' ',
    caption: ' '
  }
];


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
          brandText="Canvas Bakers"
          toggleSidebar={this.toggleSidebar}
          sidebarOpened={this.state.sidebarOpened}
        />
        <UncontrolledCarousel items={items} />

        {/* LOGIN AND SIGNUP MODALS */}
        <Modal isOpen={this.props.modal.open} toggle={() => this.props.dispatch(modalActions.toggle())}>
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

const connectedWelcome = connect(mapStateToProps)(Welcome);
export { connectedWelcome as WelcomeLayout };
