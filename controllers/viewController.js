const Tour = require('../models/tourModel');
const catchAsync = require('../utils/catchAsync');

exports.getOverview = catchAsync(async (req, res, next) => {
  // 1 Get all tour data from collection
  const tours = await Tour.find();

  // 2 Build template

  // 3 Render that template using tour data from 1
  res.status(200).render('overview', {
    title: 'All Tours',
    tours,
  });
});

exports.getTourInfo = catchAsync(async (req, res, next) => {
  // 1 Get data for requested tour (including reviews and guides)
  const tour = await Tour.findOne({ slug: req.params.slug }).populate({
    path: 'reviews',
    select: 'review rating user',
  });

  // 2 Build template

  // 3 Render that template using data from 1
  res.status(200).render('tour', {
    title: `${tour.name} Tour`,
    tour,
  });
});

exports.getLogin = (req, res, next) => {
  res.status(200).render('login');
};
