-- ====================================
-- BookHub_DB SQL Script
-- ====================================

-- ====================================
-- 1. Database and Schema Setup
-- ====================================
CREATE DATABASE IF NOT EXISTS `bookhub_db`;
USE `bookhub_db`;

-- ===========================
-- 2. Branches and Employees
-- ===========================
CREATE TABLE IF NOT EXISTS branches (
    branch_id BIGINT AUTO_INCREMENT PRIMARY KEY,
    branch_name VARCHAR(255) NOT NULL,
    branch_location VARCHAR(255) DEFAULT NULL, # 주석 해제 (지역명만 사용할 것인지, 주소 체계를 모두 사용할 것인지)
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

# authorities 테이블
# : 권한(Authority)
# : 로그인 후 접근 권한, 기능 수행 제어 등 보안 목적
# : USER, ADMIN, MANAGER 등
CREATE TABLE IF NOT EXISTS `authorities` (
    authority_id BIGINT AUTO_INCREMENT PRIMARY KEY,
    authority_name VARCHAR(255) NOT NULL UNIQUE # UNIQUE 제약 조건 추가(중복 권한명 방지)
);

# positions 테이블 추가
# : 직급(Position)
# : 조직 내에서 직원의 지위
# : EX) 사원, 대리, 과장, 부장, "점장" 등
CREATE TABLE IF NOT EXISTS `positions` (
    position_id BIGINT AUTO_INCREMENT PRIMARY KEY,
    position_name VARCHAR(255) NOT NULL
); 


CREATE TABLE IF NOT EXISTS `employees` (
    employee_id BIGINT AUTO_INCREMENT PRIMARY KEY,
    branch_id BIGINT NOT NULL,
    position_id BIGINT NOT NULL, # 직급 추가
    employee_number VARCHAR(20) NOT NULL UNIQUE, 
    login_id VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    name VARCHAR(255) NOT NULL,
    phone_number VARCHAR(20) NOT NULL UNIQUE,
    birth_date DATE NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    is_approved ENUM('PENDING', 'APPROVED', 'DENIED') DEFAULT 'PENDING',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    status Enum('EMPLOYED', 'EXITED'),   -- 추가함 
    FOREIGN KEY (branch_id) REFERENCES branches (branch_id) ON DELETE CASCADE,
    FOREIGN KEY (position_id) REFERENCES positions (position_id) ON DELETE CASCADE
);
# cf) 퇴사자 구분 하고 있는지: status Enum('EMPLOYED', 'EXITED') 
# === 퇴사자 개인 정보 관리 (보존기간: 한국 기준 일반 권고)
# 인사기록, 계약서 (3 ~ 5년)
# 퇴직자 주민등록 번호 등 민감 정보 (최소화 후 3년 이내 파기 권고)
# 급여 관련 증빙자료 (5년)
# 로그 기록 (6개월 ~ 1년: 보안 목적)
# >>>>> 퇴사 관련 상세 정보는 employee_exit_logs에 기록


# 권한을 직원과 다대다 구분을 사용할 것인지
# : 한 명의 직원이 여러 개의 권한 사용이 가능
CREATE TABLE IF NOT EXISTS `employee_auth` (
    employee_id BIGINT NOT NULL,
    authority_id BIGINT NOT NULL,
    PRIMARY KEY (employee_id, authority_id),
    CONSTRAINT fk_employee FOREIGN KEY (employee_id) REFERENCES employees(employee_id) ON DELETE CASCADE,
    CONSTRAINT fk_auth FOREIGN KEY (authority_id) REFERENCES authorities(authority_id) ON DELETE CASCADE
);

-- ====================================
-- 3. Employee Change Logs and Approval Logs
-- ====================================
CREATE TABLE IF NOT EXISTS `employee_signup_approvals` (
    approval_id BIGINT AUTO_INCREMENT PRIMARY KEY,
    employee_id BIGINT NOT NULL,
    authorizer_id BIGINT NOT NULL,
    status VARCHAR(255) NOT NULL,
    applied_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    approved_denied_at TIMESTAMP NULL, # PENDING과 DENIED 시 NULL로 둘 것인지 (거절된 경우 거절한 권한자에 대한 메모와 시기 작성은?)
    -- 이름 변경함 : PENDING 시 NULL로 두고, DENIED 시에는 시간을 기록하면 될 것 같습니다.
    denied_reason VARCHAR(255), -- 수정함: 거절 이유
    FOREIGN KEY (employee_id) REFERENCES employees(employee_id) ON DELETE CASCADE,
    FOREIGN KEY (authorizer_id) REFERENCES employees(employee_id) ON DELETE CASCADE,
	CONSTRAINT chk_status CHECK (status IN ('PENDING', 'APPROVED', 'DENIED'))
);

CREATE TABLE IF NOT EXISTS `employee_change_logs` (
   log_id BIGINT AUTO_INCREMENT PRIMARY KEY,
   employee_id BIGINT NOT NULL,
   change_type VARCHAR(25) NOT NULL,
   
   previous_authority_id BIGINT DEFAULT NULL, # 권한 변경
   previous_position_id BIGINT DEFAULT NULL, # 직급 변경
   previous_branch_id BIGINT DEFAULT NULL, # 지점 변경
   
   changed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
   FOREIGN KEY (employee_id)
      REFERENCES employees(employee_id),
    FOREIGN KEY (previous_authority_id)
      REFERENCES authorities(authority_id),
    FOREIGN KEY (previous_branch_id)
      REFERENCES branches(branch_id),
    CONSTRAINT chk_process_type
      CHECK (change_type IN ('POSITION_CHANGE', 'AUTHORITY_CHANGE', 'BRANCH_CHANGE'))
      # : 직급 변경 추가로 change_type 확장
);

# 퇴사 테이블
# : 퇴사 직원
CREATE TABLE IF NOT EXISTS `employee_exit_logs` (
    exit_id BIGINT AUTO_INCREMENT PRIMARY KEY,
    employee_id BIGINT NOT NULL,
    exit_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    exit_reason VARCHAR(25) NOT NULL,
    FOREIGN KEY (employee_id)
      REFERENCES employees(employee_id),
    CONSTRAINT chk_exit_reason
      CHECK (exit_reason IN ('VOLUNTEER', 'FORCED', 'TERMINATED')) 
);
# 익명화: status = 'EXITED'이고 exit_at >= 3년 전인 경우 트리거 또는 배치 처리로 자동화 가능

-- ===============================
-- 4. Book Categories, Authors, Publishers
-- ===============================

##### [카테고리 보류] #####
-- CREATE TABLE IF NOT EXISTS `first_book_category`(
--     first_book_category_id INT AUTO_INCREMENT PRIMARY KEY,
--     first_book_category_name VARCHAR(255) NOT NULL
-- );

-- CREATE TABLE IF NOT EXISTS `second_book_category`(
--     second_book_category_id INT AUTO_INCREMENT PRIMARY KEY,
--     first_book_category_id INT NOT NULL,
--     second_book_category_name VARCHAR(255) NOT NULL,
--     FOREIGN KEY(first_book_category_id) 
--       REFERENCES first_book_category(first_book_category_id)
-- );

# 카테고리 (계층 구조)
# : category_level (1차, 2차 등) 추가 고려
CREATE TABLE IF NOT EXISTS `book_categories` (
    category_id BIGINT AUTO_INCREMENT PRIMARY KEY,
    parent_category_id BIGINT DEFAULT NULL,
    category_name VARCHAR(255) NOT NULL,
    FOREIGN KEY (parent_category_id) REFERENCES book_categories (category_id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS `authors`(
    author_id BIGINT AUTO_INCREMENT PRIMARY KEY,
    author_name VARCHAR(255) NOT NULL
);

CREATE TABLE IF NOT EXISTS `publishers` (
    publisher_id BIGINT AUTO_INCREMENT PRIMARY KEY,
    publisher_name VARCHAR(255) NOT NULL
);

CREATE TABLE IF NOT EXISTS `books` (
    book_isbn VARCHAR(255) PRIMARY KEY,
    category_id BIGINT NOT NULL,
    author_id BIGINT NOT NULL,
    publisher_id BIGINT NOT NULL,
    book_title VARCHAR(255) NOT NULL,
    book_price INT NOT NULL,
    published_date DATE NOT NULL, # published_date DATE 로 변경 (정확한 날짜를 파악  -- 변경 완료
    cover_url VARCHAR(255) NOT NULL, # 책 이미지 - VARCHAR 인지 애매함
    page_count VARCHAR(255) NOT NULL, # 책 페이지
    language VARCHAR(255) NOT NULL, # 책 원본 나라 표시
	created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (category_id)
      REFERENCES book_categories (category_id),
    FOREIGN KEY (author_id)
      REFERENCES authors(author_id),
    FOREIGN KEY (publisher_id)
      REFERENCES publishers(publisher_id)
);
# book_description(책 설명), cover_url(책 표지 이미지), page_count, language 등 추가 가능

CREATE TABLE IF NOT EXISTS `book_display_locations` (
    location_id BIGINT AUTO_INCREMENT PRIMARY KEY,
    branch_id BIGINT NOT NULL,
    book_isbn VARCHAR(255) NOT NULL,
    floor VARCHAR(50) NOT NULL,
    hall VARCHAR(50) NOT NULL,
    section VARCHAR(50) NOT NULL,
    display_type VARCHAR(50) NOT NULL,
    display_note TEXT NOT NULL, -- 위치에 대한 부연 설명
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (branch_id) REFERENCES branches(branch_id),
    FOREIGN KEY (book_isbn) REFERENCES books(book_isbn),
    CONSTRAINT chk_display_type
		CHECK (display_type IN ('BOOKSHELF','DISPLAYTABLE'))
);
# display_note (설명용) 추가 가능 - 완료!

-- ===============================
-- 5. Inventory Management (재고 관리)
-- ===============================
CREATE TABLE IF NOT EXISTS stocks (
    stock_id BIGINT AUTO_INCREMENT PRIMARY KEY,
    book_isbn VARCHAR(255) NOT NULL,
    branch_id BIGINT NOT NULL,
    book_amount INT NOT NULL,
    stock_status VARCHAR(255) NOT NULL,
    FOREIGN KEY (book_isbn) REFERENCES books(book_isbn),
    FOREIGN KEY (branch_id) REFERENCES branches(branch_id),
    CONSTRAINT chk_stock_status
		CHECK (stock_status IN ('IN_STOCK', 'OUT_OF_STOCK', 'RESERVED'))
    # book_amouont(수량)와 is_stock(재고 유무 표시) 필드의 각 의미
    # book_amount가 수량이라면
    # : stock_status ENUM('IN_STOCK', 'OUT_OF_STOCK', 'RESERVED') 등으로 대체 가능
    # : 책 수량에 따라 is_stock값이 변함
    #      >> book_amount가 0이면, is_stock = false 와 동일 (중복되는 필드)
    #      >> ERP에는 수량이 중요하기 때문에 book_amount 만으로 충분
);

CREATE TABLE IF NOT EXISTS `stock_logs` (
    log_id BIGINT AUTO_INCREMENT PRIMARY KEY,
    book_isbn VARCHAR(255) NOT NULL,
    branch_id BIGINT NOT NULL,
    action_type ENUM('IN', 'OUT', 'MOVE', 'LOSS') NOT NULL,
    target_branch_id BIGINT NOT NULL,
    amount INT NOT NULL,
    employee_id BIGINT NOT NULL,
    action_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    description TEXT,
    FOREIGN KEY (book_isbn) REFERENCES books(book_isbn),
    FOREIGN KEY (branch_id) REFERENCES branches(branch_id),
    FOREIGN KEY (target_branch_id) REFERENCES branches(target_branch_id),
    FOREIGN KEY (employee_id) REFERENCES employees(employee_id)
    # target_branch_id
    # : 이동되는 지점의 ID -- 완료 
);


-- ===============================
-- 6. Discount and Policy Management (할인 및 정책 관리)
-- ===============================

CREATE TABLE IF NOT EXISTS `discount_policies`(
    policy_id BIGINT AUTO_INCREMENT PRIMARY KEY,
    
    # 책별 또는 카테고리별로만 할인이 가능하다면
    # , 둘 중 하나로만 필수로 설정
    # : check 제약조건 사용
    book_isbn VARCHAR(255) DEFAULT NULL, # NULL 허용으로 수정
    category_id BIGINT DEFAULT NULL, # NULL 허용으로 수정
    
    discount_percent INT NOT NULL,
    start_date DATE,
    end_date DATE,
    total_price_achieve INT,
    FOREIGN KEY(category_id) 
		REFERENCES book_categories(category_id),
    FOREIGN KEY(book_isbn)
		REFERENCES books(book_isbn),
	CONSTRAINT chk_book_or_category
		CHECK (
			(book_isbn IS NOT NULL AND category_id IS NULL)
		OR
			(book_isbn IS NULL AND category_id IS NOT NULL))  -- 추가
);

-- ===============================
-- 7. Order Management (발주 및 주문 관리)
-- ===============================
CREATE TABLE IF NOT EXISTS `purchase_orders` (
    purchase_order_id BIGINT AUTO_INCREMENT PRIMARY KEY,
    branch_id BIGINT NOT NULL,
    book_isbn VARCHAR(255) NOT NULL,
    employee_id BIGINT NOT NULL,
    purchase_order_amount INT NOT NULL,
    purchase_order_status VARCHAR(50) NOT NULL,
    purchase_order_date_at DATETIME NOT NULL,
    FOREIGN KEY (branch_id)
        REFERENCES branches (branch_id),
    FOREIGN KEY (book_isbn)
        REFERENCES books (book_isbn),
    FOREIGN KEY (employee_id)
        REFERENCES employees (employee_id),
    CONSTRAINT chk_purchase_order_status
      CHECK (purchase_order_status IN ('REQEUSTED', 'APPROVED', 'REJECTED'))
);


CREATE TABLE IF NOT EXISTS `purchase_order_approvals` (
    purchase_order_approval_id BIGINT AUTO_INCREMENT PRIMARY KEY,
    employee_id BIGINT NOT NULL,
    purchase_order_id BIGINT NOT NULL,
    is_approved BOOLEAN NOT NULL,
    approved_date_at DATETIME NOT NULL,
    FOREIGN KEY (employee_id)
        REFERENCES employees (employee_id),
    FOREIGN KEY (purchase_order_id)
        REFERENCES purchase_orders (purchase_order_id)
);

CREATE TABLE IF NOT EXISTS `book_reception_approvals` (
    book_reception_approval_id BIGINT AUTO_INCREMENT PRIMARY KEY,
    employee_id BIGINT NOT NULL,
    branch_id BIGINT NOT NULL,
    purchase_order_approval_id BIGINT NOT NULL,
    is_reception_approved BOOLEAN NOT NULL,
    reception_date_at DATETIME NOT NULL,
    FOREIGN KEY (employee_id)
        REFERENCES employees (employee_id),
   FOREIGN KEY (branch_id)
      REFERENCES branches (branch_id),
    FOREIGN KEY (purchase_order_approval_id)
        REFERENCES purchase_order_approvals (purchase_order_approval_id)
);

# 테이블 전체 구성 변경 필요
# : order 테이블 (총괄하는 테이블 - 구매 번호, 총 금액, 구매자, 총 구매 수량, 구매 날짜 등)
# : order_detail 테이블 (order_id를 참조하여 구매한 각각의 제품을 연결 - 각 제품별 할인 유무 policy 확인
CREATE TABLE IF NOT EXISTS `customer_orders` (
    customer_order_id BIGINT AUTO_INCREMENT PRIMARY KEY, 
    ## 구매자 테이블 구현 해야 함
    customer_order_total_amount INT NOT NULL,
    customer_order_total_price INT NOT NULL,
    customer_order_date_at DATETIME NOT NULL
);

CREATE TABLE IF NOT EXISTS `customer_orders_detail` (
    customer_orders_detail_id BIGINT AUTO_INCREMENT PRIMARY KEY,
	customer_order_id BIGINT NOT NULL, 
	book_isbn VARCHAR(255) NOT NULL,
	branch_id BIGINT NOT NULL,
    amount BIGINT not null,
    price BIGINT not null,
	applied_policy_id BIGINT, #정가일수도 있으므로 NOT NULL 제거함
	FOREIGN KEY (customer_order_id)
		REFERENCES customer_orders (customer_order_id),
	FOREIGN KEY (applied_policy_id)
		REFERENCES discount_policies (policy_id),
    FOREIGN KEY (book_isbn)
        REFERENCES books(book_isbn)
);


#PK 값 설정 및 환불일시 환불사유(제품 결함,  재결제예정, 단순변심, 기타) 추가함
CREATE TABLE IF NOT EXISTS `refund_orders` (
    refund_order_id BIGINT AUTO_INCREMENT PRIMARY KEY, 
    order_id BIGINT NOT NULL,
    refund_date_at DATETIME NOT NULL,
    refund_reason VARCHAR(255),
    FOREIGN KEY (order_id)
        REFERENCES orders (order_id),
    CONSTRAINT chk_refund_reason
      CHECK (refund_reason IN ('DEFECTIVE_PRODUCT', 'REPAYMENT_PLANNED', 'CHANGE_OF_MIND', 'OTHER'))
);


-- ===============================
-- 8. Logs and Alerts (로그 및 알림 관리)
-- ===============================
CREATE TABLE IF NOT EXISTS `book_logs` (
    book_log_id BIGINT AUTO_INCREMENT PRIMARY KEY,
    employee_id BIGINT NOT NULL,
    branch_id BIGINT,
    policy_id BIGINT,
    book_isbn VARCHAR(255) NOT NULL,
    book_title VARCHAR(255) NOT NULL, 
    # book_title도 추가하면(반정규화) join 줄이기 가능
    # : 속도 향상 + 단순한 로그 조회 가능
    # > 책 제목이 바뀌면 로그의 book_title은 과거 값으로 남음
    log_type VARCHAR(25) NOT NULL,
    previous_price INT,
    previous_discount_rate INT,
    changed_at DATETIME NOT NULL,
    FOREIGN KEY (employee_id)
      REFERENCES employees (employee_id),
   FOREIGN KEY (book_isbn)
      REFERENCES books (book_isbn),
   FOREIGN KEY (branch_id)
      REFERENCES branches (branch_id),
   FOREIGN KEY (policy_id)
      REFERENCES discount_policies (policy_id),
    CONSTRAINT chk_log_type
      CHECK (log_type IN ('CREATE', 'PRICE_CHANGE', 'DISPLAY_LOCATION', 'DISCOUNT_RATE','DELETE'))
);



CREATE TABLE IF NOT EXISTS alerts (
    alert_id BIGINT AUTO_INCREMENT PRIMARY KEY,
    employee_id BIGINT NOT NULL,
    alert_type ENUM('SIGNUP_APPROVAL', 'STOCK_WARNING', 'REQUEST', 'NOTICE') NOT NULL,
    # 로그인 승인 , 재고관련 알람, (발주/수령/주문)요청, 이벤트등록시 확인알람(공지사항 같은 느낌)
    message TEXT NOT NULL,
    #발주 수령 주문 각각 메시지를 다르게 할지 vs enum으로 다 등록시킬지
    
   target_type ENUM('BOOK', 'PURCHASE_ORDER', 'DISCOUNT', 'CATEGORY', 'REVIEW') DEFAULT NULL,
   target_id BIGINT DEFAULT NULL,
  
    is_read BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (employee_id) REFERENCES employees(employee_id) ON DELETE CASCADE
);
# 메시지 내용만으로는 어떤 알림이 어떤 '책', '발주서', '정책'과 관련되어 있는지 불분명
# : target_type   알림이 연결된 대상 테이블 타입 (BOOK, PURCHASE_ORDER 등)
# : target_id   해당 대상의 기본 키 값 (book_isbn, purchase_order_id, policy_id 등과 매칭)