-- ========================================================
--  OKDevs Appointment Database
--  Created: 2025-03-22 | Version: 1.3
-- ========================================================

CREATE DATABASE IF NOT EXISTS okdevs_appointments;
USE okdevs_appointments;

CREATE TABLE IF NOT EXISTS appointments (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    phone VARCHAR(15) NOT NULL,
    email VARCHAR(100) NOT NULL,
    service VARCHAR(255) NOT NULL,
    message TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE KEY unique_appointment (email, service, created_at),
    INDEX idx_email (email)
);

CREATE TABLE IF NOT EXISTS chat_history (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NULL,
    user_message TEXT NOT NULL,
    bot_reply TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ========================================================
--  Heavenly Roofing Appointment Database
-- ========================================================

CREATE DATABASE IF NOT EXISTS heavenlyroofing_appointments;
USE heavenlyroofing_appointments;

CREATE TABLE IF NOT EXISTS appointments (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    phone VARCHAR(15) NOT NULL,
    email VARCHAR(100) NOT NULL,
    service VARCHAR(255) NOT NULL,
    message TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE KEY unique_appointment (email, service, created_at),
    INDEX idx_email (email)
);

CREATE TABLE IF NOT EXISTS chat_history (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NULL,
    user_message TEXT NOT NULL,
    bot_reply TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ========================================================
--  Dominguez Tech Solutions Appointment Database
-- ========================================================

CREATE DATABASE IF NOT EXISTS domtech_appointments;
USE domtech_appointments;

CREATE TABLE IF NOT EXISTS appointments (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    phone VARCHAR(15) NOT NULL,
    email VARCHAR(100) NOT NULL,
    service VARCHAR(255) NOT NULL,
    message TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE KEY unique_appointment (email, service, created_at),
    INDEX idx_email (email)
);

CREATE TABLE IF NOT EXISTS chat_history (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NULL,
    user_message TEXT NOT NULL,
    bot_reply TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ========================================================
-- Admin User Database (NEW)
-- Created: 2025-03-27
-- ========================================================

CREATE DATABASE IF NOT EXISTS admin_db;
USE admin_db;

CREATE TABLE IF NOT EXISTS admin_users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ========================================================
-- Create User & Grant Privileges
-- ========================================================

CREATE USER IF NOT EXISTS 'webadmin'@'localhost' IDENTIFIED BY 'Password123!';

GRANT ALL PRIVILEGES ON okdevs_appointments.* TO 'webadmin'@'localhost';
GRANT ALL PRIVILEGES ON heavenlyroofing_appointments.* TO 'webadmin'@'localhost';
GRANT ALL PRIVILEGES ON domtech_appointments.* TO 'webadmin'@'localhost';
GRANT ALL PRIVILEGES ON admin_db.* TO 'webadmin'@'localhost';

FLUSH PRIVILEGES;