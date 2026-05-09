# Realtime Notification Test Run Guide

## Prototype realtime method
This version uses:
- `BroadcastChannel`
- `storage` events
- 2-second polling refresh

This works best when admin dashboard and customer dashboard are opened in two tabs of the same browser.

## Test scenario 1: Customer to Admin, receipt upload
1. Open `admin-dashboard.html#notifications` in one tab
2. Open `invoice.html` or `customer-dashboard.html` in another tab
3. Upload a bank payment receipt
4. Admin tab should show:
   - notification badge
   - toast alert
   - new item in Notifications
   - receipt in Payments section

## Test scenario 2: Admin to Customer, payment verification
1. Open `customer-dashboard.html#notifications`
2. Open `admin-dashboard.html#payments`
3. Click `Mark Payment Received`
4. Customer tab should show:
   - notification badge
   - toast alert
   - new notification saying payment received and verified

## Test scenario 3: Admin to Customer, stage update
1. Open `admin-dashboard.html#project-update`
2. Update stage and add a message
3. Customer dashboard should receive notification instantly

## Test scenario 4: Customer to Admin, change request
1. Open `customer-dashboard.html#change-request`
2. Submit a change request
3. Admin dashboard notifications should receive it

## Test scenario 5: Direct admin section links
Open these directly:
- `admin-dashboard.html#overview`
- `admin-dashboard.html#projects`
- `admin-dashboard.html#payments`
- `admin-dashboard.html#staff`
- `admin-dashboard.html#project-update`
- `admin-dashboard.html#requests`
- `admin-dashboard.html#messages`
- `admin-dashboard.html#uploads`
- `admin-dashboard.html#notifications`

Each should open the correct section layout.
