exports.insUser = `INSERT INTO USER SET ?`;
exports.checkDuplicated = (id) => {
  return `SELECT 
            COUNT(ID) AS CNT 
          FROM 
            USER 
          WHERE 
            ID = ${id}`;
};
exports.loginQuery = (id) => {
  return `SELECT 
            USER_IDX,
            ID,
            PASSWORD 
          FROM 
            USER 
          WHERE
            ID = ${id}`;
};

exports.getUserIdx = (userId) => {
  return `SELECT
            USER_IDX
          FROM
            USER
          WHERE
            ID = ${userId}`;
};
