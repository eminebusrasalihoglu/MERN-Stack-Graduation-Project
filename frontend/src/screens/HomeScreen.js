import {React, useState,useEffect }from 'react'
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import ListGroup from 'react-bootstrap/ListGroup';
import CardGroup from 'react-bootstrap/CardGroup';
import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image'
import { announcementInfo, usersCount, deleteAnnouncement } from '../axios';
import { Button } from 'react-bootstrap';

const HomeScreen = ({user,isOpen}) => {
  const [studentCounts, setStudentCounts] = useState(0);
  const [firmCounts, setFirmCounts] = useState(0);
  const [activiteCounts, setActiviteCounts] = useState(0);
  const [announcements, setAnnouncements] = useState([]);
  useEffect(() => {
    usersCount().then((res) =>{
      setStudentCounts(res?.data.users);
      setFirmCounts(res?.data.firms);
      setActiviteCounts(res?.data.activities);
    }) .catch((error)=> {
      console.log(error);
    })
    announcementInfo().then((res) =>{
      setAnnouncements(res?.data);
    })
    .catch((error)=> {
      console.log(error);
    })
}, [announcements]);
  return (
   <>
   
   <Row className='m-5 '> 
   <CardGroup>
          <Card className="text-left">
            <Card.Body>
              <Row>
                <Col>
                  <Image fluid src={'/student.png'} width={120} height={120} />
                </Col>
                <Col>
                  <Card.Text style={{ fontSize: 20 }} className="text-center">
                  Number of Students
                  </Card.Text>
                  <Card.Text style={{ fontSize: 50 }} className="text-center">
                   {studentCounts}
                  </Card.Text>
                </Col>
              </Row>
            </Card.Body>
          </Card>
          <Card className="text-center">
            <Card.Body>
              <Row>
                <Col>
                  <Image fluid src={'/firm.png'} width={120} height={120} />
                </Col>
                <Col>
                  <Card.Text style={{ fontSize: 20 }} className="text-center">
                  Number of Companies
                  </Card.Text>
                  <Card.Text style={{ fontSize: 50 }} className="text-center">
                    {firmCounts}
                  </Card.Text>
                </Col>
              </Row>
            </Card.Body>
          </Card>
          <Card className="text-left">
            <Card.Body>
              <Row>
                <Col>
                  <Image fluid src={'/task.png'} width={120} height={120} />
                </Col>
                <Col>
                  <Card.Text style={{ fontSize: 20 }} className="text-center">
                  Number of Activities
                  </Card.Text>
                  <Card.Text style={{ fontSize: 50 }} className="text-center">
                    {activiteCounts}
                  </Card.Text>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </CardGroup>
  </Row>
  <Row className='m-5'>
                <h3 >
                    Announcements
                </h3>
                <ListGroup className="m-2" >
                 {announcements?.map((announcement) => (
                        <ListGroup.Item className='m-1' key={announcement._id}> <i className="bi bi-megaphone"></i>  {announcement.description} {user.userType === 'ACADEMIC' && ( <Button variant="light" 
                        onClick={() => {deleteAnnouncement(announcement._id);}}><i className="bi bi-trash3"></i> </Button>)} {' '} - {' '}{announcement.name} </ListGroup.Item>
                        
                         
                        ))}
                </ListGroup>
            </Row>
   </>
  )
}

export default HomeScreen