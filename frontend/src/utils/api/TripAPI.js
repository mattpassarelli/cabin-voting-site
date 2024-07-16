import BaseAPI from './BaseAPI';

class TripAPI extends BaseAPI {
  getTrips() {
    return this.get('/trips/');
  }

  updateTrip(tripId, data) {
    return this.patch(`/trips/${tripId}/`, data);
  }

  createTrip(data) {
    return this.post(`/trips/`, data);
  }

  deleteTrip(tripId) {
    return this.delete(`/trips/${tripId}/`);
  }

  finalizeTrip(tripId) {
    return this.post(`/trips/${tripId}/finalize/`)
  }
}

export default new TripAPI();
