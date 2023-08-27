import React, { useEffect, useState } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Table from 'react-bootstrap/Table';
import { studentInfo } from '../axios';
import { useNavigate } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

const StudentInfoScreen = () => {
  const [students, setStudents] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    studentInfo()
      .then((res) => {
        setStudents(res?.data);
      })
      .catch((error) => {
        navigate('/');
      });
  }, []);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleClear = () => {
    setSearchTerm('');
  };

  const filteredStudents = students?.filter(
    (student) =>
      student?.fullname?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student?.email?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Container>
      <Row className="m-5">
        <div className="d-flex justify-content-end mb-3">
          <Form.Group>
            <Form.Control
              type="text"
              placeholder="Search..."
              value={searchTerm}
              onChange={handleSearch}
            />
          </Form.Group>
          <div></div>
          {searchTerm && (
            <Button className="clear-button" onClick={handleClear}>
              Temizle
            </Button>
          )}
        </div>
        <Table striped bordered hover size="lg" responsive>
          <thead>
            <h4>Öğrenci Listesi</h4>
            <tr>
              <th></th>
              <th width={200}>Student Name</th>
<th width={200}>Number</th>
<th width={200}>Phone Number</th>
<th width={200}>Email Address</th>
<th>Faculty</th>
            </tr>
          </thead>
          <tbody>
            {filteredStudents.map((student, index) => (
              <tr key={student._id}>
                <td>{index + 1}</td>
                <td>{student.fullname}</td>
                <td>{student.schoolNo}</td>
                <td>{student.phoneNumber}</td>
                <td>{student.email}</td>
                <td>{student.facultyType}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Row>
    </Container>
  );
};

export default StudentInfoScreen;
