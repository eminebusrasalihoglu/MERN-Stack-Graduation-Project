import ListGroup from 'react-bootstrap/ListGroup';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image';
import { useEffect, useState } from 'react';
import { internInfo } from '../axios';
import {  useNavigate } from 'react-router-dom';
export default function ProfileScreen({user}) {
    const navigate = useNavigate();
  const [info, setInfo] = useState([]);
    useEffect(() => {
        internInfo().then((res) =>{
          setInfo(res.data);
        })
        .catch((error)=> {
          if(error.response.data.message==='Unauthorized'){navigate('/');}
        })
    
    }, []);
    return (
        <div> <Container className='m-4' >
            <Row >
                <Col >
                    <Image
                        className="img-thumbnail"
                        src={'/profile.jpg'}
                        width={200}
                        height={200}
                    ></Image>
                </Col>
                <Col xs={6}>
                    <ListGroup>
                    <ListGroup.Item>
    <h4>
        Student Number:
        <small className="text-muted"> {user.schoolNo}</small>
    </h4>
</ListGroup.Item>

<ListGroup.Item>
    <h4>
        Full Name:
        <small className="text-muted"> {user.fullname}</small>
    </h4>
</ListGroup.Item>

<ListGroup.Item>
    <h4>
        Faculty/Department:
        <small className="text-muted">
            {' '}
            Faculty of Technology/Computer Engineering
        </small>
    </h4>
</ListGroup.Item>

<ListGroup.Item>
    <h4>
        Class/Semester:
        <small className="text-muted"> 4/8</small>
    </h4>{' '}
</ListGroup.Item>

<ListGroup.Item>
    <h4>
        Email Address:
        <small className="text-muted"> {user.email}</small>
    </h4>{' '}
</ListGroup.Item>

<ListGroup.Item>
    <h4>
        Phone Number:
        <small className="text-muted"> {user.phoneNumber}</small>
    </h4>{' '}
</ListGroup.Item>

<ListGroup.Item>
    <h4>
        Company Name:
        <small className="text-muted"> {info.firmName}</small>
    </h4>{' '}
</ListGroup.Item>

<ListGroup.Item>
    <h4>
        Internship Supervisor:
        <small className="text-muted"> {info.firmOfficial}</small>
    </h4>{' '}
</ListGroup.Item>

<ListGroup.Item>
    <h4>
        Internship Start Date:
        <small className="text-muted"> {info.internshipStartDate}</small>
    </h4>{' '}
</ListGroup.Item>

<ListGroup.Item>
    <h4>
        Internship End Date:
        <small className="text-muted"> {info.internshipFinishDate}</small>
    </h4>{' '}
</ListGroup.Item>
                    </ListGroup>
                </Col>
                <Col></Col>
            </Row>
        </Container></div>
    )
}
