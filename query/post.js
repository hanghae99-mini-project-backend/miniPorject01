exports.getAllPostQuery = `SELECT * FROM BOOTCAMP_INFO`;
exports.createPostQuery = `INSERT INTO BOOTCAMP_INFO SET ?`;
exports.getOnePostQuery = `SELECT * FROM BOOTCAMP_INFO WHERE BOOTCAMP_IDX = ?`;
exports.checkMyPostQuery = `SELECT COUNT(*) AS CNT FROM BOOTCAMP_INFO WHERE BOOTCAMP_IDX=? AND USER_IDX=?`;
exports.putPostQuery = (postId) => {
  return (
    `UPDATE 
                BOOTCAMP_INFO 
            SET 
                BOOTCAMP_NAME=?,
                BOOTCAMP_COMPANY=?,
                TOTAL_WEEKS=?,
                ON_OFF_LINE=?,
                PRICE=?,
                ` +
    "`POSITION`" +
    `=?,
                ` +
    "`DESCRIBE`" +
    `=?
            WHERE 
                BOOTCAMP_IDX=${postId}`
  );
};
exports.deletePostQuery = `DELETE FROM BOOTCAMP_INFO WHERE BOOTCAMP_IDX=? AND USER_IDX=?`;
