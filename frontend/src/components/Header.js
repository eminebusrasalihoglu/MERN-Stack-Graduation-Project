import React from 'react'
import { Col, Row, Dropdown, Image,Button } from 'react-bootstrap';
const Header = ({ user, setUser,toggle }) => {
    return (
        <Row className="App-header" > 
            <Col ><Button variant="outline-light" onClick={toggle}><i class="bi bi-border-width"></i>
        </Button></Col>
            <Col sm={2} className='text-center mt-3' >
                <Dropdown >
                    <Dropdown.Toggle variant="#25316D" id="dropdown-basic" >
                        <Image className='img-thumbnail' src={'/profile.jpg'} width={70} height={70}></Image>

                    </Dropdown.Toggle>

                    <Dropdown.Menu className='bg-light'> 
                    <Dropdown.Item><i class="bi bi-person-fill"></i>{' '}{user.fullname}</Dropdown.Item>
                        <Dropdown.Item   href="/"onClick={(e) => {
              localStorage.removeItem("user");
              localStorage.removeItem("accessToken");
              setUser(null);
            }}><i class="bi bi-door-closed-fill"></i>{' '}Logout</Dropdown.Item>
            
                    </Dropdown.Menu>
                </Dropdown>
            </Col>
        </Row>
    )
}

export default Header