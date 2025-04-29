CREATE DATABASE `bookhub_db`;
USE `bookhub_db`;
-- 직원정보 
CREATE TABLE IF NOT EXISTS `employee_position`(
	employee_position_id INT PRIMARY KEY AUTO_INCREMENT,
    employee_position_name VARCHAR(255)
);


CREATE TABLE IF NOT EXISTS `branch`(
	branch_id INT PRIMARY KEY AUTO_INCREMENT,
    branch_name VARCHAR(255)
);

CREATE TABLE IF NOT EXISTS `employee`(
	employee_id INT PRIMARY KEY AUTO_INCREMENT,
    employee_position_id INT NOT NULL,
    branch_id INT NOT NULL,
    employee_number INT NOT NULL,
    employee_login_id VARCHAR(255) NOT NULL,
    employee_password VARCHAR(255) NOT NULL,
    employee_name VARCHAR(255) NOT NULL,
    employee_phone_number VARCHAR(255) NOT NULL,
    employee_birth DATE NOT NULL,
    employee_email VARCHAR(255) NOT NULL,
    is_approved BOOLEAN,
    FOREIGN KEY (employee_position_id) REFERENCES employee_position(employee_position_id),
    FOREIGN KEY (branch_id) REFERENCES branch(branch_id)
);
CREATE TABLE IF NOT EXISTS `employee_signup_approval_log` (
   employee_signup_approval_id INT PRIMARY KEY AUTO_INCREMENT,
   employee_id INT NOT NULL, -- 외래키?
   authorizer_id INT NOT NULL, -- 외래키?
   is_approved ENUM("PENDING", "APPROVED", "DENIED") NOT NULL,
   apply_time_at DATETIME NOT NULL,
   FOREIGN KEY(employee_id) REFERENCES employee(employee_id),
   FOREIGN KEY(authorizer_id) REFERENCES employee(employee_id)   
);

CREATE TABLE  IF NOT EXISTS`employee_change_log` (
   change_log_id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
   employee_id INT NOT NULL,
   process_type ENUM("POSITION_CHANGE", "BRANCH_CHANGE") NOT NULL,
   previous_position_id INT,  -- 외래키?
   previous_branch_id INT, -- 외래키?
   change_log_at DATETIME NOT NULL,
	FOREIGN KEY (employee_id) REFERENCES employee(employee_id),
    FOREIGN KEY (previous_position_id) REFERENCES employee_position(employee_position_id),
    FOREIGN KEY (previous_branch_id) REFERENCES branch(branch_id)
    
);

CREATE TABLE IF NOT EXISTS `employee_exit_log` (
   exit_log_id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
   employee_id INT NOT NULL,
   exit_at DATETIME NOT NULL,
   exit_reason ENUM('VOLUNTEER', 'FORCED', 'TERMINATED') NOT NULL,
    FOREIGN KEY (employee_id) REFERENCES employee(employee_id)
);


-- 책정보

CREATE TABLE IF NOT EXISTS `first_book_category`(
   first_book_category_id INT PRIMARY KEY AUTO_INCREMENT,
    first_book_category_name VARCHAR(255) NOT NULL
);

CREATE TABLE IF NOT EXISTS `second_book_category`(
   second_book_category_id INT PRIMARY KEY AUTO_INCREMENT,
    first_book_category_id INT NOT NULL,
    second_book_category_name VARCHAR(255) NOT NULL,
    FOREIGN KEY(first_book_category_id) 
    REFERENCES first_book_category(first_book_category_id)
);

CREATE TABLE IF NOT EXISTS `author`(
   author_id INT PRIMARY KEY AUTO_INCREMENT,
    author_name VARCHAR(255) NOT NULL
);

CREATE TABLE IF NOT EXISTS `publisher` (
   publisher_id INT PRIMARY KEY AUTO_INCREMENT,
    publisher_name VARCHAR(255) NOT NULL
);

CREATE TABLE IF NOT EXISTS `book` (
    book_isbn VARCHAR(255) PRIMARY KEY,
    first_book_category_id INT NOT NULL,
    author_id INT NOT NULL,
    publisher_id INT NOT NULL,
    book_title VARCHAR(255) NOT NULL,
    book_pub_year YEAR NOT NULL,
    FOREIGN KEY (first_book_category_id) REFERENCES first_book_category(first_book_category_id),
    FOREIGN KEY (author_id) REFERENCES author(author_id),
    FOREIGN KEY (publisher_id) REFERENCES publisher(publisher_id)
);

CREATE TABLE IF NOT EXISTS `book_info` (
    book_info_id INT PRIMARY KEY AUTO_INCREMENT,
    book_isbn VARCHAR(255) NOT NULL,
    book_print_number INT NOT NULL,
    book_price INT NOT NULL,
    book_display_location VARCHAR(255),
    book_print_date DATETIME NOT NULL,
    FOREIGN KEY (book_isbn) REFERENCES book(book_isbn)
);

CREATE TABLE IF NOT EXISTS `stock` (
    book_info_id INT NOT NULL,
    branch_id INT NOT NULL,
    book_amount INT NOT NULL,
    book_is_stock BOOLEAN NOT NULL,
    FOREIGN KEY (book_info_id) REFERENCES book_info(book_info_id),
    FOREIGN KEY (branch_id) REFERENCES branch(branch_id)
);


CREATE TABLE IF NOT EXISTS `discount_policy`(
    policy_id INT PRIMARY KEY AUTO_INCREMENT,
    book_isbn VARCHAR(255) NOT NULL,
    second_book_category_id INT NOT NULL,
    discount_percent INT NOT NULL,
    start_date DATE,
    end_date DATE,
    total_price_achieve INT,
    FOREIGN KEY(second_book_category_id) 
    REFERENCES second_book_category(second_book_category_id),
    FOREIGN KEY(book_isbn)
    REFERENCES book(book_isbn)

);

CREATE TABLE IF NOT EXISTS `purchase_order` (
    purchase_order_id INT PRIMARY KEY AUTO_INCREMENT,
    branch_id INT NOT NULL,
    book_isbn VARCHAR(255) NOT NULL,
    employee_id INT NOT NULL,
    first_book_category_id INT NOT NULL,
    author_id INT NOT NULL,
    publisher_id INT NOT NULL,
    purchase_order_amount INT NOT NULL,
    purchase_order_date_at DATETIME NOT NULL,
    FOREIGN KEY (branch_id)
        REFERENCES branch (branch_id),
    FOREIGN KEY (book_isbn)
        REFERENCES book (book_isbn),
    FOREIGN KEY (employee_id)
        REFERENCES employee (employee_id)
);

CREATE TABLE IF NOT EXISTS `purchase_order_approval` (
    purchase_order_approval_id INT PRIMARY KEY AUTO_INCREMENT,
    employee_id INT NOT NULL,
    purchase_order_id INT NOT NULL,
    is_approved BOOLEAN NOT NULL,
    approved_date_at DATETIME NOT NULL,
    FOREIGN KEY (employee_id)
        REFERENCES employee (employee_id),
    FOREIGN KEY (purchase_order_id)
        REFERENCES purchase_order (purchase_order_id)
);

CREATE TABLE IF NOT EXISTS `book_reception_approval` (
    book_reception_approval_id INT PRIMARY KEY AUTO_INCREMENT,
    employee_id INT NOT NULL,
    branch_id INT NOT NULL,
    purchase_order_approval_id INT NOT NULL,
    is_reception_approved BOOLEAN NOT NULL,
    reception_date_at DATETIME NOT NULL,
    FOREIGN KEY (employee_id)
        REFERENCES employee (employee_id),
    FOREIGN KEY (purchase_order_approval_id)
        REFERENCES purchase_order_approval (purchase_order_approval_id)
);

CREATE TABLE IF NOT EXISTS `customer_order` (
    customer_order_id INT PRIMARY KEY AUTO_INCREMENT,
    branch_id INT NOT NULL,
    book_isbn VARCHAR(255) NOT NULL,
    policy_id INT NOT NULL,
    author_id INT NOT NULL,
    publisher_id INT NOT NULL,
    customer_order_amount INT NOT NULL,
    customer_order_date_at DATETIME NOT NULL,
    FOREIGN KEY (branch_id) REFERENCES branch(branch_id),
    FOREIGN KEY (policy_id) REFERENCES discount_policy(policy_id),
    FOREIGN KEY (book_isbn) REFERENCES book(book_isbn)
);

CREATE TABLE IF NOT EXISTS `book_log` (
    booklog_id INT PRIMARY KEY AUTO_INCREMENT,
    employee_id INT NOT NULL,
    book_info_id INT NOT NULL,
    branch_id INT,
    policy_id INT,
    book_isbn VARCHAR(255) NOT NULL,
    log_type ENUM("PRINT_NUMBER", "PRICE_CHANGE", "DISPLAY_LOCATION", "DISCOUNT_RATE") NOT NULL,
    previous_print_number INT,
    previous_price INT,
    previous_display_location VARCHAR(255),
    previous_discount_rate INT,
    changed_at DATETIME NOT NULL,
    FOREIGN KEY (employee_id)
        REFERENCES employee (employee_id),
	FOREIGN KEY (book_info_id)
		REFERENCES book_info (book_info_id),
	FOREIGN KEY (branch_id)
        REFERENCES branch (branch_id),
	FOREIGN KEY (policy_id)
        REFERENCES discount_policy (policy_id)
);