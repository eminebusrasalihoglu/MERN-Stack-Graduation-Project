import React, { useState, useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Modal from 'react-bootstrap/Modal'; // Import Bootstrap Modal
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { announcementRegister, announcementRegisterGet } from '../axios';

const AnnouncementForm = ({ user }) => {
  console.log(user);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    description: "",
    email: "",
    name: "",
  });
  const [showConfirmation, setShowConfirmation] = useState(false);

  const handleFormSubmit = (e) => {
    e.preventDefault();
    setShowConfirmation(true);
  };

  const handleConfirmation = () => {
    console.log(formData);
    announcementRegister(formData)
      .then((res) => {
        toast.success("Announcement created");
        setShowConfirmation(false);
      })
      .catch((err) => {
        toast.error("Announcement couldn't be created");
        setShowConfirmation(false);
      });
  };

  const handleCancel = () => {
    setShowConfirmation(false);
  };

  useEffect(() => {
    announcementRegisterGet()
      .then((res) => {
        console.log(res);
      })
      .catch((error) => {
        console.log(error.response?.data?.message);
        if (error.response?.data.message === 'Unauthorized') {
          navigate('/');
        }
      });
  }, []);

  return (
    <Container className='m-5'>
      <Form onSubmit={handleFormSubmit}>
        <Row className="d-grid gap-3">
          <h3> Create Announcement</h3>
          <Form.Group className="col col-sm-6">
            <Form.Label>Description</Form.Label>
            <Form.Control
              required
              onChange={(e) =>
                setFormData({
                  ...formData,
                  description: e.target.value,
                  email: user.email,
                  name: user.fullname,
                })
              }
            />
          </Form.Group>
        </Row>
        <Form.Group className="col col-sm-6 text-center m-5">
          <Button variant="success" size="lg" type="submit">
            Create Announcement
          </Button>
        </Form.Group>
      </Form>
      <ToastContainer />

      <Modal show={showConfirmation} onHide={handleCancel}>
        <Modal.Header closeButton>
          <Modal.Title>Are You Sure?</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Are you sure you want to continue with this action?</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCancel}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleConfirmation}>
            Continue
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default AnnouncementForm;
