import BaseAPI from './BaseAPI';

class UserAPI extends BaseAPI {
  createUser(userData) {
    return this.post(`/users/`, userData);
  }
}

export default new UserAPI();
