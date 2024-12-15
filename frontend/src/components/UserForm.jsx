import { Button, Form, Spinner } from "react-bootstrap";
import React, { useEffect, useState } from "react";
import Modal from "react-bootstrap/Modal";
import { redirect } from "react-router-dom";
import UserAPI from "../utils/api/UserAPI";

const UserForm = ({ show, setShow, register = false }) => {
  const [validated, setValidated] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitButtonText, setSubmitButtonText] = useState("Submit");

  const [loginError, setLoginError] = useState(false);

  const handleClose = () => setShow(false);

  const createUser = async (event) => {
    event.preventDefault();
    setLoginError(false);

    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.stopPropagation();
      setValidated(true);
      return;
    }

    setIsSubmitting(true);

    try {
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
          sessionStorage.setItem("accessToken", response.data.tokens.access);
          sessionStorage.setItem("refreshToken", response.data.tokens.refresh);
        } else {
          sessionStorage.setItem("accessToken", response.data.access);
          sessionStorage.setItem("refreshToken", response.data.refresh);
        }

        localStorage.setItem("firstName", response.data.first_name);

        setShow(false);
      } else {
        console.error("Error:", response);
      }
    } catch (e) {
      console.log(e);
      setLoginError(e.response.data);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Modal show={show} centered>
      <Form onSubmit={createUser} validated={validated} noValidate onHide={handleClose}>
        <Modal.Header>
          <Modal.Title>Who are you?</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Form.Group controlId="userCreation.email">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              placeholder="IC@Weiner.com"
              autoFocus
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Form.Control.Feedback type="invalid">Please enter an email.</Form.Control.Feedback>
          </Form.Group>
          {register && (
            <>
              <Form.Group controlId="userCreation.first_name">
                <Form.Label>First name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Phillip"
                  autoFocus
                  required
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                />
                <Form.Control.Feedback type="invalid">Please enter a name.</Form.Control.Feedback>
              </Form.Group>
              <Form.Group controlId="userCreation.last_name">
                <Form.Label>Last Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Fry"
                  autoFocus
                  required
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                />
                <Form.Control.Feedback type="invalid">Please enter a name.</Form.Control.Feedback>
              </Form.Group>
            </>
          )}
          <Form.Group controlId="userCreation.password">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Nibbler"
              autoFocus
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Form.Control.Feedback type="invalid">Please enter a password.</Form.Control.Feedback>
          </Form.Group>

          {loginError && (
            <span>
              <br />
              <div className="fieldError" style={{ color: "red" }}>
                {typeof loginError === "object" ? (
                  Object.keys(loginError).map((key) => {
                    return (
                      <>
                        <span>{`${key}: ${loginError[key][0]}`}</span>
                        <br />
                      </>
                    );
                  })
                ) : (
                  <span>{loginError.detail}</span>
                )}
              </div>
            </span>
          )}
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" disabled={isSubmitting} type="submit">
            {isSubmitting ? (
              <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" />
            ) : (
              <span>{submitButtonText}</span>
            )}
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
};

export default UserForm;
