import React, { useCallback, useEffect, useState } from 'react';
import { Container, Button, Card } from 'react-bootstrap';
import { Link, useParams } from 'react-router-dom';
import CabinFormModal from '../../components/Cabins/CabinFormModal';

import axios from 'axios';

import useRequest from '../../hooks/useRequest';

const Cabins = () => {
  const { tripId } = useParams();
  const [showForm, setShowForm] = useState(false);

  const {
    result: { cabins },
    isLoading,
    error,
    request: fetchCabins,
  } = useRequest(
    useCallback(async () => {
      const response = axios.get(`http://localhost:8000/trips/${tripId}/cabins`);

      return {
        cabins: response.data,
      };
    }, []),
    { cabins: [] },
  );

  useEffect(() => {
    fetchCabins();
  }, []);

  return (
    <Container>
      <h2>Cabins</h2>
      <Button variant='primary' className='mb-3' onClick={() => setShowForm(true)}>
        Create New Cabin
      </Button>
      <Row lg={3}>
        {cabins.map((cabin) => {
          return (
            <Col className='d-flex'>
              <Card className='flex-fill' key={cabin.id}>
                <Card.Img variant='top' src={'#'} />
                <Card.Body>
                  <Card.Title>
                    {cabin.city}, {cabin.state}
                  </Card.Title>
                  <Card.Text>{cabin.things_to_do}</Card.Text>
                  <Button variant='primary'>Add to cart</Button>
                </Card.Body>
              </Card>
            </Col>
          );
        })}
      </Row>
      <CabinFormModal
        isOpen={showForm}
        handleClose={() => setShowForm(false)}
        tripId={tripId}
        fetchItems={fetchCabins}
      />
    </Container>
  );
};

export default Cabins;
