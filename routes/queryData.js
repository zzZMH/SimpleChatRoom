var express = require('express');
var db = require('./database');
var router = express.Router();

router.get('/', function (req, res, next) {
    var sqlStr1 = "select * from userInfo";
    var paramsArr1 = [];
    var sqlStr2 = "update userInfo set userName = ? where userId = ?";
    var paramsArr2 = ["张明浩", "111"];
    db.query(sqlStr1, paramsArr1, function (results) {
        var jsonResult = JSON.stringify(results);
        console.log(jsonResult);
        res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'});
        res.write(jsonResult);
        res.send();
    });
    // db.query(sqlStr2, paramsArr2, function (results) {
    //     var jsonResult = JSON.stringify(results);
    //     console.log(jsonResult);
    //     res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'});
    //     res.write(jsonResult);
    //     res.send();
    // });
});

module.exports = router;