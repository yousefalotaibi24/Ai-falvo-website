import instance from "./instance";

// getAllCuisines
async function getAllCuisines() {
  const response = await instance.get("/cuisines");
  console.log(response);
  return response;
}

// getCuisineById
async function getCuisineById(cuisineId) {
  const response = await instance.get(`/cuisines/${cuisineId}`);
  console.log(response);
  return response;
}

// createCuisine
async function createCuisine(formData) {
  console.log(formData);
  const response = await instance.post("/cuisines", formData);
  console.log("addCategory", response);
  return response.data;
}

// editCuisine
async function editCuisine(formData) {
  const { cuisineId, name, file } = formData;
  console.log(formData);
  const response = await instance.put(`/cuisines/${cuisineId}`, { name, file });
  console.log("addCategory", response);
  return response.data;
}

// addRestaurantToCuisine
async function addRestaurantToCuisine(formData) {
  const { cuisineId } = formData;
  console.log(formData);
  const response = await instance.put(`/cuisines/${cuisineId}`, formData);
  console.log("addCategory", response);
  return response.data;
}

// deleteCuisine
async function deleteCuisine(formData) {
  const { cuisineId } = formData;
  console.log(formData);
  const response = await instance.delete(`/cuisines/${cuisineId}`, formData);
  console.log("addCategory", response);
  return response.data;
}

export {
  getAllCuisines,
  getCuisineById,
  createCuisine,
  editCuisine,
  addRestaurantToCuisine,
  deleteCuisine,
};
