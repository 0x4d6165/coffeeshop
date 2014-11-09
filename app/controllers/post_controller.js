var User = require('../models/User');
var Post = require('../models/Post');

exports.postUserPost = function(req, res, next) {
  req.assert('title', 'Title cannot be more than 30 characters.').len(1, 30);
  req.assert('content', 'Body cannot be more than 142 characters.').len(1, 142)
  req.body.img && req.assert('img', 'Invalid website url.').regexMatch(/(https?:\/\/.*\.(?:png|jpg|gif))/i);

  var errors = req.validationErrors();

  if (errors) {
    req.flash('errors', errors);
    return res.redirect('/signup');
  }

  var post = new Post({
    url: convertToSlug(req.body.title),
    title: req.body.title,
    body: req.body.content,
    author: req.user.uid,
    img: req.body.img
  });

  post.save(function(err, newPost) {
    if (err) return next(err);
    User.update({ uid: req.user.uid }, { $pushAll: { posts: [newPost] } }, { upsert: true }, 
      function(err) {
        if (err) return next(err); 
        res.redirect('/');
      });
  });
};

function convertToSlug(Text) {
    return Text
        .toLowerCase()
        .replace(/ /g,'-')
        .replace(/[^\w-]+/g,'');
}
