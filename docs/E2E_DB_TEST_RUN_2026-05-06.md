# E2E DB Test Run - 2026-05-06

Test project:

- Business: `E2E Restaurant Test`
- Invoice: `WD-E2E-133909`

## Results

- PASS: TC01 project capture returned project id.
- PASS: TC01 project fields persisted.
- PASS: TC02 advance receipt upload saved `payment_receipts` row.
- PASS: TC02 project/payment moved to `pending_verification`.
- PASS: TC03 admin advance verification moved project to `planning`.
- PASS: TC04 stage update `design` saved.
- PASS: TC04 stage update `demo` saved.
- PASS: TC04 stage update `development` saved.
- PASS: TC04 stage update `final` saved.
- PASS: TC04 stage update `final_payment` saved.
- PASS: TC05 final payment row saved.
- PASS: TC06 final payment verification saved `ready_to_launch`.
- PASS: TC07 launch saved `live_url`, `renewal_date`, `stage=live`, and `status=Live`.

Final DB state for the test project:

```text
stage: live
status: Live
payment_status: received
final_payment_status: received
progress_percent: 100
live_url: https://e2e-restaurant-test.lk
renewal_date: 2027-05-06
```

