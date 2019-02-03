import React from "react";
import { connect } from 'react-redux'
import CreatableSelect from 'react-select/lib/Creatable';
import _ from "lodash"
// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  FormGroup,
  Form,
  Input,
  Row,
  Col
} from "reactstrap";
import { mapDispatchToProps, who_am_i, createOption } from "../../utils";
import { userActions } from "../../redux/_actions";
import { testerServices } from "../../redux/_services";
// import Axios from "axios";
// import { GET_All_GROUPS } from "../../redux/_services";
// const ag = get_available_groups();
class UserProfile extends React.Component {
  constructor(props) {
    console.log("props.tester.available_groups", props.tester);
    super(props);
    this.state = {
      _user: {
        ...who_am_i(),
        old_password: "",
        new_password: "",
        confirm_new_password: "",
      },
      match_error: false,
      old_password_error: false,
      available_groups: []
    }
    this.handle_change_group = this.handle_change_group.bind(this)
    this.handle_change = this.handle_change.bind(this)
    this.handle_submit = this.handle_submit.bind(this)
    this.handle_create_option = this.handle_create_option.bind(this)
  }
  handle_submit = event => {
    const { _user } = this.state
    if (_user.confirm_new_password != _user.new_password || _.isEmpty(_user.new_password)) {
      this.setState({
        match_error: true,
      })
      return
    }
    this.props.user_update_action(_user)

  }
  handle_create_option = new_group => {
    testerServices.add_new_group(new_group).then(
      this.setState({
        available_groups: [...this.state.available_groups, new_group],
        _user: {
          ...this.state._user,
          group: new_group
        }
      })
    )
  }
  handle_change_group = event => {
    let value = (_.isEmpty(event)) ? '' : event.value

    this.setState({
      _user: {
        ...this.state._user,
        group: value
      }
    })
  }
  componentWillReceiveProps(nextProps) {
    if (!_.isEqual(nextProps.tester.available_groups, this.props.tester.available_groups))
      this.setState({
        available_groups: nextProps.tester.available_groups
      })
  }
  handle_change = event => {
    if (_.isEmpty(event)) return
    let { value, name } = event.target
    this.setState({
      _user: {
        ...this.state._user,
        [name]: value
      }
    })
  }
  render() {
    let { available_groups, match_error, old_password_error } = this.state
    const { email, group, plan_type, old_password, new_password, confirm_new_password, firstName, lastName } = this.state._user
    return (
      <>
        <div className="content">
          <Row>
            <Col md="8">
              <Card>
                <CardHeader>
                  <h5 className="title">Edit Your Profile</h5>
                </CardHeader>
                <CardBody>
                  {/* email group first name last name */}
                  <Form >
                    <Row>
                      <Col className="pr-md-1" md="8">
                        <FormGroup>
                          <label>{"Email"}</label>
                          <Input
                            value={email}
                            disabled
                            name="email"
                            onChange={this.handle_change}
                            type="text"
                          />
                        </FormGroup>
                      </Col>
                      <Col md="4">
                        <FormGroup>
                          <label>Your Current Plan:</label>
                          <Input
                            value={plan_type}
                            disabled
                            type="text"
                            name="plan_type"
                            onChange={this.handle_change}
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col className="pr-md-1" md="5">
                        <FormGroup>
                          <label>First Name</label>
                          <Input
                            value={firstName}
                            type="text"
                            name="firstName"
                            onChange={this.handle_change}
                          />
                        </FormGroup>
                      </Col>
                      <Col className="pl-md-1" md="5">
                        <FormGroup>
                          <label>Last Name</label>
                          <Input
                            value={lastName}
                            type="text"
                            name="lastName"
                            onChange={this.handle_change}
                          />
                        </FormGroup>
                      </Col>
                      {plan_type == "tester" ? <Col className="pl-md-1" md="2">
                        <FormGroup>
                          <label>Group {group}</label>
                          {/* <Input
                            value={group}
                            name="group"
                            onChange={this.handle_change}
                            type="text"
                          /> */}
                          <CreatableSelect
                            isClearable
                            value={createOption(group)}
                            // isDisabled={isLoading}
                            // isLoading={isLoading}
                            onChange={this.handle_change_group}
                            onCreateOption={this.handle_create_option}
                            options={_.isEmpty(available_groups) ? [] : available_groups.map(createOption)}
                          />
                        </FormGroup>
                      </Col> : null}
                    </Row>

                    {plan_type != "tester" ? <Row>
                      <Col className="pr-md-1" md="4">
                        <FormGroup>
                          <label>Old Password</label>
                          <Input
                            value={old_password}
                            type="password"
                            name="old_password"
                            onChange={this.handle_change}
                          />
                          {old_password_error ? <div className="help-block text-danger">Wrong Password!</div> : null}
                        </FormGroup>
                      </Col>
                      <Col className="pr-md-1" md="4">
                        <FormGroup>
                          <label>New Password</label>
                          <Input
                            value={new_password}
                            type="password"
                            name="new_password"
                            onChange={this.handle_change}
                          />
                        </FormGroup>
                      </Col>
                      <Col className="pl-md-1" md="4">
                        <FormGroup >
                          <label >Confirm New Password</label>
                          <Input
                            value={confirm_new_password}
                            type="password"
                            name="confirm_new_password"
                            onChange={this.handle_change}
                          />
                          {match_error ? <div className="help-block text-danger">Does not match!</div> : null}
                        </FormGroup>
                      </Col>
                    </Row> : null}
                  </Form>
                </CardBody>
                <CardFooter>
                  <Button onClick={this.handle_submit} className="btn-fill" color="primary" type="submit">
                    Save
                  </Button>
                </CardFooter>
              </Card>
            </Col>
          </Row>
        </div>
      </>
    );
  }
}

function mapStateToProps(state) {
  const { canvas, tester } = state;
  return {
    canvas,
    tester
  };
}

const connectedUserProfile = connect(mapStateToProps, mapDispatchToProps(userActions))(UserProfile);
export { connectedUserProfile as UserProfile };
