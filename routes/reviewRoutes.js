const express = require('express');
const reviewController = require('../controllers/reviewController');
const authController = require('../controllers/authController');

const router = express.Router({ mergeParams: true });

// router.delete(
//   '/deleteMyReview',
//   authController.protect,
//   reviewController.deleteMyReview
// );

// router.patch(
//   '/updateMyReview',
//   authController.protect,
//   reviewController.updateMyReview
// );

// router.get(
//   '/showUserReviews',
//   authController.protect,
//   reviewController.getReviewsByUser
// );

// router.get(
//   '/showTourReviews',
//   authController.protect,
//   reviewController.getReviewsByTour
// );

router
  .route('/')
  .get(reviewController.getAllReviews)
  .post(
    authController.protect,
    authController.restrictTo('user'),
    reviewController.setTourUserIds,
    reviewController.createReview
  );
router
  .route('/:id')
  .get(reviewController.getReview)
  .patch(authController.protect, reviewController.updateReview)
  .delete(authController.protect, reviewController.deleteReview);

module.exports = router;
