# Data Definition Language

# 회원 정보 테이블
CREATE TABLE IF NOT EXISTS `TB_MEMBER`
(
    `memberId` int(11)      NOT NULL AUTO_INCREMENT,
    `username` varchar(255) NOT NULL,
    `password` varchar(255) NOT NULL,
    `name`     varchar(255) NOT NULL,
    `enabled`  tinyint(1)   NOT NULL DEFAULT 1,
    PRIMARY KEY (`memberId`)
);

# 회원 권한 테이블
CREATE TABLE IF NOT EXISTS `TB_MEMBER_AUTHORITY`
(
    `memberId`    int(11) DEFAULT NULL,
    `authority`   varchar(255) NOT NULL,
    `authorityId` bigint(20)   NOT NULL AUTO_INCREMENT,
    PRIMARY KEY (`authorityId`),
    KEY `memberId` (`memberId`),
    CONSTRAINT `tb_member_authority_ibfk_1` FOREIGN KEY (`memberId`) REFERENCES `TB_MEMBER` (`memberId`) ON DELETE CASCADE
);

# 방명록 테이블
CREATE TABLE IF NOT EXISTS `TB_REVIEW`
(
    `REVIEW_ID` int(11)      NOT NULL AUTO_INCREMENT,
    `WRITER`    varchar(100) DEFAULT NULL,
    `TITLE`     varchar(100) DEFAULT NULL,
    `CONTENT`   longblob     DEFAULT NULL,
    `CREATE_DT` datetime     DEFAULT NULL,
    `UPDATE_DT` datetime     DEFAULT NULL,
    `USERNAME`  varchar(100) NOT NULL,
    PRIMARY KEY (`REVIEW_ID`)
);

# 게시글 테이블
CREATE TABLE IF NOT EXISTS `TB_POST`
(
    `POST_ID`   int(11)      NOT NULL AUTO_INCREMENT,
    `WRITER`    varchar(100) DEFAULT NULL,
    `TITLE`     varchar(100) DEFAULT NULL,
    `CONTENT`   longblob     DEFAULT NULL,
    `CREATE_DT` datetime     DEFAULT NULL,
    `UPDATE_DT` datetime     DEFAULT NULL,
    `USERNAME`  varchar(100) NOT NULL,
    `CATEGORY`  varchar(100) NOT NULL,
    PRIMARY KEY (`POST_ID`)
);

# 댓글 테이블
CREATE TABLE IF NOT EXISTS `tb_comment`
(
    `comment_id`   int(11)      NOT NULL AUTO_INCREMENT,
    `post_id`      int(11)      NOT NULL,
    `member_id`    int(11)      NOT NULL,
    `writer`       varchar(100) NOT NULL,
    `create_dt`    datetime     NOT NULL,
    `update_dt`    datetime DEFAULT NULL,
    `content`      longblob DEFAULT NULL,
    `username`     varchar(255) NOT NULL,
    `CATEGORY`     varchar(100) NOT NULL,
    `recomment_id` int(11)  DEFAULT NULL,
    PRIMARY KEY (`comment_id`)
) ENGINE = InnoDB
  AUTO_INCREMENT = 83
  DEFAULT CHARSET = utf8mb4
  COLLATE = utf8mb4_general_ci;

# 답글 테이블
CREATE TABLE IF NOT EXISTS `tb_recomment`
(
    `recomment_id` int(11)      NOT NULL AUTO_INCREMENT,
    `comment_id`   int(11)      NOT NULL,
    `post_id`      int(11)      NOT NULL,
    `member_id`    int(11)      NOT NULL,
    `writer`       varchar(100) NOT NULL,
    `create_dt`    datetime     NOT NULL,
    `update_dt`    datetime DEFAULT NULL,
    `content`      longblob DEFAULT NULL,
    `username`     varchar(255) NOT NULL,
    `CATEGORY`     varchar(100) NOT NULL,
    PRIMARY KEY (`recomment_id`),
    KEY `fk_tb_recomment_comment_id` (`comment_id`),
    CONSTRAINT `fk_tb_recomment_comment_id` FOREIGN KEY (`comment_id`) REFERENCES `tb_comment` (`comment_id`) ON DELETE CASCADE
) ENGINE = InnoDB
  AUTO_INCREMENT = 103
  DEFAULT CHARSET = utf8mb4
  COLLATE = utf8mb4_general_ci;