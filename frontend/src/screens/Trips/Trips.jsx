import React, { useCallback, useEffect, useState } from "react";
import { Button, Container, Spinner, Table } from "react-bootstrap";

import useRequest from "../../hooks/useRequest";
import TripDetail from "./TripDetail";
import TripFormModal from "../../components/Trips/TripFormModal";
import { TripAPI } from "../../utils/api";

const Trips = () => {
  const [open, setOpen] = useState(false);

  const {
    result: { trips },
    isLoading,
    request: fetchTrips,
  } = useRequest(
    useCallback(async () => {
      const response = await TripAPI.getTrips();

      return {
        trips: response.data.results,
      };
    }, []),
    {
      trips: [],
    }
  );

  useEffect(() => {
    fetchTrips();
  }, [fetchTrips]);

  return (
    <Container>
      <h2>Trips</h2>
      <Button variant="primary" className="mb-3" onClick={() => setOpen(true)}>
        Create New Trip
      </Button>
      {isLoading ? (
        <Spinner />
      ) : (
        <Table hover responsive striped>
          <thead>
            <th>Name</th>
            <th>Start Date</th>
            <th>End Date</th>
            <th>Actions</th>
          </thead>
          <tbody>
            {trips.map((trip) => (
              <TripDetail item={trip} fetchTrips={fetchTrips} />
            ))}
          </tbody>
        </Table>
      )}

      <TripFormModal isOpen={open} closeModal={() => setOpen(false)} reloadTrips={fetchTrips} />
    </Container>
  );
};

export default Trips;
