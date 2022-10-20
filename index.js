const express = require("./config/express");
const {logger} = require("./config/winston"); //log
//로그 찍기. 프로세스 돌리면서 발생하는 에러 기록

const port = 3000;
express().set('view engine', 'ejs');
express().engine('html', require('ejs').renderFile);

express().set('views', __dirname + '/views');

express().listen(port); //express 프레임워크 실행 

logger.info(`API server start at port ${port}`);
