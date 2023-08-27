import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Table from 'react-bootstrap/Table';
import ListGroup from 'react-bootstrap/ListGroup';
import { editClass } from '../axios';
function Class(props) {
  const [fullscreen, setFullscreen] = useState(true);
  const [show, setShow] = useState(false);
  const [formData, setFormData] = useState({
    classCode:'',
    academic:'',
    students:[],
  });
  const { group } = props;

  useEffect(() => {
    // Set initial values from the 'group' prop
    if (group) {
      setFormData({
        ...formData,
        academic: group.academic,
        classCode: group.classCode,
        students: group.students
      });
    }
  }, []);

  function handleShow(breakpoint) {
    setFullscreen(breakpoint);
    setShow(true);
  }

  function handleSaveChanges() {
            editClass(group._id,formData)
              .then((res) => {
                console.log("Saved changes...")
              })
              .catch((err) => {
                console.log(err);
              });
    setShow(false); // Close the modal after saving changes
  }

  return (
    <>
      <Button
        variant="outline-primary"
        size="sm"
        onClick={() => handleShow(true)}
      >
        View the Class
      </Button>

      <Modal show={show} fullscreen={fullscreen} onHide={() => setShow(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Class Code :  {group.classCode}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Table striped responsive>
            <tbody>
              <tr>
                <td>
                Class Code{' '}: {' '}
                  <input
                    type="text"
                    value={formData.classCode}
                    onChange={(e) =>{setFormData({...formData, classCode: e.target.value}); console.log(formData);}}
                  />
                </td>
                <td>
                 Advisor{' '}:{' '}
                  <input
                    type="text"
                    value={formData.academic}
                    onChange={(e) => setFormData({...formData, academic: e.target.value})}
                  />
                </td>
              </tr>
            </tbody>
          </Table>
          <ListGroup>
            <h5>Students</h5>
            {formData.students.map((student, index) => (
              <ListGroup.Item key={index}>
                <input
                  type="text"
                  value={student}
                  onChange={(e) => { const updatedStudents = [...formData.students];
                    updatedStudents[index] = e.target.value;
                    setFormData({ ...formData, students: updatedStudents });}}
                />
              </ListGroup.Item>
            ))}
          </ListGroup>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShow(false)}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSaveChanges}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default Class;
