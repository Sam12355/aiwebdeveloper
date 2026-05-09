# Webdeveloper.lk Full End-to-End Function Testing

## Test status
This package includes a frontend prototype plus PHP/MySQL backend scaffold.

## Manual test flow
1. Open `index.html`
2. Enter business type and click Start My Website
3. Complete `business-type.html`
4. Confirm `details.html` auto-fills Business Name
5. Complete services, pages, business model and website path
6. On `theme-selection.html`
   - Confirm category auto-selects based on business type
   - Choose a theme
   - Click Create My Website
7. Confirm `invoice.html` loads selected theme and details
8. Pay advance using test card UI
9. Confirm `payment-success.html` shows one big Next button
10. Click Next and open customer dashboard
11. Confirm countdown timer starts from project start time
12. Open `project-progress.html`
13. Move stages until Demo Ready
14. Open `demo-review.html`
15. Request changes and confirm dashboard update
16. Approve demo and confirm stage changes to Development
17. Continue to Final Review
18. Accept Final Website
19. Pay final balance
20. Launch website
21. Confirm `website-live.html` details:
    - Website Status: Live
    - Hosting: Free 1st Year
    - Renewal Date generated
    - Renewal LKR 12,000 annually
22. Open customer dashboard and confirm live details panel appears
23. Submit Setup Email Option
24. Submit Request a Change
25. Open `admin-login.html`
26. Login with `admin / admin123`
27. Confirm admin can view project, requests, messages and uploads

## Browser test matrix
- Chrome desktop
- Edge desktop
- Safari mobile
- Android Chrome

## Production test after backend activation
- Register customer
- Login customer
- Create project in database
- Payment gateway sandbox transaction
- Payment webhook
- File upload
- Admin stage update
- Email notification delivery
- Session timeout
- SSL certificate check
