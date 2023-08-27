import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Link, useNavigate } from 'react-router-dom';
import InputGroup from 'react-bootstrap/InputGroup';
import { internRegister } from '../axios';
import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useFormik } from 'formik';
import { validate } from '../utils/forms';
import { checkMyDateWithinRange } from '../utils/forms';

export default function InternScreen() {
  const formik = useFormik({
    initialValues: {
      email: '',
      internshipStartDate: '',
      internshipFinishDate: '',
    },
    validate,
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
    },
  });

  const navigate = useNavigate();
  const [value, setValue] = useState(0);
  const [formData, setFormData] = useState({
    firmName: '',
    firmOfficial: '',
    firmOfficialJob: '',
    firmPhoneNumber: '',
    firmEmail: '',
    firmFax: '',
    firmWebSite: '',
    firmDescription: '',
    internshipType: '',
    internshipStartDate: Date,
    internshipFinishDate: Date,
    totalDay: '',
    insuranceType: '',
    insuranceNo: '',
  });

  if (formData.internshipStartDate && formData.internshipFinishDate) {
    checkMyDateWithinRange();
  }

  return (
    <Container>
      <Row className="m-3">
        <Form
          onSubmit={(e) => {
            e.preventDefault();
            internRegister(formData)
              .then((res) => {
                navigate('/intern');
                toast.success('Internship record has been created');
              })
              .catch((err) => {
                console.log(err);
                toast.error(err.response.data.message);
              });
            e.target.reset();
          }}
        >
          <Col>
            <h3>Company Information</h3>

            <Form.Group className="col col-sm-9">
              <Form.Label>Company Name</Form.Label>
              <Form.Control
                onChange={(e) =>
                  setFormData({ ...formData, firmName: e.target.value })
                }
              />
            </Form.Group>
            <Form.Group className="col col-sm-9">
              <Form.Label>Company Official</Form.Label>
              <Form.Control
                onChange={(e) =>
                  setFormData({ ...formData, firmOfficial: e.target.value })
                }
              />
            </Form.Group>
            <Form.Group className="col col-sm-9">
              <Form.Label>Company Official Job</Form.Label>
              <Form.Control
                onChange={(e) =>
                  setFormData({ ...formData, firmOfficialJob: e.target.value })
                }
              />
            </Form.Group>
            <Form.Group className="col col-sm-9">
              <Form.Label>Phone Number</Form.Label>
              <InputGroup>
                <InputGroup.Text>+90</InputGroup.Text>
                <Form.Control
                  type="number"
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      firmPhoneNumber: e.target.value,
                    })
                  }
                />
              </InputGroup>
            </Form.Group>
            <Form.Group className="col col-sm-9">
              <Form.Label>Email</Form.Label>
              <InputGroup>
                <Form.Control
                  type="email"
                  name="email"
                  id="email"
                  onBlur={formik.handleBlur}
                  value={formik.values.email}
                  onChange={(e) => {
                    formik.handleChange(e);
                    setFormData({ ...formData, firmEmail: e.target.value });
                  }}
                />
                {formik.touched.email && formik.errors.email && (
                  <span
                    style={{
                      color: 'red',
                    }}
                  >
                    {formik.errors.email}
                  </span>
                )}
              </InputGroup>
            </Form.Group>
            <Form.Group className="col col-sm-9">
              <Form.Label>Fax</Form.Label>
              <Form.Control
                type="number"
                onChange={(e) =>
                  setFormData({ ...formData, firmFax: e.target.value })
                }
                className="form-control"
              />
            </Form.Group>
            <Form.Group className="col col-sm-9">
              <Form.Label>Website</Form.Label>
              <Form.Control
                onChange={(e) =>
                  setFormData({ ...formData, firmWebSite: e.target.value })
                }
              />
            </Form.Group>
            <Form.Group controlId="formGridlabel" className="col col-sm-9">
              <Form.Label>Company Description</Form.Label>
              <Form.Control
                as="textarea"
                onChange={(e) =>
                  setFormData({ ...formData, firmDescription: e.target.value })
                }
              />
            </Form.Group>
          </Col>
          <Col>
            <Row>
              <h3>Internship Information</h3>
              <Form.Group controlId="formGridCheckbox" className="col col-sm-7">
                <Form.Label>Internship Type</Form.Label>
                <Form.Select
                  defaultValue=""
                  onChange={(e) =>
                    setFormData({ ...formData, internshipType: e.target.value })
                  }
                >
                  <option value="">Select</option>
                  <option value="blm3000">Summer Internship 1</option>
                  <option value="blm4000">Summer Internship 2</option>
                  <option value="iye">Workplace Training</option>
                </Form.Select>
              </Form.Group>
              <Form.Group className="col col-sm-7">
                <Form.Label>Internship Start Date</Form.Label>
                <InputGroup>
                  <Form.Control
                    type="date"
                    name="internshipStartDate"
                    id="internshipStartDate"
                    onBlur={formik.handleBlur}
                    value={formik.values.internshipStartDate}
                    onChange={(e) => {
                      formik.handleChange(e);
                      setFormData({
                        ...formData,
                        internshipStartDate: e.target.value,
                      });
                    }}
                  />
                </InputGroup>
              </Form.Group>
              <Form.Group controlId="formGridlabel" className="col col-sm-7">
                <Form.Label>Internship Finish Date</Form.Label>
                <InputGroup>
                  <Form.Control
                    type="date"
                    name="internshipFinishDate"
                    id="internshipFinishDate"
                    onBlur={formik.handleBlur}
                    value={formik.values.internshipFinishDate}
                    onChange={(e) => {
                      formik.handleChange(e);
                      setFormData({
                        ...formData,
                        internshipFinishDate: e.target.value,
                      });
                    }}
                  />
                  {formik.touched.internshipFinishDate &&
                    formik.errors.internshipFinishDate && (
                      <span
                        style={{
                          color: 'red',
                        }}
                      >
                        {formik.errors.internshipFinishDate}
                      </span>
                    )}
                </InputGroup>
              </Form.Group>
              <Form.Group controlId="formBasicEmail" className="col col-sm-7">
                <Form.Label>Total Days</Form.Label>
                <Form.Control
                  type="number"
                  value={checkMyDateWithinRange(
                    formData.internshipStartDate,
                    formData.internshipFinishDate
                  )}
                  onChange={(e) => {
                    setFormData({
                      ...formData,
                      totalDay: checkMyDateWithinRange(
                        formData.internshipStartDate,
                        formData.internshipFinishDate
                      ),
                    });
                  }}
                />
              </Form.Group>
            </Row>
            <Row className="mt-3">
              <h3>Health Insurance Information</h3>
              <Form.Group controlId="formGridCheckbox" className="col col-sm-7">
                <Form.Label>Insurance Type</Form.Label>
                <Form.Select
                  defaultValue=""
                  onChange={(e) =>
                    setFormData({ ...formData, insuranceType: e.target.value })
                  }
                >
                  <option value="">Select</option>
                  <option value="mother">Mother</option>
                  <option value="father">Father</option>
                  <option value="self">Self</option>
                </Form.Select>
              </Form.Group>
              <Form.Group className="col col-sm-7">
                <Form.Label>Insurance Number</Form.Label>
                <Form.Control
                  onChange={(e) =>
                    setFormData({ ...formData, insuranceNo: e.target.value })
                  }
                />
              </Form.Group>
            </Row>
          </Col>
          <Form.Group className=" mt-4 text-center">
            <Button type="submit" className="bg-primary">
              Save
            </Button>
          </Form.Group>
        </Form>
        <ToastContainer />
      </Row>
    </Container>
  );
}
