# Webdeveloper.lk Production Implementation Notes

## What is included in V22
1. Admin dashboard frontend
2. PHP/MySQL backend scaffold
3. Database schema
4. Secure PHP session functions
5. Registration and login API scaffold
6. Project create/update API scaffold
7. Payment gateway placeholder API
8. File upload API
9. Notification API
10. End-to-end test plan

## Backend setup on cPanel
1. Create MySQL database
2. Import `backend/schema.sql`
3. Edit `backend/config.php`
4. Set DB credentials
5. Create an admin user in the `users` table with `is_admin = 1`
6. Set `WDLK_BACKEND_ENABLED = true` inside `assets/js/backend-client.js` or before including it
7. Connect frontend forms to backend client calls

## Payment gateway integration
The files are ready for a real gateway adapter:
- `backend/api/payment-create.php`
- `backend/api/payment-webhook.php`
- `backend/config.php`

You need provider credentials and exact API docs from the gateway. Recommended Sri Lankan options to evaluate:
- PayHere
- WebXpay
- OnePay
- Genie Business
- Bank payment gateway

## File upload handling
Backend upload file:
- `backend/api/upload-file.php`

Allowed types are:
- JPEG
- PNG
- WebP
- PDF
- DOC
- DOCX

Max size:
- 5MB by default

Change in:
- `backend/config.php`

## Notification system
Backend notification file:
- `backend/api/notify.php`

For more reliable production email:
- Use SMTP library like PHPMailer
- Configure SPF, DKIM, DMARC for domain email

## Security notes
Frontend secure session exists for prototype only.
Production must rely on backend PHP sessions:
- `backend/session.php`
- HTTPOnly cookie
- SameSite cookie
- Secure cookie on HTTPS
- Server-side authorization checks
