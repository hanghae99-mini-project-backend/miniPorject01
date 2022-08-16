exports.createCommentQuery = 
            `INSERT INTO 
                COMMENT 
            SET 
                USER_IDX =?,
                BOOTCAMP_IDX=?,
                CONTENT=?,
                RATING=?`;
exports.getAllCommentQuery = (postId) => {
    return `SELECT 
                A.*,
                B.ID
            FROM 
                COMMENT AS A LEFT OUTER JOIN `+"`USER`" +` AS B
            ON
                A.USER_IDX = B.USER_IDX
            WHERE 
                BOOTCAMP_IDX = ${postId}`;
}