import React from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Table from 'react-bootstrap/Table';
import ListGroup from 'react-bootstrap/ListGroup';
import { useEffect, useState } from 'react';
function Survey(props) {
  const values = [true];
  const [fullscreen, setFullscreen] = useState(true);
  const [show, setShow] = useState(false);
  const { firm } = props;
  function handleShow(breakpoint) {
    setFullscreen(breakpoint);
    setShow(true);
  }
  console.log(firm);
  return (
    <>
      {values.map((v, idx) => (
        <Button
          key={idx}
          variant="outline-primary"
          size="sm"
          onClick={() => handleShow(v)}
        >
          View the Survey
          {typeof v === 'string' && `below ${v.split('-')[0]}`}
        </Button>
      ))}
      <Modal show={show} fullscreen={fullscreen} onHide={() => setShow(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Intern Evaluation Survey</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Table striped responsive>
            <tbody>
              <tr>
                <td>Company Name : {firm?.firmName}</td>
                <td>Company Phone Number : {firm?.firmPhoneNumber}</td>
              </tr>
              <tr>
                <td>Student Name: {firm?.studentName}</td>
                <td>Company Representative : {firm?.firmOfficial}</td>
              </tr>
            </tbody>
          </Table>
          <ListGroup>
            <ListGroup.Item>
              <h6>
              Teamwork and collaboration :
                <small className="text-muted"> {firm?.survey1}</small>
              </h6>
            </ListGroup.Item>
            <ListGroup.Item>
              <h6>
              Desire for learning and self-improvement :
                <small className="text-muted"> {firm?.survey2}</small>
              </h6>
            </ListGroup.Item>
            <ListGroup.Item>
              <h6>
              Adherence to workplace working hours :
                <small className="text-muted"> {firm?.survey3}</small>
              </h6>
            </ListGroup.Item>
            <ListGroup.Item>
              <h6>
              Theoretical knowledge level :
                <small className="text-muted"> {firm?.survey4}</small>
              </h6>{' '}
            </ListGroup.Item>
            <ListGroup.Item>
              <h6>
                
Compliance with workplace health and safety rules :
                <small className="text-muted"> {firm?.survey5}</small>
              </h6>{' '}
            </ListGroup.Item>
            <ListGroup.Item>
              <h6>
              Desire to take on responsibilities :
                <small className="text-muted"> {firm?.survey6}</small>
              </h6>
            </ListGroup.Item>
            <ListGroup.Item>
              <h6>
              Completing assigned tasks according to the work schedule :
                <small className="text-muted"> {firm?.survey7}</small>
              </h6>
            </ListGroup.Item>
            <ListGroup.Item>
              <h6>
                
Generating ideas for problem-solving :
                <small className="text-muted"> {firm?.survey8}</small>
              </h6>
            </ListGroup.Item>
            <ListGroup.Item>
              <h6>
                
Level of practical skills :
                <small className="text-muted"> {firm?.survey9}</small>
              </h6>{' '}
            </ListGroup.Item>
            <ListGroup.Item>
              <h6>
              Employability potential :
                <small className="text-muted"> {firm?.survey10}</small>
              </h6>{' '}
            </ListGroup.Item>
            <ListGroup.Item>
              <h6>
                
Impressions of the workplace training supervisor about the student :
                <small className="text-muted"> {firm?.description}</small>
              </h6>{' '}
            </ListGroup.Item>
            <ListGroup.Item>
              <h6>
                
Evaluation of the student by the supervising faculty member :
                <small className="text-muted"> {firm?.evaluation}</small>
              </h6>{' '}
            </ListGroup.Item>
          </ListGroup>
        </Modal.Body>
      </Modal>
    </>
  );
}
export default Survey;
