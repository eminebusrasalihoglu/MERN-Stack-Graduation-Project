import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import React, { useState, useEffect, useRef } from 'react';
import { downloadReport, getAllReports } from '../axios';
import Form from 'react-bootstrap/Form';

const ReportListScreen = () => {
  const [items, setItems] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  useEffect(() => {
    getAllReports().then((res) => {
      setItems(res?.data?.items);
    });
  }, [items]);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleClear = () => {
    setSearchTerm('');
  };

  const filteredItems = items?.filter(
    (item) =>
      item?.studentMail?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item?.name?.toLowerCase().includes(searchTerm.toLowerCase())
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
            <h4>Reports</h4>
            <tr>
            <th>Student Fullname</th>
<th>Report Title</th>
<th>Type</th>
              <th width={200}>Download</th>
            </tr>
          </thead>
          <tbody>
            {items &&
              filteredItems.map((item) => (
                <tr key={item._id}>
                  <td>{item.studentMail}</td>
                  <td>{item.name}</td>
                  <td>pdf</td>
                  <td className="text-center">
                    {' '}
                    <Button
                      variant="outline-primary"
                      size="sm"
                      onClick={() => downloadReport(item._id)}
                    >
                      Download
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
export default ReportListScreen;
