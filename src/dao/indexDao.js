const { pool } = require("../../config/database");

exports.insertUsers = async function (connection, hosID, hosName, password, hosAddress1, hosAddress2, hosNumber) {
  const Query = `insert into hospitals(hosID, hosName, password, hosAddress1, hosAddress2, hosNumber) values(?,?,?,?,?,?);`;
  const Params = [hosID, hosName, password, hosAddress1, hosAddress2, hosNumber];

  const rows = await connection.query(Query, Params);

  return rows;
};

exports.selectUsers = async function (connection, params) {
  const Query = `select * from hospitals`;
  const Params = [];

  const rows = await connection.query(Query, Params);

  return rows;
};

exports.isValidUsers = async function (connection, userID,password) {
  const Query = `select userIdx, userName from user WHERE userID = ? and password = ? and status='A';`;
  
  const Params = [userID,password];

  const rows = await connection.query(Query, Params);

  return rows;
};


// exports.insertHospital = async function (connection, userID, userName, password) {
//   const Query = `insert into user(userID,userName,password) values(?,?,?);`;
//   const Params = [userID,userName,password];

//   const rows = await connection.query(Query, Params);

//   return rows;
// };
