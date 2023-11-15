# Data Definition Language

# 회원 정보 테이블
CREATE TABLE `TB_MEMBER` (
     `memberId` int(11) NOT NULL AUTO_INCREMENT,
     `username` varchar(255) NOT NULL,
     `password` varchar(255) NOT NULL,
     `name` varchar(255) NOT NULL,
     `enabled` tinyint(1) NOT NULL DEFAULT 1,
     PRIMARY KEY (`memberId`)
);

# 회원 권한 테이블
CREATE TABLE `TB_MEMBER_AUTHORITY` (
   `memberId` int(11) DEFAULT NULL,
   `authority` varchar(255) NOT NULL,
   `authorityId` bigint(20) NOT NULL AUTO_INCREMENT,
   PRIMARY KEY (`authorityId`),
   KEY `memberId` (`memberId`),
   CONSTRAINT `tb_member_authority_ibfk_1` FOREIGN KEY (`memberId`) REFERENCES `TB_MEMBER` (`memberId`) ON DELETE CASCADE
);