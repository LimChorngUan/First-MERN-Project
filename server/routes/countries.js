const express = require('express');
const Country = require('../models/Country');
const { isLoggedIn, isCreator } = require('../middlewares');

const router = express.Router();

router.use((req, res, next) => {
  console.log('DEBUG routes/countries');
  next();
});

// Route to get all countries
router.get('/', (req, res, next) => {
  Country.find()
    .populate('_creator')
    .then(countries => {
      res.json(countries);
    })
    .catch(err => next(err));
});

// Route to add a country
router.post('/', isLoggedIn, (req, res, next) => {
  let { name, capitals, area, description } = req.body;
  Country.create({ name, capitals, area, description, _creator: req.user._id })
    .then(country => {
      res.json({
        success: true,
        country
      });
    })
    .catch(err => next(err));
});

// Route to delete a country
router.delete('/:id', isCreator, (req, res, next) => {
  Country.findByIdAndDelete(req.params.id)
    .then(country => {
      res.json({
        message: 'The country was deleted',
        country: country // The deleted country is sent
      });
    })
    .catch(err => next(err));
});

// Route to show country detail
router.get('/:id', (req, res, next) => {
  Country.findById(req.params.id)
    .populate('_creator')
    .then(country => {
      res.json({ country });
    })
    .catch(err => next(err));
});

// Route edit country details
router.put('/:id', isCreator, (req, res, next) => {
  const { name, capitals, area, description } = req.body;
  Country.findByIdAndUpdate(
    req.params.id,
    { name, capitals, area, description },
    { new: true }
  )
    .then(country => {
      res.json({ country });
    })
    .catch(err => next(err));
});

module.exports = router;
