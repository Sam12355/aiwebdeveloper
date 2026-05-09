# Webdeveloper.lk cPanel Upload and Backend Setup Guide - V48

Generated: 2026-05-03T11:49:38.134384

## 1. Upload files

Upload the full contents of this package to the website public folder, usually:

- public_html/

Keep the folder structure exactly as it is.

## 2. Create MySQL database in cPanel

In cPanel:

1. Open MySQL Database Wizard.
2. Create a database.
3. Create a database user.
4. Assign the user to the database with ALL PRIVILEGES.
5. Open phpMyAdmin.
6. Import:

backend/database.sql

If you already imported an older database, run:

backend/migration_v48.sql

## 3. Update backend/config.php

Edit:

backend/config.php

Update these values:

DB_NAME
DB_USER
DB_PASS
APP_URL
ADMIN_EMAIL
MAIL_FROM

Example:

define('DB_NAME', 'cpaneluser_webdeveloper');
define('DB_USER', 'cpaneluser_wdlkuser');
define('DB_PASS', 'YOUR_PASSWORD');
define('APP_URL', 'https://webdeveloper.lk');

## 4. Backend API files included

Main files:

- backend/api/record-project.php
- backend/api/admin-dashboard-data.php
- backend/api/templates-manage.php
- backend/api/packages-manage.php
- backend/api/admin-reply-client.php
- backend/api/payment-receipt-upload.php
- backend/api/payment-verify.php
- backend/api/project-stage-update.php
- backend/api/upload-file.php

## 5. Admin panel

Open:

/my-admin

or:

/admin-dashboard.html

Admin sections added:

- Full Customer Data Records
- Payment Records
- Template Management
- Package Price Management
- Client Inbox / Manual Email Reply

## 6. Payment receipt flow

Customer can upload bank slip in the frontend.
Receipt data appears in admin through browser storage immediately.
Production backend upload endpoint is included:

backend/api/payment-receipt-upload.php

Uploaded files are stored inside:

backend/uploads/

## 7. Email reply flow

Client Inbox currently:

- Saves reply records in admin browser storage
- Opens your email app using mailto
- Also calls backend/api/admin-reply-client.php

The PHP endpoint attempts mail() if the cPanel mail server is configured.
If mail() is not configured, replies are still saved and manual email can be sent.

## 8. Important security notes before live

- Change database credentials in backend/config.php
- Set a real admin login before public launch if needed
- Protect backend SQL files after import
- Limit upload file size in PHP settings if needed
- Test receipt upload on the live server after cPanel upload


## V50 Automation Sync Notes

Added files:
- assets/js/automation-sync.js
- assets/css/sync-automation.css
- backend/api/automation-sync.php

What it does:
- Automatically records frontend/customer activity.
- Syncs customer-dashboard.html with admin-dashboard.html.
- Syncs admin stage updates, messages, uploads, staff assignments, payment verification, customer requests and receipt updates.
- Adds activity logs to browser storage and, on live server, to the MySQL activity_log table.

Database:
- backend/database.sql and backend/schema.sql include activity_log.
- Existing databases can run backend/migration_v48.sql again to add activity_log if missing.

Important:
- Browser-storage realtime sync works in the same browser/device.
- Production cross-device sync requires importing database.sql and setting backend/config.php.


## V52 Admin Realtime Server Ready Notes

New files:
- assets/js/v52-system-sync.js
- assets/js/v52-admin-manager.js
- assets/css/v52-admin-sync.css
- backend/api/v52-sync.php

Database:
- For new database, import backend/database.sql.
- For existing database, run backend/migration_v48.sql again.

Important:
- Browser-storage realtime sync works instantly in the same browser/device.
- Cross-device/server sync requires cPanel database setup and backend/config.php database credentials.
- Email uses PHP mail() if cPanel mail is configured.
- SMS records are prepared/stored. Connect an SMS gateway later for real sending.


## V53 Security and Admin UX Notes

Security files updated:
- .htaccess
- backend/.htaccess
- backend/uploads/.htaccess
- backend/security.php

Admin updates:
- admin-dashboard.html#overview has user-friendly clickable summary cards.
- admin-dashboard.html#project-update has project selector, progress slider, stage timeline and quick message buttons.

Language:
- Sinhala / English header switch is added through assets/js/lang-switch.js.
- Switching language keeps localStorage/session/project data safe.

Legal pages:
- terms-and-conditions.html
- privacy-policy.html
- security-policy.html
- /sn/terms-and-conditions.html
- /sn/privacy-policy.html
- /sn/security-policy.html


## V54 Price/Package Manager Sync

Updated:
- assets/js/v54-price-sync.js
- assets/css/v54-price-sync.css
- backend/api/packages-manage.php
- backend/database.sql
- backend/schema.sql
- backend/migration_v48.sql

Admin:
- Open /my-admin then go to Packages.
- Edit existing packages or add new packages.
- Save/Sync Package updates browser storage and backend database.

Frontend:
- details.html and /sn/details.html load admin-managed packages.
- Selected package updates project price, advance payment and balance payment.

Database:
- New columns for package_prices: details, sort_order.
- For existing database run backend/migration_v48.sql again.


## V56 Final Complete Notes

After upload:
1. Import backend/database.sql for a new database.
2. Update backend/config.php.
3. Confirm /my-admin opens.
4. Test frontend flow from index.html to invoice.html.
5. Test package manager edit/save/delete.
6. Test receipt upload and admin payment verification.
7. Test Sinhala / English switch on all process pages.
