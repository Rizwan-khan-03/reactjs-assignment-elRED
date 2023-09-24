import React from 'react';
import { Link } from "react-router-dom";
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { IoIosArrowBack } from 'react-icons/io';
function ResumeScreen() {
    const savedFileBase64 = localStorage.getItem('savedFile');
    return (
        <div>
            <Container>
                <Row className="d-flex justify-content-center align-items-center">
                    <Col xs={12} sm={12} md={6} lg={4} className="text-center">
                        <Card className="p-4 shadow" style={{ maxWidth: '100%', height: '100%' }}>
                        <Row className="d-flex justify-content-start align-items-start">
                                <Col className="text-start">
                                    <div >
                                        <Link to="/" style={{ textDecoration: 'none', color: 'black' }}><IoIosArrowBack />My Bio</Link>{' '}
                                    </div>
                                </Col>

                            </Row>
                            <Row className="d-flex justify-content-start align-items-start">
                                <Col className="text-center">
                                <iframe src={savedFileBase64}  style={{ maxWidth: '100%', height: '80vh', }}></iframe>
                                </Col>
                            </Row>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}

export default ResumeScreen