var moment = require('moment');
var User = require('../models/User');
var Post = require('../models/Post');

/**
 * Route /
 * --------------------
 */

// Home or index page.
exports.getIndex = function(req, res) {
  Post.find({}, function(err, posts) {
    posts.sort(function(a, b) {
      return b.date - a.date;
    });
    posts.reverse();
    if (req.isAuthenticated()) {
      res.render('post', {
        title: 'Dashboard',
        posts: posts
      });
    } else {
      res.render('index', {
        title: 'Home',
        posts: posts
      });
    }
  });
};

exports.getAbout = function(req, res) {
  res.render('about', {
    title: 'About'
  }); 
};

exports.getSupport = function(req, res) {
  res.render('support', {
    title: 'Support'
  }); 
};
