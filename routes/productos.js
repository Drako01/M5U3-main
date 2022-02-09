var express = require('express');
var router = express.Router();

/* GET Product page. */
router.get('/', function(req, res, next) {
  res.render('product', {
    isProduct: true
  }); /*view/product.hbs */
});

module.exports = router;