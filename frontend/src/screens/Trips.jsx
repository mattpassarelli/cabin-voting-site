import axios from "axios";
import React, { useCallback, useEffect, useState } from "react";
import {
  Button,
  Container,
  Form,
  ListGroup,
  Modal,
  Spinner,
} from "react-bootstrap";
import { Link } from "react-router-dom";

import useRequest from "../hooks/useRequest";

const Trips = () => {
  const [open, setOpen] = useState(false);
  const [validated, setValidated] = useState(false);
  const [tripYear, setTripYear] = useState(0);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());

  const {
    result: { trips },
    isLoading,
    error,
    request: fetchTrips,
  } = useRequest(
    useCallback(async () => {
      const response = await axios.get("http://localhost:8000/trips/");

      return {
        trips: response.data,
      };
    }, []),
    {
      trips: [],
    }
  );

  useEffect(() => {
    fetchTrips();
  }, []);

  const resetForm = () => {
    setOpen(false);
    setTripYear(false);
    setStartDate(false);
    setEndDate(false);
  };

  const editConfig = (item) => {
    setTripYear(item.year);
    setEndDate(item.end_date);
    setStartDate(item.start_date);
    setOpen(true);
  };

  const submitNewTrip = async (event) => {
    event.preventDefault();

    const form = event.currentTarget;
    if (form.checkValidity() === false || tripYear < new Date().getFullYear()) {
      event.stopPropagation();
      return;
    }
    setValidated(true);

    const data = {
      year: tripYear,
      start_date: startDate,
      end_date: endDate,
    };

    const response = await axios.post("http://localhost:8000/trips/", data, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.status === 201) {
      resetForm();
    } else {
      console.log("There was an error");
      console.log(response);
    }
  };

  return (
    <Container>
      <h2>Trips</h2>
      <Button variant="primary" className="mb-3" onClick={() => setOpen(true)}>
        Create New Trip
      </Button>
      {isLoading ? (
        <Spinner />
      ) : (
        <ListGroup>
          {trips.map((trip) => {
            return (
              <ListGroup.Item key={trip.id}>
                <div className="d-flex justify-content-between align-items-center">
                  <div>{trip.year}</div>
                  <div>
                    <Button
                      as={Link}
                      to={`/trip/${trip.id}/cabins`}
                      variant="info"
                      className="mr-2"
                    >
                      View Cabins
                    </Button>
                    <Button
                      variant="secondary"
                      className="mr-2"
                      onClick={() => editConfig(trip)}
                    >
                      Edit
                    </Button>
                    <Button variant="danger">Delete</Button>
                  </div>
                </div>
              </ListGroup.Item>
            );
          })}
        </ListGroup>
      )}

      <Modal show={open} backdrop="static" keyboard={false} centered>
        <Form onSubmit={submitNewTrip} validated={validated} noValidate>
          <Modal.Header>
            <Modal.Title>Create new Trip</Modal.Title>
          </Modal.Header>

          <Modal.Body>
            <Form.Group controlId="userCreation.name">
              <Form.Label>Trip Year</Form.Label>
              <Form.Control
                type="number"
                placeholder="2024"
                autoFocus
                required
                value={tripYear}
                onChange={(e) => setTripYear(e.target.value)}
                min={new Date().getFullYear()}
              />
              <Form.Control.Feedback type="invalid">
                {tripYear < new Date().getFullYear()
                  ? "Year cannot be a previous year"
                  : "Please enter a year."}
              </Form.Control.Feedback>

              <Form.Label>When does it start?</Form.Label>
              <Form.Control
                type="date"
                autoFocus
                required
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
              />
              <Form.Control.Feedback type="invalid">
                Please enter a year.
              </Form.Control.Feedback>

              <Form.Label>When does it end?</Form.Label>
              <Form.Control
                type="date"
                autoFocus
                required
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
              />
              <Form.Control.Feedback type="invalid">
                Please enter a year.
              </Form.Control.Feedback>
            </Form.Group>
          </Modal.Body>

          <Modal.Footer>
            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </Container>
  );
};

export default Trips;
