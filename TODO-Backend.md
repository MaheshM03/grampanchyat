# Backend Integration Plan - Grampanchyat
Current: f:/FreeLance/Grampanchyat

## Steps:
- [x] 1. Install mongoose in server/
- [x] 1.5. Create .env template
- [x] 2. Create .env with local MongoDB URI
- [x] 3. Update server.js: mongoose.connect
- [x] 4. Fix controllers: remove in-memory arrays, use real models (Grievance, validation)
- [ ] 5. Update middleware/auth.js for JWT
- [x] 6. Integrate GrievanceSection.jsx form submit

- [x] 7. Integrate AdminPanel.jsx with APIs + auth (contexts)

- [ ] 8. Integrate certificate forms (Birth/Death/Residence)
- [ ] 9. Test & start servers
- [ ] 10. Complete

## Notes:
- Ensure MongoDB service running: `net start MongoDB` or `brew services start mongodb-community` (Mac)
- Manual npm i if tool fails
- Next: DB connection

Progress will be updated after each step.

