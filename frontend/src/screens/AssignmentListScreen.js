import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import React, { useState, useEffect, useRef } from 'react';
import { downloadAcademic, getAllAcademics } from '../axios';
import { deleteAssignment } from '../axios';

const AssignmentListScreen = () => {
  const [items, setItems] = useState([]);
  
  useEffect(() => {
    getAllAcademics().then((res) => {
      setItems(res?.data?.items);
    });
  }, [items]);

  return (
    <Container>
      <Row className="m-5">
        <Table striped bordered hover size="lg" responsive>
          <thead>
            <h4>Uploads</h4>
            <tr>
              <th width={200}>File Name</th>
              <th width={200}>Start Date</th>
              <th width={200}>End Date</th>
              <th width={200}>Document Type</th>
              <th width={200}>Download</th>
              <th width={200}>Delete</th>
            </tr>
          </thead>
          <tbody>
            {items &&
              items.map((item) => (
                <tr key={item._id}>
                  <td>{item.fileName}</td>
                  <td>
                    {new Date(item.startDate).toLocaleString('en-GB', {
                      timeZone: 'Europe/Istanbul',
                    })}
                  </td>
                  <td>
                    {new Date(item.endDate).toLocaleString('en-GB', {
                      timeZone: 'Europe/Istanbul',
                    })}
                  </td>
                  <td>{item.fileType}</td>
                  <td className="text-center">
                    {' '}
                    <Button
                      variant="outline-primary"
                      size="sm"
                      onClick={() => downloadAcademic(item._id)}
                    >
                      Download File
                    </Button>
                  </td>
                  <td>
                    <Button
                      variant="light"
                      onClick={() => {
                        deleteAssignment(item._id);
                        console.log(item._id);
                      }}
                    >
                      <i className="bi bi-trash3"></i>{' '}
                    </Button>
                  </td>
                </tr>
              ))}
          </tbody>
        </Table>
        <ToastContainer />
      </Row>
    </Container>
  );
};

export default AssignmentListScreen;
