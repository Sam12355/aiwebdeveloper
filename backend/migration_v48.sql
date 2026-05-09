ALTER TABLE users ADD COLUMN IF NOT EXISTS username VARCHAR(190) DEFAULT NULL UNIQUE AFTER name;
-- Webdeveloper.lk V48 migration for existing database
-- Run only if you already imported an older schema.
ALTER TABLE projects ADD COLUMN IF NOT EXISTS project_key VARCHAR(80) UNIQUE AFTER id;
ALTER TABLE projects ADD COLUMN IF NOT EXISTS customer_name VARCHAR(190) AFTER business_name;
ALTER TABLE projects ADD COLUMN IF NOT EXISTS contact_number VARCHAR(80) AFTER customer_name;
ALTER TABLE projects ADD COLUMN IF NOT EXISTS email VARCHAR(190) AFTER contact_number;
ALTER TABLE projects ADD COLUMN IF NOT EXISTS feature VARCHAR(190) AFTER website_path;
ALTER TABLE projects ADD COLUMN IF NOT EXISTS additional_info TEXT AFTER feature;
ALTER TABLE projects ADD COLUMN IF NOT EXISTS pricing_type VARCHAR(120) AFTER theme_image;
ALTER TABLE projects ADD COLUMN IF NOT EXISTS pricing_type_label VARCHAR(190) AFTER pricing_type;
ALTER TABLE projects ADD COLUMN IF NOT EXISTS package_name VARCHAR(120) AFTER pricing_type_label;
ALTER TABLE projects ADD COLUMN IF NOT EXISTS package_label VARCHAR(190) AFTER package_name;
ALTER TABLE projects ADD COLUMN IF NOT EXISTS package_pages VARCHAR(120) AFTER package_label;
ALTER TABLE projects ADD COLUMN IF NOT EXISTS total_price DECIMAL(12,2) DEFAULT 0 AFTER package_pages;
ALTER TABLE projects ADD COLUMN IF NOT EXISTS advance_payment DECIMAL(12,2) DEFAULT 0 AFTER total_price;
ALTER TABLE projects ADD COLUMN IF NOT EXISTS balance_payment DECIMAL(12,2) DEFAULT 0 AFTER advance_payment;
ALTER TABLE projects ADD COLUMN IF NOT EXISTS payment_status VARCHAR(80) DEFAULT 'lead' AFTER balance_payment;
ALTER TABLE projects ADD COLUMN IF NOT EXISTS final_payment_status VARCHAR(80) AFTER payment_status;
ALTER TABLE projects ADD COLUMN IF NOT EXISTS progress_percent INT DEFAULT 0 AFTER stage;
ALTER TABLE projects ADD COLUMN IF NOT EXISTS raw_json LONGTEXT AFTER renewal_date;
ALTER TABLE payment_receipts ADD COLUMN IF NOT EXISTS file_url VARCHAR(255) AFTER receipt_file;
ALTER TABLE payment_receipts ADD COLUMN IF NOT EXISTS admin_note TEXT AFTER verified_at;

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
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS admin_notifications (
  id INT AUTO_INCREMENT PRIMARY KEY,
  project_id INT NULL,
  title VARCHAR(190) NOT NULL,
  message TEXT,
  type VARCHAR(80),
  is_read TINYINT(1) DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
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
  INDEX idx_activity_invoice (invoice_no)
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
  INDEX idx_customer_contact (contact_number)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS sms_alerts (
  id INT AUTO_INCREMENT PRIMARY KEY,
  project_id INT NULL,
  project_key VARCHAR(80),
  phone VARCHAR(80),
  message TEXT,
  status VARCHAR(80) DEFAULT 'prepared',
  provider_response TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS email_alerts (
  id INT AUTO_INCREMENT PRIMARY KEY,
  project_id INT NULL,
  project_key VARCHAR(80),
  email_to VARCHAR(190),
  subject VARCHAR(190),
  message TEXT,
  status VARCHAR(80) DEFAULT 'prepared',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;


ALTER TABLE package_prices ADD COLUMN IF NOT EXISTS details TEXT NULL;
ALTER TABLE package_prices ADD COLUMN IF NOT EXISTS sort_order INT DEFAULT 0;
