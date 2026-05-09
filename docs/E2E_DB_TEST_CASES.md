# End-to-End DB Test Cases

Run these after changes to confirm the customer/admin flow persists in MySQL.

## TC01 Customer project capture
- Start at `business-type.php?business=Restaurant`.
- Complete business details, website details, theme selection, and invoice.
- Expected DB:
  - `projects.business_type = Restaurant`
  - `projects.total_price > 0`
  - `projects.theme_name` is filled
  - `projects.stage IN (invoice_ready, pending_lead)`

## TC02 Advance bank receipt upload
- Upload an advance payment slip from invoice or dashboard.
- Expected DB:
  - `payments.payment_type = advance`
  - `payments.status = pending_verification`
  - `payment_receipts.payment_type = advance`
  - `projects.payment_status = pending_verification`

## TC03 Admin verifies advance payment
- Open `admin-dashboard.php#payments`.
- Click verify/mark received for the advance payment.
- Expected DB:
  - `payments.status IN (received, advance_paid)`
  - `projects.payment_status = received`
  - `projects.stage = planning`
  - `projects.progress_percent = 28`

## TC04 Admin stage updates
- Move stage through `design`, `demo`, `development`, `final`, and `final_payment`.
- Expected DB:
  - `projects.stage` equals the selected stage
  - `projects.progress_percent` matches the configured stage progress
  - optional admin message appears in `project_messages`

## TC05 Final payment
- Customer accepts final review and pays/upload final balance.
- Expected DB:
  - `payments.payment_type = final`
  - `projects.final_payment_status` becomes `pending_verification` or `balance_paid`

## TC06 Admin verifies final payment
- Admin verifies final payment.
- Expected DB:
  - `projects.final_payment_status = received`
  - `projects.stage = ready_to_launch`
  - `projects.progress_percent = 100`

## TC07 Launch website
- Launch from `launch-website.php`.
- Expected DB:
  - `projects.stage = live`
  - `projects.status = Live`
  - `projects.live_url` is filled
  - `projects.renewal_date` is filled

## Quick DB Summary Query

```sql
SELECT id, invoice_no, business_name, stage, status, payment_status,
       final_payment_status, progress_percent, live_url, renewal_date
FROM projects
ORDER BY id DESC
LIMIT 10;
```

