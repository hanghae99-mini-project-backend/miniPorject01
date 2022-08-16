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

exports.checkMyPostQuery = 
            `SELECT 
                COUNT(*) AS CNT 
            FROM 
                COMMENT 
            WHERE 
                COMMENT_IDX = ? AND BOOTCAMP_IDX=? AND USER_IDX=?`

exports.putCommentQuery = (commentId, userIdx) => {
    return `UPDATE 
                COMMENT 
            SET 
                CONTENT=?,
                RATING=?
            WHERE 
            COMMENT_IDX = ${commentId} AND USER_IDX = ${userIdx} `;

}

exports.deleteCommentQuery = `DELETE FROM COMMENT WHERE COMMENT_IDX = ? AND USER_IDX=?`