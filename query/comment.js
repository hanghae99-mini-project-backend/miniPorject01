exports.createCommentQuery = 
                            `INSERT INTO 
                                COMMENT 
                            SET 
                                USER_IDX =?,
                                BOOTCAMP_IDX=?,
                                CONTENT=?,
                                RATING=?`;
exports.getAllCommentQuery = (postId) => {
    return `SELECT * FROM COMMENT WHERE BOOTCAMP_IDX = ${postId}`;
}