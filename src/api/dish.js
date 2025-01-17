import instance from "./instance";

// getAllDishes
async function getAllDishes() {
  const response = await instance.get("/dishes");
  console.log(response);
  return response;
}

// getDishById
async function getDishById(dishId) {
  const response = await instance.get(`/dishes/${dishId}`);
  console.log(response);
  return response;
}

// createDish
async function createDish(formData) {
  console.log(formData);
  const response = await instance.post("/dishes", formData);
  console.log("create new Dish", response);
  return response.data;
}

// editDish
async function editDish(formData) {
  const { dishId } = formData;
  console.log(formData);
  const response = await instance.put(`/dishes/${dishId}`);
  console.log("edit a Dish", response);
  return response.data;
}

// deleteCuisine
async function deleteDish(formData) {
  const { dishId } = formData;
  console.log(formData);
  const response = await instance.delete(`/dishes/${dishId}`, formData);
  console.log("Deleted Dish", response);
  return response.data;
}

export {
  getAllDishes,
  getDishById,
  createDish,
  editDish,
  deleteDish,
};
