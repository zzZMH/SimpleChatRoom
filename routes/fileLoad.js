var express = require('express');
var router = express.Router();
var formObj = require('formidable');
var fs = require('fs');

router.post('/', function(req, res) {
    var form = new formObj.IncomingForm();
    form.parse(req, function(error, fields, files) {
        fs.writeFileSync("public/images/test.png", fs.readFileSync(files.upload.path));
        res.redirect("upLoad.html");
    });
});

module.exports = router;
