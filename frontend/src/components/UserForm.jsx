import { Button, Form } from 'react-bootstrap';
import React, { useEffect, useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import { redirect } from 'react-router-dom';
import UserAPI from '../utils/api/UserAPI';

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

    const response = await UserAPI.createUser({ name: username });

    if (response.status === 200 || response.status === 201) {
      localStorage.setItem('userName', username);
      setRenderForm(false);

      redirect('/home');
    } else {
      console.error('Error:', response);
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
