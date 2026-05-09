# Receipt Upload Fix Notes - V28

The previous error `Could not submit receipt. Please try again.` could happen when the uploaded receipt image was too large for browser localStorage.

V28 fixes:
- Compresses receipt image previews before storing
- Stores PDF receipts as file-name metadata in prototype mode
- If browser storage is full, it stores the receipt record without the image preview instead of failing
- Shows the real error message on invoice page
- Makes notification storage more robust
- Makes admin payment storage more robust

For the production PHP/MySQL version, receipt files should be uploaded to the server using:
- backend/api/payment-receipt-upload.php
