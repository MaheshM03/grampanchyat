# Fix News 400 Error - News Validation Failed

## Steps:
- [ ] 1. Update form state in AdminPanel.jsx: Add `excerpt: ''`, `date: new Date().toISOString().split('T')[0]`, `category: 'News'`
- [ ] 2. Add UI fields: category select, date input, excerpt textarea/input
- [ ] 3. In addOrUpdateNews: Create `newsData` mapping fields (title, excerpt, new Date(date), category, content:desc, imageUrl:img, hasImage:!!img)
- [ ] 4. Update validation: Check all required fields
- [ ] 5. Update editNews: Map backend to form (content→desc, excerpt, etc.)
- [ ] 6. Test: Add news with all fields → no 400 error
- [ ] 7. Test edit + image upload

Current progress: Starting edits
