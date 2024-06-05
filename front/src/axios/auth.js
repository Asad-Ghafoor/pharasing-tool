import axios from "./axios";

class Routes {
  //login user
  async login(data) {
    const response = await axios.post(`/login`, data);
    console.log(response, 'auth');
    if (response && response.response?.data) return response.response.data;
    return response.data;
  }

  //register user
  async register(data) {
    const response = await axios.post(`/register`, data);
    if (response && response.response?.data) return response.response.data;
    return response.data;
  }

  //  Get Profile
  async getUserProfile(_id) {
    const response = await axios.get("/auth/Profile", _id);
    if (response && response.response?.data) return response.response.data;
    return response.data;
  }

  //  forget password
  async forgotPassword(data) {
    const response = await axios.post("/forgot-password", data);
    if (response && response.response?.data) return response.response.data;
    return response.data;
  }

  //  reset password
  async resetPassword(data) {
    const response = await axios.post(`/editUser`, data);
    console.log(response);
    if (response && response.response?.data) return response.response.data;
    return response.data;
  }

  // verify Code 

  async verification_code(verification_code) {
    const response = await axios.post("/verification", verification_code);
    if (response && response.response?.data) return response.response.data;
    return response.data;
  }
}

export default new Routes();
