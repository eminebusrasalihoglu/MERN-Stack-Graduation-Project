import {
  Col,
  Button,
  Row,
  Container,
  Card,
  Form,
  FormGroup,
} from 'react-bootstrap';
import Image from 'react-bootstrap/Image';
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { signup } from '../axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function SignUp() {
  const navigate = useNavigate();
  const [userType, setUserType] = useState('');
  const [formData, setFormData] = useState({
    fullname: '',
    email: '',
    password: '',
    phoneNumber: '',
    identifyNo: '',
    schoolNo: '',
    userType: '',
    facultyType: '',
    passwordAgain: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: capitalizeFirstLetter(value) });
  };

  const capitalizeFirstLetter = (str) => {
    return str.replace(/\b\w/g, (char) => char.toUpperCase());
  };

  const isSchoolNoVisible = userType === 'ACADEMIC' || userType === 'FIRM';

  useEffect(() => {
    if (isSchoolNoVisible) {
      setFormData((prevFormData) => ({
        ...prevFormData,
        schoolNo: '',
      }));
    }
  }, [isSchoolNoVisible]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (isSchoolNoVisible) {
      setFormData((prevFormData) => ({
        ...prevFormData,
        schoolNo: '0',
      }));
    }
    signup(formData)
      .then((res) => {
        setTimeout(() => toast.success('Kullanıcı kaydı yapıldı'), 400);
        console.log("res",res);
        navigate('/signin');
      })
      .catch((err) => {
        toast.error(err.response.data.message);
      });
  };

  return (
    <div>
      <Container>
        <Form onSubmit={handleSubmit}>
          <Row className="vh-100 d-flex justify-content-center align-items-center">
            <Col md={6} lg={4} >
              <div className="border border-3 border-primary"></div>

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
                  <div className="text-center">
                    <h4>
                    In order to create the user's initial password in the system, the following information must be filled out, and an admin must create the registration beforehand.
                    </h4>
                  </div>
                  <Row className="m-3"> </Row>
                  <Form.Group className="mb-3">
                    <Form.Select
                      className="form-control"
                      onChange={(e) => {
                        setUserType(e.target.value);
                        setFormData({ ...formData, userType: e.target.value });
                      }}
                      defaultValue="" 
                      required
                    >
                      <option value="" disabled hidden>
                        User Type
                      </option>{' '}
                      <option value="STUDENT">Student</option>
                      <option value="ACADEMIC">Academic</option>
                      <option value="FIRM">Company Representative</option>
                    </Form.Select>
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Select
                      className="form-control"
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          facultyType: e.target.value,
                        })
                      }
                      defaultValue=""
                      required
                    >
                      <option value="" disabled hidden>
    Department
</option>
<option value="ComputerEng">
    Computer Engineering
</option>
<option value="ElectricalEng">
    Electrical and Electronics Engineering
</option>
<option value="MechanicalEng">
    Mechanical Engineering
</option>
<option value="MechatronicsEng">
    Mechatronics Engineering
</option>
<option value="MetallurgicalEng">
    Metallurgical and Materials Engineering
</option>
<option value="TextileEng">
    Textile Engineering
</option>
                      required{' '}
                    </Form.Select>
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Control
                      onChange={(e) =>
                        setFormData({ ...formData, identifyNo: e.target.value })
                      }
                      type="text"
                      placeholder="Identity No"
                      required
                    />
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Control
                      onChange={handleInputChange}
                      type="text"
                      name="fullname"
                      placeholder="Full Name"
                      required
                    />
                  </Form.Group>
                  {/* {userType !== 'ACADEMIC' && userType !== 'FIRM' && ( */}
                  {!isSchoolNoVisible && (
                    <Form.Group className="mb-3">
                      <Form.Control
                        onChange={(e) =>
                          setFormData({ ...formData, schoolNo: e.target.value })
                        }
                        type="text"
                        placeholder="Student ID"
                        required
                      />
                    </Form.Group>
                  )}
                  <Form.Group className="mb-3">
                    <Form.Control
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          phoneNumber: e.target.value,
                        })
                      }
                      type="text"
                      placeholder="Phone Number"
                      required
                    />
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Control
                      onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                      }
                      type="email"
                      placeholder="Email"
                      required
                    />
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Control
                      onChange={(e) =>
                        setFormData({ ...formData, password: e.target.value })
                      }
                      type="password"
                      placeholder="Password"
                      required
                    />
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Control
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          passwordAgain: e.target.value,
                        })
                      }
                      type="password"
                      placeholder="Password"
                      required
                    />
                  </Form.Group>
                  <Form.Group className="d-grid">
                    <Button variant="primary" type="submit" className="mt-4">
                      {/* <Link
                        className="text-white text-decoration-none"
                        to="/signin"
                      > */}
                     Sign up
                      {/* </Link> */}
                    </Button>
                  </Form.Group>
                  <Link to="/signin">Log in</Link>
                </div>
              </div>
            </Col>
          </Row>
        </Form>
        <ToastContainer />
      </Container>
    </div>
  );
}

export default SignUp;
