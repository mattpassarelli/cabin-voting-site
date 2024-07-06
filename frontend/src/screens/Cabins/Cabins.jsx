import React, { useCallback, useEffect, useState } from 'react';
import { Container, Button } from 'react-bootstrap';
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
            const response = axios.get(
                `http://localhost:8000/trips/${tripId}/cabins`
            );

            return {
                cabins: response.data,
            };
        }, []),
        { cabins: [] }
    );

    useEffect(() => {
        fetchCabins();
    }, []);

    return (
        <Container>
            <h2>Cabins</h2>
            <Button
                variant="primary"
                className="mb-3"
                onClick={() => setShowForm(true)}
            >
                Create New Cabin
            </Button>
            Cabins here
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
