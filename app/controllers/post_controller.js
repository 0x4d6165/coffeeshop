var Post = require('../models/Post');

exports.postUserPost = function(req, res, next) {
  req.assert('title', 'Only letters and numbers are allow in the title.').regexMatch(/^[A-Za-z0-9]*$/);
  req.assert('title', 'Title cannot be more than 30 characters.').len(1, 30);
  req.assert('body', 'Only letters and numbers are allow in the body.').regexMatch(/^[A-Za-z0-9]*$/);
  req.assert('body', 'Body cannot be more than 142 characters.').len(1, 142)
  req.body.img && req.assert('img', 'Invalid website url.').regexMatch(/(https?:\/\/.*\.(?:png|jpg|gif))/i);

  var errors = req.validationErrors();

  if (errors) {
    req.flash('errors', errors);
    return res.redirect('/signup');
  }

  var post = new Post({
    url: req.body.title,
    title: req.body.title,
    body: req.body.content,
    author: req.user.uid,
    img: req.body.img
  });

  post.save(function(err) {
    if (err) return next(err);
    res.redirect('/');
  });
};
