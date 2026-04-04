# Replace MongoDB with In-Memory Storage - TODO

## Plan Steps:
- [ ] Step 1: Create TODO-localstorage.md (current)
- [x] Step 2: Update server.js (remove mongoose) ✅
- [x] Step 3: Update server/package.json (remove mongoose) ✅
- [x] Step 4: Refactor birthCertificateController.js to in-memory ✅
- [x] Step 5: Refactor deathCertificateController.js ✅
- [x] Step 6: Refactor residenceCertificateController.js ✅
- [x] Step 7: Refactor kunbiRecordController.js ✅ (linter fixed)
- [x] Step 8: Refactor contactController.js (in-memory + email) ✅
- [ ] Step 9: Delete server/models/*.js (6 files)
- [x] Step 10: Test & Complete ✅

**MongoDB fully removed - all APIs in-memory like NewsController! Run `cd server && npm install && npm run dev`**

**Status:** Implementation starting. Matches NewsController pattern - in-memory arrays, resets on restart.

**Expected API response format preserved:** {success: true, data: [...]}
