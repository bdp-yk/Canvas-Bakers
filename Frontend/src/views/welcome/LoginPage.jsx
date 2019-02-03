import React from 'react';
import { connect } from 'react-redux';
import {
    ModalHeader,
    ModalBody,
    Button,
    CardHeader,
    FormGroup,
    Form,
    Input,
    Label,
    Collapse
} from "reactstrap";

import { userActions } from '../../redux/_actions';
import { modalActions } from '../../redux/_actions/modal.actions';
const loadingthumbnail = require("assets/img/loading.gif");

class LoginPage extends React.Component {
    constructor(props) {
        super(props);

        // reset login status
        // this.props.dispatch(userActions.logout());

        this.state = {
            user: {
                email: '',
                password: ''
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


    handleChange(e) {
        const { name, value } = e.target;
        const { user } = this.state
        user[name] = value
        this.setState({ user });
    }
    handleSubmit(e) {
        e.preventDefault();
        this.setState({ submitted: true });
        const { user, adminship } = this.state;
        const { dispatch } = this.props;
        user.plan_type = "user"
        if (adminship.isAdmin) {
            user.plan_type = "admin"
            if (!(adminship.admin_code === this.props.tester.admin_code)) {
                return
            }
        }
        if (user.email && user.password) {
            dispatch(userActions.user_login_action(user));
        }
    }
    swapRegLog = () => {
        this.props.dispatch(modalActions.toggle());
        this.props.dispatch(modalActions.toggleRegisterModal());
    }
    render() {
        const { login_request } = this.props.user;
        const { user, submitted, adminship } = this.state;
        const { email, password } = user;
        return (<>
            <ModalHeader>
                <CardHeader>

                    Login
                </CardHeader>
            </ModalHeader>
            <ModalBody>
                <Form name="form" onSubmit={this.handleSubmit}>
                    <FormGroup className={'' + (submitted && !email ? ' has-error' : '')}>
                        <label htmlFor="email">Email</label>
                        <Input type="email" className="form-control" name="email" value={email} onChange={this.handleChange} />
                        {submitted && !email &&
                            <div className="help-block">Email is required</div>
                        }
                    </FormGroup>
                    <FormGroup className={'' + (submitted && !password ? ' has-error' : '')}>
                        <label htmlFor="password">Password</label>
                        <Input type="password" className="form-control" name="password" value={password} onChange={this.handleChange} />
                        {submitted && !password &&
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

                    <FormGroup className="">
                        <Button className="btn btn-primary">Login</Button>
                        {login_request &&
                            <img alt="reload" style={{ maxWidth: "15px" }} src={loadingthumbnail} />
                        }
                        <Button onClick={() => this.swapRegLog()}>Register</Button>
                    </FormGroup>

                </Form>
            </ModalBody>
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

const connectedLoginPage = connect(mapStateToProps)(LoginPage);
export { connectedLoginPage as LoginPage }; 