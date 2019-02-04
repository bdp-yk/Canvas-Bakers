import React from 'react';
import { connect } from 'react-redux';
import {
    Form,
    Button,
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
                email: "",
                group: "",
                plan_type: "tester"
            },
            available_groups: props.tester.available_groups,
            submitted: false
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.join_tester = this.join_tester.bind(this);
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

        this.props.register_tester_action(tester)
    }
    join_tester = () => {
        const { host_group } = this.props
        const { tester } = this.state;
        tester.group = host_group;
        this.props.register_tester_action(tester, false)
    }

    render() {
        const { joinable } = this.props
        const { tester, available_groups } = this.state;

        return (
            <Form name="form" onSubmit={this.handleSubmit}>
                <Card className="mb-0">
                    {/* Bad request parameters: 'email' is a required property Failed validating 'required' in schema: {'additionalProperties': False, 'properties': {'connected': {'type': 'boolean'}, 'group': {'enum': ['A', 'B', 'C', 'D'], 'type': 'string'}, 'email': {'type': 'string'}}, 'required': ['email', 'group'], 'type': 'object'} On instance: {} */}
                    <CardHeader>
                        User information
                    </CardHeader>
                    <CardBody>
                        <Input name="email" id="FormInputGroup" onChange={this.handleChange} value={tester.email} placeholder="User Name" type="text" />

                    </CardBody>
                    <CardFooter>
                        {joinable ?
                            <Button className="text-center " block onClick={this.join_tester}>Join this Canvas Workspace</Button>

                            :
                            <UncontrolledDropdown setActiveFromChild
                                className="text-center ml-0"  >
                                <DropdownToggle tag="button" className="btn btn-block" caret>
                                    Set Group and Launch Test
                            </DropdownToggle>
                                <DropdownMenu right>
                                    {available_groups.map(
                                        (e, key) => {
                                            return <DropdownItem key={key} name={e} onClick={this.launchTest}>
                                                {e.toLowerCase() === "individual" ? "" : "Group "}{e}
                                            </DropdownItem>
                                        }
                                    )}
                                </DropdownMenu>
                            </UncontrolledDropdown>}
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