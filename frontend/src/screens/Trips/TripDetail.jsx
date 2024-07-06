import React, { useCallback, useState } from "react";
import { Button, Modal } from "react-bootstrap";

import { Link } from "react-router-dom";
import useRequest from "../../hooks/useRequest";
import axios from "axios";
import TripCreateModal from "../../components/Trips/TripFormModal";

const TripDetail = ({ item, fetchTrips }) => {
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [showEdit, setShowEdit] = useState(false);

  const flexStyle = {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  };

  const {
    isLoading: isDeleting,
    error: errorDeleting,
    request: deleteTrip,
  } = useRequest(
    useCallback(async () => {
      await axios.delete(`http://localhost:8000/trips/${item.id}/`);
    }, []),
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
            <Button
              as={Link}
              to={`/trip/${item.id}/cabins`}
              variant="info"
              className="mr-2"
            >
              View Cabins
            </Button>
            <Button
              variant="secondary"
              className="mr-2"
              onClick={() => setShowEdit(true)}
            >
              Edit
            </Button>
            <Button variant="danger" onClick={() => setConfirmDelete(true)}>
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
          <Button variant="secondary" onClick={() => setConfirmDelete(false)}>
            Cancel
          </Button>
          <Button variant="danger" onClick={handleDelete} disabled={isDeleting}>
            {isDeleting ? "Deleting..." : "Delete"}
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
