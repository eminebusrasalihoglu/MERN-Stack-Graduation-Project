import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Table from 'react-bootstrap/Table';
import { useEffect, useState } from 'react';
import { surveyInfo } from '../axios';
import { useNavigate } from 'react-router-dom';
import Survey from '../components/Survey';
const SurveyInfoScreen = () => {
  const [firms, setFirms] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    surveyInfo()
      .then((res) => {
        setFirms(res.data);
      })
      .catch((error) => {
        console.log('admın react studentıNFO', error);
        navigate('/');
      });
  }, []);

  const openInNewTab = (url) => {
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <Container>
      <Row className="m-5">
        <Table striped bordered hover size="lg" responsive>
          <thead>
            <h4>View Survey</h4>
            <tr>
              <th></th>
              <th width={200}>Company Name</th>
<th width={200}>Company Representative</th>
<th width={200}>Student Number</th>
<th width={200}>Student Name</th>

            </tr>
          </thead>
          <tbody>
            {firms?.map((firm) => (
              <tr key={firm._id}>
                <td>1</td>
                <td>{firm.firmName}</td>
                <td>{firm.firmOfficial}</td>
                <td>{firm.studentName}</td>
                <td className="text-center">
                <Survey firm={firm}/>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Row>
    </Container>
  );
};

export default SurveyInfoScreen;
