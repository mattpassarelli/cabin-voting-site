import axios from 'axios';

class BaseAPI {
  constructor(baseURL = process.env.REACT_APP_BACKEND_URL) {
    this.axiosInstance = axios.create({
      baseURL: baseURL,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }

  get(endpoint, params = {}) {
    return this.axiosInstance.get(endpoint, { params });
  }

  post(endpoint, data) {
    return this.axiosInstance.post(endpoint, data);
  }

  patch(endpoint, data) {
    return this.axiosInstance.patch(endpoint, data);
  }

  delete(endpoint) {
    return this.axiosInstance.delete(endpoint);
  }
}

export default BaseAPI;
