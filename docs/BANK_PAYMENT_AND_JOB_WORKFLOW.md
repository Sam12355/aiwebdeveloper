# Bank Payment + Job Assignment Workflow

## Main payment method
Customer pays to:

Commercial Bank - Kadawatha Branch  
Web Designer & Web Developer (Pvt)Ltd  
Account Number: 1000433270

Customer can pay using:
1. Online banking transfer
2. Manual bank deposit

After payment, customer uploads the receipt/slip image.

## Customer flow
1. Customer reaches invoice page
2. Bank Transfer / Deposit is shown as the main payment method
3. Customer copies account number
4. Customer pays from online bank account or deposits manually
5. Customer uploads receipt image
6. Customer submits receipt
7. Customer account opens through payment success Next flow
8. Customer dashboard shows receipt pending verification

## Admin flow
1. Admin opens admin dashboard
2. Admin goes to Payments
3. Receipt appears with project and customer details
4. Admin checks actual bank account
5. Admin clicks Mark Payment Received
6. System updates project stage to Planning
7. Admin goes to Jobs & Staff
8. Admin assigns job to designer/developer/content staff
9. Staff assignment is recorded

## Second payment option
Card payment remains as the second option.

## Production backend
Backend scaffold includes:
- payment_receipt_upload.php
- payment-verify.php
- staff-create.php
- job-assign.php

For production, actual receipt file uploads and payment verification must be stored in MySQL.
