import React, { useState, useEffect } from 'react';
import { Container, ListGroup, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Trips = () => {
  const [trips, setTrips] = useState([]);

//   useEffect(() => {
//     // Fetch trips from API
//     fetch('/api/trips')
//       .then(response => response.json())
//       .then(data => setTrips(data));
//   }, []);

  return (
    <Container>
      <h2>Trips</h2>
      <Button as={Link} to="/trips/new" variant="primary" className="mb-3">Create New Trip</Button>
      <ListGroup>
        {trips.map(trip => (
          <ListGroup.Item key={trip.id}>
            <div className="d-flex justify-content-between align-items-center">
              <div>{trip.name}</div>
              <div>
                <Button as={Link} to={`/trip/${trip.id}/cabins`} variant="info" className="mr-2">View Cabins</Button>
                <Button as={Link} to={`/trips/${trip.id}/edit`} variant="secondary" className="mr-2">Edit</Button>
                <Button variant="danger">Delete</Button>
              </div>
            </div>
          </ListGroup.Item>
        ))}
      </ListGroup>
    </Container>
  );
};

export default Trips;
