import React, { Component } from 'react'
import { connect } from 'react-redux'
import { who_am_i } from '../utils';
import { alertActions } from '../redux/_actions';
import { Button, Modal } from "reactstrap";
import { TesterSignInView } from '../views/welcome';

class ReadOnlyLayout extends Component {
  constructor(props) {
    super(props);
    this.state = {
      _tester_modal: true
    };

    this.toggle_tester_modal = this.toggle_tester_modal.bind(this);
  }

  toggle_tester_modal() {
    this.setState({
      _tester_modal: !this.state._tester_modal
    });
  }


  componentDidMount() {
    if (!(who_am_i())) {
      const { dispatch } = this.props;
      dispatch(alertActions.error("Sign in required!"))
    }
  }
  render() {
    const readonly = true;
    const joinable = Boolean(who_am_i());
    const { component: Component, ...rest } = this.props;
    const { _tester_modal } = this.state

    return (<>
      {
        joinable ?
          <div><p> Do you want to <Button>join</Button> this Workspace</p></div> :

          <Modal
            modalClassName="modal "
            isOpen={_tester_modal}
            toggle={this.toggle_tester_modal}
          >
            {<TesterSignInView />}
          </Modal>
      }
      <Component
        readonly={readonly}
        joinable={joinable}
        {...rest} />


    </>
    )
  }
}

function mapStateToProps(state) {
  const { alert } = state;
  return {
    alert
  };
}

const connectedReadOnlyLayout = connect(mapStateToProps)(ReadOnlyLayout);
export { connectedReadOnlyLayout as ReadOnlyLayout }; 