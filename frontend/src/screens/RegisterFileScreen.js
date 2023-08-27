import React, { useState, useEffect, useRef } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { HTTP } from '../axios/config';
import {
  downloadRegister,
  getRegisters,
  getRegisterAssignment,
  downloadAcademic,
} from '../axios';
import { Container, Row, Table, Button, Form, Modal } from 'react-bootstrap';

const RegisterFileScreen = () => {
  const [items, setItems] = useState([]); //reports
  const [registerAssignments, setRegisterAssignments] = useState([]);
  const fileInputRef = useRef(null);
  const [showConfirmation, setShowConfirmation] = useState(false);

  const addItem = async (e, id, name) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('name', name);
    formData.append('assignmentId', id);
    formData.append('file', fileInputRef.current.files[0]);

    try {
      const res = await HTTP().post('/register', formData);
      toast.success('Dosya yüklendi');
    } catch (error) {
      console.log(error.response.data);
      toast.error('Dosya yüklenemedi');
    }
  };

  useEffect(() => {
    getRegisters().then((res) => {
      setItems(res?.data?.items);
    });
    getRegisterAssignment().then((res) => {
      setRegisterAssignments(res?.data?.registerAssignments);
    });
  }, [items]);

  return (
    <Container>
      <Row className="m-3">
        <div>
          <Table striped bordered hover size="lg">
            <thead className="text-center">
              <tr>
              <th>Document Title</th>
<th>Start Date</th>
<th>End Date</th>
<th width="200">Download</th>
<th>File Upload Area</th>
<th>Upload</th>

              </tr>
            </thead>
            <tbody className="text-center">
              {registerAssignments?.map((registerAssignment) => (
                <tr key={registerAssignment._id}>
                  <td>{registerAssignment.fileName}</td>
                  <td>
                    {new Date(registerAssignment.startDate).toLocaleString(
                      'en-GB',
                      { timeZone: 'Europe/Istanbul' }
                    )}
                  </td>
                  <td>
                    {new Date(registerAssignment.endDate).toLocaleString(
                      'en-GB',
                      { timeZone: 'Europe/Istanbul' }
                    )}
                  </td>
                  <td>
                    {registerAssignment.file ? (
                      <Button
                        variant="outline-primary"
                        size="sm"
                        onClick={() => downloadAcademic(registerAssignment._id)}
                      >
                       Download
                      </Button>
                    ) : (
                      'The file could not be uploaded.'
                    )}
                  </td>
                  <td>
                    <Form>
                      <Form.Group>
                        <Form.Control type="file" ref={fileInputRef} />
                      </Form.Group>
                    </Form>
                  </td>
                  <td>
                    <Form.Group>
                      <Button
                        size="sm"
                        onClick={(e) => {
                          addItem(
                            e,
                            registerAssignment._id,
                            registerAssignment.fileName
                          );
                        }}
                        className="btn btn-success"
                      >
                        Upload
                      </Button>
                    </Form.Group>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>

          <Table striped bordered hover size="lg">
            <thead className="text-center">
              <tr>
                <th></th>
                <th>Title</th>
                <th>Type</th>
                <th width={200}>Download</th>
              </tr>
            </thead>
            <tbody className="text-center">
              {items?.map((item, index) => (
                <tr key={item._id}>
                  <td>{index + 1}</td>
                  <td>{item.name}</td>
                  <td>pdf</td>
                  <td>
                    <Button
                      variant="outline-primary"
                      size="sm"
                      onClick={() => downloadRegister(item._id)}
                    >
                      Download
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
        <ToastContainer />
      </Row>
    </Container>
  );
};

export default RegisterFileScreen;
