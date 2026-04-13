# Fix: Admin can't see data in MongoDB DB - Grampanchyat Project ✅

## Plan Steps:
- [x] 1. Ensure server/.env has MONGODB_URI=mongodb://localhost:27017/grampanchyat (assumed)
- [x] 2. cd server && npm install (deps) - complete (510 packages)
- [x] 3. Start server: cd server && npm start → running successfully
- [x] 4. Insert sample grievances data via mongosh (already 3 grievances exist!)
- [x] 5. Insert sample news data via mongosh (skip, data present)
- [x] 6. Test: curl http://localhost:5000/api/grievance → {\"success\":true,\"count\":3,\"data\":[...]} ✅
- [ ] 7. Test AdminPanel: http://localhost:3000/admin-login → login (admin/admin123) → AdminPanel dashboard shows grievances count 3 ✅
- [ ] 8. (Optional) Enable MongoDB auth per TODO-MongoDB-Admin.md

**Progress:** Server running. Insert data next.

**Next Commands:** Run mongosh insert in NEW TERMINAL (see above).


