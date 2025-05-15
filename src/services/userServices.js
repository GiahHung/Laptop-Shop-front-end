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
  return axios.post("/api/create-user", data);
};
const handleGetAllUserService = (pageInput, limitInput) => {
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

// ------------cart
const handleGetCartService = (userId) => {
  return axios.get(`/api/get-cart?userId=${userId}`);
};
const handleEastCartService = (userId, localProduct) => {
  return axios.post("/api/get-async-cart", { userId, localProduct });
};

const increaseQuantityService = (dataInput) => {
  return axios.put("/api/increase-quantity", dataInput);
};
const decreaseQuantityService = (dataInput) => {
  return axios.put("/api/decrease-quantity", dataInput);
};

const addToCartService = (data) => {
  return axios.post("/api/add-product-to-cart", data);
};

const deleteCartService = (cartId) => {
  return axios.delete("/api/delete-product-in-cart", {
    data: {
      id: cartId,
    },
  });
};

//payment
const saveOrder = (data) =>{
  return axios.post("/api/save-order", data);
}
const saveDetailOrder = (orderId,data) =>{
  return axios.post(`/api/save-detail-order?orderId=${orderId}`, data);
}

const loginWithGoogle = (token) => {
  return axios.post("/api/google-login", {token});
};

const handleGetUserOrderService = (userId) =>{
  return axios.get(`/api/get-user-order?userId=${userId}`);
}

const handleGetAllProductService = (categoryId) => {
  return axios.get(`/api/get-all-product-category?categoryId=${categoryId}`);
};

export {
  handleLoginService,
  handleRegisterService,
  handleGetAllUserService,
  handleGetAllCodeService,
  deleteUserService,
  editUserService,
  createUserService,
  handleGetCartService,
  increaseQuantityService,
  decreaseQuantityService,
  addToCartService,
  deleteCartService,
  handleEastCartService,
  saveOrder,
  saveDetailOrder,
  loginWithGoogle,
  handleGetUserOrderService,
  handleGetAllProductService,
};
