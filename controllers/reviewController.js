import Review from "../models/Review.js";
import { isAdmin } from "./userController.js";

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export async function createReview(req, res) {
  try {
    const name = req.body.name?.trim();
    const email = req.body.email?.trim().toLowerCase();
    const title = req.body.title?.trim();
    const message = req.body.message?.trim();
    const rating = Number(req.body.rating);

    if (!name || !email || !title || !message) {
      return res.status(400).json({
        message: "Name, email, title and review message are required.",
      });
    }

    if (!isValidEmail(email)) {
      return res.status(400).json({ message: "Please enter a valid email address." });
    }

    if (!Number.isInteger(rating) || rating < 1 || rating > 5) {
      return res.status(400).json({ message: "Rating must be between 1 and 5." });
    }

    const review = new Review({
      name,
      email,
      title,
      message,
      rating,
      status: "pending",
      userEmail: req.user?.email || null,
    });

    await review.save();

    return res.status(201).json({
      message: "Review submitted successfully and is waiting for admin approval.",
      review,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Failed to submit review.",
      error: error.message,
    });
  }
}

export async function getApprovedReviews(req, res) {
  try {
    const reviews = await Review.find({ status: "approved" })
      .select("name title message rating createdAt")
      .sort({ createdAt: -1 });

    return res.json(reviews);
  } catch (error) {
    return res.status(500).json({
      message: "Failed to load reviews.",
      error: error.message,
    });
  }
}

export async function getAllReviews(req, res) {
  if (!isAdmin(req)) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  try {
    const reviews = await Review.find().sort({ createdAt: -1 });
    return res.json(reviews);
  } catch (error) {
    return res.status(500).json({
      message: "Failed to load reviews.",
      error: error.message,
    });
  }
}

export async function updateReviewStatus(req, res) {
  if (!isAdmin(req)) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  try {
    const { status } = req.body;

    if (!["pending", "approved", "rejected"].includes(status)) {
      return res.status(400).json({
        message: "Status must be pending, approved or rejected.",
      });
    }

    const review = await Review.findByIdAndUpdate(
      req.params.reviewId,
      { status },
      { new: true, runValidators: true }
    );

    if (!review) {
      return res.status(404).json({ message: "Review not found." });
    }

    return res.json({
      message: `Review ${status} successfully.`,
      review,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Failed to update review status.",
      error: error.message,
    });
  }
}

export async function deleteReview(req, res) {
  if (!isAdmin(req)) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  try {
    const review = await Review.findByIdAndDelete(req.params.reviewId);

    if (!review) {
      return res.status(404).json({ message: "Review not found." });
    }

    return res.json({ message: "Review deleted successfully." });
  } catch (error) {
    return res.status(500).json({
      message: "Failed to delete review.",
      error: error.message,
    });
  }
}
