import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import { Col } from 'react-bootstrap';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { useNavigate, Outlet, NavLink } from 'react-router-dom';

const Home = () => {
    return (

        <>
            <div className='p-5 text-center text-white bg-success'>
                <h1 className='mb-3'>conduit</h1>
                <h5 className='mb-3'>A place to share your knowledge.</h5>
            </div>
            {/* <Container className='mt-5'>
                <Row>
                    <Col sm={{ size: 6, order: 1, offset: 4 }}>Global Feed</Col>
                    <Col sm={{ size: 3, offset: 2, order: 2 }}>Popular Tags</Col>
                </Row>
            </Container> */}

            <div className="container">
                <div className="row">
                    <div className="col-md-10">
                        <Navbar  >
                            <Container>
                                <Nav className="me-auto">
                                    <NavLink  className="nav-link" to="/" >Global Feed</NavLink>
                                    <NavLink className="nav-link" to="/">Your Feed</NavLink>
                                </Nav>
                            </Container>
                        </Navbar>
                    </div>

                    <div className="col-md-2"> Popular Tags</div>
                </div>
            </div>
        </>
    );
};

export default Home;