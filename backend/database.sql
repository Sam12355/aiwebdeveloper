-- Webdeveloper.lk MySQL schema - V48 cPanel production ready
-- Import this file in cPanel phpMyAdmin before connecting the site.
SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";

CREATE TABLE IF NOT EXISTS users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  business_name VARCHAR(190) NOT NULL,
  name VARCHAR(190) NOT NULL,
  username VARCHAR(190) DEFAULT NULL UNIQUE,
  contact_number VARCHAR(50) NOT NULL,
  email VARCHAR(190) NOT NULL UNIQUE,
  password_hash VARCHAR(255) DEFAULT NULL,
  is_admin TINYINT(1) NOT NULL DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS projects (
  id INT AUTO_INCREMENT PRIMARY KEY,
  project_key VARCHAR(80) UNIQUE,
  user_id INT NULL,
  invoice_no VARCHAR(80) UNIQUE,
  business_type VARCHAR(190),
  business_name VARCHAR(190),
  customer_name VARCHAR(190),
  contact_number VARCHAR(80),
  email VARCHAR(190),
  business_description TEXT,
  main_services TEXT,
  page_count VARCHAR(80),
  business_model VARCHAR(120),
  website_path VARCHAR(120),
  feature VARCHAR(190),
  additional_info TEXT,
  theme_name VARCHAR(190),
  theme_category VARCHAR(120),
  theme_image VARCHAR(255),
  pricing_type VARCHAR(120),
  pricing_type_label VARCHAR(190),
  package_name VARCHAR(120),
  package_label VARCHAR(190),
  package_pages VARCHAR(120),
  total_price DECIMAL(12,2) DEFAULT 0,
  advance_payment DECIMAL(12,2) DEFAULT 0,
  balance_payment DECIMAL(12,2) DEFAULT 0,
  payment_status VARCHAR(80) DEFAULT 'lead',
  final_payment_status VARCHAR(80),
  status VARCHAR(80) NOT NULL DEFAULT 'Lead',
  stage VARCHAR(80) NOT NULL DEFAULT 'lead',
  progress_percent INT DEFAULT 0,
  live_url VARCHAR(255),
  renewal_date DATE,
  raw_json LONGTEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
  INDEX idx_project_key (project_key),
  INDEX idx_invoice (invoice_no),
  INDEX idx_stage (stage),
  INDEX idx_payment_status (payment_status),
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS payments (
  id INT AUTO_INCREMENT PRIMARY KEY,
  project_id INT NOT NULL,
  payment_type ENUM('advance','final') NOT NULL,
  amount DECIMAL(12,2) NOT NULL,
  currency VARCHAR(10) NOT NULL DEFAULT 'LKR',
  method VARCHAR(120),
  gateway VARCHAR(80),
  gateway_reference VARCHAR(190),
  status VARCHAR(80) NOT NULL DEFAULT 'pending',
  paid_at DATETIME NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
  UNIQUE KEY uniq_project_payment_type (project_id, payment_type),
  FOREIGN KEY (project_id) REFERENCES projects(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS payment_receipts (
  id INT AUTO_INCREMENT PRIMARY KEY,
  project_id INT NOT NULL,
  payment_type ENUM('advance','final') NOT NULL,
  method VARCHAR(120) NOT NULL DEFAULT 'Bank Transfer',
  amount DECIMAL(12,2) NOT NULL,
  bank_name VARCHAR(190),
  branch VARCHAR(190),
  account_name VARCHAR(190),
  account_number VARCHAR(80),
  receipt_file VARCHAR(255),
  file_url VARCHAR(255),
  status VARCHAR(80) NOT NULL DEFAULT 'pending_verification',
  submitted_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  verified_at DATETIME NULL,
  admin_note TEXT,
  FOREIGN KEY (project_id) REFERENCES projects(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS project_files (
  id INT AUTO_INCREMENT PRIMARY KEY,
  project_id INT NOT NULL,
  original_name VARCHAR(255) NOT NULL,
  stored_name VARCHAR(255) NOT NULL,
  mime_type VARCHAR(120),
  size_bytes INT,
  uploaded_by VARCHAR(80) DEFAULT 'customer',
  notes TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (project_id) REFERENCES projects(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS project_messages (
  id INT AUTO_INCREMENT PRIMARY KEY,
  project_id INT NOT NULL,
  sender_type ENUM('admin','customer','system') NOT NULL DEFAULT 'system',
  subject VARCHAR(190),
  message TEXT NOT NULL,
  email_to VARCHAR(190),
  email_status VARCHAR(80) DEFAULT 'saved',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (project_id) REFERENCES projects(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS change_requests (
  id INT AUTO_INCREMENT PRIMARY KEY,
  project_id INT NOT NULL,
  change_type VARCHAR(120),
  section_name VARCHAR(190),
  details TEXT NOT NULL,
  status VARCHAR(80) NOT NULL DEFAULT 'Submitted',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (project_id) REFERENCES projects(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS email_setup_requests (
  id INT AUTO_INCREMENT PRIMARY KEY,
  project_id INT NOT NULL,
  preferred_email VARCHAR(190),
  alternative_email VARCHAR(190),
  forward_to VARCHAR(190),
  notes TEXT,
  status VARCHAR(80) NOT NULL DEFAULT 'Submitted',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (project_id) REFERENCES projects(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS staff_members (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(190) NOT NULL,
  role VARCHAR(120) NOT NULL,
  email VARCHAR(190),
  phone VARCHAR(80),
  active TINYINT(1) NOT NULL DEFAULT 1,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS job_assignments (
  id INT AUTO_INCREMENT PRIMARY KEY,
  project_id INT NOT NULL,
  staff_id INT NOT NULL,
  job_type VARCHAR(120) NOT NULL,
  instructions TEXT,
  status VARCHAR(80) NOT NULL DEFAULT 'Assigned',
  assigned_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  completed_at DATETIME NULL,
  FOREIGN KEY (project_id) REFERENCES projects(id) ON DELETE CASCADE,
  FOREIGN KEY (staff_id) REFERENCES staff_members(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS website_templates (
  id INT AUTO_INCREMENT PRIMARY KEY,
  template_key VARCHAR(120) UNIQUE,
  name VARCHAR(190) NOT NULL,
  category VARCHAR(120) NOT NULL,
  image VARCHAR(255),
  demo_url VARCHAR(255),
  status VARCHAR(80) NOT NULL DEFAULT 'Active',
  notes TEXT,
  sort_order INT DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS package_prices (
  id INT AUTO_INCREMENT PRIMARY KEY,
  package_key VARCHAR(120) UNIQUE,
  package_type VARCHAR(190) NOT NULL,
  package_name VARCHAR(120) NOT NULL,
  starting_price DECIMAL(12,2) NOT NULL,
  pages VARCHAR(120),
  hosting VARCHAR(120),
  email_accounts VARCHAR(120),
  status VARCHAR(80) NOT NULL DEFAULT 'Active',
  details TEXT,
  sort_order INT DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS admin_replies (
  id INT AUTO_INCREMENT PRIMARY KEY,
  project_id INT NULL,
  email_to VARCHAR(190),
  subject VARCHAR(190),
  message TEXT,
  status VARCHAR(80) DEFAULT 'saved',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (project_id) REFERENCES projects(id) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;



CREATE TABLE IF NOT EXISTS customer_accounts (
  id INT AUTO_INCREMENT PRIMARY KEY,
  project_id INT NULL,
  project_key VARCHAR(80),
  invoice_no VARCHAR(80),
  business_name VARCHAR(190),
  customer_name VARCHAR(190),
  username VARCHAR(190) NOT NULL,
  contact_number VARCHAR(80),
  email VARCHAR(190),
  password_hash VARCHAR(255),
  plain_password_temp VARCHAR(80),
  status VARCHAR(80) DEFAULT 'active',
  email_alert_status VARCHAR(80) DEFAULT 'pending',
  sms_alert_status VARCHAR(80) DEFAULT 'pending',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
  UNIQUE KEY uniq_customer_username (username),
  INDEX idx_customer_project_key (project_key),
  INDEX idx_customer_contact (contact_number),
  FOREIGN KEY (project_id) REFERENCES projects(id) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS sms_alerts (
  id INT AUTO_INCREMENT PRIMARY KEY,
  project_id INT NULL,
  project_key VARCHAR(80),
  phone VARCHAR(80),
  message TEXT,
  status VARCHAR(80) DEFAULT 'prepared',
  provider_response TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (project_id) REFERENCES projects(id) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS email_alerts (
  id INT AUTO_INCREMENT PRIMARY KEY,
  project_id INT NULL,
  project_key VARCHAR(80),
  email_to VARCHAR(190),
  subject VARCHAR(190),
  message TEXT,
  status VARCHAR(80) DEFAULT 'prepared',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (project_id) REFERENCES projects(id) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS activity_log (
  id INT AUTO_INCREMENT PRIMARY KEY,
  project_id INT NULL,
  project_key VARCHAR(80),
  invoice_no VARCHAR(80),
  activity_type VARCHAR(80),
  title VARCHAR(190),
  message TEXT,
  payload_json LONGTEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  INDEX idx_activity_project_key (project_key),
  INDEX idx_activity_invoice (invoice_no),
  FOREIGN KEY (project_id) REFERENCES projects(id) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS admin_notifications (
  id INT AUTO_INCREMENT PRIMARY KEY,
  project_id INT NULL,
  title VARCHAR(190) NOT NULL,
  message TEXT,
  type VARCHAR(80),
  is_read TINYINT(1) DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (project_id) REFERENCES projects(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

INSERT IGNORE INTO package_prices (package_key, package_type, package_name, starting_price, pages, hosting, email_accounts, details, sort_order)
VALUES
('standard-starter','Standard Business web design','Starter',50000,'5 Pages','2 GB','1 Email address','5 Pages, Animated Slider / Images, Content writing, Mobile responsive, Domain name, Web hosting, Contact form / Google map, Visitor reports',1),
('standard-business','Standard Business web design','Business',80000,'10 Pages','5 GB','3 Email addresses','10 Pages, Products or Services pages, Animated Slider / Images, Content writing, Mobile responsive, Domain name, Web hosting, Contact form / Google map, Visitor reports',2),
('standard-corporate','Standard Business web design','Corporate',120000,'Unlimited pages','10 GB','10 Email addresses','Unlimited pages, Products / Services, Animated Slider / Images, Content writing, Mobile responsive, Domain name, Web hosting, Contact form / Google map, Visitor reports',3),
('custom-starter','Custom Business website design','Starter',50000,'5 Pages','2 GB','1 Email address','Custom starter website package with standard business features.',4),
('custom-business','Custom Business website design','Business',80000,'10 Pages','5 GB','3 Email addresses','Custom business website package for service and product companies.',5),
('custom-corporate','Custom Business website design','Corporate',150000,'Unlimited pages','10 GB','10 Email addresses','Custom corporate website package with advanced pages and business sections.',6);

INSERT IGNORE INTO website_templates (template_key, name, category, status, notes)
VALUES
('template-business-modern','Modern Business','Business','Active','General business website layout.'),
('template-ecommerce-clean','Clean Product Store','E-commerce','Active','Product and online store theme.'),
('template-hotel-food','Hospitality Landing','Hotel / Food','Active','Hotel, villa and restaurant layout.');
