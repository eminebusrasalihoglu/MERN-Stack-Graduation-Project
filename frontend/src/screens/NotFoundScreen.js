import React from 'react'
import { Row,Image,Col } from 'react-bootstrap';
const NotFoundScreen = () => {
  return (
    <>
    <Row className="mt-5">
    <Col className="text-center"><h1 className='display-1'>OOPS!</h1>
    <Image src={'/notfound.png'} width={400} height={400}></Image>
    <h1 className='display-1'>404 Not Found</h1>
    </Col>
    </Row>
    </>
  )
}

export default NotFoundScreen