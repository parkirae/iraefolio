# Data Definition Language

# 회원 정보 테이블
CREATE TABLE if not exists  `portfolio`.`TB_MEMBER` (
     `memberId` INT NOT NULL AUTO_INCREMENT,
     `username` VARCHAR(255) NOT NULL,
     `password` VARCHAR(255) NOT NULL,
     `name` VARCHAR(255) NOT NULL,
     `enabled` TINYINT NOT NULL DEFAULT 1,
     PRIMARY KEY (`memberId`)
);

# 회원 권한 테이블
CREATE TABLE if not exists `TB_MEMBER_AUTHORITY` (
   `memberId` int(11) DEFAULT NULL,
   `authority` varchar(255) NOT NULL,
   KEY `memberId` (`memberId`),
   CONSTRAINT `tb_member_authority_ibfk_1` FOREIGN KEY (`memberId`) REFERENCES `TB_MEMBER` (`memberId`)
)