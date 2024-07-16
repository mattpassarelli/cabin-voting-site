import React, { useCallback, useEffect, useState } from 'react';
import { Container, Button, Row, Col } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import CabinFormModal from '../../components/Cabins/CabinFormModal';


import useRequest from '../../hooks/useRequest';
import CabinItem from './CabinItem';
import CabinAPI from '../../utils/api/CabinAPI';

const Cabins = () => {
  const { tripId } = useParams();
  const [showForm, setShowForm] = useState(false);
  const userName = localStorage.getItem('userName')

  const {
    result: { cabins },
    isLoading,
    request: fetchCabins,
  } = useRequest(
    useCallback(async () => {
      const response = await CabinAPI.getCabinsByTripId(tripId);

      return {
        cabins: response.data.cabins,
      };
    }, [tripId]),
    { cabins: [] }
  );

  useEffect(() => {
    fetchCabins();
  }, [fetchCabins]);

  return (
    <Container>
      <h2>Cabins</h2>
      <Button variant='primary' className='mb-3' onClick={() => setShowForm(true)}>
        Create New Cabin
      </Button>
      <Row lg={3}>
        {!isLoading &&
          cabins.map((cabin) => {
            const votedFor = cabin.votes.some((vote)=> vote.name === userName);
            return (
              <Col className='d-flex'>
                <CabinItem cabin={cabin} fetchCabins={fetchCabins} tripId={tripId} votedFor={votedFor} />
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
