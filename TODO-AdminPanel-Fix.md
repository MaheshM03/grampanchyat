# AdminPanel.jsx Fixes
- [x] 1. Hoist all style constants (inputStyle, btnStyle, editBtn, delBtn) inside AdminPanel component
- [x] 2. Remove local `deleteNews` function; replace onClick with context deleteNews(id) + showToast
- [x] 3. Fix `addOrUpdateNews`: use context `addNews(form)` or `updateNews(editingId, form)`
- [x] 4. Fix `updateStatus(id)`: POST to `/api/grievance/${id}/status`, then fetchGrievances()
- [x] 5. Add try-catch + showToast("error") for all async ops
- [x] 6. Edit file and verify webpack compiles without errors
- [ ] 7. Test: add/edit/delete news, resolve grievance
