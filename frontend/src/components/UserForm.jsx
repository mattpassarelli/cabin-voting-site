import { Button, Form } from 'react-bootstrap';
import React, { useEffect, useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import { redirect } from 'react-router-dom';

const UserForm = () => {
  const [renderForm, setRenderForm] = useState(false);
  const [validated, setValidated] = useState(false);
  const [username, setUsername] = useState('');

  useEffect(() => {
    const checkUser = async () => {
      const storedName = localStorage.getItem('userName');

      if (!storedName) {
        setRenderForm(true);
      }
    };

    checkUser();
  }, []);

  const createUser = async (event) => {
    event.preventDefault();

    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.stopPropagation();
      setValidated(true);
      return;
    }

    const response = await fetch('https://cabin-db.mattpassarelli.net/users/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name: username }),
    });

    const data = await response.json();

    if (response.ok) {
      console.log('User created or retrieved:', data);
      localStorage.setItem('userName', username);
      setRenderForm(false);

      redirect('/home');
    } else {
      console.error('Error:', data.error);
    }
  };

  return (
    <Modal show={renderForm} backdrop='static' keyboard={false} centered>
      <Form onSubmit={createUser} validated={validated} noValidate>
        <Modal.Header>
          <Modal.Title>Who are you?</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Form.Group controlId='userCreation.name'>
            <Form.Label>Your Name</Form.Label>
            <Form.Control
              type='text'
              placeholder='IC Weiner'
              autoFocus
              required
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <Form.Control.Feedback type='invalid'>Please choose a username.</Form.Control.Feedback>
          </Form.Group>
        </Modal.Body>

        <Modal.Footer>
          <Button variant='primary' type='submit'>
            Submit
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
};

export default UserForm;
