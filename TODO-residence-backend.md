# TODO: Residence Certificate Backend Implementation

## Steps to Complete:

- [x] **Step 1**: Create `server/models/ResidenceCertificate.js` - Mongoose schema based on form fields (applicantDetails, residenceDetails, documents, payment, status, token/mobile).
- [x] **Step 2**: Create `server/controllers/residenceCertificateController.js` - createResidenceCertificate, getResidenceCertificate, updateStatus functions (pattern from birth/death).
- [x] **Step 3**: Create `server/routes/residenceCertificate.js` - Express router with POST /, GET /:tokenOrMobile, PUT /:id/status.
- [x] **Step 4**: Edit `server/server.js` - Add `app.use('/api/residence-certificates', require('./routes/residenceCertificate'));`.
- [ ] **Step 5**: Test backend - Restart server, POST/GET sample data to /api/residence-certificates, verify MongoDB storage.

**After completion**: Update ResidenceCertificateForm.jsx for real API calls if needed (separate task).

Current progress: Steps 1-4 complete. Step 5: Test backend (restart server, test endpoints).

