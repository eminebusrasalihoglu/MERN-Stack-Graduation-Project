import { Col, Button, Row, Container, Card, Form } from 'react-bootstrap';
import Image from 'react-bootstrap/Image';
import { Link, useNavigate } from 'react-router-dom';
import React, { useState } from "react";
import { login } from "../axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function SignIn({ setUser }) {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });
    return (
        <div>
            <Container>
                <Row className="vh-100 d-flex justify-content-center align-items-center">
                    <Col md={6} lg={4}  >
                        <div className="border border-3 border-primary"></div>
                        <Card className="shadow">
                            <Card.Body>
                                <div className="mb-3 mt-md-3">
                                    <div className="text-center">
                                        <Image
                                        fluid
                                        src={'/logo2.png'}
                                            width={120}
                                            height={120}
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <Form onSubmit={(e) => {
                                            e.preventDefault();

                                            login(formData)
                                                .then((res) => {
                                                    localStorage.setItem("user", JSON.stringify(res?.data?.user));
                                                    localStorage.setItem("accessToken", res?.data?.accessToken);
                                                    setUser(res?.data?.user);
                                               setTimeout(() => {
      // Clear the JWT from local storage or secure cookie
                            localStorage.removeItem('user');
                            localStorage.removeItem('accessToken');
      // Redirect the user to the login page
       window.location.href = '/signin';
    }, 3600 * 1000); 
                                                    navigate("/");
                                                })
                                                .catch((err) => {
                                                    toast.error(err.response?.data?.message);
                                                });
                                        }} >
                                            <Form.Group
                                                className="mb-3"
                                            >
                                                <Form.Label className="text-center">
                                                    Email
                                                </Form.Label>
                                                <Form.Control
                                                    onChange={(e) =>
                                                        setFormData({ ...formData, email: e.target.value })
                                                    }
                                                    type="email"
                                                    placeholder="Email" required
                                                />
                                            </Form.Group>

                                            <Form.Group
                                                className="mb-3"
                                            >
                                                <Form.Label>Password</Form.Label>
                                                <Form.Control onChange={(e) =>
                                                    setFormData({ ...formData, password: e.target.value })
                                                } type="password" placeholder="Password" required />
                                            </Form.Group>
                                            <Form.Group className="d-grid">
                                                <Button disabled={formData.email==="" || formData.password===""}  type="submit" variant="primary" size="lg">
                                                    Log in
                                                </Button>
                                                <Form.Text className="text-center mt-2">
                                                    Do you not have an account ? <Link to="/signup">Sign up</Link>
                                                </Form.Text>
                                            </Form.Group>
                                        </Form>
                                        <ToastContainer />
                                    </div>
                                </div>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </div>
    );
}

export default SignIn;
