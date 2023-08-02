import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import { Col } from 'react-bootstrap';
const Home = () => {
    return (

        <>
            <div className='p-5 text-center text-white bg-success'>
                <h1 className='mb-3'>conduit</h1>
                <h5 className='mb-3'>A place to share your knowledge.</h5>
            </div>
            <Container className='mt-5'>
                <Row>
                    <Col sm={{ size: 6, order: 1, offset: 1 }}>Global Feed</Col>
                    <Col sm={{ size: 3, offset: 2, order: 2 }}>Popular Tags</Col>
                </Row>
            </Container>


            <Container className='mt-4'>
                <Row>
                    <Col sm={{ size: 6, order: 1, offset: 1 }}>DucHM</Col>
                    <Col sm={{ size: 3, offset: 2, order: 2 }}>39048390483204234</Col>
                </Row>
            </Container>
        </>
    );
};

export default Home;