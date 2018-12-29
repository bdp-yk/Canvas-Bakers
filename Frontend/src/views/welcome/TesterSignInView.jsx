import React from 'react';
import { connect } from 'react-redux';
import {
    Form,
    Input,
    DropdownToggle,
    DropdownMenu,
    DropdownItem,
    UncontrolledDropdown,
} from "reactstrap";

import { mapDispatchToProps } from '../../utils';
import { testerActions } from '../../redux/_actions';


class TesterSignInView extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            tester: {
                testername: "",
                group: ""
            },
            submitted: false
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.launchTest = this.launchTest.bind(this);
    }

    handleChange(event) {
        const { name, value } = event.target;
        const { tester } = this.state;

        this.setState({
            tester: {
                ...tester,
                [name]: value
            }
        });
    }

    handleSubmit(event) {
        event.preventDefault(); 
    }
    launchTest = (event) => {
        const { tester } = this.state;
        this.setState({
            tester: {
                ...tester,
                group: event.target.innerText
            }
        });
        this.props.signin_as_tester(tester) 
    }

    render() {
        const { tester } = this.state;
        return (
            <>
                <Form name="form" onSubmit={this.handleSubmit}>

                    <Input name="testername" id="FormInputGroup" value={tester.testername} placeholder="Tester Name" type="text" />
                    <UncontrolledDropdown setActiveFromChild>
                        <DropdownToggle tag="a" className="nav-link" caret>
                            SetGroup
                            </DropdownToggle>
                        <DropdownMenu>
                            {["A", "B", "C", "D"].map(
                                (e, key) => {
                                    return <DropdownItem key={key} onClick={this.launchTest}>
                                        Group {e}
                                    </DropdownItem>
                                }
                            )}
                        </DropdownMenu>
                    </UncontrolledDropdown>

                </Form>

            </>
        );
    }
}

function mapStateToProps(state) {
    const { registering } = state.registration;
    return {
        registering
    };
}

const connectedTesterSignInView = connect(mapStateToProps, mapDispatchToProps(testerActions))(TesterSignInView);
export { connectedTesterSignInView as TesterSignInView };