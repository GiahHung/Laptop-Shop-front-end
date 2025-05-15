import axios from "../axios";

const handleGetAllProductService = (pageInput, limitInput, categoryInput) => {
  return axios.get(
    `/api/get-all-product?page=${pageInput}&limit=${limitInput}&categoryId=${categoryInput}`
  );
};

const createProductService = (data) => {
  return axios.post("/api/create-product", data);
};

const deleteProductService = (productId) => {
  return axios.delete("/api/delete-product", {
    data: {
      id: productId,
    },
  });
};

const editProductService = (dataInput) => {
  return axios.put("/api/edit-product", dataInput);
};

const handleGetProductByCategoryService = (limit, category) => {
  return axios.get(
    `/api/get-top-product?limit=${limit}&categoryId=${category}`
  );
};

const handleGetRevenueService = (time) => {
  return axios.get(`/api/get-revenue?time=${time}`);
};

const handleGetAmountOrderService = () => {
  return axios.get("/api/get-amount-order");
};

const handleGetAmountOrderNotConfirmService = () => {
  return axios.get("/api/get-order-not-confirm");
};

const handleGetRevenueTodayService = () => {
  return axios.get("/api/get-revenue-by-date");
};

const handleGetOrderService = (page, limit) => {
  return axios.get(`/api/get-order?page=${page}&limit=${limit}`);
};

const handleGetTransactionService = (id) => {
  return axios.get(`/api/get-transaction?orderId=${id}`);
};

const handleUpdateStatusService = (data) => {
  return axios.put("/api/update-status", data);
};

const handleSendEmail = (email, fullName, phoneNumber, address) => {
  return axios.post(
    `/api/send-email?email=${email}&fullName=${fullName}&phoneNumber=${phoneNumber}&address=${address}`
  );
};

export {
  handleGetAllProductService,
  handleGetProductByCategoryService,
  createProductService,
  deleteProductService,
  editProductService,
  handleGetAmountOrderNotConfirmService,
  handleGetRevenueService,
  handleGetAmountOrderService,
  handleGetRevenueTodayService,
  handleGetOrderService,
  handleGetTransactionService,
  handleUpdateStatusService,
  handleSendEmail,
};
