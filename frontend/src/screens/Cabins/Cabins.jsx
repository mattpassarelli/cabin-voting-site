import React, { useCallback, useEffect, useState } from 'react';
import { Container, Button, Row, Col } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import CabinFormModal from '../../components/Cabins/CabinFormModal';

import useRequest from '../../hooks/useRequest';
import CabinItem from './CabinItem';
import CabinAPI from '../../utils/api/CabinAPI';
import { TripAPI } from '../../utils/api';

const Cabins = () => {
  const { tripId } = useParams();
  const [showForm, setShowForm] = useState(false);
  const userName = localStorage.getItem('userName');

  const {
    result: { cabins, tripObj },
    isLoading,
    request: fetchCabins,
  } = useRequest(
    useCallback(async () => {
      const response = await CabinAPI.getCabinsByTripId(tripId);
      const trip = response.data;

      let cabinsToReturn;
      if (trip.in_final_voting_round) {
        cabinsToReturn = trip.final_round_cabins;
      } else {
        cabinsToReturn = trip.cabins;
      }

      return {
        cabins: cabinsToReturn,
        tripObj: trip,
      };
    }, [tripId]),
    { cabins: [], tripObj: {} }
  );

  const { isLoading: isFinalizingTrip, request: beginFinalRound } = useRequest(
    useCallback(async () => {
      await TripAPI.finalizeTrip(tripId);
      await fetchCabins();
    }, [tripId])
  );

  useEffect(() => {
    fetchCabins();
  }, [fetchCabins]);

  return (
    <Container>
      <h2>Cabins</h2>
      <Button variant='primary' onClick={() => setShowForm(true)}>
        Create New Cabin
      </Button>
      {/* &nbsp;
      <Button variant='outline-secondary' onClick={() => beginFinalRound()}>
        {tripObj.in_final_voting_round ? 'Undo Final Voting Round' : 'Begin Final Voting Round'}
      </Button> */}
      <br />
      <br />
      {tripObj.in_final_voting_round && (
        <div style={{ fontSize: '18px', fontStyle: 'italic' }}>
          We're in the final round of voting. Choose carefully!
        </div>
      )}
      <br />
      <br />
      <Row lg={3}>
        {!isLoading &&
          !isFinalizingTrip &&
          cabins.map((cabin) => {
            const votedFor = cabin.votes.some((vote) => vote.name === userName);
            return (
              <Col className='d-flex'>
                <CabinItem
                  cabin={cabin}
                  fetchCabins={fetchCabins}
                  tripId={tripId}
                  votedFor={votedFor}
                />
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
