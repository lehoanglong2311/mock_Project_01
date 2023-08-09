import { React, useContext } from 'react';
import { Outlet } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { BrowserRouter, Route, Link, NavLink, useNavigate } from "react-router-dom";
import { UserContext } from '../../App';
import { AiFillSetting } from 'react-icons/ai'
import { GrArticle } from 'react-icons/gr'
import './Home.css'
const NavBar = () => {
    const { user } = useContext(UserContext);
    console.log("us", user);
    const token = user.token

    return (
        <div style={{ minHeight: '100vh', position: 'relative' }}>
            <Navbar bg="light" data-bs-theme="light">
                <Container>
                    <Navbar.Brand style={{ fontWeight: 'bold', color: '#5CB85C', fontFamily: 'Titillium Web, sans-serif', fontSize: '1.5rem' }} href="/">conduit</Navbar.Brand>
                    <Nav className="justify-content-end">
                        <NavLink className="nav-link" activeClassName="active" to="/">Home</NavLink>
                        {token ?
                            <>
                                <NavLink className="nav-link" activeClassName="active" to="/registers"> <span><GrArticle /> </span> New Article</NavLink>
                                <NavLink className="nav-link" activeClassName="active" to="/register"><span><AiFillSetting /> </span>Settings</NavLink>
                                <NavLink className="nav-link" activeClassName="active" to="/registers">
                                    <img src={user.image} className="rounded-circle mx-1" alt="Cinque Terre" width="30" height="30" />

                                    {user.username}</NavLink>
                            </>
                            :
                            <>
                                <NavLink className="nav-link" activeClassName="active" to="/login">Sign in</NavLink>
                                <NavLink className="nav-link" activeClassName="active" to="/register">Sign up</NavLink>
                            </>




                        }

                    </Nav>
                </Container>
            </Navbar>
            <Outlet />
            {/* <div
                style={{
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    width: '100%',
                    textAlign: 'center',
                    padding: '1rem',
                    backgroundColor: '#343a40',
                }}
            >
                <a
                    style={{
                        fontSize: '24px',
                        fontWeight: 'bold',
                        textDecoration: 'none',
                        color: 'white',
                    }}
                    href='https://github.com/gothinkster/angularjs-realworld-example-app'
                    target='_blank'
                    rel='noopener noreferrer'
                >
                    <i style={{ fontSize: '24px' }} className='fab fa-github'></i>
                    Fork on GitHub
                </a>
            </div> */}
        </div>
    );
};

export default NavBar;
