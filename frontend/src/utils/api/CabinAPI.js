import BaseAPI from './BaseAPI';

class CabinAPI extends BaseAPI {
  getCabinsByTripId(tripId) {
    return this.get(`/trips/${tripId}/`);
  }

  updateCabin(cabinId, data) {
    return this.patch(`/cabins/${cabinId}/`, data);
  }

  createCabin(data) {
    return this.post('/cabins/', data);
  }

  deleteCabin(cabinId) {
    return this.delete(`/cabins/${cabinId}/`);
  }

  toggleVote(cabinId, userName) {
    return this.post(`/cabins/${cabinId}/vote/`, {
      user: userName,
    });
  }
}

export default new CabinAPI();
