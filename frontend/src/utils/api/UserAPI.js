import BaseAPI from "./BaseAPI";

class UserAPI extends BaseAPI {
  createUser(userData) {
    return this.post(`/auth/register/`, userData);
  }

  login(userData) {
    return this.post(`/auth/login/`, userData);
  }
}

export default new UserAPI();
