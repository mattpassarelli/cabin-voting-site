import React, { useCallback, useState } from 'react';
import { Button, Modal } from 'react-bootstrap';

import { Link } from 'react-router-dom';
import useRequest from '../../hooks/useRequest';
import TripCreateModal from '../../components/Trips/TripFormModal';
import { TripAPI } from '../../utils/api';

const TripDetail = ({ item, fetchTrips }) => {
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [showEdit, setShowEdit] = useState(false);

  const flexStyle = {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  };

  const { isLoading: isDeleting, request: deleteTrip } = useRequest(
    useCallback(async () => {
      await TripAPI.deleteTrip(item.id);
    }, [item.id]),
    {
      trips: [],
    }
  );

  const handleDelete = async () => {
    await deleteTrip();
    setConfirmDelete(false);
    fetchTrips();
  };

  return (
    <>
      <tr>
        <td>{item.year}</td>
        <td>{new Date(item.start_date).toLocaleDateString()}</td>
        <td>{new Date(item.end_date).toLocaleDateString()}</td>
        <div>
          <div style={flexStyle}>
            <Button as={Link} to={`/trips/${item.id}/cabins`} variant='info' className='mr-2'>
              View Trip Details
            </Button>
            <Button variant='secondary' className='mr-2' onClick={() => setShowEdit(true)}>
              Edit
            </Button>
            <Button variant='danger' onClick={() => setConfirmDelete(true)}>
              Delete
            </Button>
          </div>
        </div>
      </tr>
      <Modal show={confirmDelete} centered>
        <Modal.Header>
          <Modal.Title>Delete trip?</Modal.Title>
        </Modal.Header>
        <Modal.Footer>
          <Button variant='secondary' onClick={() => setConfirmDelete(false)}>
            Cancel
          </Button>
          <Button variant='danger' onClick={handleDelete} disabled={isDeleting}>
            {isDeleting ? 'Deleting...' : 'Delete'}
          </Button>
        </Modal.Footer>
      </Modal>

      <TripCreateModal
        isOpen={showEdit}
        isEdit
        item={item}
        closeModal={() => setShowEdit(false)}
        reloadTrips={fetchTrips}
      />
    </>
  );
};

export default TripDetail;
