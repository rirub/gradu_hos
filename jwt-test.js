const jwt = require("jsonwebtoken");

const secret = "this is my secret"

const token = jwt.sign(
    {userIdx: 100, nickname:"김철수"},
    secret
);

console.log(token);