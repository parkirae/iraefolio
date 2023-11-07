# Data Manipulation Language

# 관리자 계정 추가
INSERT IGNORE INTO TB_MEMBER (username, password, name, enabled) VALUES ('admin', 'admin', '관리자', 1);

# 관리자 계정에 권한 부여
# 추후 수정
INSERT IGNORE INTO TB_MEMBER_AUTHORITY VALUES (1, 'ROLE_USER')

