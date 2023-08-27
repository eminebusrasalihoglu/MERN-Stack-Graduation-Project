import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Table from 'react-bootstrap/Table';
import { useEffect, useState } from 'react';
import { classInfo } from '../axios';
import { useNavigate } from 'react-router-dom';
import { deleteClass} from '../axios';
import Button from 'react-bootstrap/Button';
import Class from '../components/Class';
const ClassScreen = () => {
  const [classes, setClasses] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    classInfo()
      .then((res) => {
        setClasses(res.data);
      })
      .catch((error) => {
        console.log('admin page : ', error);
        navigate('/');
      });
  }, [classes]);

  const openInNewTab = (url) => {
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <Container>
      <Row className="m-5">
        <Table striped bordered hover size="lg" responsive>
          <thead>
          <h4>View Class</h4>
  <tr>
    <th width="200">Class Code</th>
    <th width="200">Class Advisor</th>
    <th width="200">View Class</th>
    <th width="200">Delete Class</th>
  </tr>

          </thead>
          <tbody>
            {classes?.map((c) => (
              <tr key={c._id}>
                <td width={200}>{c.classCode}</td>
                <td width={200}>{c.academic}</td>
                <td width={200} className="text-center">
                <Class group={c}/>
                </td>
                <td width={200}><Button variant="light" onClick={() => {deleteClass(c._id); console.log(c._id); }}><i className="bi bi-trash3"></i> </Button></td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Row>
    </Container>
  );
};

export default ClassScreen;
