import React, { useState } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link, useNavigate } from 'react-router-dom';
import { createClass } from '../axios';

const AdminTaskScreen = () => {
  const [studentValue, setStudentValue] = useState('');
  const [students, setStudents] = useState([]);
  const [selectedStudents, setSelectedStudents] = useState([]);

  const [academicValue, setAcademicValue] = useState('');
  const [academics, setAcademics] = useState([]);
  const [selectedAcademics, setSelectedAcademics] = useState('');

  const navigate = useNavigate();

  const handleSave = () => {
    if (studentValue) {
      if (!isValidEmail(studentValue)) {
        toast.error('Please enter a valid student email.');
        return;
      }
      setStudents([...students, studentValue]);
      setStudentValue('');
    }
  };

  const handleCheckboxChange = (studentName) => {
    if (selectedStudents.includes(studentName)) {
      setSelectedStudents(
        selectedStudents.filter((name) => name !== studentName)
      );
    } else {
      setSelectedStudents([...selectedStudents, studentName]);
    }

    setFormData({ ...formData, students: [...selectedStudents, studentName] });
  };

  const handleAcademicSave = () => {
    if (academicValue) {
      if (!isValidEmail(academicValue)) {
        toast.error('Please enter a valid faculty email.');
        return;
      }

      setAcademics([...academics, academicValue]);
      setAcademicValue('');
    }
  };

  const handleDropdownChange = (event) => {
    setSelectedAcademics(event.target.value);
  };

  const [formData, setFormData] = useState({
    student: '',
    academic: '',
    classCode: '',
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    if (selectedStudents.length === 0) {
      // If no students are selected, show an error message
      toast.error('Please select at least one student.');
      return;
    }

    createClass(formData)
      .then((res) => {
        toast.success('Assignment has been completed.');
      })
      .catch((err) => {
        console.log(err);
        toast.error(err.response.data.message);
      });

    e.target.reset();
  };

  const isValidEmail = (email) => {
    // Regular expression for email validation
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
  };

  return (
    <Container>
      <Row className="m-5">
        <Form onSubmit={handleSubmit}>
          <Row>
            <Col>
              <h4>Create Student User</h4>
              <br />
              <Form>
                <Form.Control
                  placeholder="Enter student email"
                  value={studentValue}
                  onChange={(e) => setStudentValue(e.target.value)}
                />
              </Form>
              <Form.Group className=" mt-4 text-center">
                <Button
                  type="button"
                  className="bg-primary"
                  onClick={handleSave}
                >
                  Save
                </Button>
              </Form.Group>
              <br />
              <br />
              <h4>Students</h4>
              <Form>
                {students.map((student) => (
                  <Form.Check
                    key={student}
                    type="checkbox"
                    label={student}
                    checked={selectedStudents.includes(student)}
                    onChange={() => handleCheckboxChange(student)}
                  />
                ))}
              </Form>
            </Col>
            <Col>
              <h4>Create Faculty User</h4>
              <br />
              <Form>
                <Form.Control
                  placeholder="Enter faculty email"
                  value={academicValue}
                  onChange={(e) => setAcademicValue(e.target.value)}
                />
              </Form>
              <Form.Group className=" mt-4 text-center">
                <Button
                  type="button"
                  className="bg-primary"
                  onClick={handleAcademicSave}
                >
                  Save
                </Button>
              </Form.Group>
              <br />
              <br />
              <h4>Faculty</h4>
              <Form>
                <Form.Select
                  value={selectedAcademics}
                  onChange={(e) => {
                    handleDropdownChange(e);
                    setFormData({ ...formData, academic: e.target.value });
                  }}
                >
                  <option value="">Select Faculty</option>
                  {academics.map((academic) => (
                    <option key={academic} value={academic}>
                      {academic}
                    </option>
                  ))}
                </Form.Select>
              </Form>
              <br></br>
              <h4>Class Code</h4>
              <Form>
                <Form.Control
                  onChange={(e) =>
                    setFormData({ ...formData, classCode: e.target.value })
                  }
                />
              </Form>
            </Col>
          </Row>
          <br></br>
          <Form.Group className="text-center">
            <Button type="submit" variant="success" size="lg" active>
              Complete Assignment
            </Button>
          </Form.Group>
        </Form>
        <ToastContainer />
      </Row>
    </Container>
  );
};

export default AdminTaskScreen;
