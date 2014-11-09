/**
 * Route /
 * --------------------
 */

// Home or index page.
exports.getIndex = function(req, res) {
  if (req.isAuthenticated()) {
    res.render('post', {
      title: 'Dashboard'
    });
  } else {
    res.render('index', {
      title: 'Home'
    });
  }
};

exports.getAbout = function(req, res) {
  res.render('about', {
    title: 'About'
  }); 
};
