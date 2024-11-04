import axios from "../axios";

const handleGetAllProductService = (pageInput, limitInput, categoryInput) => {
  return axios.get(
    `/api/get-all-product?page=${pageInput}&limit=${limitInput}&categoryId=${categoryInput}`
  );
};

const createProductService = (data) => {
  return axios.post("/api/create-product", data);
};

const deleteProductService = (userId) => {
  return axios.delete("/api/delete-product", {
    data: {
      id: userId,
    },
  });
};

const editProductService = (dataInput) => {
  return axios.put("/api/edit-product", dataInput);
};

export { handleGetAllProductService, createProductService ,deleteProductService,editProductService};
