const { pool } = require("../../config/database");

const { logger } = require("../../config/winston");
const jwt = require("jsonwebtoken");
const secret = require("../../config/secret");
const indexDao = require("../dao/indexDao");
  
const output = {

    signup : async function(req,res){
        return res.render('main/signup.ejs');
    },

    login : async function(req,res){
        return res.render('main/login2.ejs');
    },

    reservation : async function(req,res){
      return res.render('reservation/reservation_h.ejs');
  },


}


const process = {
    createJwt : async function(req,res){
      const {hosID, password} = req.body;
      if(!hosID || !password){
        return res.send({
          isSuccess: false,
          code: 400,
          message: "회원정보를 입력해주세요",
        });
      }
    try{
      const connection = await pool.getConnection(async (conn)=>conn);
      try{
        const [rows]=await indexDao.isValidUsers(connection, hosID, password);
        console.log(rows);
        //DB 회원 검증
        if(rows.length <1){
          return res.send({
            isSuccess: false,
            code: 410,
            message: "회원정보가 존재하지 않습니다."
          });
        }
        //login pw 확인 알고리즘 추가하기
        const {hosIdx, hosName} = rows[0];

        const token = jwt.sign(
          {hosIdx: hosIdx,
            hosName: hosName},
          secret.jwtsecret
          );  
        return res.send({
          result: {jwt: token},
          isSuccess: true,
          code: 200,
          message: "로그인 성공",
        });
      } 
    catch(err){
      logger.error(`createJwt Query error\n: ${JSON.stringify(err)}`)
      return false;
    }finally {
      connection.release();
    }
  } catch(err){
    logger.error(`createJwtDB Connection error\n: ${JSON.stringify(err)}`);
    return false;  
  }
  
   },


  signup : async function(req,res){
    console.log(req.body);  
    const {hosID, hosName, password, hosAddress1, hosAddress2, hosNumber} = req.body;  
    console.log(hosID, hosName, password, hosAddress1, hosAddress2, hosNumber);
    // DB에 insert
      try {
        const connection = await pool.getConnection(async (conn) => conn);
        try {
          const [rows] = await indexDao.insertUsers(
            connection,
            hosID, hosName, password, hosAddress1, hosAddress2, hosNumber
            );
            //console.log(rows);
            const hosIdx=rows.insertId;
            const token = jwt.sign(
              {hosIdx: hosIdx, hosName: hosName},
              secret.jwtsecret
            );
            
          return res.send({
            result: { jwt : token},
            isSuccess: true,
            code: 200,
            message: "회원가입 성공",
          });
        } catch (err) {
          logger.error(`insertUsers Query error\n: ${JSON.stringify(err)}`);
        } finally {
          connection.release();
        }
      } catch (err) {
        logger.error(`insertUsers DB Connection error\n: ${JSON.stringify(err)}`);
        return false;
      }
      
      try {
        const connection = await pool.getConnection(async (conn)=> conn);
        try {
        const [rows] = await indexDao.insertUsers(connection, hosID, hosName, password, hosAddress1, hosAddress2, hosNumber);

  
      } catch(err){
        logger.error(`createUsers Query error\n: ${JSON.stringify(err)}`)
        return false;
      }finally {
        connection.release();
      }
    } catch(err){
      logger.error(`createUsers DB Connection error\n: ${JSON.stringify(err)}`);
      return false;  
    }
    
     },
}


const readUsers = async function(req,res){
    // const {userID} = req.query;
    // console.log(userID);
    try {
        const connection = await pool.getConnection(async (conn) => conn);
        try {
          const [rows] = await indexDao.selectUsers(connection);
        
          return res.send(
            {
            result: rows,
            isSuccess: true,
            code: 200, // 요청 실패시 400번대 코드
            message: "요청 성공",
          }
          );
        } catch (err) {
          logger.error(`readusers Query error\n: ${JSON.stringify(err)}`);
        } finally {
          connection.release();
        }
      } catch (err) {
        logger.error(`readusers DB Connection error\n: ${JSON.stringify(err)}`);
        return false;
      }



};

const readJwt = async function(req,res){
  const { hosIdx, hosName } = req.verifiedToken;
  return res.send({
    result: {hosIdx: hosIdx, hosName:hosName},
    code: 200,
    message: "유효한 토큰입니다.",
  });

}




const getInfo = async function(req,res){
  const {hosIdx} = req.body;
  try {
      const connection = await pool.getConnection(async (conn) => conn);
      try {
        const [rows] = await indexDao.selectInfo(connection,hosIdx);
      
        return res.send(
          {
          result: rows,
          isSuccess: true,
          code: 200, // 요청 실패시 400번대 코드
          message: "요청 성공",
        });
      } catch (err) {
        logger.error(`selectInfo Query error\n: ${JSON.stringify(err)}`);
      } finally {
        connection.release();
      }
    } catch (err) {
      logger.error(`selectInfo DB Connection error\n: ${JSON.stringify(err)}`);
      return false;
    }
};






module.exports = {
  readJwt, readUsers, output, process, getInfo
}