const Review = require('../models/reviewModel');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const factory = require('./handleFactory');

exports.getAllReviews = catchAsync(async (req, res, next) => {
  let filter = {};
  if (req.params.tourId) filter = { tour: req.params.tourId };

  //Execute a query
  const reviews = await Review.find(filter);

  // Send responce
  res.status(200).json({
    status: 'success',
    results: reviews.length,
    data: {
      reviews,
    },
  });
});

exports.getReview = catchAsync(async (req, res, next) => {
  const review = await Review.findById(req.params.id);

  if (!review) {
    return next(new AppError('No review with given ID can be found', 404));
  }
  res.status(200).json({
    status: 'success',
    data: {
      review,
    },
  });
});

// exports.getReviewsByUser = catchAsync(async (req, res, next) => {
//   const reviews = Review.find({ user: req.user.id });

//   if (!reviews) {
//     return next(new AppError('No review for this user can be found', 404));
//   }

//   res.status(200).json({
//     status: 'success',
//     data: {
//       reviews,
//     },
//   });
// });

exports.setTourUserIds = (req, res, next) => {
  // Allow nested routes
  if (!req.body.tour) req.body.tour = req.params.tourId;
  if (!req.body.user) req.body.user = req.user.id;

  next();
};

exports.createReview = factory.createOne(Review);
exports.updateReview = factory.updateOne(Review);
exports.deleteReview = factory.deleteOne(Review);
