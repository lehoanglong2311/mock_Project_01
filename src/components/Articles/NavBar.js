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
    const username = user.username;

    return (
        <div style={{ minHeight: '100vh', position: 'relative' }}>
            <Navbar bg="light" data-bs-theme="light">
                <Container>
                    <NavLink style={{ fontWeight: 'bold', color: '#5CB85C', fontFamily: 'Titillium Web, sans-serif', fontSize: '1.5rem' }} to="/" >conduit</NavLink>
                    <Nav className="justify-content-end">
                        <NavLink className="nav-link" activeClassName="active" to="/">Home</NavLink>
                        {token ?
                            <>
                                <NavLink className="nav-link" activeClassName="active" to="/editor"> <span><GrArticle /> </span> New Article</NavLink>
                                <NavLink className="nav-link" activeClassName="active" to={`/settings/${username}`}><span><AiFillSetting /> </span>Settings</NavLink>
                                <NavLink className="nav-link" activeClassName="active" to={`/profiles/${username}`}>
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
           
        </div>
    );
};

export default NavBar;
