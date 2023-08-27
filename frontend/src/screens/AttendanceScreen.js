import React, { useState, useEffect, useRef } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { HTTP } from '../axios/config';
import {
  downloadAttendance,
  getAttendances,
  getAttendanceAssignment,
  downloadAcademic,
} from '../axios';
import { Container, Row, Table, Button, Form, Modal } from 'react-bootstrap';

const AttendanceScreen = () => {
  const [items, setItems] = useState([]); //attendances
  const [attendanceAssignments, setAttendanceAssignments] = useState([]);
  const fileInputRef = useRef(null);
  const [selectedAttendanceAssignment, setSelectedAttendanceAssignment] =
    useState(null);

  const addItem = async (e, id, name) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append('name',name);
      formData.append('assignmentId', id);
      formData.append('file', fileInputRef.current.files[0]);
      const res = await HTTP().post('/attendance', formData);
      toast.success('The file has been uploaded.');
    } catch (error) {
      console.log(error.response.data);
      toast.error('The file could not be uploaded.');
    }
  };

  useEffect(() => {
    getAttendances().then((res) => {
      setItems(res?.data?.items);
    });
    getAttendanceAssignment().then((res) => {
      setAttendanceAssignments(res?.data?.attendanceAssignments);
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
              {attendanceAssignments?.map((attendanceAssignment) => (
                <tr key={attendanceAssignment._id}>
                  <td>{attendanceAssignment.fileName}</td>
                  <td>
                    {new Date(attendanceAssignment.startDate).toLocaleString(
                      'en-GB',
                      {
                        timeZone: 'Europe/Istanbul',
                      }
                    )}
                  </td>
                  <td>
                    {new Date(attendanceAssignment.endDate).toLocaleString(
                      'en-GB',
                      {
                        timeZone: 'Europe/Istanbul',
                      }
                    )}
                  </td>
                  <td>
                    {attendanceAssignment.file ? (
                      <Button
                        variant="outline-primary"
                        size="sm"
                        onClick={() =>
                          downloadAcademic(attendanceAssignment._id)
                        }
                      >
                        Dosyayı İndir
                      </Button>
                    ) : (
                      'The file has not been uploaded.'
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
                            attendanceAssignment._id,
                            attendanceAssignment.fileName
                          );
                        }}
                        className="btn btn-success"
                      >
                        Upload the document.
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
                <th>Attendance Report Title</th>
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
                      onClick={() => downloadAttendance(item._id)}
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

export default AttendanceScreen;
