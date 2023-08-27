import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Table from 'react-bootstrap/Table';
import { useEffect, useState } from 'react';
import { companyInfo } from '../axios';
import { useNavigate } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

const CompanyInfoScreen = () => {
  const navigate = useNavigate();
  const [companies, setCompanies] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  useEffect(() => {
    companyInfo()
      .then((res) => {
        setCompanies(res.data);
      })
      .catch((error) => {
        if (error.response.data.message === 'Unauthorized') {
          navigate('/');
        }
      });
  }, []);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleClear = () => {
    setSearchTerm('');
  };

  const filteredCompanies = companies?.filter(
    (company) =>
      company?.firmName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      company?.firmOfficial?.toLowerCase().includes(searchTerm.toLowerCase())
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
            <h4>Şirket Listesi</h4>
            <tr>
            <th></th>
  <th width={200}>Company Name</th>
  <th width={200}>Company Representative</th>
  <th width={200}>Representative Title</th>
  <th width={200}>Phone Number</th>
  <th width={200}>Email</th>
  <th width={200}>Fax</th>
  <th width={200}>Website</th>
  <th>Description</th>
            </tr>
          </thead>
          <tbody>
            {filteredCompanies?.map((company, index) => (
              <tr key={company._id}>
                <td>{index + 1}</td>
                <td>{company.firmName}</td>
                <td>{company.firmOfficial}</td>
                <td>{company.firmOfficialJob}</td>
                <td>{company.firmPhoneNumber}</td>
                <td>{company.firmEmail}</td>
                <td>{company.firmFax}</td>
                <td>{company.firmWebSite}</td>
                <td>{company.firmDescription}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Row>
    </Container>
  );
};

export default CompanyInfoScreen;
