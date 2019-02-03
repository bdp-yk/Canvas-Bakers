import React from 'react';
import { connect } from 'react-redux';
import {
    ModalHeader,
    ModalBody,
    ModalFooter,
    Button,
    CardHeader,
    CardBody,
    CardFooter,
    FormGroup,
    Form,
    Label,
    Collapse,
    Input,
} from "reactstrap";

import { userActions } from '../../redux/_actions';
import { modalActions } from '../../redux/_actions/modal.actions';
const loadingthumbnail = require("assets/img/loading.gif");

class RegisterPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            user: {
                firstName: '',
                email: '',
                password: '',
                plan_type: 'user'
            },
            submitted: false,
            adminship: {
                isAdmin: false,
                admin_code: ''
            }
        };

        this.handleChangeAdminCode = this.handleChangeAdminCode.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChangeAdminCode(event) {
        // console.log(event.target);
        const { name, value } = event.target;
        const { adminship } = this.state;
        // console.log(name, value);
        adminship[name] = value;
        if (name === "isAdmin")
            adminship[name] = event.target.checked;

        this.setState({
            adminship
        });
    }
    handleChange(event) {
        const { name, value } = event.target;
        const { user } = this.state;
        // console.log(name, value);

        this.setState({
            user: {
                ...user,
                [name]: value
            }
        });
    }

    handleSubmit(event) {
        event.preventDefault();

        this.setState({ submitted: true });
        const { user, adminship } = this.state;
        user.plan_type = "user"
        if (adminship.isAdmin) {
            user.plan_type = "admin"
            if (!(adminship.admin_code === this.props.tester.admin_code)) {
                return
            }
        }
        const { dispatch } = this.props;
        if (user.firstName && user.email && user.password && user.plan_type) {
            dispatch(userActions.user_register_action(user));
        }
    }
    swapRegLog = () => {
        this.props.dispatch(modalActions.toggle());
        this.props.dispatch(modalActions.toggleLoginModal());
    }

    render() {
        const { register_request,
            // register_success,
            // register_failure
        } = this.props.user
        const { user, submitted, adminship } = this.state;
        return (
            <>
                <ModalHeader >
                    <CardHeader>Register</CardHeader>
                </ModalHeader>
                <Form name="form" onSubmit={this.handleSubmit}>
                    <CardBody>

                        <ModalBody>

                            <FormGroup className={(submitted && !user.firstName ? ' has-error' : '')}>
                                <label htmlFor="name">First Name</label>
                                <Input type="text" name="firstName" value={user.firstName} onChange={this.handleChange} />
                                {submitted && !user.firstName &&
                                    <div className="help-block">First Name is required</div>
                                }
                            </FormGroup>
                            <FormGroup className={(submitted && !user.email ? ' has-error' : '')}>
                                <label htmlFor="email">Email</label>
                                <Input type="text" name="email" value={user.email} onChange={this.handleChange} />
                                {submitted && !user.email &&
                                    <div className="help-block">Email is required</div>
                                }
                            </FormGroup>
                            <FormGroup className={(submitted && !user.password ? ' has-error' : '')}>
                                <label htmlFor="password">Password</label>
                                <Input type="password" name="password" value={user.password} onChange={this.handleChange} />
                                {submitted && !user.password &&
                                    <div className="help-block">Password is required</div>
                                }
                            </FormGroup>
                            <FormGroup check>
                                <Label check>
                                    <Input style={{ "opacity": 1, "visibility": "visible" }} className="form-check-input" type="checkbox" name="isAdmin" value={adminship.isAdmin} checked={adminship.isAdmin} onChange={this.handleChangeAdminCode} />{' '}
                                    {`Sign in as ${adminship.isAdmin ? "User" : "an Admin"}!`}
                                </Label>
                            </FormGroup>
                            {/* <Button color="primary" onClick={} style={{ marginBottom: '1rem' }}>Toggle</Button> */}
                            <Collapse isOpen={adminship.isAdmin}>
                                <FormGroup className={(submitted && !adminship.admin_code ? ' has-error' : '')}>
                                    <label htmlFor="admin_code">Admin Code</label>
                                    <Input name="admin_code" value={adminship.admin_code} onChange={this.handleChangeAdminCode} />
                                    {submitted && !(adminship.admin_code === this.props.tester.admin_code) &&
                                        <div className="help-block">Wrong Admin Code</div>
                                    }
                                </FormGroup>
                            </Collapse>

                        </ModalBody>
                    </CardBody>
                    <CardFooter>
                        <ModalFooter>

                            <FormGroup>

                                <Button disabled={register_request} color="primary">Register</Button>
                                {register_request &&
                                    <img alt="reload" style={{ maxWidth: "15px" }} src={loadingthumbnail} />
                                }
                                <Button disabled={register_request} onClick={() => this.swapRegLog()}>Login</Button>

                            </FormGroup>
                        </ModalFooter>
                    </CardFooter>
                </Form>

            </>
        );
    }
}

function mapStateToProps(state) {
    const { user, tester } = state;

    // const { register_request } = state.registration;
    return {
        user,
        tester,
        // register_request
    };
}

const connectedRegisterPage = connect(mapStateToProps)(RegisterPage);
export { connectedRegisterPage as RegisterPage };