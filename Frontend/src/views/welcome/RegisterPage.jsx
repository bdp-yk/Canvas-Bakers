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
                lastName: '',
                email: '',
                password: '',
                class: 'user'
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
        user.class = "user"
        if (adminship.isAdmin) {
            user.class = "admin"
            if (!(adminship.admin_code === this.props.tester.admin_code)) {
                return
            }
        }
        const { dispatch } = this.props;
        if (user.firstName && user.lastName && user.email && user.password && user.class) {
            dispatch(userActions.register(user));
        }
    }
    swapRegLog = () => {
        this.props.dispatch(modalActions.toggle());
        this.props.dispatch(modalActions.toggleLoginModal());
    }

    render() {
        const { registering } = this.props;
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
                                <label htmlFor="firstName">First Name</label>
                                <Input type="text" name="firstName" value={user.firstName} onChange={this.handleChange} />
                                {submitted && !user.firstName &&
                                    <div className="help-block">First Name is required</div>
                                }
                            </FormGroup>
                            <FormGroup className={(submitted && !user.lastName ? ' has-error' : '')}>
                                <label htmlFor="lastName">Last Name</label>
                                <Input type="text" name="lastName" value={user.lastName} onChange={this.handleChange} />
                                {submitted && !user.lastName &&
                                    <div className="help-block">Last Name is required</div>
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

                                <Button disabled={registering} color="primary">Register</Button>
                                {registering &&
                                    <img alt="reload" style={{ maxWidth: "15px" }} src={loadingthumbnail} />
                                }
                                <Button disabled={registering} onClick={() => this.swapRegLog()}>Login</Button>

                            </FormGroup>
                        </ModalFooter>
                    </CardFooter>
                </Form>

            </>
        );
    }
}

function mapStateToProps(state) {
    const { tester } = state;
    const { registering } = state.registration;
    return {
        tester,
        registering
    };
}

const connectedRegisterPage = connect(mapStateToProps)(RegisterPage);
export { connectedRegisterPage as RegisterPage };