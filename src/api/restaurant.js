import instance from "./instance";

// getAllRestaurants
async function getAllRestaurants() {
  const response = await instance.get("/restaurants");
  console.log(response);
  return response;
}

// getRestaurantById
async function getRestaurantById(restaurantId) {
  const response = await instance.get(`/restaurants/${restaurantId}`);
  console.log(response);
  return response;
}

// createRestaurant
async function createRestaurant(formData) {
  console.log(formData);
  const response = await instance.post("/restaurants", formData);
  console.log("Created Restaurant", response);
  return response.data;
}

// editRestaurant
async function editRestaurant(formData) {
  const { restaurantId } = formData;
  console.log(formData);
  const response = await instance.put(`/restaurants/${restaurantId}`, {  });
  console.log("Editied Restaurant", response);
  return response.data;
}

// deleteRestaurant
async function deleteRestaurant(formData) {
  const { restaurantId } = formData;
  console.log(formData);
  const response = await instance.delete(`/restaurants/${restaurantId}`, formData);
  console.log("Deleted Restaurant", response);
  return response.data;
}

export {
  getAllRestaurants,
  getRestaurantById,
  createRestaurant,
  editRestaurant,
  deleteRestaurant,
};
