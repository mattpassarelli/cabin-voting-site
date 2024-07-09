import React, { useCallback, useState } from 'react';
import { Form, Modal, Button, Alert } from 'react-bootstrap';
import axios from 'axios';
import { STATE_OPTIONS } from '../../constants';
import useRequest from '../../hooks/useRequest';

const CabinFormModal = ({
  isOpen,
  handleClose,
  selectedCabin,
  isEdit = false,
  tripId,
  fetchItems,
}) => {
  const [city, setCity] = useState(isEdit ? selectedCabin.city : '');
  // alamaba is the first option and should be the default
  const [state, setState] = useState(isEdit ? selectedCabin.state : 'AL');
  const [thingsToDo, setThingsToDo] = useState(isEdit ? selectedCabin.things_to_do : '');
  const [listingUrl, setListingUrl] = useState(isEdit ? selectedCabin.listing_url : '');
  const [imageUrl, setImageUrl] = useState(isEdit ? selectedCabin.image_url : '');
  const [validated, setValidated] = useState(false);
  const [saveError, setSaveError] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);

  const addCabin = async (e) => {
    e.preventDefault();

    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      e.stopPropagation();
      setValidated(true);
      return;
    }

    const data = {
      tripId,
      city,
      state,
      things_to_do: thingsToDo,
      listing_url: listingUrl,
      image_url: imageUrl,
      submitter: localStorage.getItem('userName'),
    };

    let response = null;

    try {
      if (isEdit) {
        response = await axios.patch(
          `https://cabin-db.mattpassarelli.net/cabins/${selectedCabin.id}/`,
          data,
          {
            headers: {
              'Content-Type': 'application/json',
            },
          }
        );
      } else {
        response = await axios.post('https://cabin-db.mattpassarelli.net/cabins/', data, {
          headers: {
            'Content-Type': 'application/json',
          },
        });
      }

      if (response.status === 201) {
        setCity('');
        setState('AL');
        setImageUrl('');
        setThingsToDo('');
        setListingUrl('');

        handleClose();
        fetchItems();
      }
    } catch (error) {
      setSaveError(error.response.data);
    }
  };

  const {
    isLoading: isDeleting,
    error: errorDeleting,
    request: deleteCabin,
  } = useRequest(
    useCallback(async () => {
      await axios.delete(`https://cabin-db.mattpassarelli.net/cabins/${selectedCabin.id}/`);

      fetchItems();
      handleClose();
    }, []),
    {
      trips: [],
    }
  );

  return (
    <>
      <Modal show={isOpen} onHide={handleClose}>
        <Form onSubmit={addCabin} validated={validated} noValidate>
          <Modal.Header closeButton>
            <Modal.Title>{isEdit ? 'Edit Cabin' : 'Add Cabin'}</Modal.Title>
          </Modal.Header>

          <Modal.Body>
            <Form.Group controlId='formCity'>
              <Form.Label>City</Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter city'
                value={city}
                onChange={(e) => setCity(e.target.value)}
                required
              />
              <Form.Control.Feedback type='invalid'>Please enter a city</Form.Control.Feedback>
            </Form.Group>
            <Form.Group controlId='formState'>
              <Form.Label>State</Form.Label>
              <Form.Select
                aria-label='Default select example'
                value={state}
                onChange={(e) => setState(e.target.value)}
                required
                defaultValue={isEdit ? selectedCabin.state : 'AL'}
              >
                {STATE_OPTIONS.map((state) => (
                  <option key={state.value} value={state.value}>
                    {state.name}
                  </option>
                ))}
              </Form.Select>
              <Form.Control.Feedback type='invalid'>State is required</Form.Control.Feedback>
            </Form.Group>
            <Form.Group controlId='formThingsToDo'>
              <Form.Label>Things to Do</Form.Label>
              <Form.Control
                as='textarea'
                rows={3}
                value={thingsToDo}
                onChange={(e) => setThingsToDo(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId='formListingUrl'>
              <Form.Label>Listing URL</Form.Label>
              <Form.Control
                type='url'
                placeholder='Enter listing URL'
                value={listingUrl}
                onChange={(e) => setListingUrl(e.target.value)}
                required
              />
              <Form.Control.Feedback type='invalid'>
                A URL for the rental listing is required
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group controlId='formImageUrl'>
              <Form.Label>Image URL</Form.Label>
              <Form.Control
                type='url'
                placeholder='Enter image URL'
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
                required
              />
              <Form.Control.Feedback type='invalid'>An image URL is required</Form.Control.Feedback>
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            {isEdit && (
              <Button variant='danger' onClick={() => setConfirmDelete(true)}>
                Delete
              </Button>
            )}
            <Button variant='secondary' onClick={handleClose}>
              Close
            </Button>
            <Button variant='primary' type='submit'>
              Submit
            </Button>
          </Modal.Footer>
        </Form>
        {saveError && (
          <Alert variant='danger' dismissible>
            <Alert.Heading>Error saving Cabin</Alert.Heading>
            <p>{saveError}</p>
          </Alert>
        )}
      </Modal>

      <Modal show={confirmDelete} centered>
        <Modal.Header>
          <Modal.Title>Delete trip?</Modal.Title>
        </Modal.Header>
        <Modal.Footer>
          <Button variant='secondary' onClick={() => setConfirmDelete(false)}>
            Cancel
          </Button>
          <Button variant='danger' onClick={deleteCabin} disabled={isDeleting}>
            {isDeleting ? 'Deleting...' : 'Delete'}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default CabinFormModal;
