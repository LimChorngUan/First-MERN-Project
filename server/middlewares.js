const Country = require('./models/Country');

function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) next();
  else next({ status: 403, message: 'Unauthorized' });
}

function isCreator(req, res, next) {
  if (!req.user) {
    next({ status: 403, message: 'Unauthorized' });
  } else {
    Country.findById(req.params.id).then(country => {
      if (!country || !country._creator.equals(req.user._id)) {
        next({ status: 403, message: 'Unauthorized' });
      } else {
        next();
      }
    });
  }
}

module.exports = {
  isLoggedIn,
  isCreator
};
