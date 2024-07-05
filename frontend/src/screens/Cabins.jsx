import React, { useState, useEffect } from 'react';
import { Container, ListGroup, Button, Modal, Form } from 'react-bootstrap';
import { Link, useParams } from 'react-router-dom';

const Cabins = () => {
  const { tripId } = useParams();
  const [cabins, setCabins] = useState([]);
  const [show, setShow] = useState(false);
  const [selectedCabin, setSelectedCabin] = useState(null);

  useEffect(() => {
    // Fetch cabins from API for the selected trip
    fetch(`/api/trip/${tripId}/cabins`)
      .then(response => response.json())
      .then(data => setCabins(data));
  }, [tripId]);

  const handleClose = () => setShow(false);
  const handleShow = (cabin) => {
    setSelectedCabin(cabin);
    setShow(true);
  };

  return (
    <Container>
      <h2>Cabins</h2>
      <Button as={Link} to={`/trip/${tripId}/cabins/new`} variant="primary" className="mb-3">Create New Cabin</Button>
      <ListGroup>
        {cabins.map(cabin => (
          <ListGroup.Item key={cabin.id}>
            <div className="d-flex justify-content-between align-items-center">
              <div>{cabin.city}, {cabin.state}</div>
              <div>
                <Button variant="info" className="mr-2" onClick={() => handleShow(cabin)}>Edit</Button>
                <Button variant="success" className="mr-2">Vote</Button>
                <Button variant="danger">Delete</Button>
              </div>
            </div>
          </ListGroup.Item>
        ))}
      </ListGroup>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Cabin</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formCity">
              <Form.Label>City</Form.Label>
              <Form.Control type="text" placeholder="Enter city" defaultValue={selectedCabin?.city} />
            </Form.Group>
            <Form.Group controlId="formState">
              <Form.Label>State</Form.Label>
              <Form.Control type="text" placeholder="Enter state" defaultValue={selectedCabin?.state} />
            </Form.Group>
            <Form.Group controlId="formThingsToDo">
              <Form.Label>Things to Do</Form.Label>
              <Form.Control as="textarea" rows={3} defaultValue={selectedCabin?.things_to_do} />
            </Form.Group>
            <Form.Group controlId="formListingUrl">
              <Form.Label>Listing URL</Form.Label>
              <Form.Control type="url" placeholder="Enter listing URL" defaultValue={selectedCabin?.listing_url} />
            </Form.Group>
            <Form.Group controlId="formImageUrl">
              <Form.Label>Image URL</Form.Label>
              <Form.Control type="url" placeholder="Enter image URL" defaultValue={selectedCabin?.image_url} />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>Close</Button>
          <Button variant="primary" onClick={handleClose}>Save Changes</Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default Cabins;
