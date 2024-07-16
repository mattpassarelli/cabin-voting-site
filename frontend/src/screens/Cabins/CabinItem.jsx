import React, { useCallback, useState } from 'react';
import { Button, Card } from 'react-bootstrap';
import CabinFormModal from '../../components/Cabins/CabinFormModal';
import useRequest from '../../hooks/useRequest';
import CabinAPI from '../../utils/api/CabinAPI';

const CabinItem = ({ cabin, fetchCabins, tripId, votedFor }) => {
  const [showEdit, setShowEdit] = useState(false);

  const buttonGroupStyle = {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  };

  const {
    request: toggleVote,
  } = useRequest(
    useCallback(async () => {
      await CabinAPI.toggleVote(cabin.id, localStorage.getItem('userName'));

      fetchCabins();
    }, [cabin.id, fetchCabins])
  );

  return (
    <>
      <Card className='flex-fill mb-4' key={cabin.id}>
        <Card.Img
          variant='top'
          style={{
            maxHeight: '200px',
            objectFit: 'cover'
          }}
          src={cabin.image_url}
        />
        <Card.Body>
          <Card.Title>
            <div style={buttonGroupStyle}>
              {cabin.city}, {cabin.state}
              <div>
                <span style={{ fontSize: '.9em' }}>{`$${cabin.price}/night`}</span>
                &nbsp;
                <Button variant={votedFor ? "success" : 'outline-secondary'} onClick={toggleVote}>
                  {`${votedFor ? "Voted" :"Vote"}: ${cabin.votes.length}`}
                </Button>
              </div>
            </div>
          </Card.Title>
          <Card.Text>{cabin.things_to_do}</Card.Text>
          <div style={buttonGroupStyle}>
            <a href={cabin.listing_url} target='_blank' rel='noreferrer'>
              Listing
            </a>
            <Button variant='secondary' onClick={() => setShowEdit(true)}>
              Edit
            </Button>
          </div>
        </Card.Body>
      </Card>
      <CabinFormModal
        handleClose={() => {
          setShowEdit(false);
        }}
        fetchItems={fetchCabins}
        isOpen={showEdit}
        selectedCabin={cabin}
        isEdit
        tripId={tripId}
      />
    </>
  );
};

export default CabinItem;
