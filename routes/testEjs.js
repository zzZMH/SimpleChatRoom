var express = require('express');
var router = express.Router();

router.get('/', function (req, res, next) {
    res.render('testEjs.ejs', {a: "8P", news: ['第一个', '第二个', '第三个']});
});

module.exports = router;