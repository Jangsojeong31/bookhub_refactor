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
    branch_id INT AUTO_INCREMENT PRIMARY KEY,
    branch_name VARCHAR(255) NOT NULL,
    -- branch_location VARCHAR(255) DEFAULT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS employee_positions (
    position_id INT AUTO_INCREMENT PRIMARY KEY,
    position_name VARCHAR(255) NOT NULL
);

CREATE TABLE IF NOT EXISTS employees (
    employee_id INT AUTO_INCREMENT PRIMARY KEY,
    position_id INT NOT NULL,
    branch_id INT NOT NULL,
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
    FOREIGN KEY (position_id) REFERENCES employee_positions(position_id) ON DELETE CASCADE,
    FOREIGN KEY (branch_id) REFERENCES branches (branch_id) ON DELETE CASCADE
);

-- ====================================
-- 3. Employee Change Logs and Approval Logs
-- ====================================
CREATE TABLE IF NOT EXISTS `employee_signup_approvals` (
    approval_id INT AUTO_INCREMENT PRIMARY KEY,
    employee_id INT NOT NULL,
    authorizer_id INT NOT NULL,
    status ENUM('PENDING', 'APPROVED', 'DENIED') DEFAULT 'PENDING',
    applied_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    approved_at TIMESTAMP NULL,
    FOREIGN KEY (employee_id) REFERENCES employees(employee_id) ON DELETE CASCADE,
    FOREIGN KEY (authorizer_id) REFERENCES employees(employee_id) ON DELETE CASCADE
    -- , CONSTRAINT chk_status CHECK (status IN ('PENDING', 'APPROVED', 'DENIED'))
);

CREATE TABLE IF NOT EXISTS `employee_change_logs` (
   log_id INT AUTO_INCREMENT PRIMARY KEY,
   employee_id INT NOT NULL,
   change_type VARCHAR(25) NOT NULL,
   previous_position_id INT DEFAULT NULL,
   previous_branch_id INT DEFAULT NULL,
   changed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
   FOREIGN KEY (employee_id)
      REFERENCES employees(employee_id),
    FOREIGN KEY (previous_position_id)
      REFERENCES employee_positions(position_id),
    FOREIGN KEY (previous_branch_id)
      REFERENCES branches(branch_id),
    CONSTRAINT chk_process_type
      CHECK (change_type IN ('POSITION_CHANGE', 'BRANCH_CHANGE'))
);

CREATE TABLE IF NOT EXISTS `employee_exit_logs` (
    exit_id INT AUTO_INCREMENT PRIMARY KEY,
    employee_id INT NOT NULL,
    exit_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    exit_reason VARCHAR(25) NOT NULL,
    FOREIGN KEY (employee_id)
      REFERENCES employees(employee_id),
    CONSTRAINT chk_exit_reason
      CHECK (exit_reason IN ('VOLUNTEER', 'FORCED', 'TERMINATED'))
);

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

CREATE TABLE IF NOT EXISTS `book_categories` (
    category_id INT AUTO_INCREMENT PRIMARY KEY,
    parent_category_id INT DEFAULT NULL,
    category_name VARCHAR(255) NOT NULL,
    FOREIGN KEY (parent_category_id) REFERENCES book_categories (category_id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS `authors`(
    author_id INT AUTO_INCREMENT PRIMARY KEY,
    author_name VARCHAR(255) NOT NULL
);

CREATE TABLE IF NOT EXISTS `publishers` (
    publisher_id INT AUTO_INCREMENT PRIMARY KEY,
    publisher_name VARCHAR(255) NOT NULL
);

CREATE TABLE IF NOT EXISTS `books` (
    book_isbn VARCHAR(255) PRIMARY KEY,
    category_id INT NOT NULL,
    author_id INT NOT NULL,
    publisher_id INT NOT NULL,
    book_title VARCHAR(255) NOT NULL,
    book_price INT NOT NULL,
    book_pub_year YEAR NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (category_id)
      REFERENCES book_categories (category_id),
    FOREIGN KEY (author_id)
      REFERENCES authors(author_id),
    FOREIGN KEY (publisher_id)
      REFERENCES publishers(publisher_id)
);

CREATE TABLE IF NOT EXISTS `book_display_locations` (
    location_id INT AUTO_INCREMENT PRIMARY KEY,
    branch_id INT NOT NULL,
    book_isbn VARCHAR(255) NOT NULL,
    floor VARCHAR(50) NOT NULL,
    hall VARCHAR(50) NOT NULL,
    section VARCHAR(50) NOT NULL,
    -- is_shelf BOOLEAN DEFAULT TRUE,
--     is_table BOOLEAN DEFAULT FALSE,
   display_type VARCHAR(50) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (branch_id) REFERENCES branches(branch_id),
    FOREIGN KEY (book_isbn) REFERENCES books(book_isbn),
   CONSTRAINT chk_display_type
      CHECK (display_type IN ('BOOKSHELF','DISPLAYTABLE'))
);

-- ===============================
-- 5. Inventory Management (재고 관리)
-- ===============================
CREATE TABLE IF NOT EXISTS stocks (
    stock_id INT AUTO_INCREMENT PRIMARY KEY,
    book_isbn VARCHAR(255) NOT NULL,
    branch_id INT NOT NULL,
    book_amount INT NOT NULL,
    is_stock BOOLEAN NOT NULL DEFAULT TRUE,
    FOREIGN KEY (book_isbn) REFERENCES books(book_isbn),
    FOREIGN KEY (branch_id) REFERENCES branches(branch_id)
);

CREATE TABLE IF NOT EXISTS `stock_logs` (
    log_id INT AUTO_INCREMENT PRIMARY KEY,
    book_isbn VARCHAR(255) NOT NULL,
    branch_id INT NOT NULL,
    action_type ENUM('IN', 'OUT', 'MOVE', 'LOSS') NOT NULL,
    amount INT NOT NULL,
    employee_id INT NOT NULL,
    action_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    description TEXT,
    FOREIGN KEY (book_isbn) REFERENCES books(book_isbn),
    FOREIGN KEY (branch_id) REFERENCES branches(branch_id),
    FOREIGN KEY (employee_id) REFERENCES employees(employee_id)
);


-- ===============================
-- 6. Discount and Policy Management (할인 및 정책 관리)
-- ===============================

CREATE TABLE IF NOT EXISTS `discount_policies`(
    policy_id INT AUTO_INCREMENT PRIMARY KEY,
    book_isbn VARCHAR(255) NOT NULL,
    category_id INT NOT NULL,
    discount_percent INT NOT NULL,
    start_date DATE,
    end_date DATE,
    total_price_achieve INT,
    FOREIGN KEY(category_id) 
      REFERENCES book_categories(category_id),
    FOREIGN KEY(book_isbn)
      REFERENCES books(book_isbn)
);

-- ===============================
-- 7. Order Management (발주 및 주문 관리)
-- ===============================
CREATE TABLE IF NOT EXISTS `purchase_orders` (
    purchase_order_id INT AUTO_INCREMENT PRIMARY KEY,
    branch_id INT NOT NULL,
    book_isbn VARCHAR(255) NOT NULL,
    employee_id INT NOT NULL,
    purchase_order_amount INT NOT NULL,
    purchase_order_date_at DATETIME NOT NULL,
    FOREIGN KEY (branch_id)
        REFERENCES branches (branch_id),
    FOREIGN KEY (book_isbn)
        REFERENCES books (book_isbn),
    FOREIGN KEY (employee_id)
        REFERENCES employees (employee_id)
);

CREATE TABLE IF NOT EXISTS `purchase_order_approvals` (
    purchase_order_approval_id INT AUTO_INCREMENT PRIMARY KEY,
    employee_id INT NOT NULL,
    purchase_order_id INT NOT NULL,
    is_approved BOOLEAN NOT NULL,
    approved_date_at DATETIME NOT NULL,
    FOREIGN KEY (employee_id)
        REFERENCES employees (employee_id),
    FOREIGN KEY (purchase_order_id)
        REFERENCES purchase_orders (purchase_order_id)
);

CREATE TABLE IF NOT EXISTS `book_reception_approvals` (
    book_reception_approval_id INT AUTO_INCREMENT PRIMARY KEY,
    employee_id INT NOT NULL,
    branch_id INT NOT NULL,
    purchase_order_approval_id INT NOT NULL,
    is_reception_approved BOOLEAN NOT NULL,
    reception_date_at DATETIME NOT NULL,
    FOREIGN KEY (employee_id)
        REFERENCES employees (employee_id),
    FOREIGN KEY (purchase_order_approval_id)
        REFERENCES purchase_order_approvals (purchase_order_approval_id)
);

CREATE TABLE IF NOT EXISTS `customer_orders` (
    customer_order_id INT AUTO_INCREMENT PRIMARY KEY,
    branch_id INT NOT NULL,
    book_isbn VARCHAR(255) NOT NULL,
    policy_id INT NOT NULL,
    customer_order_amount INT NOT NULL,
    customer_order_date_at DATETIME NOT NULL,
    FOREIGN KEY (branch_id)
      REFERENCES branches (branch_id),
    FOREIGN KEY (policy_id)
      REFERENCES discount_policies (policy_id),
    FOREIGN KEY (book_isbn)
      REFERENCES books(book_isbn)
);

-- ===============================
-- 8. Logs and Alerts (로그 및 알림 관리)
-- ===============================
CREATE TABLE IF NOT EXISTS `book_logs` (
    book_log_id INT AUTO_INCREMENT PRIMARY KEY,
    employee_id INT NOT NULL,
    branch_id INT,
    policy_id INT,
    book_isbn VARCHAR(255) NOT NULL,
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
    alert_id INT AUTO_INCREMENT PRIMARY KEY,
    employee_id INT NOT NULL,
    alert_type ENUM('SIGNUP_APPROVAL', 'STOCK_WARNING', 'REQUEST', 'NOTICE') NOT NULL,
    # 로그인 승인 , 재고관련 알람, (발주/수령/주문)요청, 이벤트등록시 확인알람(공지사항 같은 느낌)
    message TEXT NOT NULL,
    #발주 수령 주문 각각 메시지를 다르게 할지 vs enum으로 다 등록시킬지
    is_read BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (employee_id) REFERENCES employees(employee_id) ON DELETE CASCADE
);