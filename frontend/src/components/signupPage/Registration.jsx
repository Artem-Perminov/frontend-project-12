import React from 'react';
import {
  Card, Col, Container, Image, Row,
} from 'react-bootstrap';
import avatar from '../../assets/avatar_1.jpg';
import SignUpForm from './components/SignUpForm.jsx';

const Registration = () => (
  <Container fluid className="h-100">
    <Row className="justify-content-center align-content-center h-100">
      <Col md={8} xxl={6} className="col-12">
        <Card className="shadow-sm">
          <Card.Body className="d-flex flex-column flex-md-row justify-content-around align-items-center p-5">
            <div>
              <Image roundedCircle src={avatar} alt="аватар" />
            </div>
            <SignUpForm />
          </Card.Body>
        </Card>
      </Col>
    </Row>
  </Container>
);

export default Registration;
