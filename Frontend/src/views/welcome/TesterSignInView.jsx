import React from 'react';
import { connect } from 'react-redux';
import {
    Form,
    Input,
    DropdownToggle,
    DropdownMenu,
    DropdownItem,
    UncontrolledDropdown,
    Card,
    CardHeader,
    CardBody,
    CardFooter
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
        tester.group = event.target.name
        this.setState({
            tester
        });

        this.props.register_tester_action(this.state.tester)
    }

    render() {
        const { tester } = this.state;
        return (
            <Form name="form" onSubmit={this.handleSubmit}>
                <Card className="mb-0">
                    {/* Bad request parameters: 'testername' is a required property Failed validating 'required' in schema: {'additionalProperties': False, 'properties': {'connected': {'type': 'boolean'}, 'group': {'enum': ['A', 'B', 'C', 'D'], 'type': 'string'}, 'testername': {'type': 'string'}}, 'required': ['testername', 'group'], 'type': 'object'} On instance: {} */}
                    <CardHeader>
                        Tester information
                    </CardHeader>
                    <CardBody>
                        <Input name="testername" id="FormInputGroup" onChange={this.handleChange} value={tester.testername} placeholder="Tester Name" type="text" />

                    </CardBody>
                    <CardFooter>
                        <UncontrolledDropdown setActiveFromChild
                            className="text-center ml-0"  >
                            <DropdownToggle tag="button" className="btn btn-block" caret>
                                Set Group and Launch Test
                            </DropdownToggle>
                            <DropdownMenu right>
                                {["A", "B", "C", "D"].map(
                                    (e, key) => {
                                        return <DropdownItem key={key} name={e} onClick={this.launchTest}>
                                            Group {e}
                                        </DropdownItem>
                                    }
                                )}
                            </DropdownMenu>
                        </UncontrolledDropdown>
                    </CardFooter>


                </Card>
            </Form>
        );
    }
}

function mapStateToProps(state) {
    const { tester } = state;
    return {
        tester
    };
}

const connectedTesterSignInView = connect(mapStateToProps, mapDispatchToProps(testerActions))(TesterSignInView);
export { connectedTesterSignInView as TesterSignInView };