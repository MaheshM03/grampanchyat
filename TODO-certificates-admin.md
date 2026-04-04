# TODO: Implement Certificate Requests in Admin Panel

Approved plan steps (2024):

## Backend (add GET /api/*-certificates for all requests)

- [x] 1. **birthCertificateController.js**: Add `getAllBirthCertificates` controller & export ✅
- [x] 2. **deathCertificateController.js**: Add `getAllDeathCertificates` controller & export ✅
- [x] 3. **residenceCertificateController.js**: Add `getAllResidenceCertificates` controller & export ✅
- [x] 4. **birthCertificate.js** route: Add `router.get('/', getAllBirthCertificates);` ✅
- [x] 5. **deathCertificate.js** route: Add `router.get('/', getAllDeathCertificates);` ✅
- [x] 6. **residenceCertificate.js** route: Add `router.get('/', getAllResidenceCertificates);` ✅

## Frontend (AdminPanel.jsx)

- [x] 7. Add 'Certificates' tab. States for birthRequests, deathRequests, residenceRequests, certType, selectedCert. ✅
- [x] 8. Fetch all on tab/certType change: axios.get(`/api/${type}-certificates`) ✅
- [x] 9. Subtabs: Birth | Death | Residence. Table: token, name/mobile, status badge, date, actions (view/update/delete). ✅
- [x] 10. Modal: view details, update status form (PUT /:id/status), delete. ✅
- [x] Fixed ESLint: window.confirm() ✅

## Testing

- [ ] 11. Restart server `cd server && npm start`
- [ ] 12. Submit sample cert requests from CitizenPortal/forms.
- [ ] 13. Login admin123, check Certificates tab → lists → update status → verify.
- [ ] 12. Submit sample cert requests from CitizenPortal/forms.
- [ ] 13. Login admin123, check Certificates tab → lists → update status → verify.

Progress: Backend complete ✅ Frontend in progress (steps 7-10).
