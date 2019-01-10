import React, { Component } from 'react'
import { Row, Col, Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

export default class NoteVerdict extends Component {
    constructor(props) {
        super(props);
        this.state = {
            modal: true
        };

        this.toggle = this.toggle.bind(this);
    }

    toggle() {
        this.setState({
            modal: !this.state.modal
        });
    }
    render() {
        return (
            <>
                <Button color="danger" onClick={this.toggle}>{this.props.buttonLabel}</Button>

                <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
                    <ModalHeader toggle={this.toggle}>Modal title</ModalHeader>
                    <ModalBody>
                        <blockquote>
                            <p className="blockquote blockquote-primary">
                                <small>Note Headline</small>
                                <br />
                                "Full Description of the Note"{" "}
                            </p>
                        </blockquote>
                        <br />
                        <Row className="mx-3">
                            <Col
                                className="my-auto"
                                lg="3"
                                md="3"
                                sm="4"
                            >
                                <h1 className="text-success">98%</h1>

                            </Col>
                            <Col
                            >
                                <p className="text-success">
                                    Your note as qualified by the AI prototype.
                                    This verdict will be considered for your future inputs, try to enhance your Note.
                                    </p>

                            </Col>
                        </Row>
                        <Row className="mx-3">
                            Your Recent Scores
                        </Row>
                        
                        <Row className="mx-3">
                            {
                                [1.3,2.6,10.6].map((e,p)=>{
                                    return <Col xs={2} key={p}><h1 className="text-success">{e}</h1></Col>
                                })
                            }
                        </Row>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="primary" onClick={this.toggle}>Do Something</Button>{' '}
                        <Button color="secondary" onClick={this.toggle}>Cancel</Button>
                    </ModalFooter>
                </Modal>
            </>
        )
    }
}
