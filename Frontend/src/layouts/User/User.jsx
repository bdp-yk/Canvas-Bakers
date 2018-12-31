import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { mapStateToProps, mapDispatchToProps } from '../../utils';
import { userActions } from '../../redux/_actions';

export class UserLayout extends Component {
  static propTypes = {
    prop: PropTypes
  }

  render() {
    return (
      <div>
        
      </div>
    )
  }
}


export default connect(mapStateToProps, mapDispatchToProps(userActions))(UserLayout)
