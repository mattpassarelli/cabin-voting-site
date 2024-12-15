import React, { useCallback, useState } from 'react';
import { Button, Card, OverlayTrigger, Tooltip } from 'react-bootstrap';
import CabinFormModal from '../../components/Cabins/CabinFormModal';
import useRequest from '../../hooks/useRequest';
import CabinAPI from '../../utils/api/CabinAPI';

const CabinItem = ({ cabin, fetchCabins, tripId }) => {
  const [showEdit, setShowEdit] = useState(false);

  const buttonGroupStyle = {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  };

  const { request: toggleVote } = useRequest(
    useCallback(async () => {
      await CabinAPI.toggleVote(cabin.id);

      fetchCabins();
    }, [cabin.id, fetchCabins])
  );

  return (
    <>
      <Card className='flex-fill mb-4' key={cabin.id}>
        <a href={cabin.listing_url} target='_blank' rel='noreferrer'>
          <Card.Img
            variant='top'
            style={{
              maxHeight: '200px',
              objectFit: 'cover',
            }}
            src={cabin.image_url}
          />
        </a>
        <Card.Body>
          <Card.Title>
            <div style={buttonGroupStyle}>
              <a href={cabin.listing_url} target='_blank' rel='noreferrer'>
                {cabin.city}, {cabin.state}
              </a>
              <div>
                <span style={{ fontSize: '.9em' }}>{`$${cabin.price}/night`}</span>
                &nbsp;
                <OverlayTrigger
                  overlay={
                    <Tooltip id='tooltip'>
                      Votes:
                      <br />
                      {cabin.votes.map((user) => {
                        return <span>{user.first_name}</span>;
                      })}
                    </Tooltip>
                  }
                >
                  <span className='d-inline-block'>
                    <Button variant={'outline-secondary'} onClick={toggleVote}>
                      {`Vote: ${cabin.votes.length}`}
                    </Button>
                  </span>
                </OverlayTrigger>
              </div>
            </div>
          </Card.Title>
          <Card.Text>{cabin.things_to_do}</Card.Text>
          <div style={buttonGroupStyle}>
            {/* <span>Submitted by: {cabin.submitter}</span> */}
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
