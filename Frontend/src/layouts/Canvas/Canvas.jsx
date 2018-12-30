import React from "react";
// react plugin for creating CanvasDefaultLayout over the dashboard

// reactstrap components
import {
  Alert,
  UncontrolledAlert,
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  Row,
  Col
} from "reactstrap";

class CanvasDefaultLayout extends React.Component {

  render() {
    return (
      <>
        <div className="content">

          <Row>
            <Col md="6">
              <Card>
                <CardHeader>
                  <CardTitle tag="h4">Key Partner</CardTitle>
                </CardHeader>
                <CardBody>
                  <UncontrolledAlert color="info">
                    <span>2</span>
                  </UncontrolledAlert>
                  <UncontrolledAlert color="info">
                    <span>This is a notification with close button.</span>
                  </UncontrolledAlert>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </div>
      </>
    );
  }
}

export default CanvasDefaultLayout;
