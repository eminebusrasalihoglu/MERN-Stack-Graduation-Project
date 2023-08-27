import React, { useState, useEffect,useRef } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import { useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card';
import Image from 'react-bootstrap/Image';
import { academic,addAcademic } from '../axios';

export default function AcademicFormScreen() {
    const navigate = useNavigate();
    const fileInputRef = useRef(null);
    const [name, setName] = useState({
        fileName: "",
        startDate: "",
        endDate: "",
        fileType:"",
    });
  
   
    useEffect(() => {
        academic().then((res) =>{ 
          console.log(res);
        })
        .catch((error)=> {
          console.log(error.response.data?.message);
          if(error.response.data.message==='Unauthorized'){navigate('/');}
        })
    
    }, []);
    return (
        <Container>
            <Form onSubmit={(e) => {
                    e.preventDefault();
                    const formData = new FormData();
                      formData.append('fileName', name.fileName);
                      formData.append('startDate', name.startDate);
                      formData.append('endDate', name.endDate);
                      formData.append('fileType', name.fileType);
                      formData.append('file', fileInputRef.current.files[0]);
                    addAcademic(formData)
                        .then((res) => {

                            navigate("/academic");
                            console.log("The file has been uploaded.");
                        })
                        .catch((error) => {
                            console.log(error.response.data);
                            console.log("The file could not be uploaded.");
                        });
                        e.target.reset();
                }}>
                <Row className="d-grid gap-3 m-5">
                    <h3> Create File Upload Area</h3>
                    <Row className="p-2">
                        <Form.Group className="col col-sm-6">
                            <Form.Label className="text-danger">Title*</Form.Label>
                            <Form.Control
                                type="text"
                                onChange={(e) =>
                                    setName({ ...name, fileName: e.target.value })
                                } 
                            />
                        </Form.Group>
                    </Row>
                    <Row className="p-2">
                        <Form.Group className="col col-sm-4">
                            <Form.Label className="text-danger">
                                Activity Start Date*
                            </Form.Label>
                            <Form.Control type="date"
                                onChange={(e) =>
                                    setName({ ...name, startDate: e.target.value })
                                } 
                            />
                        </Form.Group>
                        <Form.Group className="col col-sm-4">
                            <Form.Label className="text-danger">
                            Activity End Date*
                            </Form.Label>
                            <Form.Control type="date"
                                 onChange={(e) =>
                                    setName({ ...name, endDate: e.target.value })
                                } 
                            />
                        </Form.Group>
                        </Row>
                        <Row className="p-2">
                        <Form.Group controlId="formGridCheckbox" className="col col-sm-7">
                                <Form.Label className="text-danger">Report Type</Form.Label>
                                <Form.Select 
                                onChange={(e) =>
                                    setName({ ...name, fileType: e.target.value })
                                }  >
                                    <option value="">Select report type</option>
                                    <option value="attendance">Attendance</option>
                                    <option value="report">Report</option>
                                    <option value="register">Registration</option>
                                </Form.Select>
                            </Form.Group>
                    </Row>
                    <Row >
                    <Card className="text-center" style={{ width: '400px', height: '200px' }}>
                        <Card.Body>
                          <Image
                            src={'/file_image.jpg'}
                            width={60}
                            height={60}
                          />
                            <Form.Group>
                              <Form.Control type="file" ref={fileInputRef} />
                            </Form.Group>
                            
                        </Card.Body>
                      </Card>
                    </Row>
                   
                </Row >
               <Form.Group className='text-center'>
                    <Button type="submit" variant="success" size="lg" active>
                        Create
                    </Button>
                </Form.Group>
            </Form>
            
        </Container>
    );
}
