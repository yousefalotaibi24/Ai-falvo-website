import instance from "./instance";

// getAllDishReviews
async function getAllDishReviews() {
  const response = await instance.get("/dishreviews");
  console.log(response);
  return response;
}

// getDishReviewById
async function getDishReviewById(dishReviewId) {
  const response = await instance.get(`/dishreviews/${dishReviewId}`);
  console.log(response);
  return response;
}

// createDishReview
async function createDishReview(formData) {
  console.log(formData);
  const response = await instance.post("/dishreviews", formData);
  console.log("created new Dish Review", response);
  return response.data;
}

// editDishReview
async function editDishReview(formData) {
  const { dishReviewId } = formData;
  console.log(formData);
  const response = await instance.put(`/dishreviews/${dishReviewId}`);
  console.log("edit a Dish", response);
  return response.data;
}

// deleteDishReview
async function deleteDishReview(formData) {
  const { dishReviewId } = formData;
  console.log(formData);
  const response = await instance.delete(`/dishreviews/${dishReviewId}`, formData);
  console.log("Deleted Dish", response);
  return response.data;
}

export {
  getAllDishReviews,
  getDishReviewById,
  createDishReview,
  editDishReview,
  deleteDishReview,
};
