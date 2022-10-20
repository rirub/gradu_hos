const express = require("express");
const compression = require("compression");
const methodOverride = require("method-override");
var cors = require("cors");


module.exports= function() {
    const app = express(); 
    app.use(compression()); // http 요청을 압축 및 해제
    app.use(express.json()); // body 값을 파싱
    app.use(express.urlencoded({extended:true}));
    // form으로 제출되는 값을 파싱
    app.use(methodOverride());
    //put, delete 요청 처리
    app.use(cors());
    //웹 브라우저 ㅓcors 설정 관리
   
    app.use(express.static('public')); // static 파일 사용
    app.use(express.static('views'));
    /* 직접 구현해야 하는 모듈 */
    require("../src/routes/indexRoute")(app);

    return app;
};