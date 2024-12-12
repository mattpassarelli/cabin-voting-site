import { Button, Form } from 'react-bootstrap';
import React, { useEffect, useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import { redirect } from 'react-router-dom';
import UserAPI from '../utils/api/UserAPI';

const UserForm = ({ show, setShow, register = false }) => {
  const [validated, setValidated] = useState(false);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleClose = () => setShow(false);

  const createUser = async (event) => {
    event.preventDefault();

    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.stopPropagation();
      setValidated(true);
      return;
    }

    const response = register
      ? await UserAPI.createUser({
          email,
          first_name: firstName,
          last_name: lastName,
          password,
          password2: password,
        })
      : await UserAPI.login({ email, password });

    if (response.status === 200 || response.status === 201) {
      if (register) {
        sessionStorage.setItem('accessToken', response.data.tokens.access);
        sessionStorage.setItem('refreshToken', response.data.tokens.refresh);
      } else {
        sessionStorage.setItem('accessToken', response.data.access);
        sessionStorage.setItem('refreshToken', response.data.refresh);
      }
      localStorage.setItem('firstName', firstName);

      setShow(false);

      redirect('/home');
    } else {
      console.error('Error:', response);
    }
  };

  return (
    <Modal show={show} centered>
      <Form onSubmit={createUser} validated={validated} noValidate onHide={handleClose}>
        <Modal.Header>
          <Modal.Title>Who are you?</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Form.Group controlId='userCreation.email'>
            <Form.Label>Email</Form.Label>
            <Form.Control
              type='email'
              placeholder='IC@Weiner.com'
              autoFocus
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Form.Control.Feedback type='invalid'>Please enter an email.</Form.Control.Feedback>
          </Form.Group>
          {register && (
            <>
              <Form.Group controlId='userCreation.first_name'>
                <Form.Label>First name</Form.Label>
                <Form.Control
                  type='text'
                  placeholder='Phillip'
                  autoFocus
                  required
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                />
                <Form.Control.Feedback type='invalid'>Please enter a name.</Form.Control.Feedback>
              </Form.Group>
              <Form.Group controlId='userCreation.last_name'>
                <Form.Label>Last Name</Form.Label>
                <Form.Control
                  type='text'
                  placeholder='Fry'
                  autoFocus
                  required
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                />
                <Form.Control.Feedback type='invalid'>Please enter a name.</Form.Control.Feedback>
              </Form.Group>
            </>
          )}
          <Form.Group controlId='userCreation.password'>
            <Form.Label>Password</Form.Label>
            <Form.Control
              type='password'
              placeholder='Nibbler'
              autoFocus
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Form.Control.Feedback type='invalid'>Please enter a password.</Form.Control.Feedback>
          </Form.Group>
        </Modal.Body>

        <Modal.Footer>
          <Button variant='secondary' onClick={handleClose}>
            Close
          </Button>
          <Button variant='primary' type='submit'>
            Submit
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
};

export default UserForm;
