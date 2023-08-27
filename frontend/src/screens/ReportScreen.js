import React, { useState, useEffect, useRef } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { HTTP } from '../axios/config';
import {
  downloadReport,
  getReports,
  getReportAssignment,
  downloadAcademic,
} from '../axios';
import { Container, Row, Table, Button, Form, Modal } from 'react-bootstrap';

const Report = () => {
  const [items, setItems] = useState([]); //reports
  const [reportAssignments, setReportAssignments] = useState([]);
  const fileInputRef = useRef(null);
  const [assignmentId,setAssignmentId]=useState(null);
  const [name, setName] = useState("default");
  const addItem = async (e,assignmentId,name) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append('name', name);
      formData.append('assignmentId', assignmentId);
      formData.append('file', fileInputRef.current.files[0]);
      const res = await HTTP().post('/report', formData);
      toast.success('The file has been uploaded');
    } catch (error) {
      console.log(error.response?.data);
      toast.error('The file could not be uploaded.');
    }
  };

  useEffect(() => {
    getReports().then((res) => {
      setItems(res?.data?.items);
    });
    getReportAssignment().then((res) => {
      setReportAssignments(res?.data?.assignments);
    });
  }, [items]);

  return (
    <Container>
      <Row className="m-3">
        <div>
          <Table striped bordered hover size="lg">
            <thead className="text-center">
              <tr>
              <th>Report Title</th>
<th>Start Date</th>
<th>End Date</th>
<th width="200">Download</th>
<th>File Upload Area</th>
<th>Upload</th>

              </tr>
            </thead>
            <tbody className="text-center">
              {reportAssignments?.map((reportAssignment) => (
                <tr key={reportAssignment._id}>
                  <td>{reportAssignment.fileName}</td>
                  <td>
                    {new Date(reportAssignment.startDate).toLocaleString(
                      'en-GB',
                      { timeZone: 'Europe/Istanbul' }
                    )}
                  </td>
                  <td>
                    {new Date(reportAssignment.endDate).toLocaleString(
                      'en-GB',
                      { timeZone: 'Europe/Istanbul' }
                    )}
                  </td>
                  <td>
                    {reportAssignment.file ? (
                      <Button
                        variant="outline-primary"
                        size="sm"
                        onClick={() => downloadAcademic(reportAssignment._id)}
                      >
                        Dosyayı İndir
                      </Button>
                    ) : (
                      'Dosya yüklenmemiş'
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
                          addItem(e,reportAssignment._id,reportAssignment.fileName); 
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
                <th>Report Type</th>
                <th>Tip</th>
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
                      onClick={() => downloadReport(item._id)}
                    >
                      Download as pdf
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

export default Report;
