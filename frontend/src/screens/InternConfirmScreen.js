import React, { useEffect, useState } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Table from 'react-bootstrap/Table';
import { useNavigate } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { internList, internConfirm, internCancel } from '../axios';

const InternConfirmScreen = () => {
  const [registers, setRegisters] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    internList()
      .then((res) => {
        setRegisters(res.data);
      })
      .catch((error) => {
        if (error.response.data.message === 'Unauthorized') {
          navigate('/');
        }
      });
  }, [registers]);
  return (
    <Container>
      <Row className="m-5">
        <Table striped bordered hover size="lg" responsive>
          <thead>
            <h4>Internships</h4>
            <tr>
            <th width="200">Company Name</th>
<th width="200">Internship Type</th>
<th width="200">Internship Start Date</th>
<th width="200">Internship End Date</th>
<th width="200">Phone</th>
<th width="200">Email Address</th>
<th width="200">Description</th>

              <th>Status</th>
              <th>Cancel</th>
            </tr>
          </thead>
          <tbody>
            {registers &&
              registers?.map((register) => (
                <tr key={register._id}>
                  <td>{register.firmName}</td>
                  <td>{register.internshipType}</td>
                  <td>{register.internshipStartDate}</td>
                  <td>{register.internshipFinishDate}</td>
                  <td>{register.firmPhoneNumber}</td>
                  <td>{register.firmEmail}</td>
                  <td>{register.firmDescription}</td>
                  <td>
                    <Button onClick={() => internConfirm(register._id)}>
                      {register.status ? 'Approved' : 'Approve'}
                    </Button>
                  </td>
                  <td>
                    <Button onClick={() => internCancel(register._id)}>
                      <i class="bi bi-x-lg"></i>
                    </Button>
                  </td>
                </tr>
              ))}
          </tbody>
        </Table>
      </Row>
    </Container>
  );
};

export default InternConfirmScreen;
