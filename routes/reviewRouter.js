import express from "express";
import {
  createReview,
  deleteReview,
  getAllReviews,
  getApprovedReviews,
  updateReviewStatus,
} from "../controllers/reviewController.js";

const reviewRouter = express.Router();

reviewRouter.post("/", createReview);
reviewRouter.get("/", getApprovedReviews);
reviewRouter.get("/admin", getAllReviews);
reviewRouter.put("/:reviewId/status", updateReviewStatus);
reviewRouter.delete("/:reviewId", deleteReview);

export default reviewRouter;
