var express = require('express');
var router = express.Router();
var request = require('request');
var cheerio = require('cheerio');
var superagentChart = require('superagent-charset');
var superagent = require('superagent');
supgt = superagentChart(superagent);
var iconv = require('iconv-lite');

router.get('/', function(req, res, next) {

    supgt.get("http://news.163.com/").charset("gb2312").end(function (error, result) {
        if(error){
            console.log("错误信息:"+error);
            return;
        }
        res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'});
        res.write(result.text);
        res.send();
    });

    // request("http://news.163.com/", function (error, result) {
    //     if(error){
    //         console.log("错误信息:"+error);
    //         return;
    //     }
    //     console.log(result.body);
    // });
});

module.exports = router;