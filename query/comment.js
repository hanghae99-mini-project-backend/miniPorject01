exports.createCommentQuery = `INSERT INTO COMMENT SET ?`
exports.getAllCommentQuery = (postId) => {
    return `SELECT * FROM COMMENT WHERE BOOTCAMP_IDX = ${postId}`;
}