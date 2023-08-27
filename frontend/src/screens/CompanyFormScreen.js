import { useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import { useNavigate } from 'react-router-dom';
import { companyForm, companyStudentForm } from '../axios';
import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useFormik } from 'formik';
import { validate } from '../utils/forms';
import Button from 'react-bootstrap/Button';
import { Dropdown } from 'react-bootstrap';
import Modal from 'react-bootstrap/Modal';

export default function CompanyFormScreen() {
  const [options, setOptions] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const formik = useFormik({
    initialValues: {
      email: '',
    },
    validate,
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
    },
  });
  const navigate = useNavigate();
  useEffect(() => {
    companyStudentForm()
      .then((res) => {
        setOptions(res?.data);
      })
      .catch((error) => {
        console.log(error.response.data.message);
        if (error.response.data.message === 'Unauthorized') {
          navigate('/');
        }
      });
  }, []);
  const [formData, setFormData] = useState({
    firmName: '',
    firmOfficial: '',
    firmOfficialJob: '',
    firmPhoneNumber: '',
    firmEmail: '',
    studentName: '',
    survey1: '',
    survey2: '',
    survey3: '',
    survey4: '',
    survey5: '',
    survey6: '',
    survey7: '',
    survey8: '',
    survey9: '',
    survey10: '',
    description: '',
    evaluation: '',
  });
  const handleDropdownSelect = (selectedValue) => {
    setFormData({ ...formData, studentName: selectedValue });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: capitalizeFirstLetter(value) });
  };

  const capitalizeFirstLetter = (str) => {
    return str.replace(/\b\w/g, (char) => char.toUpperCase());
  };

  const [showConfirmation, setShowConfirmation] = useState(false); //ebs
  const handleFormSubmit = (e) => {
    e.preventDefault();
    setShowConfirmation(true);
  };

  const handleConfirmation = () => {
    companyForm(formData)
      .then((res) => {
        toast.success('The survey has been submitted.');
        setShowConfirmation(false);
      })
      .catch((err) => {
        toast.error('The survey could not be submitted.');
        setShowConfirmation(false);
      });
  };
  const handleCancel = () => {
    setShowConfirmation(false);
  };

  return (
    <Container>
      <Row className="m-3">
  <Form onSubmit={handleFormSubmit}>
    <Col>
      <h3>Company Information</h3>
      <Form.Group controlId="formCompany" className="col col-sm-9">
        <Form.Label>Company Name</Form.Label>
        <Form.Control onChange={handleInputChange} name="firmName" />
      </Form.Group>
      <Form.Group controlId="formCompanyName" className="col col-sm-9">
        <Form.Label>Company Representative</Form.Label>
        <Form.Control onChange={handleInputChange} name="firmOfficial" />
      </Form.Group>
      <Form.Group controlId="formCompanyOfficial" className="col col-sm-9">
        <Form.Label>Duties of the Company Representative</Form.Label>
        <Form.Control
          onChange={(e) =>
            setFormData({ ...formData, firmOfficialJob: e.target.value })
          }
        />
      </Form.Group>
      <Form.Group controlId="formMobileNumber" className="col col-sm-9">
        <Form.Label>Phone Number</Form.Label>
        <InputGroup>
          <InputGroup.Text id="basic-addon1">+90</InputGroup.Text>
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
      <Form.Group controlId="formEmail" className="col col-sm-9">
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
    </Col>
    <Col>
      <Row className="mt-3">
        <h3>Student Information</h3>
        <Form.Group controlId="formDropdown">
          <Dropdown onSelect={handleDropdownSelect}>
            <Dropdown.Toggle variant="secondary" id="dropdown-basic">
              {formData.studentName
                ? formData.studentName
                : 'Please select the student you will evaluate.'}
            </Dropdown.Toggle>
            <Dropdown.Menu>
              {options.map((option) => (
                <Dropdown.Item
                  key={option._id}
                  eventKey={option.studentName}
                  onSelect={handleDropdownSelect}
                >
                  {option.studentName}
                </Dropdown.Item>
              ))}
            </Dropdown.Menu>
          </Dropdown>
        </Form.Group>
      </Row>
    </Col>

    <Row>
      <h3>Survey</h3>
      <Form.Group controlId="formAnket1" className="col col-sm-6">
        <Form.Label>Teamwork</Form.Label>
        <Form.Select
          defaultValue=""
          onChange={(e) =>
            setFormData({ ...formData, survey1: e.target.value })
          }
        >
          <option value="Choose...">Select...</option>
          <option value="Very Weak">Very Weak</option>
          <option value="Weak">Weak</option>
          <option value="Average">Average</option>
          <option value="Good">Good</option>
          <option value="Excellent">Excellent</option>
        </Form.Select>
      </Form.Group>
      <Form.Group controlId="formAnket2" className="col col-sm-6">
        <Form.Label>Willingness to Take Responsibility</Form.Label>
        <Form.Select
          defaultValue=""
          onChange={(e) =>
            setFormData({ ...formData, survey2: e.target.value })
          }
        >
          <option value="Choose...">Select...</option>
          <option value="Very Weak">Very Weak</option>
          <option value="Weak">Weak</option>
          <option value="Average">Average</option>
          <option value="Good">Good</option>
          <option value="Excellent">Excellent</option>
        </Form.Select>
      </Form.Group>
      <Form.Group controlId="formAnket3" className="col col-sm-6">
        <Form.Label>Desire for Learning and Self-Improvement</Form.Label>
        <Form.Select
          defaultValue=""
          onChange={(e) =>
            setFormData({ ...formData, survey3: e.target.value })
          }
        >
          <option value="Choose...">Select...</option>
          <option value="Very Weak">Very Weak</option>
          <option value="Weak">Weak</option>
          <option value="Average">Average</option>
          <option value="Good">Good</option>
          <option value="Excellent">Excellent</option>
        </Form.Select>
      </Form.Group>
      <Form.Group controlId="formAnket4" className="col col-sm-6">
        <Form.Label>Completing Tasks According to Schedule</Form.Label>
        <Form.Select
          defaultValue=""
          onChange={(e) =>
            setFormData({ ...formData, survey4: e.target.value })
          }
        >
          <option value="Choose...">Select...</option>
          <option value="Very Weak">Very Weak</option>
          <option value="Weak">Weak</option>
          <option value="Average">Average</option>
          <option value="Good">Good</option>
          <option value="Excellent">Excellent</option>
        </Form.Select>
      </Form.Group>
      <Form.Group controlId="formAnket5" className="col col-sm-6">
        <Form.Label>Adherence to Working Hours</Form.Label>
        <Form.Select
          defaultValue=""
          onChange={(e) =>
            setFormData({ ...formData, survey5: e.target.value })
          }
        >
          <option value="Choose...">Select...</option>
          <option value="Very Weak">Very Weak</option>
          <option value="Weak">Weak</option>
          <option value="Average">Average</option>
          <option value="Good">Good</option>
          <option value="Excellent">Excellent</option>
        </Form.Select>
      </Form.Group>
      <Form.Group controlId="formAnket6" className="col col-sm-6">
        <Form.Label>Generating Ideas for Problem Solving</Form.Label>
        <Form.Select
          defaultValue=""
          onChange={(e) =>
            setFormData({ ...formData, survey6: e.target.value })
          }
        >
          <option value="Choose...">Select...</option>
          <option value="Very Weak">Very Weak</option>
          <option value="Weak">Weak</option>
          <option value="Average">Average</option>
          <option value="Good">Good</option>
          <option value="Excellent">Excellent</option>
        </Form.Select>
      </Form.Group>
      <Form.Group controlId="formAnket7" className="col col-sm-6">
        <Form.Label>Theoretical Knowledge Level</Form.Label>
        <Form.Select
          defaultValue=""
          onChange={(e) =>
            setFormData({ ...formData, survey7: e.target.value })
          }
        >
          <option value="Choose...">Select...</option>
          <option value="Very Weak">Very Weak</option>
          <option value="Weak">Weak</option>
          <option value="Average">Average</option>
          <option value="Good">Good</option>
          <option value="Excellent">Excellent</option>
        </Form.Select>
      </Form.Group>
      <Form.Group controlId="formAnket8" className="col col-sm-6">
        <Form.Label>Practical Skills Level</Form.Label>
        <Form.Select
          defaultValue=""
          onChange={(e) =>
            setFormData({ ...formData, survey8: e.target.value })
          }
        >
          <option value="Choose...">Select...</option>
          <option value="Very Weak">Very Weak</option>
          <option value="Weak">Weak</option>
          <option value="Average">Average</option>
          <option value="Good">Good</option>
          <option value="Excellent">Excellent</option>
        </Form.Select>
      </Form.Group>
      <Form.Group controlId="formAnket9" className="col col-sm-6">
        <Form.Label>Compliance with Occupational Safety Rules</Form.Label>
        <Form.Select
          defaultValue=""
          onChange={(e) =>
            setFormData({ ...formData, survey9: e.target.value })
          }
        >
          <option value="Choose...">Select...</option>
          <option value="Very Weak">Very Weak</option>
          <option value="Weak">Weak</option>
          <option value="Average">Average</option>
          <option value="Good">Good</option>
          <option value="Excellent">Excellent</option>
        </Form.Select>
      </Form.Group>
      <Form.Group controlId="formAnket10" className="col col-sm-6">
        <Form.Label>Potential for Employment</Form.Label>
        <Form.Select
          defaultValue=""
          onChange={(e) =>
            setFormData({ ...formData, survey10: e.target.value })
          }
        >
          <option value="Choose...">Select...</option>
          <option value="Very Weak">Very Weak</option>
          <option value="Weak">Weak</option>
          <option value="Average">Average</option>
          <option value="Good">Good</option>
          <option value="Excellent">Excellent</option>
        </Form.Select>
      </Form.Group>
    </Row>
    <Row className="mt-3">
      <Form.Group controlId="formAnket11" className="col col-sm-12">
        <Form.Label>Workplace Training Supervisor's Impressions About the Student</Form.Label>
        <Form.Control
          as="textarea"
          rows="{3}"
          onChange={(e) =>
            setFormData({ ...formData, description: e.target.value })
          }
        />
      </Form.Group>
      <Form.Group controlId="formAnket12" className="col col-sm-12">
        <Form.Label>Observer Faculty Member's Evaluation of the Student</Form.Label>
        <Form.Control
          as="textarea"
          rows="{3}"
          onChange={(e) =>
            setFormData({ ...formData, evaluation: e.target.value })
          }
        />
      </Form.Group>
    </Row>
    <Row>
      <Form.Group controlId="formButton" className=" mt-4 text-center">
        <Button variant="success" size="lg" type="submit">
          Save
        </Button>
      </Form.Group>
    </Row>
  </Form>
  <ToastContainer />
  <Modal show={showConfirmation} onHide={handleCancel}>
    <Modal.Header closeButton>
      <Modal.Title>Are You Sure?</Modal.Title>
    </Modal.Header>
    <Modal.Body>
      <p>Are you sure you want to proceed with this operation?</p>
    </Modal.Body>
    <Modal.Footer>
      <Button variant="secondary" onClick={handleCancel}>
        Cancel
      </Button>
      <Button variant="primary" onClick={handleConfirmation}>
        Continue
      </Button>
    </Modal.Footer>
  </Modal>
</Row>

    </Container>
  );
}
