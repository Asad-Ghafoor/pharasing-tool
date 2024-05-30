
import axios from "../axios";

class Routes {
  // add new Employee
  async addEmployee(data) {
    const response = await axios.post("/auth/register", data)
    
    if (response && response.response?.data) return response.response.data;
    return response.data;
  }

  // edit Employee profile
  async editEmployee(userid, data) {
    const response = await axios.patch(`/auth/editUser/${userid}`, data)

    if (response && response.response?.data) return response.response.data;
    return response.data;
  }

  // get all Employee
  async getAllProperties(pageNo, limit) {
    const response = await axios.get(`/properties?page=${pageNo}&limit=${limit}`)

    if (response && response.response?.data) return response.response.data;
    return response.data;
  }

  async getAllOffers(pageNo, limit) {
    const response = await axios.get(`/offer?page=${pageNo}&limit=${limit}`)

    if (response && response.response?.data) return response.response.data;
    return response.data;
  }

  // get Employee
  async deleteEmployee(_id) {
    const response = await axios.delete(`/auth/deleteUser/${_id}`,)

    if (response && response.response?.data) return response.response.data;
    return response.data;
  }

  async sendOffer(data) {
    const response = await axios.post(`/offer`,data)

    if (response && response.response?.data) return response.response.data;
    return response.data;
  }

}

export default new Routes();