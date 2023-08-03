import React, { useEffect, useState } from 'react';
import Container from 'react-bootstrap/Container';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import { Row, Col } from 'react-bootstrap';

const Setting = ({ username }) => {
  const [userData, setUserData] = useState({
    image: '',
    username: '',
    bio: '',
    email: '',
    password: '',
  });

  useEffect(() => {
    // Use the `username` prop in the API URL
    const fetchUserData = async () => {
      try {
        const response = await axios.get(`https://api.realworld.io/api/profiles/${username}`);
        setUserData(response.data.profile);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, [username]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData((prevUserData) => ({
      ...prevUserData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.put(`https://api.realworld.io/api/profiles/${username}`, { user: userData });
      alert('Settings updated successfully!');
    } catch (error) {
      console.error('Error updating settings:', error);
      alert('Failed to update settings. Please try again later.');
    }
  };


  return (
    <>
      <Container>
        <Row>
        <Col xs="3"></Col>
          <Col xs="6">
          <h2 className='p-5 text-center'>Your Settings</h2>
        {userData && (
          <form onSubmit={handleSubmit}>
            <div className='mb-3'>
              <label htmlFor='image' className='form-label'>
                Profile Image URL
              </label>
              <input
                type='text'
                className='form-control'
                id='image'
                name='image'
                value={userData.image || ''}
                onChange={handleChange}
              />
            </div>

            <div className='mb-3'>
              <label htmlFor='username' className='form-label'>
                Username
              </label>
              <input
                type='text'
                className='form-control'
                id='username'
                name='username'
                value={userData.username ?? ''}
                onChange={handleChange}
              />
            </div>

            <div className='mb-3'>
              <label htmlFor='bio' className='form-label'>
                Bio
              </label>
              <input
                type='text'
                className='form-control'
                id='bio'
                name='bio'
                value={userData.bio ?? ''}
                onChange={handleChange}
              />
            </div>

            <div className='mb-3'>
              <label htmlFor='email' className='form-label'>
                Email
              </label>
              <input
                type='email'
                className='form-control'
                id='email'
                name='email'
                value={userData.email ?? ''}
                onChange={handleChange}
              />
            </div>

            <div className='mb-3'>
              <label htmlFor='password' className='form-label'>
                New Password
              </label>
              <input
                type='password'
                className='form-control'
                id='password'
                name='password'
                value={userData.password ?? ''}
                onChange={handleChange}
              />
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <Button type='submit' variant="primary">Update Settings</Button>
              <Button variant="outline-danger" className='text-success'>Or Click here to logout</Button>
            </div>
          </form>
        )}
          </Col>
          <Col xs="3"></Col>
        </Row>
        

      </Container>
    </>
  );

};

export default Setting;
