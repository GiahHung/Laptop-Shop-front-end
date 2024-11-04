import axios from "../axios";

const handleLoginService = (userEmail, userPassword) => {
  return axios.post("/api/login", { email: userEmail, password: userPassword });
};

const handleRegisterService = (userName, password, phoneNumber) => {
  return axios.post("/api/register", {
    email: userName,
    password: password,
    phoneNumber: phoneNumber,
  });
};

const createUserService = (data) => {
  return axios.post("/api/create-user",data);
};
const handleGetAllUserService = (pageInput,limitInput) => {
  return axios.get(`/api/get-all-users?page=${pageInput}&limit=${limitInput}`);
};

const handleGetAllCodeService = (type) => {
  return axios.get(`/api/get-all-code?type=${type}`);
};

const deleteUserService = (userId) => {
  return axios.delete("/api/delete-user", {
    data: {
      id: userId,
    },
  });
};

const editUserService = (dataInput) => {
  return axios.put("/api/edit-user", dataInput);
};

export {
  handleLoginService,
  handleRegisterService,
  handleGetAllUserService,
  handleGetAllCodeService,
  deleteUserService,
  editUserService,
  createUserService
};
