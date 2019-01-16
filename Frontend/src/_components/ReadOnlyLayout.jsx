import React, { Component } from 'react'
import { connect } from 'react-redux'
import { who_am_i } from '../utils';
import { alertActions, canvasActions } from '../redux/_actions';
import { Button, Modal } from "reactstrap";
import { TesterSignInView } from '../views/welcome';
import _ from "lodash";
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
  componentDidUpdate(prevProps) {
    if (!_.isEqual(prevProps, this.props)) {
      const { canvas } = this.props
      if (canvas) {
        const { canvas_schema } = canvas
        if (canvas_schema) {
          const { canvas_team } = canvas_schema
          if (!_.isEmpty(canvas_team))
            this.setState({
              host_group: canvas_team[0].group,
              canvas_id: canvas_schema.canvas_id
            })
        }
      }
    }
  }
  render() {
    const readonly = true;
    const joinable = Boolean(who_am_i());
    const { _tester_modal, host_group, canvas_id } = this.state
    // const { canvas_id } = this.props.match.params;
    console.log("canvas_team", host_group);

    const { component: Component, ...rest } = this.props;

    return (<>
      {
        joinable ?
          <div><p><Button onClick={()=>this.props.dispatch(canvasActions.join_canvas_team(canvas_id))}>Join</Button> this Workspace team!</p></div> :

          <Modal
            modalClassName="modal "
            isOpen={_tester_modal}
            toggle={this.toggle_tester_modal}
          >
            {<TesterSignInView host_group={host_group} joinable={true} />}
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
  const { alert, canvas } = state;
  return {
    alert,
    canvas
  };
}

const connectedReadOnlyLayout = connect(mapStateToProps)(ReadOnlyLayout);
export { connectedReadOnlyLayout as ReadOnlyLayout }; 