import axios from 'axios';
import React, { useState, useCallback } from 'react';
import { Alert, Button, Form, Modal } from 'react-bootstrap';
import useRequest from '../../hooks/useRequest';

const TripFormModal = ({ isOpen, closeModal, isEdit = false, item, reloadTrips }) => {
  const [validated, setValidated] = useState(false);
  const [tripYear, setTripYear] = useState(isEdit ? item.year : 0);
  const [startDate, setStartDate] = useState(isEdit ? item.start_date : new Date());
  const [endDate, setEndDate] = useState(isEdit ? item.end_date : new Date());
  const [tripId, setTripId] = useState(isEdit ? item.id : 0);

  const resetForm = () => {
    setTripYear(false);
    setStartDate(false);
    setEndDate(false);
    setTripId(0);
    setValidated(false);
  };

  const {
    isLoading: isSubmitting,
    error: saveError,
    request: submitTrip,
  } = useRequest(
    useCallback(async (event) => {
      event.preventDefault();

      const form = event.currentTarget;
      if (form.checkValidity() === false || tripYear < new Date().getFullYear()) {
        event.stopPropagation();
        setValidated(true);
        return;
      }

      const data = {
        year: tripYear,
        start_date: startDate,
        end_date: endDate,
      };

      if (isEdit) {
        await axios.patch(`http://localhost:8000/trips/${tripId}/`, data, {
          headers: {
            'Content-Type': 'application/json',
          },
        });
      } else {
        await axios.post('http://localhost:8000/trips/', data, {
          headers: {
            'Content-Type': 'application/json',
          },
        });
      }

      resetForm();
      reloadTrips();
      closeModal();
    }),
    [],
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
          <Form.Group controlId='userCreation.name'>
            <Form.Label>Trip Year</Form.Label>
            <Form.Control
              type='number'
              placeholder='2024'
              autoFocus
              required
              value={tripYear}
              onChange={(e) => setTripYear(e.target.value)}
              min={new Date().getFullYear()}
            />
            <Form.Control.Feedback type='invalid'>
              {tripYear < new Date().getFullYear()
                ? 'Year cannot be a previous year'
                : 'Please enter a year.'}
            </Form.Control.Feedback>

            <Form.Label>When does it start?</Form.Label>
            <Form.Control
              type='date'
              autoFocus
              required
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
            />
            <Form.Control.Feedback type='invalid'>Please enter a year.</Form.Control.Feedback>

            <Form.Label>When does it end?</Form.Label>
            <Form.Control
              type='date'
              autoFocus
              required
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
            />
            <Form.Control.Feedback type='invalid'>Please enter a year.</Form.Control.Feedback>
          </Form.Group>
        </Modal.Body>

        <Modal.Footer>
          <Button
            variant='secondary'
            onClick={() => {
              resetForm();
              closeModal();
            }}
          >
            Cancel
          </Button>
          <Button variant='primary' type='submit'>
            Submit
          </Button>
        </Modal.Footer>
      </Form>
      {saveError && (
        <Alert variant='danger' dismissible>
          <Alert.Heading>Error saving Trip</Alert.Heading>
          {saveError.status === 409 && <p>A trip with that year alredy exists</p>}
          <p>{saveError.message}</p>
        </Alert>
      )}
    </Modal>
  );
};

export default TripFormModal;
