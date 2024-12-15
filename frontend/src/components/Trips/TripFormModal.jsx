import React, { useState, useCallback } from "react";
import { Alert, Button, Form, Modal } from "react-bootstrap";
import useRequest from "../../hooks/useRequest";
import { TripAPI } from "../../utils/api";

const TripFormModal = ({ isOpen, closeModal, item, reloadTrips }) => {
  const [validated, setValidated] = useState(false);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [tripName, setTripName] = useState("");

  const resetForm = () => {
    setStartDate(false);
    setEndDate(false);
    setValidated(false);
    setTripName("");
  };

  const { error: saveError, request: submitTrip } = useRequest(
    useCallback(async (event) => {
      event.preventDefault();

      const form = event.currentTarget;
      if (form.checkValidity() === false) {
        event.stopPropagation();
        setValidated(true);
        return;
      }

      const data = {
        start_date: new Date(startDate).toISOString().split("T")[0],
        end_date: new Date(endDate).toISOString().split("T")[0],
        name: event.target[0].value, // this is annoying workaround right now
      };

      await TripAPI.createTrip(data);

      resetForm();
      reloadTrips();
      closeModal();
    }, []),
    []
  );

  return (
    <Modal
      show={isOpen}
      centered
      onBackdropClick={() => {
        resetForm();
        closeModal();
      }}
    >
      <Form onSubmit={submitTrip} validated={validated} noValidate>
        <Modal.Header>
          <Modal.Title>Create new Trip</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Form.Group controlId="trip.name">
            <Form.Label>Name the trip</Form.Label>
            <Form.Control
              placeholder="Fun fun fun"
              autoFocus
              required
              value={tripName}
              onChange={(e) => setTripName(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="trip.start">
            <Form.Label>When does it start?</Form.Label>
            <Form.Control
              type="date"
              autoFocus
              required
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
            />
            <Form.Control.Feedback type="invalid">Please enter a date.</Form.Control.Feedback>
          </Form.Group>
          <Form.Group controlId="trip.end">
            <Form.Label>When does it end?</Form.Label>
            <Form.Control
              type="date"
              autoFocus
              required
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
            />
            <Form.Control.Feedback type="invalid">Please enter a date.</Form.Control.Feedback>
          </Form.Group>
        </Modal.Body>

        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => {
              resetForm();
              closeModal();
            }}
          >
            Cancel
          </Button>
          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Modal.Footer>
      </Form>
      {saveError && (
        <Alert variant="danger" dismissible>
          <Alert.Heading>Error saving Trip</Alert.Heading>
          <p>{saveError.message}</p>
        </Alert>
      )}
    </Modal>
  );
};

export default TripFormModal;
