import instance from "./instance";

// getAllRestaurantReviews
async function getAllRestaurantReviews() {
  const response = await instance.get("/restaurantReviews");
  console.log(response);
  return response;
}

// getRestaurantReviewById
async function getRestaurantReviewById(restaurantId) {
  const response = await instance.get(`/restaurantReviews/${restaurantReviewId}`);
  console.log(response);
  return response;
}

// createRestaurantReview
async function createRestaurantReview(formData) {
  console.log(formData);
  const response = await instance.post("/restaurantReviews", formData);
  console.log("Created Restaurant Review", response);
  return response.data;
}

// editRestaurantReview
async function editRestaurantReview(formData) {
  const { restaurantReviewId } = formData;
  console.log(formData);
  const response = await instance.put(`/restaurantReviews/${restaurantReviewId}`, { name, file });
  console.log("Editied Restaurant Review", response);
  return response.data;
}

// deleteRestaurant
async function deleteRestaurantReview(formData) {
  const { restaurantReviewId } = formData;
  console.log(formData);
  const response = await instance.delete(`/restaurantReviews/${restaurantReviewId}`, formData);
  console.log("Deleted Restaurant Review", response);
  return response.data;
}

export {
  getAllRestaurantReviews,
  getRestaurantReviewById,
  createRestaurantReview,
  editRestaurantReview,
  deleteRestaurantReview,
};
